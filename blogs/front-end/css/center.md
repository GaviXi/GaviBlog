---
title: 关于元素的水平居中和垂直居中
date: 2022/03/06
categories:
  - CSS
tags:
  - CSS
---

# 关于元素的水平居中和垂直居中

## 水平居中

### 1.将元素设置成块级元素，利用margin居中

```css
img {
            display: block;
            margin: 0 auto;
        }
```

### **2.flex布局**

```css
.box1 {
            width: 100px;
            height: 100px;
            background-color: aquamarine;
            display: flex;
            justify-content: center;
        }
```

### **3.父元素设置text-align：center**

```css
.box1 {
            width: 100px;
            height: 100px;
            background-color: aquamarine;
            text-align: center;
        }
```

### **4.定位**

```css
img {
            width: 50px;
            height: 50px;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
        }
```

## 垂直居中

### **1.flex布局**

```css
.box1 {
            width: 100px;
            height: 100px;
            background-color: aquamarine;
            display: flex;
            align-items: center;    /* 对单行弹性盒子模型使用可以使用 */
            /* align-content: center;  通常使用该属性设置垂直居中，但是该属性对单行弹性盒子模型无效。（即：带有 flex-wrap: nowrap ,或者盒子中本来就只有一个元素）。*/
        }
```

tip:CSS align-items属性将所有直接子节点上的align-self值设置为一个组。align-self属性设置项目在其包含块中在交叉轴方向上的对齐方式。

### **2.display：table-cell**

```css
.box1 {
            width: 100px;
            height: 100px;
            background-color: aquamarine;
            display: table-cell;
            vertical-align: middle;
        }
```

### **3.定位** 

```css
img {
            width: 50px;
            height: 50px;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
```

### 4.通过设置line-height等于元素高度可以使单行文字实现垂直居中。

```css
div {
            height:30px;
    		line-height:30px;
        }
```

