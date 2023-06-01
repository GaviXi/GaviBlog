# 第06章  数据存储

## 6.1    持久化技术简介

保存在内存中的数据是瞬时状态的，保存在存储设备中的数据是处于持久状态的。Android系统主要提供了3种方式用于简单地实现数据持久化功能，包括文件存储、SharedPerferences存储和数据库存储三种方式。

## 6.2    文件存储

文件储存是原封不动地将数据进行储存，一般储存一些简单的**文本数据或者二进制数据**。

### 将数据存储到文件中

Context类中提供了一个`openFileOutput()`方法，可以用于将数据存储到指定的文件中。

两个参数

第一个参数是文件名，在文件创建的时候使用的就是这个名称，注意这里指定的文件名不可以包含路径，因为所有的文件都是默认存储到`/data/data/<packagename>/files/`目录下的。

第二个参数是文件的操作模式，主要有两种模式可选

- `MODE_PRIVATE`

  `MODE_PRIVATE`是**默认的操作模式**，表示当指定同样文件名的时候，所写入的内容将会覆盖原文件中的内容

- `MODE_APPEND`

  `MODE_APPEND`则表示如果该文件已存在，就往文件里面追加内容，不存在就创建新文件。

其实文件的操作模式本来还有另外两种：

`MODE_WORLD_READABLE`和`MODE_WORLD_WRITEABLE`，这两种模式表示允许其他的应用程序对我们程序中的文件进行读写操作，不过由于这两种模式过于危险，很容易引起应用的安全性漏洞，已在Android 4.2版本中被废弃。

文件存储是Android中最基本的一种数据存储方式，它不对存储的内容进行任何的格式化处理，所有数据都是原封不动地保存到文件当中的，因而它比较适合用于存储一些简单的**文本数据或二进制数据**。如果你想使用文件存储的方式来保存一些较为复杂的文本数据，就需要定义一套自己的格式规范，这样可以方便之后将数据从文件中重新解析出来。

`openFileOutput()`方法返回的是一个`FileOutputStream`对象，得到了这个对象之后就可以使用Java流的方式将数据写入到文件中了。以下是一段简单的代码示例，展示了如何将一段文本内容保存到文件中：

```java
public void save() {
    String data = "Data to save";
    FileOutputStream out = null;
    BufferedWriter writer = null;
    try {
        out = openFileOutput("data", Context.MODE_PRIVATE);
        writer = new BufferedWriter(new OutputStreamWriter(out));
        writer.write(data);
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            if (writer != null) {
                writer.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

这里通过`openFileOutput()`方法能够得到一个`FileOutputStream`对象，然后再借助它构建出一个`OutputStreamWriter`对象，接着再使用`OutputStreamWriter`构建出一个`BufferedWriter`对象，这样你就可以通过`BufferedWriter`来将文本内容写入到文件中了。

完整的例子：

新建一个项目，修改activity_main.xml中的代码，加入一个EditText用于输入文本内容

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent" >

    <EditText
        android:id="@+id/edit"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Type something here"
        />

</LinearLayout>
```

修改MainActivity中的代码，在输入的文本内容被回收之前，将它存储到文件当中

```java
private  EditText edit;

@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);
	edit = (EditText) findViewById(R.id.edit);
}

@Override
protected void onDestroy(){
	super.onDestroy();
	String inputText = edit.getText().toString();
	save(inputText);
}

public void save(String inputText){
	FileOutputStream out = null;
	BufferedWriter writer = null;
	try{
		out = openFileOutput("data", Context.MODE_PRIVATE);
		writer = new BufferedWriter(new OutputStreamWriter(out));
		writer.write(inputText);
		Log.e("MainActivity","hello");
	}
	catch(IOException e){
		e.printStackTrace();
	}
	finally{
		try{
			if(writer!=null){
				writer.close();
			}
		}catch(IOException e){
			e.printStackTrace();
		}
	}
}
```

关于String和StringBuffer以及StringBuilder的区别

> （1）如果要操作少量的数据用 String；
> （2）多线程操作字符串缓冲区下操作大量数据 StringBuffer；
> （3）单线程操作字符串缓冲区下操作大量数据 StringBuilder

### 从文件中读取数据

类似于将数据存储到文件中，Context类中还提供了一个`openFileInput()`方法，用于从文件中读取数据。这个方法要比`openFileOutput()`简单一些，它只接收一个参数，即要读取的文件名，然后系统会自动到`/data/data/<packagename>/files/`目录下去加载这个文件，并返回一个`FileInputStream`对象，得到了这个对象之后再通过Java流的方式就可以将数据读取出来了。

