# 第02章 探究活动

### 2.1活动是什么

活动是一种可以包含用户界面的组件，主要用于和用户进行交互。一个一个用程序里面可以包含零个或多个活动。

### 2.2活动的基本用法

#### 手动创建活动

在app/src/main/java/com.example.activitytest目录下创建一个叫FirstActivity文件，并不要勾选Generate Layout File 和Launcher Activity。

在app/src/main/res目录下创建一个文件夹叫layout，然后对着layout目录右键->New->Layout resource file ,弹出一个新建布局资源文件的窗口，我们对这个布局文件命名为first_layout,根元素默认选择为LinearLayout。

接下来我们修改这个布局文件，添加一个按钮

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
	
    <!--添加一个按钮-->
    <!--@+id/id_name在xml中定义一个id
         layout_width="match_parent"指定当前元素的宽度，match_parent表示和当前父元素一样宽
         layout_height="wrap_content"表示当前元素的高度只要能刚好包含里面的内容即可
         -->
    <Button
        android:id="@+id/button_1"
        android:text="Button1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

</LinearLayout>

```

接下来我们要在活动中加载这个布局。

重新回到FirstActivity，在onCreate()方法中加入如下代码：

```java
package com.example.activitytest;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;

public class FirstActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
         //加载布局
        setContentView(R.layout.first_layout);
    }
}
```

由于所有的活动都要在AndroidManifest.xml文件中注册,所以我们打开app/src/main/AndroidManifest.xml文件。

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.activitytest" >
    <!--由于上面的package所以下面注册的时候只需要利用(.类名)格式，
        活动的注册需要在application里面，通过activity标签来注册   -->
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.ActivityTest" >
        <!--android:name 表示需要注册的活动名字-->
        <!--android:label 表示活动中标题栏的内容-->
        <activity
            android:name=".FirstActivity"
            android:label="This is FirstActivity"
            android:exported="true">
            <!--  配置项目的开始页面 -->
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>

```

总结一下创建活动的流程：

1、先在layout中创建一个布局

2、在java文件中加载布局

3、在AndroidManifest.xml注册活动

#### 在活动中使用Toast

Toast是Android系统中提供的一种非常好的提醒方式，在程序中可以使用它将一些短小的信息通知给用户，这些信息会在一段时间后自动消失，并且不会占用任何屏幕空间。



首先我们需要定义一个弹出Toast的触发点，这里我们就让点击button_1的时候他弹出一个Toast。在onCreate()方法中添加如下代码：

```java
package com.example.activitytest;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class FirstActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //添加布局
        setContentView(R.layout.first_layout);
        //加载按钮
        /*
        * 在活动中，可以通过findVewyById()方法获取到在布局文件中定义的元素，这里传入的是R.id.button_1来得到按钮实例
        *   这个值是在first_layout.xml中通过android:id属性指定的，返回一个view对象，所以要强转成Button对象
        *
        * 调用setOnClickListener()方法为按钮注册一个监听器，点击按钮时就会执行监听器中的onClick()方法
        *   弹出Toast的功能就需要在onClick()方法中编写
        *
        * Toast用法，通过静态方法makeTest()创建出一个Toast对象然后调用show()方法将Toast显示出来
        *   makeTest()方法的三个参数：context直接传入(类名.this)，
        *   第二个参数：Toast显示的文本内容
        *   第三个参数：Toast显示的时长可以选择Toast.LENGTH_SHORT或者Toast.LENGTH_LONG
        */
        Button button1=(Button) findViewById(R.id.button_1);
        button1.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                Toast.makeText(FirstActivity.this,"You clicked Button1",Toast.LENGTH_SHORT).show();
            }
        });
    }
}
```

#### 在活动中使用Menu

1、在res目录下新建一个menu文件夹

2、然后在menu目录下再创建一个main菜单文件(menu——new——Menu resource file)

3、在main.xml添加如下代码

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--item标签是用来创建具体的某个菜单项，然后
    通过android:id给这个菜单项指定唯一的标识符
    通过android:title给这个菜单项指定一个名称
-->
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/add_item"
        android:title="Add"/>
    <item
        android:id="@+id/remove_item"
        android:title="Remove"/>
