import{_ as n,p as s,q as a,Y as p}from"./framework-e1bed10d.js";const t={},c=p(`<h1 id="小程序首页js文件等待app-js执行完成后才执行" tabindex="-1"><a class="header-anchor" href="#小程序首页js文件等待app-js执行完成后才执行" aria-hidden="true">#</a> 小程序首页js文件等待app.js执行完成后才执行</h1><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>在开发小程序时，需要实现如下需求：</p><p>小程序首页js文件等待<code>app.js</code>执行完成后才执行，其中<code>app.js</code>中存在耗时操作</p><h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h2><p>1.异步加载：将耗时操作放在一个异步函数中，并在<code>app.js</code>中执行。在异步函数中，可以使用<code>Promise</code>对象来控制执行的顺序和等待时间。然后，在小程序首页的<code>js</code>文件中使用<code>Promise</code>来等待<code>app.js</code>中的异步函数执行完成后再继续执行。例如：</p><p>在<code>app.js</code>中：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">timeConsumingOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 耗时操作</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;耗时操作执行完成&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 假设耗时操作需要3秒</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">onLaunch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">timeConsumingOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;app.js中的耗时操作执行完成&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在小程序首页的<code>js</code>文件中：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">getApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">Page</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">onLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    app<span class="token punctuation">.</span><span class="token function">timeConsumingOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;首页的js文件中的代码执行&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.使用回调函数：在<code>app.js</code>中定义一个回调函数，并将回调函数作为参数传递给耗时操作的函数。在耗时操作完成后，调用回调函数。然后，在小程序首页的<code>js</code>文件中调用耗时操作的函数，并传入一个回调函数来处理操作完成后的逻辑。例如：</p><p>在<code>app.js</code>中：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">timeConsumingOperation</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 耗时操作</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;耗时操作执行完成&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 假设耗时操作需要3秒</span>
<span class="token punctuation">}</span>

<span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">onLaunch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">timeConsumingOperation</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;app.js中的耗时操作执行完成&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在小程序首页的<code>js</code>文件中：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">getApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">Page</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">onLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    app<span class="token punctuation">.</span><span class="token function">timeConsumingOperation</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;首页的js文件中的代码执行&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.使用全局变量或状态管理工具：在<code>app.js</code>中设置一个全局变量或使用状态管理工具（如<code>Redux</code>、<code>Vuex</code>等）来标识耗时操作的完成状态。在小程序首页的<code>js</code>文件中通过监听全局变量的变化或使用状态管理工具的订阅机制来执行相应的逻辑。</p><p>在<code>app.js</code>中：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">globalData</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">operationComplete</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 初始状态为未完成</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">onLaunch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 耗时操作</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;耗时操作执行完成&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>globalData<span class="token punctuation">.</span>operationComplete <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 假设耗时操作需要3秒</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在小程序首页的<code>js</code>文件中：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">Page</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">onLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">getApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> checkOperationStatus <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>app<span class="token punctuation">.</span>globalData<span class="token punctuation">.</span>operationComplete<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">clearInterval</span><span class="token punctuation">(</span>checkOperationStatus<span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;首页的js文件中的代码执行&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 每100毫秒检查一次状态变化</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),o=[c];function e(i,u){return s(),a("div",null,o)}const k=n(t,[["render",e],["__file","wait_appJs.html.vue"]]);export{k as default};