代码示例：

```java
public String load() {
    FileInputStream in = null;
    BufferedReader reader = null;
    StringBuilder content = new StringBuilder();
    try {
        in = openFileInput("data");
        reader = new BufferedReader(new InputStreamReader(in));
        String line = "";
        while ((line = reader.readLine()) != null) {
            content.append(line);
        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        if (reader != null) {
            try {
                reader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    return content.toString();
}
```

完善上一小节的例子，使得重新启动程序时EditText中能够保留我们上次输入的内容

修改MainActivity中的代码：

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);
	edit = (EditText) findViewById(R.id.edit);
	String inputText = load();
	if (!TextUtils.isEmpty(inputText)) {
		edit.setText(inputText);
		edit.setSelection(inputText.length());
		Toast.makeText(this, "Restoring succeeded", Toast.LENGTH_SHORT).show();
	}
}
//...
public String load() {
	FileInputStream in = null;
	BufferedReader reader = null;
	StringBuilder content = new StringBuilder();
	try {
		in = openFileInput("data");
		reader = new BufferedReader(new InputStreamReader(in));
		String line = "";
		while ((line = reader.readLine()) != null) {
			content.append(line);
		}
	} catch (IOException e) {
		e.printStackTrace();
	} finally {
		if (reader != null) {
			try {
				reader.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	return content.toString();
}
```

## 6.3    SharedPreferences储存

SharedPreferences是使用键值对的方式来存储数据的。也就是说，当保存一条数据的时候，需要给这条数据提供一个对应的键，这样在读取数据的时候就可以**通过这个键把相应的值**取出来。

### 将数据存储到SharedPreferences中

要想使用SharedPreferences来存储数据，首先需要获取到SharedPreferences对象。Android中主要提供了3种方法用于得到SharedPreferences对象。

- **Context类中的`getSharedPreferences()`方法**

  - 此方法接收两个参数，第一个参数用于指定SharedPreferences文件的名称，如果指定的文件不存在则会创建一个，SharedPreferences文件都是存放在/data/data//shared_prefs/目录下的。
  - 第二个参数用于指定操作模式，目前只有MODE_PRIVATE这一种模式可选，它是默认的操作模式，和直接传入0效果是相同的，表示只有**当前的应用程序**才可以对这个SharedPreferences文件进行读写。

- **Activity类中的`getPreferences()`方法**

  - 这个方法和Context中的`getSharedPreferences()`方法很相似，不过它只接收一个操作模式参数，因为使用这个方法时会**自动将当前活动的类名**作为SharedPreferences的文件名。

- **PreferenceManager类中的`getDefaultSharedPreferences()`方法**

  - 这是一个静态方法，它接收一个Context参数，并自动使用当前应用程序的**包名作为前缀来命名SharedPreferences文件**。

  - 得到了SharedPreferences对象之后，就可以开始向SharedPreferences文件中存储数据了

    (1) 调用SharedPreferences对象的`edit()`方法来获取一个SharedPreferences.Editor对象。

    (2) 向SharedPreferences.Editor对象中添加数据，比如添加一个布尔型数据就使用`putBoolean()`方法，添加一个字符串则使用`putString()`方法，以此类推。

    (3) 调用`apply()`方法将添加的数据提交，从而完成数据存储操作。

  ```java
  public class MainActivity extends AppCompatActivity {
   
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          Button saveData = (Button) findViewById(R.id.save_data);
          saveData.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  SharedPreferences.Editor editor = getSharedPreferences("data",
                      MODE_PRIVATE).edit();
                  editor.putString("name", "Tom");
                  editor.putInt("age", 28);
                  editor.putBoolean("married", false);
                  editor.apply();
              }
          });
      }
   
  }
  ```

  ### 从SharedPreferences中读取数据

  ​	SharedPreferences对象中提供了一系列的`get`方法，用于对存储的数据进行读取，每种`get`方法都对应了`SharedPreferences.Editor`中的一种`put`方法，比如读取一个布尔型数据就使用`getBoolean()`方法，读取一个字符串就使用`getString()`方法。这些`get`方法都接收两个参数，**第一个参数是键，传入存储数据时使用的键就可以得到相应的值了；第二个参数是默认值，即表示当传入的键找不到对应的值时会以什么样的默认值进行返回**。'

  ```java
  public class MainActivity extends AppCompatActivity {
   
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          //...
          Button restoreData = (Button) findViewById(R.id.restore_data);
          restoreData.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  SharedPreferences pref = getSharedPreferences("data", MODE_PRIVATE);
                  String name = pref.getString("name", "");
                  int age = pref.getInt("age", 0);
                  boolean married = pref.getBoolean("married", false);
                  Log.d("MainActivity", "name is " + name);
                  Log.d("MainActivity", "age is " + age);
                  Log.d("MainActivity", "married is " + married);
              }
          });
      }
   
  }
  ```


**实现记住密码功能**
复用BroadcastBestPractice项目代码。

修改activity_main.xml中的代码

```xml
<LinearLayout
	android:orientation="horizontal"
	android:layout_width="match_parent"
	android:layout_height="wrap_content">
	<CheckBox
		android:id="@+id/remember_pass"
		android:layout_width="wrap_content"
		android:layout_height="wrap_content"/>

	<TextView
		android:layout_width="wrap_content"
		android:layout_height="wrap_content"
		android:textSize="18sp"
		android:text="Remember password" />
