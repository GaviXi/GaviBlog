import{_ as n,p as s,q as a,Y as e}from"./framework-e1bed10d.js";const t={},p=e(`<h1 id="关于元素的水平居中和垂直居中" tabindex="-1"><a class="header-anchor" href="#关于元素的水平居中和垂直居中" aria-hidden="true">#</a> 关于元素的水平居中和垂直居中</h1><h2 id="水平居中" tabindex="-1"><a class="header-anchor" href="#水平居中" aria-hidden="true">#</a> 水平居中</h2><h3 id="_1-将元素设置成块级元素-利用margin居中" tabindex="-1"><a class="header-anchor" href="#_1-将元素设置成块级元素-利用margin居中" aria-hidden="true">#</a> 1.将元素设置成块级元素，利用margin居中</h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">img</span> <span class="token punctuation">{</span>
            <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-flex布局" tabindex="-1"><a class="header-anchor" href="#_2-flex布局" aria-hidden="true">#</a> <strong>2.flex布局</strong></h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.box1</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> aquamarine<span class="token punctuation">;</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-父元素设置text-align-center" tabindex="-1"><a class="header-anchor" href="#_3-父元素设置text-align-center" aria-hidden="true">#</a> <strong>3.父元素设置text-align：center</strong></h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.box1</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> aquamarine<span class="token punctuation">;</span>
            <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-定位" tabindex="-1"><a class="header-anchor" href="#_4-定位" aria-hidden="true">#</a> <strong>4.定位</strong></h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">img</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
            <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
            <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
            <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateX</span><span class="token punctuation">(</span>-50%<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="垂直居中" tabindex="-1"><a class="header-anchor" href="#垂直居中" aria-hidden="true">#</a> 垂直居中</h2><h3 id="_1-flex布局" tabindex="-1"><a class="header-anchor" href="#_1-flex布局" aria-hidden="true">#</a> <strong>1.flex布局</strong></h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.box1</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> aquamarine<span class="token punctuation">;</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>    <span class="token comment">/* 对单行弹性盒子模型使用可以使用 */</span>
            <span class="token comment">/* align-content: center;  通常使用该属性设置垂直居中，但是该属性对单行弹性盒子模型无效。（即：带有 flex-wrap: nowrap ,或者盒子中本来就只有一个元素）。*/</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>tip:CSS align-items属性将所有直接子节点上的align-self值设置为一个组。align-self属性设置项目在其包含块中在交叉轴方向上的对齐方式。</p><h3 id="_2-display-table-cell" tabindex="-1"><a class="header-anchor" href="#_2-display-table-cell" aria-hidden="true">#</a> <strong>2.display：table-cell</strong></h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.box1</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> aquamarine<span class="token punctuation">;</span>
            <span class="token property">display</span><span class="token punctuation">:</span> table-cell<span class="token punctuation">;</span>
            <span class="token property">vertical-align</span><span class="token punctuation">:</span> middle<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-定位" tabindex="-1"><a class="header-anchor" href="#_3-定位" aria-hidden="true">#</a> <strong>3.定位</strong></h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">img</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
            <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
            <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
            <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateY</span><span class="token punctuation">(</span>-50%<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-通过设置line-height等于元素高度可以使单行文字实现垂直居中。" tabindex="-1"><a class="header-anchor" href="#_4-通过设置line-height等于元素高度可以使单行文字实现垂直居中。" aria-hidden="true">#</a> 4.通过设置line-height等于元素高度可以使单行文字实现垂直居中。</h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
            <span class="token property">height</span><span class="token punctuation">:</span>30px<span class="token punctuation">;</span>
    		<span class="token property">line-height</span><span class="token punctuation">:</span>30px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),i=[p];function c(l,o){return s(),a("div",null,i)}const r=n(t,[["render",c],["__file","center.html.vue"]]);export{r as default};
