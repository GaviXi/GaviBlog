import{_ as t,p,q as o,s as n,R as s,t as e,Y as c,n as l}from"./framework-e1bed10d.js";const i={},u=c(`<h1 id="关于小程序中多个函数并发修改同一条数据" tabindex="-1"><a class="header-anchor" href="#关于小程序中多个函数并发修改同一条数据" aria-hidden="true">#</a> 关于小程序中多个函数并发修改同一条数据</h1><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>开发小程序的时候，遇到了如下情况：多个函数可能存在并发修改同一条数据的情况。</p><p>修改操作如下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> db <span class="token operator">=</span> cloud<span class="token punctuation">.</span><span class="token function">database</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> _ <span class="token operator">=</span> db<span class="token punctuation">.</span>command<span class="token punctuation">;</span>
db<span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">&#39;xxx&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">doc</span><span class="token punctuation">(</span><span class="token string">&#39;yyy&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
              <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">order</span><span class="token operator">:</span> _<span class="token punctuation">.</span><span class="token function">pull</span><span class="token punctuation">(</span>zzz<span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
              console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
              console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里我们对数据库进行更新操作，使用 <code>$pull</code>操作符删除order字段中的某个元素（且该元素不会存在重复值，原因是order是对象数组，我们在每个对象里面存的值也不一样）</p><p>那么在这样的情况下，会存在冲突的现象吗？</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论</h2><p>如果第一个操作删除了该元素之后，第二个操作在检查到初始状态时仍认为存在匹配元素，当第二个操作尝试删除时，由于实际上该元素已被删除，可能会导致错误。</p><p>因此，在同时有两个操作在同一个数组字段上使用 <code>$pull</code> 操作符删除同一个元素，并且该元素在数组字段上只有一个的情况下，存在潜在的冲突风险。</p><h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h2><p>为了避免这种冲突，可以考虑使用事务或锁机制来处理并发删除冲突。</p><p>首先介绍一下锁机制的做法，代码如下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 云函数代码示例（concurrentDelete）</span>
<span class="token keyword">const</span> cloud <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;wx-server-sdk&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
cloud<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

exports<span class="token punctuation">.</span><span class="token function-variable function">main</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">event<span class="token punctuation">,</span> context</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> db <span class="token operator">=</span> cloud<span class="token punctuation">.</span><span class="token function">database</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> _ <span class="token operator">=</span> db<span class="token punctuation">.</span>command<span class="token punctuation">;</span>
  <span class="token keyword">const</span> collection <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">&#39;myCollection&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> docId <span class="token operator">=</span> event<span class="token punctuation">.</span>docId<span class="token punctuation">;</span> <span class="token comment">// 要删除的数据的 _id</span>

  <span class="token comment">// 尝试获取锁标记</span>
  <span class="token keyword">const</span> lock <span class="token operator">=</span> <span class="token keyword">await</span> collection<span class="token punctuation">.</span><span class="token function">doc</span><span class="token punctuation">(</span>docId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>lock<span class="token punctuation">.</span>data <span class="token operator">&amp;&amp;</span> lock<span class="token punctuation">.</span>data<span class="token punctuation">.</span>isDeleting<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 存在锁标记，其他函数正在删除该数据，放弃删除操作</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">success</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">&#39;数据正在删除中，请稍后再试&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token comment">// 添加锁标记</span>
    <span class="token keyword">await</span> collection<span class="token punctuation">.</span><span class="token function">doc</span><span class="token punctuation">(</span>docId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">isDeleting</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 执行删除操作</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> collection<span class="token punctuation">.</span><span class="token function">doc</span><span class="token punctuation">(</span>docId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token literal-property property">order</span><span class="token operator">:</span> _<span class="token punctuation">.</span><span class="token function">pull</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>zzz<span class="token punctuation">)</span>
                      <span class="token punctuation">}</span>
    			<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 删除完成后释放锁标记</span>
    <span class="token keyword">await</span> collection<span class="token punctuation">.</span><span class="token function">doc</span><span class="token punctuation">(</span>docId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">isDeleting</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">success</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> result <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 发生错误时也需要释放锁标记</span>
    <span class="token keyword">await</span> collection<span class="token punctuation">.</span><span class="token function">doc</span><span class="token punctuation">(</span>docId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">isDeleting</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">throw</span> error<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在云函数中，首先尝试获取锁标记。如果锁标记存在，表示其他函数正在删除该数据，当前函数放弃删除操作。如果锁标记不存在，则添加锁标记，并执行删除操作。删除完成后释放锁标记。当函数发生错误时也需要释放锁标记，以确保数据的一致性。</p><p>在多个函数中调用并发删除的云函数：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 函数A调用并发删除的云函数</span>
wx<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span><span class="token function">callFunction</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;concurrentDelete&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">docId</span><span class="token operator">:</span> <span class="token string">&#39;xxx&#39;</span> <span class="token comment">// 要删除的数据的 _id</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>result<span class="token punctuation">.</span>success<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;函数A删除成功&#39;</span><span class="token punctuation">,</span> res<span class="token punctuation">.</span>result<span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;函数A删除失败&#39;</span><span class="token punctuation">,</span> res<span class="token punctuation">.</span>result<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">fail</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;函数A调用失败&#39;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 函数B调用并发删除的云函数</span>
wx<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span><span class="token function">callFunction</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;concurrentDelete&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">docId</span><span class="token operator">:</span> <span class="token string">&#39;xxx&#39;</span> <span class="token comment">// 要删除的数据的 _id</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>result<span class="token punctuation">.</span>success<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;函数B删除成功&#39;</span><span class="token punctuation">,</span> res<span class="token punctuation">.</span>result<span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;函数B删除失败&#39;</span><span class="token punctuation">,</span> res<span class="token punctuation">.</span>result<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">fail</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;函数B调用失败&#39;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过调用并发删除的云函数，确保在任意时间点只有一个函数成功删除数据，其他函数会放弃删除操作。</p><p>除了锁机制，还可以使用事务操作来确保多个删除操作的一致性。事务操作可以将多个操作作为一个原子性的单元执行，从而保证操作的顺序和结果的一致性。</p><p>下面介绍使用事务的做法，代码如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//runTransaction接口</span>
<span class="token keyword">const</span> db <span class="token operator">=</span> wx<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span><span class="token function">database</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> collection <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">&#39;myCollection&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

db<span class="token punctuation">.</span><span class="token function">runTransaction</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token parameter">transaction</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> doc <span class="token operator">=</span> <span class="token keyword">await</span> transaction<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>collection<span class="token punctuation">.</span><span class="token function">doc</span><span class="token punctuation">(</span><span class="token string">&#39;xxx&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 从数组中删除元素</span>
  <span class="token keyword">const</span> updatedArray <span class="token operator">=</span> doc<span class="token punctuation">.</span>data<span class="token punctuation">.</span>arrayField<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">element</span> <span class="token operator">=&gt;</span> element <span class="token operator">!==</span> <span class="token string">&#39;element&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 更新数组字段</span>
  transaction<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>collection<span class="token punctuation">.</span><span class="token function">doc</span><span class="token punctuation">(</span><span class="token string">&#39;xxx&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">arrayField</span><span class="token operator">:</span> updatedArray
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;事务执行成功&#39;</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;事务执行失败&#39;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用事务操作时，需要将多个操作封装在一个函数内，并使用 <code>runTransaction</code> 方法来执行事务。在事务函数中，可以获取并操作要更新的数据，并通过 <code>transaction.update</code> 方法更新数组字段。</p><p>你也可以通过startTransaction接口来实现</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 云函数代码示例（concurrentDelete）</span>
<span class="token keyword">const</span> cloud <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;wx-server-sdk&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
cloud<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

exports<span class="token punctuation">.</span><span class="token function-variable function">main</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">event<span class="token punctuation">,</span> context</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> db <span class="token operator">=</span> cloud<span class="token punctuation">.</span><span class="token function">database</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> collection <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">&#39;myCollection&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> docId <span class="token operator">=</span> event<span class="token punctuation">.</span>docId<span class="token punctuation">;</span> <span class="token comment">// 要删除的数据的 _id</span>

  <span class="token keyword">const</span> transaction <span class="token operator">=</span> <span class="token keyword">await</span> db<span class="token punctuation">.</span><span class="token function">startTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> transaction<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> collection<span class="token punctuation">.</span><span class="token function">doc</span><span class="token punctuation">(</span>docId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">await</span> transaction<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> transaction<span class="token punctuation">.</span><span class="token function">rollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">throw</span> error<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用事务操作可以保证多个删除操作在同一事务中执行，从而避免并发删除冲突，并确保操作的一致性。</p>`,25),r={href:"https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/transaction.html",target:"_blank",rel:"noopener noreferrer"};function k(d,v){const a=l("ExternalLinkIcon");return p(),o("div",null,[u,n("p",null,[s("关于更多事务的细节，"),n("a",r,[s("可以去官方文档查看"),e(a)])])])}const b=t(i,[["render",k],["__file","lock_and_transaction.html.vue"]]);export{b as default};