</LinearLayout>
<Button
	android:id="@+id/login"
	android:layout_width="match_parent"
	android:layout_height="60dp"
	android:text="Login" />
```

这里我们使用到了CheckBox，这是一个复选框控件，我们使用这个控件来表示用户是否需要记住密码

修改LoginActivity中的代码

```java
public class LoginActivity extends BaseActivity {
    
    private SharedPreferences pref;  
    private SharedPreferences.Editor editor;
    private EditText accountEdit;
    private EditText passwordEdit;
    private Button login;
    private CheckBox rememberPass;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        //获取SharedPreferences对象
        pref = PreferenceManager.getDefaultSharedPreferences(this);
        accountEdit = (EditText) findViewById(R.id.account);
        passwordEdit = (EditText) findViewById(R.id.password);
        rememberPass = (CheckBox) findViewById(R.id.remember_pass);
        login = (Button) findViewById(R.id.login);
        //获取remember_password的值
        boolean isRemember = pref.getBoolean("remember_password",false);
        Log.e("isRemember",""+isRemember);
        if(isRemember){
            //从SharedPreferences文件中将保存的账号和密码都读取出来
            String account = pref.getString("account","");
            String password = pref.getString("password","");
            accountEdit.setText(account);
            passwordEdit.setText(password);
            rememberPass.setChecked(true);
        }
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String account = accountEdit.getText().toString();
                String password = passwordEdit.getText().toString();
                if(account.equals("admin") && password.equals("123456")){
                    editor = pref.edit();
                    Log.e("isRemember",""+rememberPass.isChecked());
                    //检查复选框是否被选中
                    if(rememberPass.isChecked()){
                        editor.putBoolean("remember_password",true);;
                        editor.putString("account",account);
                        editor.putString("password",password);
                    }else{
                        editor.clear();
                    }
                    editor.apply();
                    Intent intent = new Intent(LoginActivity.this,MainActivity.class);
                    startActivity(intent);
                    finish();
                }
                else{
                    Toast.makeText(LoginActivity.this,"account ot password is invalid",
                            Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
```

## 6.4    SQLite数据库存储

​	SQLite是一款轻量级的关系型数据库，它的运算速度非常快，占用资源很少，通常只需要几百KB的内存就足够了，因而特别适合在移动设备上使用。

### 创建数据库

Android为了让我们能够更加方便地管理数据库，提供了**SQliteOpenHelper** 帮助类，借助这个类我们就能非常简单地对数据库进行创建和升级。

SQliteOpenHelper是一个抽象类，其有两个抽象方法。分别是`onCreate`和`onUpgrade`,在这两个方法中去实现创建和升级数据库的逻辑。除此之外SQliteOpenHelper还有两个很重要的实例方法：`getReadableDatabase()`和`getWritableDatabase()`，这两个方法都可以创建或打开一个数据库，并返回一个可对数据库进行读写操作的对象。不同的是，当数据库不可写入的时候（如磁盘空间已满），`getReadableDatabase()`方法返回的对象将以只读的方式去打开数据库，而`getWritableDatabase()`方法则将出现异常。

SQliteOpenHelper的构造函数接受4个参数

- Conetext
- 数据库名
- 一般传入null
- 当前数据库的版本号

创建数据库示例：

新建DatabaseTest项目，新建MyDatabaseHelper类继承自SQLiteHelper

```java
public class MyDatabaseHelper extends SQLiteOpenHelper {
    //将建表语句定义成一个字符串常量
    public static final String CREATE_BOOK = "create table Book ("
            + "id integer primary key autoincrement, "
            + "author text, "
            + "price real, "
            + "pages integer, "
            + "name text)";

    private Context mContext;

    public MyDatabaseHelper(Context context, String name, SQLiteDatabase.CursorFactory factory,int verison){
        super(context,name,factory,verison);
        mContext = context;
    }

    @Override
    public void onCreate(SQLiteDatabase db){
        //调用SQLiteDatabase的execSQL方法去执行建表语句
        db.execSQL(CREATE_BOOK);
        Toast.makeText(mContext,"Create succeeded",Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion,int newVersion){
    }
}
```

修改activity_main.xml中的代码，加入一个按钮用于创建数据库

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    >

    <Button
        android:id="@+id/create_database"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Create database"
        />

</LinearLayout>
```

修改MainActivity中的代码

```java
public class MainActivity extends AppCompatActivity {
 
    private MyDatabaseHelper dbHelper;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //构建MyDatabaseHelper对象
        dbHelper = new MyDatabaseHelper(this, "BookStore.db", null, 1);
        Button createDatabase = (Button) findViewById(R.id.create_database);
        createDatabase.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //第一次点击会调用MyDatabaseHelper中的onCreate()方法
                dbHelper.getWritableDatabase();
            }
        });
    }
 
}
```

### 升级数据库

修改MyDatabaseHelper中的代码，添加Category表

```java
public class MyDatabaseHelper extends SQLiteOpenHelper {
    //将建表语句定义成一个字符串常量
    public static final String CREATE_BOOK = "create table Book ("
            + "id integer primary key autoincrement, "
            + "author text, "
            + "price real, "
            + "pages integer, "
            + "name text)";

    public static final String CREATE_CATEGORY = "create table Category ("
            + "id integer primary key autoincrement, "
            + "category_name text, "
            + "category__code integer)";

    private Context mContext;

    public MyDatabaseHelper(Context context, String name, SQLiteDatabase.CursorFactory factory,int verison){
        super(context,name,factory,verison);
        mContext = context;
    }

    @Override
    public void onCreate(SQLiteDatabase db){
        //调用SQLiteDatabase的execSQL方法去执行建表语句
        db.execSQL(CREATE_BOOK);
        db.execSQL(CREATE_CATEGORY);
        Toast.makeText(mContext,"Create succeeded",Toast.LENGTH_SHORT).show();
    }
	
    //在onUpgrade中增加两条Drop语句，若存在则删除该表，并转而执行onCreate方法
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion,int newVersion){
        db.execSQL("drop table if exists Book");
        db.execSQL("drop table if exists Category");
        onCreate(db);
    }
}
```

修改MainActivity中的代码，在MyDatabaseHelper的构造函数中传入一个比1更大的版本号

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);
	dbHelper = new MyDatabaseHelper(this, "BookStore.db", null, 2);
	Button createDatabase = (Button) findViewById(R.id.create_database);
	createDatabase.setOnClickListener(new View.OnClickListener() {
		@Override
		public void onClick(View v) {
			dbHelper.getWritableDatabase();
		}
	});
}
```

### 添加数据

数据操作无非就是4种。

- C（Create添加->insert）
- R（Retrieve查询->select）
- U（Update更新->update）
- D（Delete删除->delete）

调用SQLIteOpenHelper的getWritableDatabase可以用于创建和升级数据库，而且其会返回一个**SQLiteDatabase对象**供我们去进行GUID操作。示例如下：

**插入数据：**

在activity_main.xml中新增一个按钮

```xml
<Button
    android:id="@+id/add_data"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="Add data"
/>
```

修改MainActivity中的代码

```java
Button addData = (Button) findViewById(R.id.add_data);
addData.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        db.execSQL("insert into Book (name,author,pages,price) values(?,?,?,?)",
                new String[]{"The Da Vinvi Code", "Dan Brown","454","16.96"});
        db.execSQL("insert into Book (name,author,pages,price) values(?,?,?,?)",
                new String[]{"The Lost Symbol", "Dan Brown","510","19.95"});
    }
});
```

这里我使用的是SQL（原因是我对SQL比较熟哈哈），在这里你也可以使用SQLiteDatabase提供的insert方法，如下面的代码：

```java
    SQLiteDatabase db = dbHelper.getWritableDatabase();
    ContentValues values = new ContentValues();
    //1.开始组装并插入第一条数据；
    values.put("name","The Da Vinci Code");
    values.put("author","Dan Brown");
    values.put("pages",454);
    values.put("price",16.96);
	//第二个参数用于未指定添加数据的情况给某些可为空的列自动赋值NULL
    db.insert("Book",null,values);
    values.clear();
