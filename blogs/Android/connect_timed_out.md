---
title: connect timed out 和Failed to connect to报错
date: 2023/03/15
categories:
  - Android开发
tags:
  - Android开发
---
# connect timed out 和Failed to connect to报错

使用Pull解析XML，使用真机调试的时候遇到两个报错：

```
java.net.SocketTimeoutException: connect timed out 
java.net.ConnectException: Failed to connect to
```

## java.net.SocketTimeoutException: connect timed out 解决方案：

### 1.关闭防火墙

### 2.延长请求时间

```java
private static final long READ_TIMEOUT = 60000;
//写入超时为60s
private static final long WRITE_TIMEOUT = 60000;
//连接超时为60s
private static final long CONNECT_TIMEOUT = 60000;
 
 
OkHttpClient client = new OkHttpClient.Builder()
        .readTimeout(READ_TIMEOUT, TimeUnit.MILLISECONDS)
        .writeTimeout(WRITE_TIMEOUT, TimeUnit.MILLISECONDS)
        .connectTimeout(CONNECT_TIMEOUT, TimeUnit.MILLISECONDS)
        .build();
Request request = new Request.Builder()
        .url("http://192.168.43.145/get_data.xml")
        .build();
```

## java.net.ConnectException: Failed to connect to解决方案：

### 1.创建 res/xml/network_security_config.xml

在res目录下找到xml目录（如果没有xml目录则新建一个），然后新建一个文件，名为network_security_config.xml

内容如下：domain标签中要填你本机的ip地址，可以打开命令行输入ipconfig查看

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">Your URL(ex: 127.0.0.1)</domain>
    </domain-config>
</network-security-config>
```

### 2.修改AndroidManifest.xml

启用 android:usesCleartextTraffic

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest ...>
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        ...
        android:usesCleartextTraffic="true"
        ...>
        ...
    </application>
</manifest>
```

3.上述两点完成修改后如果仍然报错，则需要修改AndroidManifest.xml，降低 android:targetSandboxVersion 的版本

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest android:targetSandboxVersion="1">
    <uses-permission android:name="android.permission.INTERNET" />
    ...
</manifest>
```

如果还是不行，那么很大的原因是因为：你的手机和电脑没在同一个局域网。一定要让你的电脑和你的手机连接同一个局域网或者wifi！！！