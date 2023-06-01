# 第二章习题

## 1.Dart语言的核心是什么？它是面向什么编程的？

Dart语言的核心是一种称为"可选类型"的特性，即变量可以选择是否声明其类型。这使得Dart既能作为强类型语言，也能作为动态类型语言使用，使得Dart在编写大型应用程序时能够提供更好的类型安全性和可读性，同时也保留了灵活性和简洁性。

Dart是一种面向对象的语言，支持面向对象编程、泛型编程和函数式编程。它的类和对象系统是Dart语言的核心特性之一，具有类似于Java和C#等传统面向对象语言的特性，比如继承、多态和接口。此外，Dart还具有异步编程和生成器等特性，使得开发人员能够轻松地编写高效的并发代码。

## 2.Dart语言使用什么关键字来声明变量？Dart语言使用什么关键字来声明常量？Dart语言中常量的两种声明方式有什么区别？

Dart语言使用关键字"var"、"final"和"const"来声明变量和常量。

- "var"用于声明一个变量并初始化它。例如，`var x = 10;`将创建一个类型为int的变量x，并将其初始化为10。
- "final"用于声明一个只能被赋值一次的变量。例如，`final y = "hello";`将创建一个类型为String的常量y，并将其初始化为"hello"。一旦被赋值，y的值不能被修改。
- "const"用于声明一个在编译时就已经确定的常量。例如，`const z = 3.14;`将创建一个类型为double的常量z，并将其初始化为3.14。与final不同，const常量在声明时必须被初始化为一个常量表达式，例如一个数值、一个字符串、一个布尔值或一个符号。

在Dart语言中，常量的声明方式有两种：

- 在声明时使用关键字"const"，例如`const a = 10;`，这种常量在**编译时**就会被计算出来，并且可以被直接嵌入到代码中，以提高性能。
- 在声明时使用关键字"final"，并且将其初始化为一个编译时常量表达式，例如`final b = const [1, 2, 3];`。这种常量在**运行时**被计算出来，但是它们的值在程序执行期间是不会改变的。这种常量通常用于需要在运行时动态生成的情况，例如在构建列表或映射时。

示例

```dart
void main() {
  final y;
  y=10;
  print(y);  //y=10
    
  const x;
  x=5;  //报错，const常量在声明时必须被初始化为一个常量表达式
  print(x);
    
  const x=5; 
  print(x);  //x=5
}
```

## 3.在Dart语言中，List是数组还是列表？

在Dart语言中，List是列表，而不是数组。虽然Dart中的List与其他语言中的数组类似，但它们具有许多与数组不同的特性。

在Dart中，List是一个有序的、可重复的集合，可以通过下标来访问和修改元素，同时支持添加、删除、排序和过滤等操作。与数组不同的是，Dart中的List可以包含不同类型的元素，即它们是泛型类型，可以使用尖括号来指定元素类型。例如，`List<int> numbers = [1, 2, 3];`将创建一个整数类型的列表，其中包含三个元素1、2、3。

此外，Dart中的List还支持扩展和收缩操作，即可以动态地添加或删除元素，而不必担心数组的长度问题。与数组不同的是，Dart中的List内部实现使用的是链表或动态数组，而不是静态数组，这使得它们能够更好地适应动态的数据结构。

## 4.Map和循环练习

给定一个年份，自己创建一个世界杯键值对Map(key:年份，value:举办地点),通过forEach循环判断该年份是否举办了世界杯。如果举办了，那么输出举办世界杯的地点；如果没有举办，那么输出”该年份没有举办世界杯“。

```dart
import 'dart:io';

void main(){
  Map map={
    '1998':'法国世界杯',
    '2002':'韩日世界杯',
    '2006':'德国世界杯',
    '2010':'南非世界杯',
    '2014':'巴西世界杯',
    '2018':'俄罗斯世界杯',
    '2022':'卡塔尔世界杯',
  };
  
  stdout.write('Please enter the year you want to query: ');
  String? input = stdin.readLineSync();
  print("You entered: $input");

  bool flag=false;
  map.forEach((key,value){
    if(key==input){
      print("$key $value");
      flag=true;
    }
  });

  if(flag!=true){
    print('该年份没有世界杯');
  }
}
```