```

### 更新数据库

在activity_main.xml中新增一个按钮

```xml
<Button
    android:id="@+id/update_data"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="Update data"
/>
```

修改MainActivity中的代码

```java
Button updateData = (Button) findViewById(R.id.update_data);
    updateData.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View view) {
            SQLiteDatabase db = dbHelper.getWritableDatabase();
            db.execSQL("update Book set price = ? where name = ?",
                    new String[]{"10.99","The Da Vinvi Code"});
        }
});
```

同样，你也可以使用SQLiteDatabase提供的update方法

首先构建一个ContentValues对象，指定更改后的数据，调用SQLiteDatabase的update方法，第一个参数和`insert()`方法一样，也是表名，在这里指定去更新哪张表里的数据。第二个参数是`ContentValues`对象，要把更新数据在这里组装进去。第三、第四个参数用于约束更新某一行或某几行中的数据，不指定的话默认就是更新所有行。

```java
SQLiteDatabase db=dbHelper.getWritableDatabase();
ContentValues values = new ContentValues();
values.put("price",10.99);
db.update("Book",values,"name=?",new String[]{"The Da Vinci Code"});
```

这里在更新数据按钮的点击事件里面构建了一个`ContentValues`对象，并且只给它指定了一组数据，说明我们只是想把价格这一列的数据更新成10.99。然后调用了SQLiteDatabase的`update()`方法去执行具体的更新操作，这里使用了第三、第四个参数来指定具体更新哪几行。第三个参数对应的是SQL语句的`where`部分，表示更新所有`name`等于`?`的行，而`?`是一个占位符，可以通过第四个参数提供的一个字符串数组为第三个参数中的每个占位符指定相应的内容。因此上述代码想表达的意图是将名字是The Da Vinci Code的这本书的价格改成10.99。

### 删除数据库

在activity_main.xml中新增一个按钮

```xml
 <Button
    android:id="@+id/delete_data"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="Delete data"
