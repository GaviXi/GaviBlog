---
title: 关于小程序中多个函数并发修改同一条数据
date: 2023/06/06
categories:
  - 微信小程序
tags:
  - 微信小程序
  - 数据库
---
# 关于小程序中多个函数并发修改同一条数据

## 背景

开发小程序的时候，遇到了如下情况：多个函数可能存在并发修改同一条数据的情况。

修改操作如下

```javascript
const db = cloud.database();
const _ = db.command;
db.collection('xxx')
            .doc('yyy')
            .update({
              data: {
                order: _.pull(zzz)
              }
            })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            })
```

在这里我们对数据库进行更新操作，使用 `$pull`操作符删除order字段中的某个元素（且该元素不会存在重复值，原因是order是对象数组，我们在每个对象里面存的值也不一样）

那么在这样的情况下，会存在冲突的现象吗？

## 结论

如果第一个操作删除了该元素之后，第二个操作在检查到初始状态时仍认为存在匹配元素，当第二个操作尝试删除时，由于实际上该元素已被删除，可能会导致错误。

因此，在同时有两个操作在同一个数组字段上使用 `$pull` 操作符删除同一个元素，并且该元素在数组字段上只有一个的情况下，存在潜在的冲突风险。

## 解决方案

为了避免这种冲突，可以考虑使用事务或锁机制来处理并发删除冲突。

首先介绍一下锁机制的做法，代码如下

```javascript
// 云函数代码示例（concurrentDelete）
const cloud = require('wx-server-sdk');
cloud.init();

exports.main = async (event, context) => {
  const db = cloud.database();
  const _ = db.command;
  const collection = db.collection('myCollection');
  const docId = event.docId; // 要删除的数据的 _id

  // 尝试获取锁标记
  const lock = await collection.doc(docId).get();

  if (lock.data && lock.data.isDeleting) {
    // 存在锁标记，其他函数正在删除该数据，放弃删除操作
    return { success: false, message: '数据正在删除中，请稍后再试' };
  }

  try {
    // 添加锁标记
    await collection.doc(docId).update({
      data: { isDeleting: true }
    });

    // 执行删除操作
    const result = await collection.doc(docId).update({
                      data: {
                        order: _.pull(event.zzz)
                      }
    			});

    // 删除完成后释放锁标记
    await collection.doc(docId).update({
      data: { isDeleting: false }
    });

    return { success: true, result };
  } catch (error) {
    // 发生错误时也需要释放锁标记
    await collection.doc(docId).update({
      data: { isDeleting: false }
    });
    throw error;
  }
};
```

在云函数中，首先尝试获取锁标记。如果锁标记存在，表示其他函数正在删除该数据，当前函数放弃删除操作。如果锁标记不存在，则添加锁标记，并执行删除操作。删除完成后释放锁标记。当函数发生错误时也需要释放锁标记，以确保数据的一致性。

在多个函数中调用并发删除的云函数：

```javascript
// 函数A调用并发删除的云函数
wx.cloud.callFunction({
  name: 'concurrentDelete',
  data: {
    docId: 'xxx' // 要删除的数据的 _id
  },
  success: (res) => {
    if (res.result.success) {
      console.log('函数A删除成功', res.result.result);
    } else {
      console.error('函数A删除失败', res.result.message);
    }
  },
  fail: (err) => {
    console.error('函数A调用失败', err);
  }
});

// 函数B调用并发删除的云函数
wx.cloud.callFunction({
  name: 'concurrentDelete',
  data: {
    docId: 'xxx' // 要删除的数据的 _id
  },
  success: (res) => {
    if (res.result.success) {
      console.log('函数B删除成功', res.result.result);
    } else {
      console.error('函数B删除失败', res.result.message);
    }
  },
  fail: (err) => {
    console.error('函数B调用失败', err);
  }
});
```

通过调用并发删除的云函数，确保在任意时间点只有一个函数成功删除数据，其他函数会放弃删除操作。

除了锁机制，还可以使用事务操作来确保多个删除操作的一致性。事务操作可以将多个操作作为一个原子性的单元执行，从而保证操作的顺序和结果的一致性。

下面介绍使用事务的做法，代码如下：

```javascript
//runTransaction接口
const db = wx.cloud.database();
const collection = db.collection('myCollection');

db.runTransaction(async transaction => {
  const doc = await transaction.get(collection.doc('xxx'));

  // 从数组中删除元素
  const updatedArray = doc.data.arrayField.filter(element => element !== 'element');

  // 更新数组字段
  transaction.update(collection.doc('xxx'), {
    data: {
      arrayField: updatedArray
    }
  });
}).then(res => {
  console.log('事务执行成功', res);
}).catch(err => {
  console.error('事务执行失败', err);
});


```

在使用事务操作时，需要将多个操作封装在一个函数内，并使用 `runTransaction` 方法来执行事务。在事务函数中，可以获取并操作要更新的数据，并通过 `transaction.update` 方法更新数组字段。

你也可以通过startTransaction接口来实现

```javascript
// 云函数代码示例（concurrentDelete）
const cloud = require('wx-server-sdk');
cloud.init();

exports.main = async (event, context) => {
  const db = cloud.database();
  const collection = db.collection('myCollection');
  const docId = event.docId; // 要删除的数据的 _id

  const transaction = await db.startTransaction();

  try {
    const result = await transaction.run(() => {
      return collection.doc(docId).remove();
    });

    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
```

使用事务操作可以保证多个删除操作在同一事务中执行，从而避免并发删除冲突，并确保操作的一致性。

关于更多事务的细节，[可以去官方文档查看](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/transaction.html)



