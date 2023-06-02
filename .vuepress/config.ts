import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "Gavi",
  base: "/Gavi_blog/",
  description: "get what you need",
  theme: recoTheme({
    // autoSetBlogCategories: true,
    // 自动将分类和标签添加至头部导航条
    // autoAddCategoryToNavbar: true,
    // autoSetSeries: true,
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "Gavi",
    authorAvatar: "/myhead.png",
    docsRepo: "https://github.com/vuepress-reco/vuepress-theme-reco-next",
    docsBranch: "main",
    docsDir: "example",
    lastUpdatedText: "",
    // series 为原 sidebar
    series: {
      // "/docs/theme-reco/": [
      //   {
      //     text: "module one",
      //     children: ["home", "theme"],
      //   },
      //   {
      //     text: "module two",
      //     children: ["api", "plugin"],
      //   },
      // ],
      "/docs/firstline/": [
        {
          title: "第一行代码第2版", //组名
          children: ["chapter2","chapter3","chapter4","chapter5","chapter6","chapter7","chapter8","chapter9","chapter10","chapter11","chapter12","chapter13","chapter14"],
        },
      ],
      "/blogs/front-end/css/": [
        {
          text: "CSS", //组名
          children: ["center", "el-icon", "unset", "rightAlignment"],
        },
      ],
      "/blogs/front-end/js/": [
        {
          text: "JS", //组名
          children: ["return_in_tryCatch"],
        },
      ],
      "/blogs/front-end/miniprogram/": [
        {
          text: "微信小程序", //组名
          children: ["setData","async_await_instance","async_await_Promise","button_style","route_parameter_passing"],
        },
      ],
      "/blogs/front-end/vue/": [
        {
          text: "Vue", //组名
          children: ["v-deep"],
        },
      ],
      "/blogs/python/": [
        {
          text: "python", //组名
          children: ["deepCopy"],
        },
      ],
      "/blogs/Android/": [
        {
          text: "Android开发", //组名
          children: [
            "connect_timed_out","ListView_Adapter","startActivityForResult","compress"],
        },
      ],
      "/blogs/Flutter/": [
        {
          text: "Flutter开发", //组名
          children: ["default_List_constructor", "Optional_parameter"],
        },
      ],
    },
    navbar: [
      { text: "Home", link: "/", icon: "Home" },
      {
        text: "大前端",
        children: [
          {
            text: "vue", link: "/blogs/front-end/vue/",
          },
          {
            text: "微信小程序", link: "/blogs/front-end/miniprogram/",
          },
          {
            text: "JS", link: "/blogs/front-end/js/",
          },
          {
            text: "CSS", link: "/blogs/front-end/css/",
          },
          { text: "Android", link: "/blogs/Android/" },
          { text: "Flutter", link: "/blogs/Flutter/" },
        ],
        icon: "Blog",
      },
      // {
      //   text: "客户端",
      //   children: [
      //     { text: "Android", link: "/blogs/Android/" },
      //     { text: "Flutter", link: "/blogs/Flutter/" },
      //   ],
      //   icon: "Catalog"
      // },
      {
        text: "其他",
        children: [{ text: "Python", link: "/blogs/python/" }],
        icon: "Catalog",
      },
      {
        text: "Docs",
        children: [
          { text: "第一行代码", link: "/docs/firstline/chapter2" },
          { text: "Flutter", link: "/docs/Flutter-APP/chapter1_exercise" },
        ],
        icon: "Document",
      },
    ],
    // bulletin: {
    //   body: [
    //     {
    //       type: "text",
    //       content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "QQ 群",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li>QQ群1：1037296104</li>
    //         <li>QQ群2：1061561395</li>
    //         <li>QQ群3：962687802</li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "GitHub",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "buttongroup",
    //       children: [
    //         {
    //           text: "打赏",
    //           link: "/docs/others/donate.html",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // valineConfig 配置与 1.x 一致
    // valineConfig: {
    //   appId: 'xxx',
    //   appKey: 'xxx',
    //   placeholder: '填写邮箱可以收到回复提醒哦！',
    //   verify: true, // 验证码服务
    //   // notify: true,
    //   recordIP: true,
    //   // hideComments: true // 隐藏评论
    // },
  }),
  // debug: true,
});