/>
```

修改MainActivity中的代码

```java
Button deleteButton = (Button) findViewById(R.id.delete_data);
    deleteButton.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View view) {
            SQLiteDatabase db = dbHelper.getWritableDatabase();
            db.execSQL("delete from Book where pages > ?",new String[]{"500"});
        }
});
```

同样你也可以使用SQLiteDatabase提供的`delete()`方法

SQLiteDatabase中提供了一个`delete()`方法，专门用于删除数据，这个方法接收3个参数，第一个参数仍然是表名，第二、第三个参数又是用于约束删除某一行或某几行的数据，不指定的话默认就是删除所有行。

```java
SQLiteDatabase db = dbHelper.getWritableDatabase();
db.delete("Book","pages>?",new String[]{"500"});
//通过第2,3个参数来删除页数超过500的书。
```

### 查询数据

在activity_main.xml中新增一个按钮

```xml
<Button
    android:id="@+id/query_data"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="Query data"
/>
```

修改MainActivity中的代码

```java
Button queryButton = (Button) findViewById(R.id.query_data);
    queryButton.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View view) {
            SQLiteDatabase db = dbHelper.getWritableDatabase();
            Cursor cursor = db.rawQuery("select * from Book",null);
            if(cursor.moveToFirst()){
                do{
                    //遍历Cursor对象，取出数据并打印
                    String name = cursor.getString(cursor.getColumnIndex("name"));
                    String author = cursor.getString(cursor.getColumnIndex("author"));
                    int pages = cursor.getInt(cursor.getColumnIndex("pages"));
                    double price = cursor.getDouble(cursor.getColumnIndex("price"));
                    Log.d("MainActivity", "book name is " + name);
                    Log.d("MainActivity", "book author is " + author);
                    Log.d("MainActivity", "book pages is " + pages);
                    Log.d("MainActivity", "book price is " + price);
                }while (cursor.moveToNext());
            }
        }
});
```

同样你也可以使用SQLiteDatabase提供的`query()`方法（但是内容会比较多）

SQLiteDatabase中还提供了一个`query()`方法用于对数据进行查询。这个方法的参数非常复杂，最短的一个方法重载也需要传入7个参数。

| query()方法参数 | 对应SQL部分                 | 描述                            |
| :-------------- | :-------------------------- | :------------------------------ |
| `table`         | `from table_name`           | 指定查询的表名                  |
| `columns`       | `select column1, column2`   | 指定查询的列名                  |
| `selection`     | `where column = value`      | 指定`where`的约束条件           |
| `selectionArgs` | `-`                         | 为`where`中的占位符提供具体的值 |
| `groupBy`       | `group by column`           | 指定需要`group by`的列          |
| `having`        | `having column = value`     | 对`group by`后的结果进一步约束  |
| `orderBy`       | `order by column1, column2` | 指定查询结果的排序方式          |

```java
public class MainActivity extends AppCompatActivity {
 