</menu>
```

4、回到FirstActivity中，重写onCreateOptionsMenu()创建显示的菜单，快捷键ctrl+o,mac系统control+o

```java
//例子是在：FirstActivity.java中类FirstActivity类下(onCreate()方法外面)编写
/*
    * 通过getMenuInflater()方法能够得到MenuInflater对象，再调用它的inflate()方法就可以为当前活动创建菜单了
    * inflate()方法接受两个参数，第一个参数用于指定我们通过哪一个资源文件来创建菜单，这里传入R.menu.main
    * 第二个参数用于指定我们菜单项将添加到哪一个menu中，这里直接使用onCreateOptionsMenu(Menu menu)方法传入menu
    * 然后给这个方法返回true,表示允许创建的菜单显示出来
    *
    * */
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main,menu);
        return true;
    }
```

为了让菜单真正可用，我们还要再定义菜单响应事件。在FirstActivity中重写onOptionItemSelected()方法：

```java
@Override
public boolean onCreateOptionsMenu(Menu menu) {
    getMenuInflater().inflate(R.menu.main,menu);
    return true;
}
/*
    * 通过item.getItemId()获取点击项的id
    * 利用switch来分别响应不同的点击事件
    * */
@Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()){
            case R.id.add_item:
                Toast.makeText(this,"You clicked Add", Toast.LENGTH_SHORT).show();
                break;
            case R.id.remove_item:
                Toast.makeText(this,"You clicked Remove", Toast.LENGTH_SHORT).show();
                break;
            default:
        }
        return true;
    }
```

#### 销毁一个活动

如果不想利用本身手机自带的back按键退出程序的话可以使用按钮结束程序

```java
//只需修改按钮的监听时间中调用finish()方法就可以当成一个退出按钮
button1.setOnClickListener(new View.OnClickListener(){
    @Override
    public void onClick(View v){
    	finish();
    }
});
```

### 2.3使用Intent在活动中穿梭

创建第二个活动。右击com.example.activitytest包——New——Activity——Empty Activity，将其命名为SecondActivity，并勾选Generate Layout File，给布局文件起名为second_layout,但不要勾选Launcher Activity。

编辑second_layout.xml代码替换如下代码：

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
android:orientation="vertical"
android:layout_width="match_parent"
android:layout_height="match_parent">
    
    <Button
        android:id="@+id/button_2"
        android:text="Button2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />
</LinearLayout>
```

**Intent**是Android程序中各组件之间进行交互的一种重要方式，不仅可以指明当前组件想要执行的动作，还可以在不同组件之间传递数据。Intent一般可被用于启动活动，启动服务以及发送广播等场景。

**Intent**大致可以分为两种：**显式Intent和隐式Intent**

#### 显式Intent

修改FirstActivity.java代码,启动SecondActivity活动

```java
//因为Aandroid Studio会自动帮我们注册，所以就不需要注册了
/*
显式Intent:
Intent有多个构造函数的重载，其中一个是Intent(Context packageContext,Class<?>cls)。这个构造函数接收两个参数，第一个参数Context要求提供一个启动活动的上下文，第二个参数Class则是指定想要启动的目标活动，通过这个构造函数就可以构建出Intent的“意图”，Activity类中提供了一个startActivity()方法，这个方法是专门用于启动活动的，它接收一个Intent参数，将构建好的Intent传入startActivity()方法就可以启动目标活动了。
*/

//这里的FirstActivity.this作为上下文，传入SecondActivity.class作为目标活动，即在FirstActivity的基础
//上打开SecondActivity这个活动
Button button1=(Button)findViewById(R.id.button_1);
        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(FirstActivity.this,SecondActivity.class);
                startActivity(intent);
            }
});
```

#### 隐式Intent

打开AndroidManifest.xml添加如下代码

```xml
<!--
隐式Intent:
它并不明确指出我们要启动哪一个活动，而是指定了一系列更为抽象的action和category等信息，然后交由系统去分析Intent,并帮我们找出合适的活动去启动，通过在<activity>标签下配置<intent-filter>的内容，可以指定当前活动能够响应的action和category
<action>标签中指明了当前活动可以响应com.example.activitytest.ACTION_START这个action，而<category>标签则包含了一些附加信息，更精确地指明了当前的活动能够响应的Intent中还可能带有category，只有<action>和<category>内容同时匹配上Intent中指定的action和category时，这个活动才能响应该Intent.
-->
<activity
            android:name=".SecondActivity"
            android:label="第二个界面"
            android:exported="false">
            <intent-filter>
                <action android:name="com.example.activitytest.ACTION_START"/>
                <category android:name="android.intent.category.DEFAULT"/>
            </intent-filter>
</activity>

```

修改FirstActivity中按钮中的点击事件

