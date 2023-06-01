---
title: ::v-deep
date: 2022/11/19
categories:
  - vue
tags:
  - vue
---

# ::v-deep

本文主要介绍vue样式穿透 ::v-deep的具体使用。

使用场景:

在用到很多vue的组件库如vant，elementUI，vuetify等，虽然配好了样式但是有时候我们仍然需要根据需求更改样式。

当我们需要覆盖组件库中的样式时大多数情况只能通过深度作用选择器，::v-deep就是其中一种深度作用选择器。

**深度作用选择器**

如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符：

```css
<style scoped> .a >>> .b { /* ... */ } </style> 
```

上述代码将会编译成： 

```css
.a[data-v-f3f3eg9] .b { /* … */ }
```

由于：

- scss等预处理器却无法解析>>>
- 在vue-cli3编译时，/deep/的方式会报错或者警告
- ::v-deep相较于>>>和/deep/更保险并且编译速度更快

所以我们推荐一般使用::v-deep来进行样式穿透

::v-deep  （双冒号不能少） 具体案例如下：

```css
<style lang="scss" scoped>
.a{
 ::v-deep .b { 
  /* ... */
 }
} 
 
::v-deep .v-text-field .v-text-field--enclosed .v-text-field__details {
  margin-bottom: 8px;
  padding: 0px !important; 
}
</style>
```

