# 第09章 使用网络技术

本章主要讲述如何在手机端使用HTTP协议和服务器端进行网络交互，并对服务器返回的数据进行解析，这也是Android中最常使用到的网络技术。

##  WebView的用法

有时候我们可能会碰到一些比较特殊的需求，比如说要求在应用程序里展示一些网页。加载和显示网页通常都是浏览器的任务，但是需求里又明确指出，不允许打开系统浏览器，而我们当然也不可能自己去编写一个浏览器出来，这时应该怎么办呢？

Android提供了一个WebView控件，借助它就可以在自己的应用程序里嵌入一个浏览器，从而非常轻松地展示各种各样的网页。WebView的用法也是相当简单，下面我们就通过一个例子来学习一下。

新建一个WebViewTest项目，然后修改activity_main.xml中的代码，如下所示：

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <WebView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/web_view"/>
</LinearLayout>
```

在布局文件中使用到了一个新的控件：WebView。这个控件用来显示网页的，给它设置了一个id，并让它充满整个屏幕。然后修改MainActivity中的代码，如下所示：

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        WebView webView =(WebView) findViewById(R.id.web_view);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("https://www.baidu.com");
    }
}
```

MainActivity中，首先使用`findViewById()`方法获取到了WebView的实例，然后调用WebView的`getSettings()`方法可以去设置一些浏览器的属性，这里只是调用了`setJavaScriptEnabled()`方法来让WebView支持JavaScript脚本。

接下来，调用了WebView的`setWebViewClient()`方法，并传入了一个WebViewClient的实例。这段代码的作用是，当需要从一个网页跳转到另一个网页时，我们希望目标网页仍然在当前WebView中显示，而不是打开系统浏览器。

最后一步，调用WebView的`loadUrl()`方法，并将网址传入，即可展示相应网页的内容。

另外还需要注意，由于本程序使用到了网络功能，而访问网络是需要声明权限的，因此我们还得修改AndroidManifest.xml文件，并加入权限声明，如下所示：

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.webviewtest">
    <uses-permission android:name="android.permission.INTERNET"/>
    ...
</manifest>
```

## 使用HTTP协议访问网络

如果说真的要去深入分析HTTP协议，可能需要花费整整一本书的篇幅。这里我们只需要稍微了解一些就足够了，它的工作原理特别简单，就是客户端向服务器发出一条HTTP请求，服务器收到请求之后会返回一些数据给客户端，然后客户端再对这些数据进行解析和处理就可以了。

比如，上一节中使用到的WebView控件，其实也就是我们向服务器发起了一条HTTP请求，接着服务器分析出我们想要访问的页面，于是会把该网页的HTML代码进行返回，然后WebView再调用手机浏览器的内核对返回的HTML代码进行解析，最终将页面展示出来。

简单来说，WebView已经在后台帮我们处理好了发送HTTP请求、接收服务响应、解析返回数据，以及最终的页面展示这几步工作，不过由于它封装得实在是太好了，反而使得我们不能那么直观地看出HTTP协议到底是如何工作的。因此，接下来就让我们通过手动发送HTTP请求的方式，来更加深入地理解一下这个过程。

### 使用HttpURLConnection

在过去，Android上发送HTTP请求一般有两种方式：**HttpURLConnection**和**HttpClient**。不过由于HttpClient存在API数量过多、扩展困难等缺点，Android团队越来越不建议我们使用这种方式。

在Android 6.0系统中，HttpClient的功能被完全移除了，标志着此功能被正式弃用，因此本小节我们就学习一下现在官方建议使用的HttpURLConnection的用法。

首先需要获取到HttpURLConnection的实例，一般只需new出一个URL对象，并传入目标的网络地址，然后调用一下`openConnection()`方法即可，如下所示：

```java
URL url = new URL("http://baidu.com");
HttpURLConnection connection = (HttpURLConnection)url.openConnection();
```

在得到了HttpURLConnection的实例之后，可以设置一下HTTP请求所使用的方法。常用的方法主要有两个：**GET**和**POST**。GET表示希望从服务器那里获取数据，而POST则表示希望提交数据给服务器。写法如下：

```java
connection.setRequestMethod("GET");
```

接下来，就可以进行一些自由的定制了，比如设置连接超时、读取超时的毫秒数，以及服务器希望得到的一些消息头等。这部分内容根据自己的实际情况进行编写，示例写法如下：

```java
connection.setConnectTimeout(8000);
connection.setReadTimeout(8000);
```

之后再调用`getInputStream()`方法就可以获取到服务器返回的输入流了，剩下的任务就是对输入流进行读取，如下所示：

```java
InputStream in = connection.getInputStream();
```

最后，可以调用`disconnect()`方法将这个HTTP连接关闭掉，如下所示：

```java
connection.disconnect();
```

下面通过一个具体的例子来真正体验一下HttpURLConnection的用法。新建一个NetworkTest项目，首先修改activity_main.xml中的代码，如下所示：

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent" >

    <Button
        android:id="@+id/send_request"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Send Request" />

    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent" >

        <TextView
            android:id="@+id/response_text"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />
    </ScrollView>

</LinearLayout>
```