```java
button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent("com.example.activitytest.ACTION_START");
                startActivity(intent);
            }
});
```

每个Intent中只能有一个action，但是可以指定多个category

```xml
<activity
            android:name=".SecondActivity"
            android:label="第二个界面"
            android:exported="false">
            <intent-filter>
                <action android:name="com.example.activitytest.ACTION_START"/>
                <category android:name="android.intent.category.DEFAULT"/>
                <category android:name="com.example.activitytest.MY_CATEGORY"/>
            </intent-filter>
</activity>
```

调用Intent中的addCategory()方法添加一个category

```java
button1.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        Intent intent=new Intent("com.example.activitytest.ACTION_START");
        intent.addCategory("com.example.activitytest.MY_CATEGORY");
        startActivity(intent);
    }
});
```

#### 更多隐式Intent的用法

使用隐式调用不仅可以启动自己程序内的活动，还可以启动其他程序的活动，使得Android多个应用程序之间的功能共享成为了可能

```java
//只需修改java代码：例子调用FirstActivity中按钮的点击事件，调用系统浏览器打开网页
Button button1=(Button)findViewById(R.id.button_1);
        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                /*
                * Intent的action是Intent.ACTION_VIEW是安卓内置的动作
                * 然后通过Uri.parse()方法将一个地址字符串解析成一个uri对象，
                * 再调用setData()方法将这个uri对象传递进去
                * */
                Intent intent=new Intent(Intent.ACTION_VIEW);
                intent.setData(Uri.parse("http://www.baidu.com"));
                startActivity(intent);
            }
});
```

也可以在xml文件中配置将一个界面转换为浏览器
AndroidManifest.xml中，但是一个应用程序中只能有一个action，所以这个action不能和secondActivity的action同时存在。所以我们要新建一个ThirdActivity（勾选Generate Layout File）

```xml
<activity
      android:name=".ThirdActivity"
      android:exported="false" >
      <intent-filter>
           <action android:name="android.intent.action.VIEW"/>
           <category android:name="android.intent.category.DEFAULT"/>
           <data android:scheme="http"/>
      </intent-filter>
</activity>
```

#### 向下一个活动传递信息

Intent中提供了一系列putExtra()方法的重载，可以把我们想要传递的数据暂时存在Intent中,启动了另一个活动后，只需要把这些数据再从Intent中取出来就可以了

```java
//例子：将FirstActivity活动中的一个字符串传递到SecondActivity活动中，
//FirstActivity.java代码（在onCeate()方法中添加以下代码）
Button button1=(Button) findViewById(R.id.button_1);
button1.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
         String data="Hello SecondActivity";
         Intent intent=new Intent(FirstActivity.this,SecondActivity.class);
        /*
        * putExtra()方法传递一个字符串，接受两个参数
        * 第一个参数是键：用于后面从Intent中取值
        * 第二个参数是要传递过去的数据
        * */
         intent.putExtra("extra_data",data);
              startActivity(intent);
        }
});

//SecondActivity.java代码显示文字（在onCeate()方法中添加以下代码），在日志中打印文字
Intent intent=getIntent();
//如果是布尔值则使用getBooleanExtra()
String data=intent.getStringExtra("extra_data");
Log.d("SecondActivity",data);

```

#### 返回数据给上一个活动

利用startActivityForResult()方法在活动销毁的时候返回一个信息。

startActivityForResult()接收两个参数：第一个参数还是Intent，第二个参数是请求码，用于在之后的回调中判断数据的来源