    private MyDatabaseHelper dbHelper;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        dbHelper = new MyDatabaseHelper(this, "BookStore.db", null, 2);
        ...
        Button queryButton = (Button) findViewById(R.id.query_data);
        queryButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SQLiteDatabase db = dbHelper.getWritableDatabase();
                // 查询Book表中所有的数据
                Cursor cursor = db.query("Book", null, null, null, null, null, null);
                if (cursor.moveToFirst()) {
                    do {
                        // 遍历Cursor对象，取出数据并打印
                        String name = cursor.getString(cursor.getColumnIndex
                            ("name"));
                        String author = cursor.getString(cursor.getColumnIndex
                            ("author"));
                        int pages = cursor.getInt(cursor.getColumnIndex("pages"));
                        double price = cursor.getDouble(cursor.getColumnIndex
                            ("price"));
                        Log.d("MainActivity", "book name is " + name);
                        Log.d("MainActivity", "book author is " + author);
                        Log.d("MainActivity", "book pages is " + pages);
                        Log.d("MainActivity", "book price is " + price);
                    } while (cursor.moveToNext());
                }
                cursor.close();
            }
        });
    }
 
}
 
 
```

 这里的`query()`方法非常简单，只是使用了第一个参数指明去查询Book表，后面的参数全部为`null`。这就表示希望查询这张表中的所有数据，虽然这张表中目前只剩下一条数据了。查询完之后就得到了一个`Cursor`对象，接着我们调用它的`moveToFirst()`方法将数据的指针移动到第一行的位置，然后进入了一个循环当中，去遍历查询到的每一行数据。在这个循环中可以通过`Cursor`的`getColumnIndex()`方法获取到v ，然后将这个索引传入到相应的取值方法中，就可以得到从数据库中读取到的数据了。接着我们使用Log的方式将取出的数据打印出来，借此来检查一下读取工作有没有成功完成。最后别忘了调用`close()`方法来关闭`Cursor`。

### 使用SQL操作数据库

添加数据的方法如下：

```java
db.execSQL("insert into Book (name, author, pages, price) values(?, ?, ?, ?)",
            new String[] { "The Da Vinci Code", "Dan Brown", "454", "16.96" });
db.execSQL("insert into Book (name, author, pages, price) values(?, ?, ?, ?)",
            new String[] { "The Lost Symbol", "Dan Brown", "510", "19.95" });
```

更新数据的方法如下：

```java
db.execSQL("update Book set price = ? where name = ?", new String[] { "10.99", "The Da Vinci Code" });
```

删除数据的方法如下：

```java
db.execSQL("delete from Book where pages > ?", new String[] { "500" });
```

查询数据的方法如下：

```java
db.rawQuery("select * from Book", null);
```

## 6.5    使用LitePal操作数据库

LitePal是一款开源的Android数据库框架，采用**对象关系映射**（ORM）的模式，对我们常用的数据库功能进行了封装，使得不用编写一行SQL语句就可以完成各种建表和增删改查的操作。

### 配置LitePal

 （1）Build.gradle中的dependencies中添加implementation 'org.litepal.android:core:3.2.3'

```
dependencies {
 	...
    implementation 'org.litepal.android:core:3.2.3'
    ...
}
```

 （2）在main目录下建立assets目录，右击app/src/main目录→NEW→Folder→Assets Folder，在assets目录下新建litepal.xml，修改其内容，指定相应的数据库名、数据库版本名、以及list所指的所有映射模型。

```xml
<?xml version="1.0" encoding="utf-8"?>
<litepal>
    <dbname value="BookStore" ></dbname>
    <version value="1" ></version>
    <list>
    </list>
</litepal>
 