这里我们使用了一个新的控件：**ScrollView**。由于手机屏幕的空间一般都比较小，有些时候过多的内容一屏是显示不下的，借助ScrollView控件的话，我们就可以以滚动的形式查看屏幕外的那部分内容。另外，布局中还放置了一个Button和一个TextView, Button用于发送HTTP请求，TextView用于将服务器返回的数据显示出来。接着修改MainActivity中的代码，如下所示：

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    TextView responseText;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button sendRequest = (Button) findViewById(R.id.send_request);
        responseText = (TextView) findViewById(R.id.response_text);
        sendRequest.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        if (view.getId() == R.id.send_request) {
            sendRequestWithHttpURLConnection();
        }
    }

    private void sendRequestWithHttpURLConnection() {
        //开启线程来发起网络请求
        new Thread(new Runnable() {
            @Override
            public void run() {
                HttpURLConnection connection = null;
                BufferedReader reader = null;
                try {
                    URL url = new URL("https://www.baidu.com");
                    connection = (HttpURLConnection) url.openConnection();
                    connection.setRequestMethod("GET");
                    connection.setConnectTimeout(8000);
                    connection.setReadTimeout(8000);
                    InputStream inputStream = connection.getInputStream();
                    //下面对获取到的输入流进行读取
                    reader = new BufferedReader(new InputStreamReader(inputStream));
                    StringBuilder response = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        response.append(line);
                    }
                    showResponse(response.toString());
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    if (reader != null) {
                        try {
                            reader.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    if (connection != null) {
                        connection.disconnect();
                    }
                }
            }
        }).start();
    }
    private void showResponse(final String response) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                //在这里进行Ui操作，将结果显示到界面
                responseText.setText(response);
            }
        });
    }
}
```

可以看到，在Send Request按钮的点击事件里调用了`sendRequestWithHttpURLConnection()`方法，在这个方法中先是开启了一个子线程，然后在子线程里使用HttpURLConnection发出一条HTTP请求，请求的目标地址就是百度的首页。

接着利用BufferedReader对服务器返回的流进行读取，并将结果传入到了`showResponse()`方法中。而在`showResponse()`方法里则是调用了一个`runOnUiThread()`方法，然后在这个方法的匿名类参数中进行操作，将返回的数据显示到界面上。

那么这里为什么要用这个`runOnUiThread()`方法呢？这是因为**Android是不允许在子线程中进行UI操作的，我们需要通过这个方法将线程切换到主线程，然后再更新UI元素。**（关于这部分内容，我们将会在下一章再进行讲解。）

需要注意的是，不要忘了要**声明网络权限**。

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.networktest">
    <uses-permission android:name="android.permission.INTERNET"/>
    ...
</manifest>
```

那么如果是想要提交数据给服务器应该怎么办呢？只需要将HTTP请求的方法改成POST，并在获取输入流之前把要提交的数据写出即可。注意每条数据都要以键值对的形式存在，数据与数据之间用“&”符号隔开，比如说我们想要向服务器提交用户名和密码，就可以这样写：

```java
connection.setRequestMethod("POST");
DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream()) ;
outputStream.writeBytes("username=admin&&password=123456");
```

### 使用OkHttp

当然，我们并不是只能使用HttpURLConnection，完全没有任何其他选择，事实上在开源盛行的今天，有许多出色的网络通信库都可以替代原生的HttpURLConnection，而其中**OkHttp**无疑是做得最出色的一个。

OkHttp不仅在接口封装上面做得简单易用，就连在底层实现上也是自成一派，比起原生的HttpURLConnection，可以说是有过之而无不及，现在已经成了广大Android开发者首选的网络通信库。

那么本小节我们就来学习一下OkHttp的用法

在使用OkHttp之前，我们需要先在项目中添加OkHttp库的依赖。编辑app/build.gradle文件，在dependencies闭包中添加如下内容：

```xml
    dependencies {
       implementation("com.squareup.okhttp3:okhttp:4.9.3")
    }
```

