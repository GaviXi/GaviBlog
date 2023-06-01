# 第三章习题

## 1.学习bottomNavigationBar属性的使用方式，实现底部菜单栏

注意两点：

- MyHomePage的构造函数中this.title需要用required来限制
- BottomNavigationBarItem的title属性已弃用，需使用label属性

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final _bottomNavigationColor = Colors.blue;
  int _currentIndex = 0;
  var _pageController = new PageController(initialPage: 0);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: PageView(
        controller: _pageController,
        onPageChanged: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        children: <Widget>[
          BottomPage(
            title: "界面1",
          ),
          BottomPage(
            title: "界面2",
          ),
          BottomPage(
            title: "界面3",
          ),
          BottomPage(
            title: "界面4",
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        iconSize: 20,
        currentIndex: _currentIndex,
        type: BottomNavigationBarType.fixed, //固定类型
        onTap: (int index) {
          setState(() {
            _currentIndex = index;
          });
          _pageController.animateToPage(index,
              duration: const Duration(milliseconds: 300), curve: Curves.ease);
        },
        items: [
          BottomNavigationBarItem(
              icon: Icon(
                Icons.home,
                color: _bottomNavigationColor,
              ),
              label: '首页'),
          BottomNavigationBarItem(
              icon: Icon(
                Icons.videocam,
                color: _bottomNavigationColor,
              ),
              label: '小视频'),
          BottomNavigationBarItem(
              icon: Icon(
                Icons.graphic_eq,
                color: _bottomNavigationColor,
              ),
              label: 'VIP会员'),
          BottomNavigationBarItem(
              icon: Icon(
                Icons.group,
                color: _bottomNavigationColor,
              ),
              label: '个人中心'),
        ],
      ),
    );
  }
}

class BottomPage extends StatelessWidget {
  final String title;
  BottomPage({required this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          this.title,
          style: TextStyle(
            fontSize: 25,
          ),
        ),
      ),
    );
  }
}

```

## 2.学习SliverAppBar组件，实现折叠相册功能

```dart
import 'dart:ffi';

import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key ?key, required this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> with SingleTickerProviderStateMixin{

  late TabController tabController;

  @override
  void initState() {
    super.initState();
    ///这里的 3 代表有三个子 Item
    ///应用到 TabBarView 中，对应其中3个子Item
    ///应用到 TabBar中，对应其中32上子Item
    tabController = new TabController(length: 3, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: NestedScrollView(
          headerSliverBuilder: (BuildContext context, bool b) {
            return [
              SliverAppBar(
                ///true SliverAppBar 不会滑动
                pinned: true,
                ///是否随着滑动隐藏标题
                floating: true,
                ///SliverAppBar展开的高度
                expandedHeight: 200,
                flexibleSpace: buildFlexibleSpaceBar(),
                bottom: buildBottomBar(),
              ),
            ];
          },

          ///主体部分
          body: buildbodyView(),
        ));
  }

  TabBar buildBottomBar() {
    return TabBar(
      controller: tabController,
      tabs: <Widget>[
        new Tab(
          text: "我的家庭",
        ),
        new Tab(
          text: "我的旅游",
        ),
        new Tab(
          text: "我的生活",
        ),
      ],
    );
  }

  String imageUrl =
  ///记得换成自己的图片链接
      "https://s1.ax1x.com/2023/05/05/p9NZSMQ.jpg";

  FlexibleSpaceBar buildFlexibleSpaceBar() {
    return FlexibleSpaceBar(
//                title: Text("FlexibleSpaceBar title"),
      centerTitle: true,
      background: Container(
        color: Colors.blue[300],
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Container(
              height: 150,
              child: Image.network(
                imageUrl,
                fit: BoxFit.fill,
                height: 160,
                width: 400,
              ),
            ),
          ],
        ),
      ),
    );
  }

  TabBarView buildbodyView() {
    return TabBarView(
      controller: tabController,
      children: <Widget>[
        SingleChildScrollView(
          child: Container(
            alignment: Alignment.bottomLeft,
            child: GridView.count(
              physics: const NeverScrollableScrollPhysics(),
              //水平子Widget之间间距
              crossAxisSpacing: 10.0,
              //垂直子Widget之间间距
              mainAxisSpacing: 30.0,
              //GridView内边距
              padding: EdgeInsets.all(10.0),
              //一行的Widget数量
              crossAxisCount: 2,
              //子Widget宽高比例
              childAspectRatio: 2.0,
              //子Widget列表
              children: getDataList(),
            ),
            height: 1000,
          ),
        ),
        Text(
          "我的旅游相册",
          style: TextStyle(color: Colors.blue),
        ),
        Text(
          "我的生活相册",
          style: TextStyle(color: Colors.red),
        ),
      ],
    );
  }

  List<Widget> getDataList() {
    List<Widget> list = [];
    for (int i = 0; i < 100; i++) {
      list.add(Image.network(imageUrl));
    }
    return list;
  }
}
```

