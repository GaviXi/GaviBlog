---
title: 使某个css属性失效 property:unset
date: 2022/04/09
categories:
  - CSS
tags:
  - CSS
---

# 使某个css属性失效 property:unset

在我们编写CSS文件的时候，一个元素可能被多次设置了css样式，一般来说，最后一次的css样式会覆盖之前设置的相同的css属性，同时会继承之前其他的css属性。如果想该元素不继承之前设置的css属性，则可设置继承的属性值为unset。（特别是在引入了多个css文件的情况下）

如下面代码中的left属性，此时我们将继承的left属性设置为**unset**，同时设置right属性来改变元素的水平位置。

```css
 .swiper-pagination-fraction {
    position: absolute;
    left: 50%;
}
```

```css
.swiper-pagination-fraction {
    width: unset;
    position: absolute;
    left: unset;
    right: 18.75%;
    bottom: 7.5%;
}
```

此外，unset还有另外一种用法。如果这个属性本来有从父级继承的值（这个属性默认可以继承，且父级有定义），则**将该属性重新设置为继承的值**。

示例：

```html
<div class="bar">
  <p>This text is green (default inherited value).</p>
</div>
```

```css
.bar {
  color: green;
}
 
p {
  color: red;
}
.bar p {
  color: unset;
}
```

如下图所见，p标签中的文本仍然继承了父级的颜色属性。

![unset-1](./unset.assets/unset-1.png)