添加上述依赖会自动下载两个库，一个是OkHttp库，一个是Okio库，后者是前者的通信基础。

接下来，如果想要发起一条HTTP请求，就需要创建一个Request对象：

```java
Request request = new Request.Builder().build();
```

当然，上述代码只是创建了一个空的Request对象，并没有什么实际作用，我们可以在最终的`build()`方法之前连缀很多其他方法来丰富这个Request对象。比如可以通过`url()`方法来设置目标的网络地址，如下所示：

```java
Request request = new Request.Builder()
      .url("https://www.baidu.com")
      .build();
```

之后，调用OkHttpClient的`newCall()`方法来创建一个Call对象，并调用它的`execute()`方法来发送请求并获取服务器返回的数据，写法如下：

```java
Response response = client.newCall(request).execute();
```

其中，Response对象就是服务器返回的数据了，我们可以使用如下写法来得到返回的具体内容：

```java
String responseData = response.body().string();
```

如果是发起一条POST请求会比GET请求稍微复杂一点，我们需要先构建出一个RequestBody对象来存放待提交的参数，如下所示：

```java
RequestBody requestBody = new FormBody.Builder()
      .add("username","admin")
      .add("password","123456")
      .build();
```

然后，在Request.Builder中调用一下`post()`方法，并将RequestBody对象传入：

```x86asm
Request request = new Request.Builder()
      .url("https://www.baidu.com")
      .post(requestBody)
      .build();
```

接下来的操作就和GET请求一样了，调用`execute()`方法来发送请求并获取服务器返回的数据即可。

后面所有网络相关的功能我们都将会使用OkHttp来实现，到时候再进行进一步的学习。那么现在我们先把NetworkTest这个项目改用OkHttp的方式再实现一遍。由于布局部分完全不用改动，所以我们直接修改MainActivity中的代码，如下所示：

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    ...
    @Override
    public void onClick(View view) {
        if (view.getId() == R.id.send_request) {
            //sendRequestWithHttpURLConnection();
            sendRequestWithOkHttp();
        }
    }

    private void sendRequestWithOkHttp() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    OkHttpClient client = new OkHttpClient();
                    Request request = new Request.Builder()
                            .url("https://www.baidu.com")
                            .build();
                    Response response = client.newCall(request).execute();
                    String responseData = response.body().string();
                    showResponse(responseData);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
	...
}
```

这里并没有做太多的改动，只是添加了一个`sendRequestWithOkHttp()`方法，并在Send Request按钮的点击事件里去调用这个方法。在这个方法中同样还是先开启了一个子线程，然后在子线程里使用OkHttp发出一条HTTP请求，请求的目标地址还是百度的首页，OkHttp的用法也正如前面所介绍的一样。

最后仍然还是调用了`showResponse()`方法来将服务器返回的数据显示到界面上。

## 解析XML格式数据

通常情况下，每个需要访问网络的应用程序都会有一个自己的服务器，我们可以向服务器提交数据，也可以从服务器上获取数据。

不过这个时候就出现了一个问题，这些数据到底要以什么样的格式在网络上传输呢？随便传递一段文本肯定是不行的，因为另一方根本就不会知道这段文本的用途是什么。因此，一般我们都会在网络上传输一些格式化后的数据，这种数据会有一定的结构规格和语义，当另一方收到数据消息之后就可以按照相同的结构规格进行解析，从而取出他想要的那部分内容。在网络上传输数据时最常用的格式有两种：XML和JSON，下面我们就来一个一个地进行学习，本节首先学习一下如何解析XML格式的数据。

在开始之前我们还需要先解决一个问题，就是从哪里获取一段XML格式的数据呢？

这里我们搭建一个最简单的Web服务器，在这个服务器上提供一段XML文本，然后我们在程序里去访问这个服务器，再对得到的XML文本进行解析。

下载Apache服务器的安装包并完成安装步骤（过程此处省略）。打开浏览器，在地址栏输入127.0.0.1,如果页面显示`It works!`就说明服务器已经启动成功了

接下来进入到`C:\ApacheServer\htdocs`（你的安装目录）目录下，在这里新建一个名为get_data.xml的文件，然后编辑这个文件，并加入如下XML格式的内容：

```xml
<apps>
	<app>
		<id>1</id>
		<name>Google Maps</name>
		<version>1.0</version>
	</app>
	<app>
		<id>2</id>
		<name>Chrome</name>
		<version>2.1</version>
	</app>
	<app>
		<id>3</id>
		<name>Google Play</name>
		<version>2.3</version>
	</app>
</apps>
```

这时在浏览器中访问`http://127.0.0.1/get_data.xml`这个网址，就应该会出现我们上面新建文件中的内容。

