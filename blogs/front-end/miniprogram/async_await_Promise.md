---
title: async/await以及云函数的综合运用
date: 2023/05/12
categories:
  - 微信小程序
tags:
  - 微信小程序
  - JavaScript
---

# async/await & Promise的再认识

## 背景

在开发微信小程序过程中，遇到如下需求：

**需要等待wx.requestPayment的回调函数执行完后再执行后续代码**

这是因为在调用wx.requestPayment之后，会弹出一个支付弹窗，如果此时点击右上角的`x`，那么将会执行wx.requestPayment的回调函数fail中的代码。而由于`wx.requestPayment`的回调函数是**异步执行**的，所以程序会继续跑下去执行后面的代码。这会出现什么问题呢？

```javascript
async fabu(){
    const res = await wx.requestPayment({
      ...params,
      success: function (res) {
        console.log('Payment success');
        //...(假设这里是支付成功后的代码)
      },
      fail: function (error) {
        console.log('Payment failed', error);
      }
    });
    //...(假设这里是支付成功后的代码)
}
```

1.如果我把支付成功后的代码写到wx.requestPayment的后面，那么在我点击了右上角的`x`后，程序会执行后续的代码，导致我明明没有支付却执行了支付成功的代码。

2.如果我把支付成功后的代码写到wx.requestPayment的回调函数（succes）里，那么会出现：在弹出弹窗等待用户进行支付操作之后，程序会继续执行wx.requestPayment后面的代码的现象，这会导致用户未完成支付操作，fabu()这个函数就已经执行完并返回结果了。

## **Solution**

由于`wx.requestPayment`的回调函数是异步执行的，而且微信开发者工具不支持直接使用`async/await`等待回调函数的执行完成，所以无法直接通过在`wx.requestPayment`前加上`await`来等待回调函数执行完毕。

不过，可以使用`Promise`和`resolve`来手动实现等待回调函数执行完毕后再执行后续代码的效果。

```javascript
async doPayment(params) {
    let that = this;
    try {
      const paymentResult = await new Promise((resolve, reject) => {
        wx.requestPayment({
          ...params,
          success: function (res) {
            console.log('Payment success');
            resolve(res); // 在成功回调函数中手动触发resolve，并传递回调数据
          },
          fail: function (error) {
            //如果不是耗时处理，处理支付失败的情况可以写在这
            console.log('Payment failed in', error);
            reject(error); // 在失败回调函数中手动触发reject，并传递错误信息
          }
        });
      });
      console.log('Continue with the next steps');
      // 在这里可以执行支付成功后的代码
    } catch (error) {
      //如果是耗时处理，处理支付失败的情况可以写在这
      console.log('Payment failed out', error);
    }
    console.log('这里是try catch块后面的代码');
  },
```

这里我们在doPayment函数中使用await new Promise来等待wx.requestPayment的完成，并获取支付结果。在成功情况下，输出"Payment success"，然后可以执行后续代码。在失败情况下，输出"Payment failed"并打印错误信息，可以在catch块中处理支付失败的情况。

这样我们就能做到等待wx.requestPayment的回调函数执行完后再执行后续代码，如图所示：

![image-20230517001148702](./async_await_Promise.assets/1.png)