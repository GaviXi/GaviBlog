---
title: async和await以及云函数的综合运用
date: 2023/05/08
categories:
  - 微信小程序
tags:
  - 微信小程序
  - JavaScript
---
# async和await以及云函数的综合运用

前言：本篇博客主要记录了我在开发项目时完成的一个涉及async和await以及云函数的需求

正文：

​	我的需求：

​	在点击发布按钮后，等待敏感词检测的云函数返回结果后，根据云函数返回的不同结果，执行相对应的逻辑。

先来看看原来的代码（学弟写的）：

```javascript
//点击发布
fabu: function () {
    let that = this;
    this.formCheck()
      .then(res => {
		//
      })
  .catch(err => {
    console.log(err)
  })
},
```

可以看到，在点击发布之后我们会对表单数据进行验证。下面展示表单验证的代码

```javascript
//表单验证
  formCheck() {
    return new Promise((resolve, reject) => {
      let biaoti = this.data.order.biaoti;
      let xiangqing = this.data.order.xiangqing;
      if (biaoti.length < 1) {
        wx.showToast({
          icon: 'none',
          title: '标题不能为空',
        })
        reject('标题为空')
      } else {
        wx.cloud.callFunction({
          name: 'msgCheck',
          data: {
            type: 'text',
            msg: biaoti
          }
        }).then(res => {
          console.log('标题检测完成', res)
          if (res.result.result.label != 100) {
            wx.showToast({
              title: '标题包含违规信息，请修改',
              icon: 'none'
            })
            reject('标题异常')
          } else {
            console.log('标题无异常')
          }
        }).catch(err => {
          console.log('云函数msgCheck调用失败', err)
        })
      }
      resolve('表单验证无异常')
    })
  },
```

可以看到，这个函数直接返回一个Promise对象，在这个对象中我们调用了敏感词检测的云函数，如果标题无异常，我们将Promise的状态设置为已解决，即调用`resolve`函数并传递`"表单验证无异常"`作为解决值；如果包含违规信息，我们将Promise的状态设置为已拒绝，即调用`reject`函数并传递一个`'表单验证无异常'`作为拒绝原因。

接下来，我们在`fabu`函数使用Promise的`.then()`方法注册解决处理程序，它会在Promise状态变为已解决时被调用，并接收解决值作为参数。我们使用`.catch()`方法注册拒绝处理程序，它会在Promise状态变为已拒绝时被调用，并接收拒绝原因作为参数。

然而，事情并没有按照我们想象中进行。

实际运行的效果是：无论标题是否违规，都会直接调用`resolve`函数并传递`"表单验证无异常"`作为解决值，然后执行`fabu`函数中`this.formCheck().then()`中的解决处理程序。

这是为什么呢？

原来，wx.cloud.callFunction会返回一个Promise对象，以支持使用Promise的异步操作处理方式。所以在这里我们是异步调用的敏感词检测云函数。这导致了敏感词检测云函数还没有返回结果，程序就已经跑到了`resolve('表单验证无异常')`这行代码，即调用了`resolve`函数。那么我们要怎么解决这个问题呢？

这就要用到async和await了

首先修改`fabu`函数

```javascript
fabu: async function () {
    let jiage = this.data.order.jiage;
    let that = this;
    const res = await this.formCheck();
    if (!res) return;
    else{
        //...
    }
}
```

这里我们使用了async和await，让程序等待我们的表单验证完后，再继续往下执行。

```javascript
  //表单验证
  async formCheck() {
    let biaoti = this.data.order.biaoti;
    let xiangqing = this.data.order.xiangqing;
    if (biaoti.length < 1) {
      wx.showToast({
        icon: 'none',
        title: '标题不能为空',
      })
      return;
    } else {
      if (xiangqing.length < 1) {
        wx.showToast({
          icon: 'none',
          title: "详细需求不能为空",
        })
        return;
      } else {
        try {
          const res = await wx.cloud.callFunction({
            name: 'msgCheck',
            data: {
              type: 'text',
              msg: biaoti + xiangqing
            }
          })
          if (res.result.result.label != 100) {
            wx.showToast({
              title: '标题或详情包含违规信息，请修改',
              icon: 'none',
              duration: 2000
            })
            return;
          }
        } catch (err) {
          console.error('云函数调用失败：', err);
        }
      }
    }
    return 1;
  },
```

这里我们再次使用到了async和await，目的就是要等`msgCheck`云函数返回结果后再继续运行接下来的代码。如果敏感词检测到标题包含违规信息，则直接返回；否则返回1。

在`fabu`函数中，如果`res==1`说明标题不含违规信息，否则说明标题包含违规信息。然后分别执行不同的逻辑。

运行代码，效果确实如我们预想的那样！