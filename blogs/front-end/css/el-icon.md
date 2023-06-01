---
title: 调整el-icon的大小
date: 2022/08/26
categories:
  - CSS
tags:
  - CSS
---

# 调整el-icon的大小

el-icon有两种使用方法，如下：

```html
<i class="el-icon-edit"></i>
<i class="el-icon-share"></i>
<i class="el-icon-delete"></i>
<el-button type="primary" icon="el-icon-search">搜索</el-button>
```

在使用icon的过程中，有时我们需要调整icon的大小，调整icon的方法如下：

1.给i标签加一个父容器，在父容器的样式中设置font-size属性即可调整大小。（设置width和height是无法改变icon的大小的）

2.直接编辑el-button的css属性，同样是设置font-size属性

示例：

```html
<el-button icon="el-icon-circle-plus-outline" class="acitonButton"></el-button>
```

```css
.acitonButton{
    border: none;
    font-size: 20px;
}
```