接下来我们在Android程序里去获取并解析这段XML数据。

### Pull解析方式

解析XML格式的数据其实也有挺多种方式的，本节中我们学习比较常用的两种，Pull解析和SAX解析。

那么简单起见，这里仍然是在NetworkTest项目的基础上继续开发，这样我们就可以重用之前网络通信部分的代码，从而把工作的重心放在XML数据解析上。

既然XML格式的数据已经提供好了，现在要做的就是从中解析出我们想要得到的那部分内容。修改MainActivity中的代码，如下所示：

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    TextView responseText;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button sendRequest = (Button) findViewById(R.id.send_request);
        responseText = (TextView) findViewById(R.id.response_text);
        sendRequest.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        if (view.getId() == R.id.send_request) {
            //sendRequestWithHttpURLConnection();
            sendRequestWithOkHttp();
        }
    }

    private void sendRequestWithOkHttp() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    OkHttpClient client = new OkHttpClient();
                    Request request = new Request.Builder()
                        	//指定访问的服务器地址是电脑本机
                            .url("http://192.168.43.146/get_data.xml")
                            .build();
                    Response response = client.newCall(request).execute();
                    String responseData = response.body().string();
                    //showResponse(responseData);
                    parseXMLWithPull(responseData);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    private void parseXMLWithPull(String xmlData) {
        try {
            XmlPullParserFactory factory = XmlPullParserFactory.newInstance();
            XmlPullParser xmlPullParser = factory.newPullParser();
            xmlPullParser.setInput(new StringReader(xmlData));
            int eventType = xmlPullParser.getEventType();
            String id = "";
            String name = "";
            String version = "";
            while (eventType != XmlPullParser.END_DOCUMENT) {
                String nodeName = xmlPullParser.getName();
                switch (eventType) {
                    //开始解析某个节点
                    case XmlPullParser.START_TAG: {
                        if ("id".equals(nodeName)) {
                            id = xmlPullParser.nextText();
                        } else if ("name".equals(nodeName)) {
                            name = xmlPullParser.nextText();
                        } else if ("version".equals(nodeName)) {
                            version = xmlPullParser.nextText();
                        }
                        break;
                    }
                    //完成解析某个节点
                        case XmlPullParser.END_TAG: {
                            if ("app".equals(nodeName)) {
                                Log.d("MainActivity","id is " + id);
                                Log.d("MainActivity","name is " + name);
                                Log.d("MainActivity","version is " + version);
                            }
                            break;
                        }
                    default:
                        break;
                }
                eventType = xmlPullParser.next();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    ...
}
```

注意这里HTTP请求的地址是`http://192.168.43.146/get_data.xml`，因为我是使用真机调试的。书中使用的是`http://10.0.2.2/get_data.xml`，10.0.2.2对于模拟器来说就是电脑本机的IP地址。如果你是使用真机调试的，需要打开cmd，输入ipconfig命令查看本机的ip地址；如果你是用模拟器的，HTTP请求的地址就是10.0.2.2。10.0.2.2对于模拟器来说就是电脑本机的IP地址。

在得到了服务器返回的数据后，我们并不再直接将其展示，而是调用了`parseXMLWithPull()`方法来解析服务器返回的数据。`parseXMLWithPull()`方法中的代码，首先要获取到一个XmlPullParserFactory的实例，并借助这个实例得到XmlPullParser对象，然后调用XmlPullParser的`setInput()`方法将服务器返回的XML数据设置进去就可以开始解析了。解析的过程也非常简单，通过`getEventType()`可以得到当前的解析事件，然后在一个while循环中不断地进行解析，如果当前的解析事件不等于`XmlPullParser.END_DOCUMENT`，说明解析工作还没完成，调用`next()`方法后可以获取下一个解析事件。

在while循环中，我们通过`getName()`方法得到当前节点的名字，如果发现节点名等于id、name或version，就调用`nextText()`方法来获取节点内具体的内容，每当解析完一个app节点后就将获取到的内容打印出来。

运行程序，有可能会出现如下报错信息：

```
java.net.SocketTimeoutException: connect timed out 
java.net.ConnectException: Failed to connect to
```

请参考我的博客文章进行修改，[点击这里](https://blog.csdn.net/weixin_55020138/article/details/129592947?spm=1001.2014.3001.5501)

### SAX解析方式

Pull解析方式虽然非常好用，但它并不是我们唯一的选择。SAX解析也是一种特别常用的XML解析方式，虽然它的用法比Pull解析要复杂一些，但在语义方面会更加清楚。通常情况下我们都会新建一个类继承自DefaultHandler，并重写父类的5个方法，如下所示：

```java
public class MyHandler extends DefaultHandler {

    @Override
    public void startDocument() throws SAXException {
        super.startDocument();
    }

    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        super.startElement(uri, localName, qName, attributes);
    }

    @Override
    public void characters(char[] ch, int start, int length) throws SAXException {
        super.characters(ch, start, length);
    }

    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {
        super.endElement(uri, localName, qName);
    }

    @Override
    public void endDocument() throws SAXException {
        super.endDocument();
    }
}
```

- startDocument()方法会在开始XML解析的时候调用；
- startElement()方法会在开始解析某个节点的时候调用；
- characters()方法会在获取节点中内容的时候调用；
- endElement()方法会在完成解析某个节点的时候调用；
- endDocument()方法会在完成整个XML解析的时候调用。

其中，`startElement()`、`characters()`和`endElement()`这3个方法是有参数的，从XML中解析出的数据就会以参数的形式传入到这些方法中。

需要注意的是，在获取节点中的内容时，`characters()`方法可能会被调用多次，一些换行符也被当作内容解析出来，我们需要针对这种情况在代码中做好控制。

下面我们尝试用SAX解析的方式来实现和上一小节中同样的功能。新建一个ContentHandler类继承自DefaultHandler，并重写父类的5个方法，如下所示：

```java
package com.example.networktest;
...
public class ContentHandler extends DefaultHandler {
    private String nodeName;
    private StringBuilder id;
    private StringBuilder name;
    private StringBuilder version;
    
    // startDocument()方法会在开始XML解析的时候调用；
    @Override
    public void startDocument() throws SAXException {
        super.startDocument();
        id = new StringBuilder();
        name = new StringBuilder();
        version = new StringBuilder();
    }
    
    // startElement()方法会在开始解析某个节点的时候调用；
    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        super.startElement(uri, localName, qName, attributes);
        //记录当前节点名
        nodeName = localName;
    }
    
    // characters()方法会在获取节点中内容的时候调用；
    @Override
    public void characters(char[] ch, int start, int length) throws SAXException {
        super.characters(ch, start, length);
        // 根据当前的节点名判断将内容添加到哪一个StringBuilder对象中
        if ("id".equals(nodeName)) {
            id.append(ch,start,length);
        } else if ("name".equals(nodeName)) {
            name.append(ch,start,length);
        } else if ("version".equals(nodeName)) {
            version.append(ch,start,length);
        }
    }
    
    // endElement()方法会在完成解析某个节点的时候调用；
    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {
        super.endElement(uri, localName, qName);
        if ("app".equals(localName)) {
            Log.d("ContentHandler","id is " + id.toString().trim());
            Log.d("ContentHandler","name is " + name.toString().trim());
            Log.d("ContentHandler","version is " + version.toString().trim());
            //最后要将StringBuilder清空掉
            id.setLength(0);
            name.setLength(0);
            version.setLength(0);
        }
    }
    
    // endDocument()方法会在完成整个XML解析的时候调用。
    @Override
    public void endDocument() throws SAXException {
        super.endDocument();
    }
}
```

可以看到，我们首先给id、name和version节点分别定义了一个StringBuilder对象，并在`startDocument()`方法里对它们进行了初始化。

每当开始解析某个节点的时候，`startElement()`方法就会得到调用，其中localName参数记录着当前节点的名字，这里我们把它记录下来。

接着在解析节点中具体内容的时候就会调用`characters()`方法，我们会根据当前的节点名进行判断，将解析出的内容添加到哪一个StringBuilder对象中。

最后在`endElement()`方法中进行判断，如果app节点已经解析完成，就打印出id、name和version的内容。

需要注意的是，目前id、name和version中都可能是包括回车或换行符的，因此在打印之前我们还需要调用一下`trim()`方法，并且打印完成后还要将StringBuilder的内容清空掉，不然的话会影响下一次内容的读取。

接下来，修改MainActivity中的代码，如下所示：

```java
package com.example.networktest;
...
public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    TextView responseText;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button sendRequest = (Button) findViewById(R.id.send_request);
        responseText = (TextView) findViewById(R.id.response_text);
        sendRequest.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        if (view.getId() == R.id.send_request) {
            //sendRequestWithHttpURLConnection();
            sendRequestWithOkHttp();
        }
    }

    private void sendRequestWithOkHttp() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    OkHttpClient client = new OkHttpClient();
                    Request request = new Request.Builder()
                            //指定访问的服务器地址是本机电脑
                            // 模拟器默认把127.0.0.1和localhost当做本身了，在模拟器上可以用10.0.2.2代替127.0.0.1和localhost
                            .url("http://10.0.2.2:8099/get_data.xml")
                            .build();
                    Response response = client.newCall(request).execute();
                    String responseData = response.body().string();
                    //showResponse(responseData);
                    //parseXMLWithPull(responseData);
                    parseXMLWithSAX(responseData);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    private void parseXMLWithSAX(String xmlData) {
        try {
            SAXParserFactory factory = SAXParserFactory.newInstance();
            XMLReader xmlReader = factory.newSAXParser().getXMLReader();
            ContentHandler handler = new ContentHandler();
            //将ContentHandler的实例设置到XMLReader中
            xmlReader.setContentHandler(handler);
            //开始执行解析
            xmlReader.parse(new InputSource(new StringReader(xmlData)));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

	...
    private void showResponse(final String response) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                //在这里进行Ui操作，将结果显示到界面
                responseText.setText(response);
            }
        });
    }
}
```

在得到了服务器返回的数据后，我们这次去调用`parseXMLWithSAX()`方法来解析XML数据。`parseXMLWithSAX()`方法中先是创建了一个SAXParserFactory的对象，然后再获取到XMLReader对象，接着将我们编写的ContentHandler的实例设置到XMLReader中，最后调用`parse()`方法开始执行解析就好了。

除了Pull解析和SAX解析之外，其实还有一种DOM解析方式也算挺常用的，这里就不展开讲述了，感兴趣的话可以自己去查阅相关资料来进行学习。

## 解析JSON格式数据

接下来我们学习一下如何解析JSON格式的数据。比起XML, JSON的主要优势在于它的**体积更小**，在网络上传输的时候可以**更省流量**。但缺点在于，它的语义性较差，看起来不如XML直观。

在开始之前，还需要在`C:\ApacheServer\htdocs`目录中新建一个get_data.json的文件，然后编辑这个文件，并加入如下JSON格式的内容：

```json
[{"id":"5","version":"5.5","name":"Clash of Clans"},
 {"id":"6","version":"7.0","name":"Boom Beach"},
 {"id":"7","version":"3.5","name":"Clash Royale"}]
```

这时在浏览器中访问`http://127.0.0.1/get_data.json`这个网址，就应该会出现我们上面新建文件中的内容。

### 使用JSONObject

解析JSON数据也有很多种方法，可以使用官方提供的JSONObject，也可以使用谷歌的开源库GSON。另外，一些第三方的开源库如Jackson、FastJSON等也非常不错。本节中我们来学习一下前两种解析方式的用法。

修改MainActivity中的代码，如下所示：

```java
package com.example.networktest;
...
public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    TextView responseText;
    ...
    private void sendRequestWithOkHttp() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    OkHttpClient client = new OkHttpClient();
                    Request request = new Request.Builder()
                            .url("http://192.168.43.146/get_data.json")
                            .build();
                    Response response = client.newCall(request).execute();
                    String responseData = response.body().string();
                    //showResponse(responseData);
                    //parseXMLWithPull(responseData);
                    //parseXMLWithSAX(responseData);
                    parseJSONWithJSONObject(responseData);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    private void parseJSONWithJSONObject(String jsonData) {
        try {
            JSONArray jsonArray = new JSONArray(jsonData);
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                String id = jsonObject.getString("id");
                String name = jsonObject.getString("name");
                String version = jsonObject.getString("version");
                Log.d("MainActivity","id is " + id);
                Log.d("MainActivity","name is " + name);
                Log.d("MainActivity","version is " + version);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    ...
}
```

首先注意这里HTTP请求的地址是`http://192.168.43.146/get_data.json`，因为我是使用真机调试的。书中使用的是`http://10.0.2.2/get_data.json`，10.0.2.2对于模拟器来说就是电脑本机的IP地址。如果你是使用真机调试的，需要打开cmd，输入ipconfig命令查看本机的ip地址；如果你是用模拟器的，HTTP请求的地址就是10.0.2.2。10.0.2.2对于模拟器来说就是电脑本机的IP地址。

然后在得到服务器返回的数据后调用`parseJSONWithJSONObject()`方法来解析数据。由于我们在服务器定义的是一个JSON数组，因此这里首先是将服务器返回的数据传入到了一个JSONArray对象中。然后循环遍历这个JSONArray，从中取出的每一个元素都是一个JSONObject对象，每个JSONObject又会包含id、name和version这些数据。

### 使用GSON

如果你认为使用JSONObject来解析JSON数据已经非常简单了，那谷歌提供的GSON开源库可以让解析JSON数据的工作简单到让你不敢想象的地步。不过GSON并没有被添加到Android官方的API中，因此如果想要使用这个功能的话，就必须要在项目中添加GSON库的依赖。编辑`app/build.gradle`文件，在dependencies闭包中添加如下内容：

```
dependencies {
  implementation 'com.google.code.gson:gson:2.9.0'
}
```

GSON库的神奇在于它可以将一段JSON格式的字符串自动映射成一个对象，从而不需要我们再手动去编写代码进行解析了。比如说一段JSON格式的数据如下所示：

```
{"name":"Tom","age":20}
```

那我们就可以定义一个Person类，并加入name和age这两个字段，然后只需简单地调用如下代码就可以将JSON数据自动解析成一个Person对象了：

```java
Gson gson = new Gson();
Person person = gson.fromJson(jsonData,Person.class);
```

如果需要解析的是一段JSON数组会稍微麻烦一点，我们需要借助TypeToken将期望解析成的数据类型传入到`fromJson()`方法中，如下所示：

```java
List<Person> appList = gson.fromJson(gsonData,new TypeToken<List<Person>>(){}.getType());
```

接下来我们继续通过项目代码来学习使用一下GSON

首先新增一个App类，并加入id、name和version这3个字段，如下所示：

```java
package com.example.networktest;

public class App {
    private String id;
    private String name;
    private String version;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
```

然后修改MainActivity中的代码，如下所示：

```java
package com.example.networktest;
...
public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    TextView responseText;
    ...
    private void sendRequestWithOkHttp() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    OkHttpClient client = new OkHttpClient();
                    Request request = new Request.Builder()
                            //指定访问的服务器地址是本机电脑
                            // 模拟器默认把127.0.0.1和localhost当做本身了，在模拟器上可以用10.0.2.2代替127.0.0.1和localhost,这里为了方便，我就不展示我的url了。
                            .url("http://10.0.2.2:8099/get_data.json")
                            .build();
                    Response response = client.newCall(request).execute();
                    String responseData = response.body().string();
                    //showResponse(responseData);
                    //parseXMLWithPull(responseData);
                    //parseXMLWithSAX(responseData);
                    //parseJSONWithJSONObject(responseData);
                    parseJSONWithGSON(responseData);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    private void parseJSONWithGSON(String gsonData) {
        Gson gson = new Gson();
        List<App> appList = gson.fromJson(gsonData,new TypeToken<List<App>>(){}.getType());
        for (App app : appList) {
            Log.d("MainActivity","id is " + app.getId());
            Log.d("MainActivity","name is " + app.getName());
            Log.d("MainActivity","version is " + app.getVersion());
        }
    }
    ...
}
```

## 网络编程的最佳实践

也许你还没有发现，之前我们的写法其实是很有问题的。因为一个应用程序很可能会在许多地方都使用到网络功能，而发送HTTP请求的代码基本都是相同的，如果我们每次都去编写一遍发送HTTP请求的代码，这显然是非常差劲的做法。

通常情况下我们应该将这些通用的网络操作提取到一个公共的类里，并提供一个静态方法，当想要发起网络请求的时候，只需简单地调用一下这个方法即可。比如使用如下的写法：

```java
public class HttpUtil {
    public static String sendHttpRequest(String address) {
        HttpURLConnection connection = null;
        try {
            URL url = new URL(address);
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(8000);
            connection.setReadTimeout(8000);
            connection.setDoInput(true);
            connection.setDoOutput(true);
            InputStream inputStream = connection.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            return response.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }
}

```

以后每当需要发起一条HTTP请求的时候就可以这样写：

```java
String address = "http://www.baidu.com"
String response = HttpUtil.sendHttpRequest(address);
```

在获取到服务器响应的数据后，我们就可以对它进行解析和处理了。但是需要注意，网络请求通常都是属于耗时操作，而`sendHttpRequest()`方法的内部并没有开启线程，这样就有可能导致在调用`sendHttpRequest()`方法的时候使得主线程被阻塞住。

那么在`sendHttpRequest()`方法内部开启一个线程不就解决这个问题了吗？其实没有你想象中的那么容易，因为如果我们在`sendHttpRequest()`方法中开启了一个线程来发起HTTP请求，那么服务器响应的数据是无法进行返回的，所有的耗时逻辑都是在子线程里进行的，`sendHttpRequest()`方法会在服务器还没来得及响应的时候就执行结束了，当然也就无法返回响应的数据了。

遇到这种情况我们需要使用Java的回调机制，下面就让我们来学习一下**回调机制**是如何使用的。首先需要定义一个接口，比如将它命名成HttpCallbackListener，代码如下所示：

```
package com.example.networktest;

public interface HttpCallbackListener {
    void onFinish(String response);
    void onError(Exception e);
}
```

可以看到，我们在接口中定义了两个方法，`onFinish()`方法表示当服务器成功响应我们请求的时候调用，`onError()`表示当进行网络操作出现错误的时候调用。这两个方法都带有参数，`onFinish()`方法中的参数代表着服务器返回的数据，而`onError()`方法中的参数记录着错误的详细信息。接着修改HttpUtil中的代码，如下所示：

```java
public class HttpUtil {
    public static void sendHttpRequest(final String address,final HttpCallbackListener listener) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                HttpURLConnection connection = null;
                try {
                    URL url = new URL(address);
                    connection = (HttpURLConnection) url.openConnection();
                    connection.setRequestMethod("GET");
                    connection.setConnectTimeout(8000);
                    connection.setReadTimeout(8000);
                    connection.setDoInput(true);
                    connection.setDoOutput(true);
                    InputStream inputStream = connection.getInputStream();
                    BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
                    StringBuilder response = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        response.append(line);
                    }
                    if (listener != null) {
                        // 回调onFinish()方法
                        listener.onFinish(response.toString());
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    // 回调onError()方法
                    listener.onError(e);
                } finally {
                    if (connection != null) {
                        connection.disconnect();
                    }
                }
            }
        }).start();
    }
}
```

首先给`sendHttpRequest()`方法添加了一个HttpCallbackListener参数，并在方法的内部开启了一个子线程，然后在子线程里去执行具体的网络操作。

注意，子线程中是无法通过return语句来返回数据的，因此这里我们将服务器响应的数据传入了HttpCallbackListener的`onFinish()`方法中，如果出现了异常就将异常原因传入到`onError()`方法中。

现在`sendHttpRequest()`方法接收两个参数了，因此我们在调用它的时候还需要将HttpCallbackListener的实例传入，如下所示：

```java
HttpUtil.sendHttpRequest(address,new HttpCallbackListener(){
    @Override
    public void onFinish(String response) {
        //在这里根据返回内容执行具体的逻辑
    }
    @Override
    public void onError(Exception e) {
        //在这里对异常情况进行处理
    }
});
```

这样的话，当服务器成功响应的时候，我们就可以在`onFinish()`方法里对响应数据进行处理了。类似地，如果出现了异常，就可以在`onError()`方法里对异常情况进行处理。

如此一来，我们就巧妙地利用回调机制将响应数据成功返回给调用方了。不过你会发现，上述使用HttpURLConnection的写法总体来说还是比较复杂的.

接下来我们试一下使用OkHttp的方法，这种方法更为简单。在HttpUtil中加入一个`sendOkHttpRequest()`方法，如下所示：

```java
public class HttpUtil {
    ...
    public static void sendOkHttpRequest(String address,okhttp3.Callback callback) {
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(address)
                .build();
        client.newCall(request).enqueue(callback);
    }
}
```

可以看到，`sendOkHttpRequest()`方法中有一个`okhttp3.Callback`参数，这个是OkHttp库中自带的一个回调接口，类似于我们刚才自己编写的HttpCallbackListener。

然后在`client.newCall()`之后没有像之前那样一直调用`execute()`方法，而是调用了一个**`enqueue()`**方法，并把okhttp3.Callback参数传入。OkHttp在`enqueue()`方法的内部已经帮我们开好子线程了，然后会在子线程中去执行HTTP请求，并将最终的请求结果回调到okhttp3.Callback当中。那么我们在调用`sendOkHttpRequest()`方法的时候就可以这样写：

```java
HttpUtil.sendOkHttpRequest("http://www.baidu.com",new okhttp3.Callback(){
    @Override
    public void onResponse(Call call,Response response) throws IOException {
        //得到服务器返回的具体内容
        String responseData = response.body().string();
    }
    @Override
    public void onFailure(Call call,IOException e) {
        //在这里对异常情况进行处理
    }
});
```

可以看出，OkHttp的接口设计得确实非常人性化，它将一些常用的功能进行了很好的封装，使得我们只需编写少量的代码就能完成较为复杂的网络操作。当然这并不是OkHttp的全部，后面我们还会继续学习它的其他相关知识。

另外需要注意的是，不管是使用HttpURLConnection还是OkHttp，最终的回调接口都还是在子线程中运行的，因此我们不可以在这里执行任何的UI操作，除非借助runOnUiThread()方法来进行线程转换。
