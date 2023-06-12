---
title: 小程序首页js文件等待app.js执行完成后才执行
date: 2023/06/08
categories:
  - 微信小程序
tags:
  - 微信小程序
  - JavaScript
---
# 小程序首页js文件等待app.js执行完成后才执行

## 背景

在开发小程序时，需要实现如下需求：

小程序首页js文件等待`app.js`执行完成后才执行，其中`app.js`中存在耗时操作

## 解决方案

1.异步加载：将耗时操作放在一个异步函数中，并在`app.js`中执行。在异步函数中，可以使用`Promise`对象来控制执行的顺序和等待时间。然后，在小程序首页的`js`文件中使用`Promise`来等待`app.js`中的异步函数执行完成后再继续执行。例如：

在`app.js`中：

```javascript
timeConsumingOperation() {
  return new Promise(resolve => {
    // 耗时操作
    setTimeout(() => {
      console.log('耗时操作执行完成');
      resolve();
    }, 3000); // 假设耗时操作需要3秒
  });
}

App({
  onLaunch() {
    timeConsumingOperation().then(() => {
      console.log('app.js中的耗时操作执行完成');
    });
  },
});
```

在小程序首页的`js`文件中：

```javascript
const app = getApp();

Page({
  onLoad() {
    app.timeConsumingOperation().then(() => {
      console.log('首页的js文件中的代码执行');
    });
  },
});
```

2.使用回调函数：在`app.js`中定义一个回调函数，并将回调函数作为参数传递给耗时操作的函数。在耗时操作完成后，调用回调函数。然后，在小程序首页的`js`文件中调用耗时操作的函数，并传入一个回调函数来处理操作完成后的逻辑。例如：

在`app.js`中：

```javascript
timeConsumingOperation(callback) {
  // 耗时操作
  setTimeout(() => {
    console.log('耗时操作执行完成');
    callback();
  }, 3000); // 假设耗时操作需要3秒
}

App({
  onLaunch() {
    timeConsumingOperation(() => {
      console.log('app.js中的耗时操作执行完成');
    });
  },
});
```

在小程序首页的`js`文件中：

```javascript
const app = getApp();

Page({
  onLoad() {
    app.timeConsumingOperation(() => {
      console.log('首页的js文件中的代码执行');
    });
  },
});
```

3.使用全局变量或状态管理工具：在`app.js`中设置一个全局变量或使用状态管理工具（如`Redux`、`Vuex`等）来标识耗时操作的完成状态。在小程序首页的`js`文件中通过监听全局变量的变化或使用状态管理工具的订阅机制来执行相应的逻辑。

在`app.js`中：

```javascript
App({
  globalData: {
    operationComplete: false, // 初始状态为未完成
  },
  onLaunch() {
    // 耗时操作
    setTimeout(() => {
      console.log('耗时操作执行完成');
      this.globalData.operationComplete = true;
    }, 3000); // 假设耗时操作需要3秒
  },
});
```

在小程序首页的`js`文件中：

```javascript
Page({
  onLoad() {
    const app = getApp();
    const checkOperationStatus = setInterval(() => {
      if (app.globalData.operationComplete) {
        clearInterval(checkOperationStatus);
        console.log('首页的js文件中的代码执行');
      }
    }, 100); // 每100毫秒检查一次状态变化
  },
});
```