```java
//例子：FirstActivity.java代码（在onCeate()方法中添加以下代码）
Button button3=(Button) findViewById(R.id.button_3);
        button3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(FirstActivity.this,SecondActivity.class);
                startActivityForResult(intent,1);
            }
});

    /*
     * 由于是使用startActivityForResult()方法来启动ScecondActivity的，在SecondActivity被销毁之后回调上一个活动的onActivityResult()方法
     * 第一个参数：requestCode即我们在启动活动时传入的请求码。
     * 第二个参数：resultCode即我们在返回数据时传入的处理结果
     * 第三个参数：data即携带着返回数据的Intent
     * 由于在一个活动中有可能调用startActivityForResult()方法去启动很多不同的活动，每一个活动返回的数据都会回调到
     * onActivityResult()方法这个方法中，因此我们首先要做的就是通过检查requestCode的值来判断数据的来源。确定数据是从SecondActivity返回的之后，
     * 我们再通过resultCode的值来判断处理结果是否成功。最后从data中取值并打印出来
     * */
    @Override
    protected  void onActivityResult(int requestCode,int resultCode,Intent data){
        super.onActivityResult(requestCode,resultCode,data);
        switch (requestCode){
            case 1:
                if (resultCode == RESULT_OK) {
                    String returnedData=data.getStringExtra("data_return");
                    Log.d("FirstActivity",returnedData );
                }
                break;
            default:
        }
    }

//SecondActivity.java代码显示文字（在onCeate()方法中添加以下代码），返回数据给FirstActivity.java
Button button2= findViewById(R.id.button_2);
        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent= new Intent();
                intent.putExtra("data_return","这是返回的数据");
              // 一般只使用RESULT_OK或RESULT_CANCELE这两个值，第二个参数则把带有数据的Intent传递回去，然后调用了finish()方法来销毁当前活动
                setResult(RESULT_OK,intent);
                finish();
            }
});

//添加在onCreate()方法外面的
/*
    * 如果SecondActivity中并没有通过按下按钮，而是通过back键回到FirstActivity，这样的数据就没有办法返回
    * 可以通过在SecondActivity中重写onBackPressed()方法来解决这个问题
    * */
    @Override
    public void onBackPressed(){
        Intent intent=new Intent();
        intent.putExtra("data_return","这是返回的数据");
        setResult(RESULT_OK,intent);
        finish();
}
```

### 2.4活动的生命周期

#### 返回栈

Android是使用任务(Task)来管理活动的，一个任务就是一组存放在栈里的活动的集合，这个栈也被称作返回栈。栈是一种后进先出的数据结构，在默认情况下，每当我们启动了一个新的活动，它就会在返回栈中入栈，并处于栈顶的位置。每当我们按下Back键或调用finish()方法去销毁一个活动时，处于栈顶的活动就会出栈，这时前一个入栈的活动就会重新处于栈顶的位置，系统总是会显示处于栈顶的活动给用户。

#### 活动状态

每个活动在其生命周期中最多可能有4种状态

1、运行状态
当一个活动位于返回栈的栈顶时，这时活动就处于运行状态。系统最不愿意回收的就是处于运行状态的活动，因为这会带来非常差的用户体验。

2、暂停状态
当一个活动不在处于栈顶的位置，但仍然可见时，这时活动就进入了暂停状态，处于暂停状态的活动仍然是完全存活着的，系统也不愿意去回收这种活动(因为它还是可见的，回收可见的东西都会在用户体验方面有不好的影响)，只有在内存极低的情况下，系统才会去考虑回收这种活动。

3、停止状态
当一个活动不再处于栈顶位置，并且完全不可见的时候，就进入了停止状态。系统仍然会为这种活动保存相应的状态和成员变量，但是这并不完全是可靠的，当其他地方需要内存时，处于停止状态的活动有可能被系统回收。

4、销毁状态
当一个活动从返回栈中移除后就变成了销毁状态。系统会最倾向于回收处于这种状态的活动，从而保证手机内存充足。



#### 活动的生存周期

Activity类中定义了7个回调方法，覆盖了活动生命周期的每一个环节

| onCreate()  | **每个活动中都重写这个方法，它会在活动第一次创建的时候调用，在这个方法中应该完成活动的初始化操作，比如加载布局、绑定事件等** |
| ----------- | ------------------------------------------------------------ |
| onStart()   | 这个方法在活动由不可见变为可见的时候调用                     |
| onResume()  | 这个方法在活动准备好和用户进行交互的时候调用。此时的活动一定位于返回栈的栈顶，并且处于运行状态。 |
| onPause()   | 这个方法在系统准备去启动或者恢复另一个活动的时候调用。通常会在这个方法中将一些消耗CPU的资源释放掉，以及保存一些关键数据，但这个方法的执行速度一定要快，不然会影响到新的栈顶活动的使用。 |
| onStop()    | 这个方法在活动完全不可见的时候调用。它和onPause()方法的主要区别在于，如果启动的新活动是一个对话框的活动，那么onPause()方法会得到执行，而onStop()方法并不会执行 |
| onDestroy() | 这个方法在活动被销毁之前调用，之后活动的状态变为销毁状态。   |
| onRestart() | 这个方法在活动由停止状态变为运行状态之前调用，也就是活动被重新启动了 |

![](./chapter2.assets/activity_lifecycle.png)

