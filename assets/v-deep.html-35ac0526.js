import{_ as s,p as n,q as e,Y as a}from"./framework-e1bed10d.js";const t={},p=a(`<h1 id="v-deep" tabindex="-1"><a class="header-anchor" href="#v-deep" aria-hidden="true">#</a> ::v-deep</h1><p>本文主要介绍vue样式穿透 ::v-deep的具体使用。</p><p>使用场景:</p><p>在用到很多vue的组件库如vant，elementUI，vuetify等，虽然配好了样式但是有时候我们仍然需要根据需求更改样式。</p><p>当我们需要覆盖组件库中的样式时大多数情况只能通过深度作用选择器，::v-deep就是其中一种深度作用选择器。</p><p><strong>深度作用选择器</strong></p><p>如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 &gt;&gt;&gt; 操作符：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">&lt;style scoped&gt; .a &gt;&gt;&gt; .b</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span> &lt;/style&gt; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述代码将会编译成：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.a[data-v-f3f3eg9] .b</span> <span class="token punctuation">{</span> <span class="token comment">/* … */</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于：</p><ul><li>scss等预处理器却无法解析&gt;&gt;&gt;</li><li>在vue-cli3编译时，/deep/的方式会报错或者警告</li><li>::v-deep相较于&gt;&gt;&gt;和/deep/更保险并且编译速度更快</li></ul><p>所以我们推荐一般使用::v-deep来进行样式穿透</p><p>::v-deep （双冒号不能少） 具体案例如下：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">&lt;style lang=&quot;scss&quot; scoped&gt;
.a</span><span class="token punctuation">{</span>
 <span class="token selector">::v-deep .b</span> <span class="token punctuation">{</span> 
  <span class="token comment">/* ... */</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
 
<span class="token selector">::v-deep .v-text-field .v-text-field--enclosed .v-text-field__details</span> <span class="token punctuation">{</span>
  <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 8px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0px <span class="token important">!important</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),l=[p];function c(i,d){return n(),e("div",null,l)}const u=s(t,[["render",c],["__file","v-deep.html.vue"]]);export{u as default};