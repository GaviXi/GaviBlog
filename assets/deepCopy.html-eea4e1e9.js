import{_ as n,p as s,q as a,Y as p}from"./framework-e1bed10d.js";const t="/GaviBlog/assets/deepCopy-1-a5338629.png",e="/GaviBlog/assets/deepCopy-2-9f3a8af3.png",o="/GaviBlog/assets/deepCopy-3-7711f7a3.png",c={},u=p(`<h1 id="python中的浅复制与深复制" tabindex="-1"><a class="header-anchor" href="#python中的浅复制与深复制" aria-hidden="true">#</a> Python中的浅复制与深复制</h1><p>首先我们引入切片的概念。</p><p>切片适用于列表、元组、字符串、range对象等类型，但作用于列表时功能最强大。可以使用切片来截取列表中的任何部分，得到一个新列表。</p><p>举几个例子：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> aList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">]</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> aList<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token punctuation">]</span>                            <span class="token comment">#返回包含所有元素的新列表</span>
<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">]</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> aList<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>                          <span class="token comment">#逆序的所有元素</span>
<span class="token punctuation">[</span><span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> aList<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span>                           <span class="token comment">#偶数位置，隔一个取一个</span>
<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">]</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> aList<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span>                          <span class="token comment">#奇数位置，隔一个取一个</span>
<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">]</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> aList<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token punctuation">]</span>                           <span class="token comment">#从下标3开始的所有元素</span>
<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">]</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> aList<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">:</span><span class="token number">6</span><span class="token punctuation">]</span>                           <span class="token comment">#下标在[3, 6)之间的所有元素</span>
<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>切片返回的是<strong>浅复制</strong>。所谓浅复制，是指生成一个新的列表，并且把原列表中所选元素的引用都复制到新列表中。</p><p>如果原列表中只包含整数、实数、复数等基本类型或元组、字符串这样的不可变类型的数据，一般是没有问题的。除了切片之外，“+”运算符，“*”运算符还有一些内置函数也会生成新列表。</p><p><img src="`+t+`" alt=""></p><p>但是如果原列表中包含列表之类的可变数据类型，由于浅复制时只是把子列表的引用复制到新列表中，这样的话修改任何一个都会影响另外一个。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> aList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">]</span>        <span class="token comment">#列表aList中包含可变的列表对象</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> bList <span class="token operator">=</span> aList<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span>           <span class="token comment">#切片</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> bList<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>         <span class="token comment">#调用子列表的append()方法，这个方法是原地操作的</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> bList
<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">]</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> aList                      <span class="token comment">#aList受到影响</span>
<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+e+`" alt=""></p><p>为了解决上述这个问题，我们使用标准库copy中的deepcopy()函数实现深复制。所谓深复制，是指对原列表中的元素进行递归，把所有的值都复制到新列表中，对嵌套的子列表不再是复制引用。新列表和原列表是互相独立，修改任何一个都不会影响另外一个。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> aList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">]</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> <span class="token keyword">import</span> copy
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> bList <span class="token operator">=</span> copy<span class="token punctuation">.</span>deepcopy<span class="token punctuation">(</span>aList<span class="token punctuation">)</span> <span class="token comment">#深赋值，递归复制，直到遇到可哈希对象</span>
                           <span class="token comment">#aList和bList完全独立，互相不影响</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> aList <span class="token operator">==</span> bList
<span class="token boolean">True</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> aList <span class="token keyword">is</span> bList
<span class="token boolean">False</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> bList<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>         <span class="token comment">#修改bList不会影响aList</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> bList
<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">]</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> aList
<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+o+'" alt=""></p>',14),l=[u];function i(k,r){return s(),a("div",null,l)}const b=n(c,[["render",i],["__file","deepCopy.html.vue"]]);export{b as default};