## 5.使用try-catch捕获一个异常，并在捕获异常结束后输出“捕获完成”。

```dart
try {
  // 可能会引发异常的代码
  int result = 1 ~/ 0; // 除数为0，会引发一个异常
} catch (e) {
  // 捕获异常并输出错误信息
  print("An error occurred: $e");
} finally {
  // finally块中的代码在try块和catch块结束后都会执行
  print("Catch finished");
}
```

## 6.创建一个可选变量的函数

```dart
void main(){
  // ignore: omit_local_variable_types
  Map map={
    '1998':'法国世界杯',
    '2002':'韩日世界杯',
    '2006':'德国世界杯',
    '2010':'南非世界杯',
    '2014':'巴西世界杯',
    '2018':'俄罗斯世界杯',
    '2022':'卡塔尔世界杯',
  };

  printWordCap(map: map);
}

void printWordCap({String myYear='2014',Map? map}){
  var flag=false;
  if (map==null){
    print("map is not provided.");
  }
  else{
    map.forEach((key,value){
    if(key==myYear){
      print("$key $value");
      flag=true;
    }
  });
  }
  if(flag!=true){
    print('该年份没有世界杯');
  }
}
```

## 7.给定一个水果字符串，通过switch语句判断水果的类型并输出

```dart
void main(){
  String fruits='苹果';
  switch(fruits){
    case "苹果":
      print("苹果");
      break;
    case "菠萝":
      print("菠萝");
      break;
    case "梨子":
      print("梨子");
      break;
    default:
      print("没有这个水果");
      break;
  }
}
```

## 8.详细说明Dart语言接口、继承与mixin的区别，并指出其优先级顺序。

Dart语言中，接口（interface）、继承（inheritance）和mixin是三种面向对象编程的机制，它们分别用于描述类型的行为、类型的层次结构和类型的复用。它们之间有以下区别：

1. 接口：接口是一种抽象类型，用于描述类或对象的行为特征。接口只声明了类或对象应该具有哪些方法、属性或其他行为，但并不提供具体的实现。类可以实现一个或多个接口，从而表明它们具有接口定义的行为特征。Dart中的接口使用`implements`关键字来实现，例如：

```dart
abstract class Animal {
  void eat();
}

class Cat implements Animal {
  @override
  void eat() {
    print("Cat is eating fish.");
  }
}
```

在上面的示例中，`Animal`是一个抽象类，它声明了一个`eat()`方法。`Cat`类通过实现`Animal`接口来表明它具有`eat()`方法的行为特征。

1. 继承：继承是一种描述类或对象之间关系的机制，用于表示某个类或对象从另一个类或对象派生而来，继承了它们的属性和方法。子类可以重写父类的方法或添加新的属性和方法，以适应自己的需求。Dart中的继承使用`extends`关键字来实现，例如：

```dart
class Animal {
  void eat() {
    print("Animal is eating.");
  }
}

class Cat extends Animal {
  @override
  void eat() {
    print("Cat is eating fish.");
  }
}
```

在上面的示例中，`Cat`类继承了`Animal`类的`eat()`方法，并重写了它来适应猫的需求。

1. mixin：mixin是一种描述代码复用的机制，用于将一段代码“混合”到一个或多个类中。mixin是一种不依赖于类层次结构的代码复用方式，它可以让多个类共享一些通用的代码，而不需要在它们之间建立父子关系。Dart中的mixin使用`with`关键字来实现，例如：

```dart
mixin Swimming {
  void swim() {
    print("Swimming...");
  }
}

class Fish with Swimming {
  void eat() {
    print("Fish is eating.");
  }
}
```

在上面的示例中，`Swimming`是一个mixin，它声明了一个`swim()`方法。`Fish`类通过使用`with`关键字将`Swimming` mixin“混合”到它的行为中，从而获得了`swim()`方法。

