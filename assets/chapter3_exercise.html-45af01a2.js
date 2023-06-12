import{_ as n,p as s,q as a,Y as t}from"./framework-e1bed10d.js";const p={},e=t(`<h1 id="第三章习题" tabindex="-1"><a class="header-anchor" href="#第三章习题" aria-hidden="true">#</a> 第三章习题</h1><h2 id="_1-学习bottomnavigationbar属性的使用方式-实现底部菜单栏" tabindex="-1"><a class="header-anchor" href="#_1-学习bottomnavigationbar属性的使用方式-实现底部菜单栏" aria-hidden="true">#</a> 1.学习bottomNavigationBar属性的使用方式，实现底部菜单栏</h2><p>注意两点：</p><ul><li>MyHomePage的构造函数中this.title需要用required来限制</li><li>BottomNavigationBarItem的title属性已弃用，需使用label属性</li></ul><div class="language-dart line-numbers-mode" data-ext="dart"><pre class="language-dart"><code><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flutter/material.dart&#39;</span></span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">runApp</span><span class="token punctuation">(</span><span class="token class-name">MyApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MyApp</span> <span class="token keyword">extends</span> <span class="token class-name">StatelessWidget</span> <span class="token punctuation">{</span>
  <span class="token metadata function">@override</span>
  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">MaterialApp</span><span class="token punctuation">(</span>
      title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&#39;Flutter Demo&#39;</span></span><span class="token punctuation">,</span>
      theme<span class="token punctuation">:</span> <span class="token class-name">ThemeData</span><span class="token punctuation">(</span>
        primarySwatch<span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>blue<span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
      home<span class="token punctuation">:</span> <span class="token class-name">MyHomePage</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&#39;Flutter Demo Home Page&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MyHomePage</span> <span class="token keyword">extends</span> <span class="token class-name">StatefulWidget</span> <span class="token punctuation">{</span>
  <span class="token class-name">MyHomePage</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">Key</span><span class="token operator">?</span> key<span class="token punctuation">,</span> required <span class="token keyword">this</span><span class="token punctuation">.</span>title<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">super</span><span class="token punctuation">(</span>key<span class="token punctuation">:</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">final</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>

  <span class="token metadata function">@override</span>
  _MyHomePageState <span class="token function">createState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token function">_MyHomePageState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> _MyHomePageState <span class="token keyword">extends</span> <span class="token class-name">State</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MyHomePage</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token keyword">final</span> _bottomNavigationColor <span class="token operator">=</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>blue<span class="token punctuation">;</span>
  int _currentIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> _pageController <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PageController</span><span class="token punctuation">(</span>initialPage<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token metadata function">@override</span>
  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Scaffold</span><span class="token punctuation">(</span>
      appBar<span class="token punctuation">:</span> <span class="token class-name">AppBar</span><span class="token punctuation">(</span>
        title<span class="token punctuation">:</span> <span class="token class-name">Text</span><span class="token punctuation">(</span>widget<span class="token punctuation">.</span>title<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
      body<span class="token punctuation">:</span> <span class="token class-name">PageView</span><span class="token punctuation">(</span>
        controller<span class="token punctuation">:</span> _pageController<span class="token punctuation">,</span>
        onPageChanged<span class="token punctuation">:</span> <span class="token punctuation">(</span>index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            _currentIndex <span class="token operator">=</span> index<span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        children<span class="token punctuation">:</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Widget</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">[</span>
          <span class="token class-name">BottomPage</span><span class="token punctuation">(</span>
            title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;界面1&quot;</span></span><span class="token punctuation">,</span>
          <span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token class-name">BottomPage</span><span class="token punctuation">(</span>
            title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;界面2&quot;</span></span><span class="token punctuation">,</span>
          <span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token class-name">BottomPage</span><span class="token punctuation">(</span>
            title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;界面3&quot;</span></span><span class="token punctuation">,</span>
          <span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token class-name">BottomPage</span><span class="token punctuation">(</span>
            title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;界面4&quot;</span></span><span class="token punctuation">,</span>
          <span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
      bottomNavigationBar<span class="token punctuation">:</span> <span class="token class-name">BottomNavigationBar</span><span class="token punctuation">(</span>
        iconSize<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
        currentIndex<span class="token punctuation">:</span> _currentIndex<span class="token punctuation">,</span>
        type<span class="token punctuation">:</span> <span class="token class-name">BottomNavigationBarType</span><span class="token punctuation">.</span>fixed<span class="token punctuation">,</span> <span class="token comment">//固定类型</span>
        onTap<span class="token punctuation">:</span> <span class="token punctuation">(</span>int index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            _currentIndex <span class="token operator">=</span> index<span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          _pageController<span class="token punctuation">.</span><span class="token function">animateToPage</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span>
              duration<span class="token punctuation">:</span> <span class="token keyword">const</span> <span class="token class-name">Duration</span><span class="token punctuation">(</span>milliseconds<span class="token punctuation">:</span> <span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">,</span> curve<span class="token punctuation">:</span> <span class="token class-name">Curves</span><span class="token punctuation">.</span>ease<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        items<span class="token punctuation">:</span> <span class="token punctuation">[</span>
          <span class="token class-name">BottomNavigationBarItem</span><span class="token punctuation">(</span>
              icon<span class="token punctuation">:</span> <span class="token class-name">Icon</span><span class="token punctuation">(</span>
                <span class="token class-name">Icons</span><span class="token punctuation">.</span>home<span class="token punctuation">,</span>
                color<span class="token punctuation">:</span> _bottomNavigationColor<span class="token punctuation">,</span>
              <span class="token punctuation">)</span><span class="token punctuation">,</span>
              label<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&#39;首页&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token class-name">BottomNavigationBarItem</span><span class="token punctuation">(</span>
              icon<span class="token punctuation">:</span> <span class="token class-name">Icon</span><span class="token punctuation">(</span>
                <span class="token class-name">Icons</span><span class="token punctuation">.</span>videocam<span class="token punctuation">,</span>
                color<span class="token punctuation">:</span> _bottomNavigationColor<span class="token punctuation">,</span>
              <span class="token punctuation">)</span><span class="token punctuation">,</span>
              label<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&#39;小视频&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token class-name">BottomNavigationBarItem</span><span class="token punctuation">(</span>
              icon<span class="token punctuation">:</span> <span class="token class-name">Icon</span><span class="token punctuation">(</span>
                <span class="token class-name">Icons</span><span class="token punctuation">.</span>graphic_eq<span class="token punctuation">,</span>
                color<span class="token punctuation">:</span> _bottomNavigationColor<span class="token punctuation">,</span>
              <span class="token punctuation">)</span><span class="token punctuation">,</span>
              label<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&#39;VIP会员&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token class-name">BottomNavigationBarItem</span><span class="token punctuation">(</span>
              icon<span class="token punctuation">:</span> <span class="token class-name">Icon</span><span class="token punctuation">(</span>
                <span class="token class-name">Icons</span><span class="token punctuation">.</span>group<span class="token punctuation">,</span>
                color<span class="token punctuation">:</span> _bottomNavigationColor<span class="token punctuation">,</span>
              <span class="token punctuation">)</span><span class="token punctuation">,</span>
              label<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&#39;个人中心&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">BottomPage</span> <span class="token keyword">extends</span> <span class="token class-name">StatelessWidget</span> <span class="token punctuation">{</span>
  <span class="token keyword">final</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>
  <span class="token class-name">BottomPage</span><span class="token punctuation">(</span><span class="token punctuation">{</span>required <span class="token keyword">this</span><span class="token punctuation">.</span>title<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token metadata function">@override</span>
  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Scaffold</span><span class="token punctuation">(</span>
      body<span class="token punctuation">:</span> <span class="token class-name">Center</span><span class="token punctuation">(</span>
        child<span class="token punctuation">:</span> <span class="token class-name">Text</span><span class="token punctuation">(</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>title<span class="token punctuation">,</span>
          style<span class="token punctuation">:</span> <span class="token class-name">TextStyle</span><span class="token punctuation">(</span>
            fontSize<span class="token punctuation">:</span> <span class="token number">25</span><span class="token punctuation">,</span>
          <span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-学习sliverappbar组件-实现折叠相册功能" tabindex="-1"><a class="header-anchor" href="#_2-学习sliverappbar组件-实现折叠相册功能" aria-hidden="true">#</a> 2.学习SliverAppBar组件，实现折叠相册功能</h2><div class="language-dart line-numbers-mode" data-ext="dart"><pre class="language-dart"><code><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;dart:ffi&#39;</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flutter/material.dart&#39;</span></span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token function">runApp</span><span class="token punctuation">(</span><span class="token class-name">MyApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">MyApp</span> <span class="token keyword">extends</span> <span class="token class-name">StatelessWidget</span> <span class="token punctuation">{</span>
  <span class="token comment">// This widget is the root of your application.</span>
  <span class="token metadata function">@override</span>
  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">MaterialApp</span><span class="token punctuation">(</span>
      title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&#39;Flutter Demo&#39;</span></span><span class="token punctuation">,</span>
      theme<span class="token punctuation">:</span> <span class="token class-name">ThemeData</span><span class="token punctuation">(</span>
        primarySwatch<span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>blue<span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
      home<span class="token punctuation">:</span> <span class="token class-name">MyHomePage</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&#39;Flutter Demo Home Page&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MyHomePage</span> <span class="token keyword">extends</span> <span class="token class-name">StatefulWidget</span> <span class="token punctuation">{</span>
  <span class="token class-name">MyHomePage</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">Key</span> <span class="token operator">?</span>key<span class="token punctuation">,</span> required <span class="token keyword">this</span><span class="token punctuation">.</span>title<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">super</span><span class="token punctuation">(</span>key<span class="token punctuation">:</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">final</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>

  <span class="token metadata function">@override</span>
  _MyHomePageState <span class="token function">createState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token function">_MyHomePageState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> _MyHomePageState <span class="token keyword">extends</span> <span class="token class-name">State</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MyHomePage</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">with</span> <span class="token class-name">SingleTickerProviderStateMixin</span><span class="token punctuation">{</span>

  late <span class="token class-name">TabController</span> tabController<span class="token punctuation">;</span>

  <span class="token metadata function">@override</span>
  <span class="token keyword">void</span> <span class="token function">initState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">initState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">///这里的 3 代表有三个子 Item</span>
    <span class="token comment">///应用到 TabBarView 中，对应其中3个子Item</span>
    <span class="token comment">///应用到 TabBar中，对应其中32上子Item</span>
    tabController <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TabController</span><span class="token punctuation">(</span>length<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span> vsync<span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token metadata function">@override</span>
  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Scaffold</span><span class="token punctuation">(</span>
        appBar<span class="token punctuation">:</span> <span class="token class-name">AppBar</span><span class="token punctuation">(</span>
          title<span class="token punctuation">:</span> <span class="token class-name">Text</span><span class="token punctuation">(</span>widget<span class="token punctuation">.</span>title<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
        body<span class="token punctuation">:</span> <span class="token class-name">NestedScrollView</span><span class="token punctuation">(</span>
          headerSliverBuilder<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">,</span> bool b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">[</span>
              <span class="token class-name">SliverAppBar</span><span class="token punctuation">(</span>
                <span class="token comment">///true SliverAppBar 不会滑动</span>
                pinned<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token comment">///是否随着滑动隐藏标题</span>
                floating<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token comment">///SliverAppBar展开的高度</span>
                expandedHeight<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
                flexibleSpace<span class="token punctuation">:</span> <span class="token function">buildFlexibleSpaceBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                bottom<span class="token punctuation">:</span> <span class="token function">buildBottomBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
              <span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>

          <span class="token comment">///主体部分</span>
          body<span class="token punctuation">:</span> <span class="token function">buildbodyView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token class-name">TabBar</span> <span class="token function">buildBottomBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">TabBar</span><span class="token punctuation">(</span>
      controller<span class="token punctuation">:</span> tabController<span class="token punctuation">,</span>
      tabs<span class="token punctuation">:</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Widget</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">[</span>
        <span class="token keyword">new</span> <span class="token class-name">Tab</span><span class="token punctuation">(</span>
          text<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;我的家庭&quot;</span></span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">Tab</span><span class="token punctuation">(</span>
          text<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;我的旅游&quot;</span></span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">Tab</span><span class="token punctuation">(</span>
          text<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;我的生活&quot;</span></span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token class-name">String</span> imageUrl <span class="token operator">=</span>
  <span class="token comment">///记得换成自己的图片链接</span>
      <span class="token string-literal"><span class="token string">&quot;https://s1.ax1x.com/2023/05/05/p9NZSMQ.jpg&quot;</span></span><span class="token punctuation">;</span>

  <span class="token class-name">FlexibleSpaceBar</span> <span class="token function">buildFlexibleSpaceBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">FlexibleSpaceBar</span><span class="token punctuation">(</span>
<span class="token comment">//                title: Text(&quot;FlexibleSpaceBar title&quot;),</span>
      centerTitle<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      background<span class="token punctuation">:</span> <span class="token class-name">Container</span><span class="token punctuation">(</span>
        color<span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>blue<span class="token punctuation">[</span><span class="token number">300</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        child<span class="token punctuation">:</span> <span class="token class-name">Column</span><span class="token punctuation">(</span>
          mainAxisSize<span class="token punctuation">:</span> <span class="token class-name">MainAxisSize</span><span class="token punctuation">.</span>min<span class="token punctuation">,</span>
          children<span class="token punctuation">:</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Widget</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">[</span>
            <span class="token class-name">Container</span><span class="token punctuation">(</span>
              height<span class="token punctuation">:</span> <span class="token number">150</span><span class="token punctuation">,</span>
              child<span class="token punctuation">:</span> <span class="token class-name">Image</span><span class="token punctuation">.</span><span class="token function">network</span><span class="token punctuation">(</span>
                imageUrl<span class="token punctuation">,</span>
                fit<span class="token punctuation">:</span> <span class="token class-name">BoxFit</span><span class="token punctuation">.</span>fill<span class="token punctuation">,</span>
                height<span class="token punctuation">:</span> <span class="token number">160</span><span class="token punctuation">,</span>
                width<span class="token punctuation">:</span> <span class="token number">400</span><span class="token punctuation">,</span>
              <span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token class-name">TabBarView</span> <span class="token function">buildbodyView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">TabBarView</span><span class="token punctuation">(</span>
      controller<span class="token punctuation">:</span> tabController<span class="token punctuation">,</span>
      children<span class="token punctuation">:</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Widget</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">[</span>
        <span class="token class-name">SingleChildScrollView</span><span class="token punctuation">(</span>
          child<span class="token punctuation">:</span> <span class="token class-name">Container</span><span class="token punctuation">(</span>
            alignment<span class="token punctuation">:</span> <span class="token class-name">Alignment</span><span class="token punctuation">.</span>bottomLeft<span class="token punctuation">,</span>
            child<span class="token punctuation">:</span> <span class="token class-name">GridView</span><span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span>
              physics<span class="token punctuation">:</span> <span class="token keyword">const</span> <span class="token class-name">NeverScrollableScrollPhysics</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
              <span class="token comment">//水平子Widget之间间距</span>
              crossAxisSpacing<span class="token punctuation">:</span> <span class="token number">10.0</span><span class="token punctuation">,</span>
              <span class="token comment">//垂直子Widget之间间距</span>
              mainAxisSpacing<span class="token punctuation">:</span> <span class="token number">30.0</span><span class="token punctuation">,</span>
              <span class="token comment">//GridView内边距</span>
              padding<span class="token punctuation">:</span> <span class="token class-name">EdgeInsets</span><span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token number">10.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
              <span class="token comment">//一行的Widget数量</span>
              crossAxisCount<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
              <span class="token comment">//子Widget宽高比例</span>
              childAspectRatio<span class="token punctuation">:</span> <span class="token number">2.0</span><span class="token punctuation">,</span>
              <span class="token comment">//子Widget列表</span>
              children<span class="token punctuation">:</span> <span class="token function">getDataList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">)</span><span class="token punctuation">,</span>
            height<span class="token punctuation">:</span> <span class="token number">1000</span><span class="token punctuation">,</span>
          <span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token class-name">Text</span><span class="token punctuation">(</span>
          <span class="token string-literal"><span class="token string">&quot;我的旅游相册&quot;</span></span><span class="token punctuation">,</span>
          style<span class="token punctuation">:</span> <span class="token class-name">TextStyle</span><span class="token punctuation">(</span>color<span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token class-name">Text</span><span class="token punctuation">(</span>
          <span class="token string-literal"><span class="token string">&quot;我的生活相册&quot;</span></span><span class="token punctuation">,</span>
          style<span class="token punctuation">:</span> <span class="token class-name">TextStyle</span><span class="token punctuation">(</span>color<span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>red<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Widget</span><span class="token punctuation">&gt;</span></span> <span class="token function">getDataList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Widget</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>int i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Image</span><span class="token punctuation">.</span><span class="token function">network</span><span class="token punctuation">(</span>imageUrl<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> list<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),c=[e];function o(l,i){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","chapter3_exercise.html.vue"]]);export{k as default};