**完整生存期**	活动在onCreate()方法和onDestroy()方法之间所经历的，就是完整生存期，一般情况下，一个活动会在onCreate()方法中完成各种初始化操作，而在onDestroy()方法中完成释放内存的操作
**可见生存周期**	活动在onStart()方法和onStop()方法之间所经历的，就是可见生存周期。在可见生存周期内，活动对于用户总是可见的，即便有可能无法和用户进行交互。我们可以通过这两个方法，合理地管理那些对用户可见的资源。比如在onStart()方法中对资源进行加载，而在onStop()方法中对资源进行释放，从而保证处于停止状态的活动不会占用过多的内存。
**前台生存期**	活动在onResume()方法和onPause()方法之间所经历的就是前台生存期。在前台生存期内，活动总是处于运行状态的，此时的活动是可以和用户进行交互的，我们平时看到的和接触最多的也就是这个状态下的活动。

有时候我们会遇到活动被回收的情况：假如MainAactivity中有一个文本输入框，现在输入了一段文字，然后启动了下一个活动，这时候MainAactivity由于系统内存不足被回收掉，过了一会又重新点击back键回到MainAactivity，但是刚刚输入的文字同样被销毁掉了，MainAactivity重新被创建了。这种情况会严重影响用户体验。

Activity提供了一个onSaveIntanceState()回调方法，这个方法可以保证在活动被回收之前一定会被调用，因此可以通过这个方法来解决活动被回收时临时数据得不到保存的问题。代码如下

```java
/*MainActivity.java
    * onSaveInstanceState()方法会携带一个Bundle类型的参数
    * Bundle提供了一系列的方法用于保存数据，比如可以用putString()方法保存字符串
    * putInt()方法保存整型数据，传入两个参数，第一个是键，第二个是数据内容
    * 在onCreate()方法中也有一个Bundle类型的参数，这个参数在一般情况下是null,
    * 但是如果活动被系统回收之前有通过onSaveInstanceState()方法来保存数据的，
    * 这个参数就会带有之前所保存的全部数据，我们只需要再通过相应的取值的方法将数据取出即可
    * */
    @Override
    protected  void onSaveInstanceState(Bundle outState){
        super.onSaveInstanceState(outState);
        String tempData="something you just typed";
        outState.putString("data_key",tempData);
    }

//MainActivity.java 修改onCreate()方法
/*
onCreate()也有一个Bundle类型的参数。这个参数一般情况下都是null,但是如果在活动被系统回收之前有通过onSaveInstanceState()方法来保存数据的话，这个参数就会带有之前所保存的全部数据。
这里我们只是把取出的值简单地打印一下
*/

	public static final String TAG="MainActivity";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "onCreate");
        setContentView(R.layout.activity_main);
        if(savedInstanceState!=null){
            String tempData=savedInstanceState.getString("data_key");
            Log.d(TAG, tempData);
        }
    }
```

#### 小扩展

使用Intent和Bundle结合传递数据，代码如下

```java
//部分onCreate()方法中的代码
Button button1=(Button) findViewById(R.id.start_normal_activity);
        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(MainActivity.this,Normal_Activity.class);
                String data="这是结合运用传递的数据";
                Bundle bData=new Bundle();
                //将数据先保存在Bundle类型下
                bData.putString("data_key2",data);
                //数据传入intent
                intent.putExtra("extra_data",bData);
                startActivity(intent);
            }
        });

//Normal_Activity.java中onCreate()部分代码
public static final String TAG="Normal_Activity";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.normal_layout);
        Intent intent=getIntent();
        //从Intent中获取Bundle
        Bundle bData=intent.getBundleExtra("extra_data");
        //从Bundle中获取传递的数据
        String data=bData.getString("data_key2");
        Log.d(TAG, data);
    }
```

### 2.5活动的启动模式

在实际项目中我们应该根据特定的需要为每个活动制定恰当的启动模式。启动模式一共分为四种，分别为standard、singleTop、singleTask、singleInstance可以在AndroidManifest.xml中通过给\<activity\>标签指定android:launchMode属性来选择启动模式

**standard**
standard是活动启动的默认的启动模式，在不进行显式指定的情况下，所有的活动都会默认自动使用这种启动模式。每当启动一个新的活动，它就会在返回栈中入栈，并处于栈顶的位置，对于使用standard模式的活动，系统不会在乎这个活动是否已经在返回栈中存在，每次启动(点击按钮)都会创建该活动的一个新的实例，每一个新的实例都需要一个back键才能退出程序