优先级顺序方面，假如同时使用接口继承mixin，并且他们的@Override方法都一样，优先级顺序为类自身重写的方法、mixin、extends、implements。

示例

```dart
class Lion{
  void printName(){
    print('我是狮子');
  }
}

class Tiger{
  void printName(){
    print('我是老虎');
  }
}

class Leopard{
  void printName(){
    print('我是豹子');
  }
}

class AnimalOne extends Leopard with Lion,Tiger{
  //@override
  //void printName() {
    //print('我是动物1');
  //}
}
class AnimalTwo extends Leopard with Lion implements Tiger{
  //@override
  //void printName() {
    //print('我是动物2');
  //}
}

void main(){
  AnimalOne()..printName();
  AnimalTwo()..printName();
}

//输出结果：
//我是老虎
//我是狮子
```

## 9.定义一个`List<dynamic>`泛型，并添加多种类型的数据，然后使用for循环（非for-in循环）输出所有数据

```dart
void main(){
  List<dynamic> list=[123,'苹果',false,{"红楼梦":"曹雪芹"}];

  for (var value in list){
    print(value);
  }
}
```

## 10.详细说明为什么习题9中定义的`List<dynamic>`泛型可以添加多种类型的数据

在Dart语言中，`List<dynamic>` 表示一个动态类型的列表，即列表中的元素可以是任意类型，包括基本类型（如`int`、`double`、`bool`等）、对象类型（如`String`、`Person`等）、函数类型等。

虽然 `List<dynamic>` 可以添加多种类型的数据，但这并不意味着它是类型不安全的。这是因为Dart语言的类型检查是在编译时进行的，而不是在运行时进行的。当我们将一个值添加到 `List<dynamic>` 中时，编译器会根据添加的值的类型进行类型推断，并在运行时将其视为相应的类型。

例如，以下代码将一个`int`类型的值和一个`String`类型的值添加到 `List<dynamic>` 中：

```dart
List<dynamic> list = [];
list.add(123);
list.add('hello');
```

在编译时，编译器会推断出 `list` 是一个 `List<dynamic>` 类型的列表，因为我们没有指定列表中元素的类型，而 `123` 是一个 `int` 类型的值，而 `'hello'` 是一个 `String` 类型的值。因此，在运行时，`list` 中的第一个元素被视为 `int` 类型的值，而第二个元素被视为 `String` 类型的值。

然而，需要注意的是，如果我们尝试对 `list` 中的元素进行类型不匹配的操作，例如将 `list[0]` 视为 `String` 类型的值，或者将 `list[1]` 视为 `int` 类型的值，就会导致运行时错误。因此，虽然 `List<dynamic>` 允许添加多种类型的数据，但我们在使用时仍然需要小心处理，以避免类型不匹配的问题。

## 11.在一个dart文件中定义一个加法函数，通过库导入；在另一个dart文件中国，使用这个加法函数。

myMethod.dart

```
xAddy(int x,int y){
  print(x+y);
}
```

test.dart

```
import 'myMethod.dart' show xAddy;
void main(){
  xAddy(5,8);
}
```

## 12.对象练习

假如现在有两个Person对象，它们的成员有name（名字）和age（年龄）。你需要在程序中直接通过“+”运算符算出这两个Person对象中的年龄和，并生成一个新的Person对象，然后通过toString()输出它们的年龄和。（提示：使用自定义类"+"操作符以及toString()方法）

```dart
class Person{
  String name;
  int age;
  Person(this.name,this.age);
  Person operator +(Person p) {
    return Person(name + p.name, age + p.age);
  }
  String toString(){
    return "name="+name.toString()+";age="+age.toString();
  }
}

void main(){
  Person one=new Person("老大", 28);
  Person two=new Person("老二", 23);
  Person oneAddtwo=one+two;
  print(oneAddtwo);  //由于print()函数期望一个字符串作为参数，而我们传递给它的是一个Person对象three，因此Dart会自动调用three对象的toString()方法来获取其字符串表示形式。
}
```

