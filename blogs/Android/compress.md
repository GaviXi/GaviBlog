---
title: 在安卓中如何对照片进行压缩后再加载到内存中
date: 2023/05/05
categories:
  - Android开发
tags:
  - Android开发
---
# 在安卓中如何对照片进行压缩后再加载到内存中

为什么我们要对照片进行压缩处理后再加载到内存中，原因是某些照片即使经过裁剪后体积仍然很大，直接加载到内存中有可能会导致程序崩溃。

在Android中，我们可以使用以下步骤对照片进行**适当的压缩**后再加载到内存中：

1.获取照片的原始Bitmap对象：使用BitmapFactory类中的`decodeFile()`方法或者`decodeStream()`方法，从文件或流中获取照片的原始Bitmap对象。

下面是一个示例：

```java
Bitmap originalBitmap = BitmapFactory.decodeFile(filePath);
```

2.压缩照片尺寸：根据需要，可以通过缩小照片的尺寸来减少内存占用。可以使用Bitmap类的`createScaledBitmap()`方法来实现。`createScaledBitmap()`方法需要传入四个参数：

- Bitmap对象
- 目标宽度
- 目标高度
- 是否保持原始宽高比作为参数

下面是一个示例，将照片的宽度和高度缩小为原来的一半：

```java
int originalWidth = originalBitmap.getWidth();
int originalHeight = originalBitmap.getHeight();
int scaledWidth = originalWidth / 2;
int scaledHeight = originalHeight / 2;
Bitmap scaledBitmap = Bitmap.createScaledBitmap(originalBitmap, scaledWidth, scaledHeight, false);
```

3.压缩照片质量：可以通过降低照片的质量来减少内存占用。可以使用Bitmap类的`compress()`方法来实现。

`compress()`方法需要传入三个参数：

- format：表示要压缩的图像格式，可选的格式有：`JPEG`、`PNG`和`WEBP`。
- quality：表示图像的压缩质量，取值范围为0-100。0表示压缩质量最低，100表示无损压缩。
- stream：表示输出流，用于接收压缩后的图像数据。

下面是一个示例，将照片的质量压缩到80%并将压缩后的数据保存在字节数组中：

```java
ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
scaledBitmap.compress(Bitmap.CompressFormat.JPEG, 80, outputStream);
byte[] compressedData = outputStream.toByteArray();
```

4.加载压缩后的照片到内存中：使用BitmapFactory类的`decodeByteArray()`方法将压缩后的照片数据加载到内存中的Bitmap对象中。`decodeByteArray()`方法需要传入三个参数：

- data：表示包含图像数据的字节数组。
- offset：表示要解码的数据在字节数组中的起始偏移量。
- length：表示要解码的数据长度。

该方法返回一个解码后的Bitmap对象，如果解码失败，则返回null。

下面是一个示例：

```java
Bitmap compressedBitmap = BitmapFactory.decodeByteArray(compressedData, 0, compressedData.length);
```

现在，你就可以使用compressedBitmap对象来显示或处理压缩后的照片。

需要注意的是，压缩照片会降低图像质量，所以需要根据具体需求进行权衡。你可以根据自己的应用场景和要求调整压缩的尺寸和质量参数。