**singleTop**	
当启动活动时发现活动是在返回栈的栈顶已经是该活动的时候，则认为可以直接使用它不需要在重新创建新的活动实例，代码：android:launchMode=“singleTop”，不管点击多少次按钮都仅使用一次back键就可以退出活动，如果该活动未处于栈顶的时候，点击按钮就会重新创建新的实例

**singleTask**	当活动的启动模式为singleTask时，每次启动该活动时系统首先会在返回栈中检查是否存在该活动的实例，如果发现已经存在则直接使用该实例，并把在这个活动之上的所有活动都出栈，如果发现没有则会创建一个新的活动实例

**singleInstance**	算是4种启动模式中最特殊和最复杂的一个，不同于以上三种模式singleInstance模式的活动会启用一个新的返回栈来管理这个活动(如果singleTask模式指定了不同的taskAffinity，也会启动一个新的返回栈)，如果想实现其他程序和我们程序可以共享这个活动实例，只有singleInstance模式可以解决这个问题，在这种模式下会有一个单独的返回栈来管理这个活动，不管是哪个应用程序来访问这个活动，都共用同一个返回栈，可以解决共享实例的问题（和其他不是这个模式的实例不属于同个返回栈）

### 2.6活动的最佳实践

#### 知晓当前是在哪一个应用

```java
/*
* 新建一个java的class(不需要创建布局文件)，然后添加如下代码
* 其他拥有布局的类都继承于这个类
* */
public class BaseActivity extends AppCompatActivity {
    public static final String TAG="BaseActivity";
    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        //getClass().getSimpleName()获取当前实例的类名
        Log.d(TAG, getClass().getSimpleName());
    }
}
```

#### 随时随地退出程序

```java
/*
* 创建一个专门的集合类对所有的活动进行管理就可以实现随时随地的退出程序
*在活动管理器中我们通过List来暂存活动，然后提供了一个addActivity()方法用于向List中添加一个活动
* 提供了一个removeActivity()方法用于List中移除活动，
* 最后提供了一个finishAll()方法用于List中存储的活动全部销毁掉
* */
public class ActivityCollector {
    public static List<Activity> activities=new ArrayList<>();
    public static void addActivity(Activity activity){
        activities.add(activity);
    }
    public static void removeActivity(Activity activity){
        activities.remove(activity);
    }
    public static void finishAll(){
        for(Activity activity:activities){
            if(!activity.isFinishing()){
                activity.finish();
            }
        }
        activities.clear();
    }

}

//修改活动的父类BaseActivity.java(见知晓当前活动的代码)
/*
* 调用ActivityCollector.addActivity()方法，表明将当前正在创建的活动添加到活动管理器中
* 然后重写onDestroy()，并调用ActivityCollector.removeActivity(),表明将一个马上要销毁的活动从活动器中移除
* 不管需要在什么地方退出程序，只需调用ActivityCollector.finnishAll()方法即可
* */
public class BaseActivity extends AppCompatActivity {
    public static final String TAG="BaseActivity";
    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        //getClass().getSimpleName()获取当前实例的类名
        Log.d(TAG, getClass().getSimpleName());

        ActivityCollector.addActivity(this);
    }
    @Override
    protected void onDestroy(){
        super.onDestroy();
        ActivityCollector.removeActivity(this);
    }
}

//例子部分代码
Button button1=(Button) findViewById(R.id.button_1);
button1.setOnClickListener(new View.OnClickListener() {
@Override
public void onClick(View view) {
       ActivityCollector.finishAll();
  }
});

/*
 * 可以在销毁所以活动的代码后面再加上杀掉当前进程的代码，以保证程序完全退出
 * 其中killProcess()方法用于杀掉一个进程，它接收一个进程id参数，
 * 可以通过myPid()方法来获取当前程序的进程id，只用于杀掉当前程序的进程，不能使用这个方法杀掉其他程序进程
 * */
android.os.Process.killProcess(android.os.Process.myPid());
```

#### 启动活动的最佳写法

```java
/*
* 将Intent中完成传输的数据都构建在actionStart()方法中，这样可以清晰的知道启动活动需要哪些数据
* 在onCreate()中调用actionStart()方法
* 类名.actionStart(类名.this,数据1，数据2....)
* */
    public static void actionStart(Context context,String data1,String data2){
        Intent intent=new Intent(context,FirstActivity.class);
        intent.putExtra("param1",data1);
        intent.putExtra("param2",data2);
        context.startActivity(intent);
    }
```

