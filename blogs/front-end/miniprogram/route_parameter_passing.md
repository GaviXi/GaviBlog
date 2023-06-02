---
title: 微信小程序路由传参
date: 2022/04/07
categories:
  - 微信小程序
tags:
  - 微信小程序
---

# 微信小程序路由传参

在微信小程序中，可以通过路由传参将数据传递给目标页面。以下是一种常见的方式：

在源页面中，使用 `wx.navigateTo` 或 `wx.redirectTo` 方法跳转到目标页面，并通过 URL 参数传递数据。示例：

```javascript
wx.navigateTo({
  url: 'targetPage?param1=value1&param2=value2'
});
```

在目标页面的 `onLoad` 生命周期函数中，可以通过 `options` 参数获取传递的参数。示例：

```javascript
onLoad: function(options) {
  const param1 = options.param1;
  const param2 = options.param2;
  console.log(param1); // 输出: value1
  console.log(param2); // 输出: value2
}
```

通过在 URL 中添加参数，并在目标页面的 `onLoad` 函数中获取这些参数，就可以在页面之间传递数据。

注意：如果使用 `wx.redirectTo` 方法进行页面跳转，则目标页面会替换当前页面，而不会保留页面栈中的原页面。而使用 `wx.navigateTo` 方法进行跳转，则会将目标页面推入页面栈，返回时可回到原页面。根据你的具体需求选择适合的跳转方法。

**如果要传递的参数是对象呢？**

如果要传递的参数是一个对象，在微信小程序中可以通过以下方式进行路由传参：

在源页面中，使用 `wx.navigateTo` 或 `wx.redirectTo` 方法跳转到目标页面，并将对象参数转换为字符串形式进行传递。示例：

```javascript
const objParam = { key1: 'value1', key2: 'value2' };
const encodedParam = encodeURIComponent(JSON.stringify(objParam));
wx.navigateTo({
  url: 'targetPage?param=' + encodedParam
});
```

在目标页面的 `onLoad` 生命周期函数中，通过 `options` 参数获取传递的参数，并将字符串参数解析为对象形式。示例：

```javascript
onLoad: function(options) {
  const encodedParam = options.param;
  const decodedParam = JSON.parse(decodeURIComponent(encodedParam));
  console.log(decodedParam.key1); // 输出: value1
  console.log(decodedParam.key2); // 输出: value2
}
```

在上面的示例中，我们将要传递的对象参数先使用 `JSON.stringify()` 方法转换为字符串形式，并通过 `encodeURIComponent()` 进行编码。在目标页面的 `onLoad` 函数中，我们先使用 `decodeURIComponent()` 进行解码，再使用 `JSON.parse()` 方法将字符串解析为对象形式，以获取原始的参数对象。

注意，在实际使用中，对于复杂的对象参数，需要确保对象可以正确地被转换为字符串形式，并在目标页面中进行适当的解析和处理。