```

- `<dbname>`标签用于指定数据库名
- `<version>`标签用于指定数据库版本号，
- `<list>`标签用于指定所有的映射模型

（3）在AndroidManifest.xml中增加Appliacation配置

这里我们将项目的`application`配置为`org.litepal.LitePalApplication`，这样才能让LitePal的所有功能都可以正常工作。

```
android:name="org.litepal.LitePalApplication"
```

如果遇到配置LitePal时android:name="org.litepal.LitePalApplication"报红的问题，可以参考下面这篇博客

[(5条消息) Android studio项目中LitePal配置详细过程与使用_org.litepal.android_努力敲代码呀~的博客-CSDN博客](https://blog.csdn.net/Me_Rui/article/details/124315193?ops_request_misc=%7B%22request%5Fid%22%3A%22168320813316800225593277%22%2C%22scm%22%3A%2220140713.130102334.pc%5Fblog.%22%7D&request_id=168320813316800225593277&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~hot_rank-1-124315193-null-null.blog_rank_default&utm_term=Android)

### 创建和升级数据库

 新建Book类，定义id、author、price、pages、name这几个字段及相应的get和set方法，每个字段对应表中的每一列。

```java
public class Book extends LitePalSupport {
    private int id;
    private String author;
    private double price;
    private int pages;
    private String name;
    private String press;
    
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public int getPages() {
        return pages;
    }
    public void setPages(int pages) {
        this.pages = pages;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getPress() {
        return press;
    }
    public void setPress(String press) {
        this.press = press;
    }
}
```

 将Book类添加到映射模型列表当中

```xml
<litepal>
    <dbname value="BookStore" ></dbname>
    <version value="1" ></version>
    <list>
        <mapping class="com.example.litepaltest.Book"></mapping>
    </list>
</litepal>
```

修改MainActivity中的代码

```java
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);
	Button createDatabase = (Button) findViewById(R.id.create_database);
	createDatabase.setOnClickListener(new View.OnClickListener() {
		@Override
		public void onClick(View view) {
			LitePal.getDatabase();
		}
	});
}
```

其中，调用`Litepal.getDatabase()`就是一次最简单的数据库操作，只要点击一下按钮，数据库就会自动创建完成了。

升级数据库

**在一张表里面添加列**，则只需要在Book中添加相应的变量名和相应的set和get方法，然后将版本号+1。

**添加表**，则新建Category类并在list映射模型中添加新的模型类。LitePal会自动帮我们保留之前表中的所有数据，这样就不用担心数据丢失的问题了。

### 使用LitePal添加数据

LitePal进行表管理操作的时候不需要模型类有任何的继承结构，但是进行CRUD操作时，我们需要给模型类加上继承结构，让它们继承自DataSupport类。

```java
public class Book extends DataSupport
```

创建出Book的实例，然后各种set方法，最后调用book.save()方法完成数据添加操作。

```java
Button addData = (Button) findViewById(R.id.add_data);
addData.setOnClickListener(new View.OnClickListener() {
	@Override
	public void onClick(View v) {
		Book book = new Book();
		book.setName("The Da Vinci Code");
		book.setAuthor("Dan Brown");
		book.setPages(454);
		book.setPrice(16.96);
		book.setPress("Unknow");
		book.save();  //`save()`方法是从DataSupport`类中继承而来的
	}
});
```

### 使用LitePal更新数据库

1.对已存储的对象重新设值；例如直接`setPrice()`对价格进行修改，然后save完成该条数据的更新。

```java
Button updateData = (Button) findViewById(R.id.update_data);
updateData.setOnClickListener(new View.OnClickListener() {
	@Override
	public void onClick(View v) {
	    Book book = new Book();
        book.setName("The Lost Symbol");
        book.setAuthor("Dan Brown");
        book.setPages(510);
        book.setPrice(19.95);
        book.setPress("Unknow");
        book.save();  
        book.setPrice(10.99);
        book.save();
	}
});			
```

2.`调用updateAll()方法`。

```java
Book book = new Book();
book.setPrice(14.95);
book.setAuthor("Anchor");
book.updateAll("name=? and author=?","The Lost Symbol","Dan Brown");
```

首先new出了一个Book的实例，然后直接调用`setPrice()`和`setPress()`方法来设置要更新的数据，最后再调用`updateAll()`方法去执行更新操作。注意`updateAll()`方法中可以指定一个条件约束，和SQLiteDatabase中`update()`方法的`where`参数部分有点类似，但更加简洁，如果不指定条件语句的话，就表示更新所有数据。这里我们指定将所有书名是The Lost Symbol并且作者是Dan Brown的书价格更新为14.95，出版社更新为Anchor。

3.将字段的值更新为默认值。

```java
Book book = new Book();
book.setToDefault("pages");
book.updateAll();
```

### 使用Litepal删除数据

1.直接调用已存储对象的`delete()`方法

2.使用`DataSupport.deleteAll()`方法删除数据，第一个参数用于指定删除哪个表的数据，第二个和第三个是约束条件。

```java
Button deleteButton = (Button) findViewById(R.id.delete_data);
deleteButton.setOnClickListener(new View.OnClickListener() {
	@Override
	public void onClick(View v) {
		LitePal.deleteAll(Book.class, "price < ?", "14");
	}
});
```

### 使用LitePal查询数据

 调用`findAll()`方法来获取Book类型的List集合

```java
Button queryButton = (Button) findViewById(R.id.query_data);
queryButton.setOnClickListener(new View.OnClickListener() {
	@Override
	public void onClick(View v) {
		List<Book> books = LitePal.findAll(Book.class);
		for (Book book: books) {
			Log.d("MainActivity", "book name is " + book.getName());
			Log.d("MainActivity", "book author is " + book.getAuthor());
			Log.d("MainActivity", "book pages is " + book.getPages());
			Log.d("MainActivity", "book price is " + book.getPrice());
			Log.d("MainActivity", "book press is " + book.getPress());
		}
	}
});
```

### 其他操作语句

除了`findAll()`方法之外，LitePal还提供了很多其他非常有用的查询API。比如我们想要查询Book表中的第一条数据就可以这样写：

```java
Book firstBook = DataSupport.findFirst(Book.class);
```

查询Book表中的最后一条数据就可以这样写：

```java
Book lastBook = DataSupport.findLast(Book.class);
```

我们还可以通过连缀查询来定制更多的查询功能。

- `select()`方法用于指定查询哪几列的数据，对应了SQL当中的`select`关键字。比如只查`name`和`author`这两列的数据，就可以这样写：

  ```java
  List<Book> books = DataSupport.select("name", "author").find(Book.class);
  ```

- `where()`方法用于指定查询的约束条件，对应了SQL当中的`where`关键字。比如只查页数大于400的数据，就可以这样写：

  ```java
  List<Book> books = DataSupport.where("pages > ?", "400").find(Book.class);
  ```
  
- `order()`方法用于指定结果的排序方式，对应了SQL当中的`order by`关键字。比如将查询结果按照书价从高到低排序，就可以这样写：

  ```java
  List<Book> books = DataSupport.order("price desc").find(Book.class);
  ```
  
  其中`desc`表示降序排列，`asc`或者不写表示升序排列。
  
- `limit()`方法用于指定查询结果的数量，比如只查表中的前3条数据，就可以这样写：

  ```java
  List<Book> books = DataSupport.limit(3).find(Book.class);
  ```
  
- `offset()`方法用于指定查询结果的偏移量，比如查询表中的第2条、第3条、第4条数据，就可以这样写：

  ```java
  List<Book> books = DataSupport.limit(3).offset(1).find(Book.class);
  ```

由于`limit(3)`查询到的是前3条数据，这里我们再加上`offset(1)`进行一个位置的偏移，就能实现查询第2条、第3条、第4条数据的功能了。`limit()`和`offset()`方法共同对应了SQL当中的`limit`关键字。

当然，你还可以对这5个方法进行任意的连缀组合，来完成一个比较复杂的查询操作：

```java
List<Book> books = DataSupport.select("name", "author", "pages")
                              .where("pages > ?", "400")
                              .order("pages")
                              .limit(10)
                              .offset(10)
                              .find(Book.class);
 
```

这段代码就表示，查询Book表中第11~20条满足页数大于400这个条件的`name`、`author`和`pages`这3列数据，并将查询结果按照页数升序排列。

如果你还有一些特殊需求，上述的API都满足不了你的时候，LitePal仍然支持使用原生的SQL来进行查询：

```java
Cursor c = DataSupport.findBySQL("select * from Book where pages > ? and price < ?", "400",  "20");

```

调用`DataSupport.findBySQL()`方法来进行原生查询，其中第一个参数用于指定SQL语句，后面的参数用于指定占位符的值。注意`findBySQL()`方法返回的是一个`Cursor`对象，接下来你还需要通过之前所学的老方式将数据一一取出才行。
