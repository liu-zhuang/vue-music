# vue-music

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# 文件说明

```
│  App.vue                             主页面
│  main.js                             启动文件
│  
├─api
│      config.js                       api通用参数配置
│      lyric.js                        获取歌词的api
│      rank.js                         获取排行榜的api
│      recommend.js                    获取推荐歌曲的api
│      search.js                       搜索的api
│      singer.js                       歌手的api
│      
├─base
│  ├─listview                          通用列表组件
│  │      listview.vue
│  │      
│  ├─loading                           通用loading组件
│  │      loading.gif
│  │      loading.vue
│  │      
│  ├─musiclist                         通用歌曲列表组件
│  │      musiclist.vue
│  │      
│  ├─scroll                            滚动组件
│  │      scroll.vue
│  │      
│  ├─slider                            幻灯片组件
│  │      slider.vue
│  │       
│  ├─songlist                          歌曲列表组件
│  │      first@2x.png
│  │      first@3x.png
│  │      second@2x.png
│  │      second@3x.png
│  │      songlist.vue
│  │      third@2x.png
│  │      third@3x.png
│  │      
│  └─suggest                           搜索结果组件
│          suggest.vue
│          
├─common
│  ├─fonts                             字体文件
│  │      .gitkeep 
│  │      music-icon.eot
│  │      music-icon.svg
│  │      music-icon.ttf
│  │      music-icon.woff
│  │      
│  ├─image                             图片文件
│  │      1default.png
│  │      default.png
│  │      
│  ├─js                                通用js
│  │      config.js                    定义一些常量
│  │      dom.js                       操作dom的js库（主要是动态设置样式时添加兼容性前缀)
│  │      fetch-jsonp.js               fetch-jsonp
│  │      mixin.js                     mixin
│  │      singer.js                    歌手相关操作
│  │      song.js                      歌曲相关操作
│  │      utility.js                   通用方法：打乱数组，简单实现节流（debounce）
│  │      
│  └─less                              样式文件
│          base.less              
│          icon.less
│          index.less
│          mixin.less
│          reset.less
│          variable.less
│          
├─components
│  ├─dissDetail						   推荐详情组件
│  │      dissDetail.vue
│  │      
│  ├─m-header                          头部组件
│  │      1logo@2x.png
│  │      1logo@3x.png
│  │      logo@2x.png
│  │      logo@3x.png
│  │      m-header.vue
│  │      
│  ├─player                            播放组件（最复杂的）
│  │      player.vue
│  │      
│  ├─progressBar                       播放进度条组件
│  │      progressBar.vue
│  │      
│  ├─rank                              排行榜组件
│  │      rank.vue
│  │      
│  ├─rankDetail                        排行榜详情
│  │      rankDetail.vue
│  │      
│  ├─recommend                         推荐列表组件
│  │      recommend.vue
│  │      
│  ├─search                            搜索页组件
│  │      search.vue
│  │      
│  ├─searchBox                         搜索框组件
│  │      searchBox.vue
│  │      
│  ├─singer                            歌手组件
│  │      singer.vue
│  │      
│  ├─singerDetail                      歌手详情组件
│  │      singerDetail.vue
│  │      
│  └─tab                               tab组件
│          tab.vue
│          
├─router                               路由设置
│      index.js
│      
└─store                                vuex设置
        action.js
        getters.js
        index.js
        mutation-types.js
        mutations.js
        state.js
```        

# 分支说明
各个分支记录了各个大模块开发的过程
1. [路由+顶部导航](https://github.com/liu-zhuang/vue-music/tree/%E8%B7%AF%E7%94%B1+%E9%A1%B6%E9%83%A8%E5%AF%BC%E8%88%AA)
2. [推荐页面](https://github.com/liu-zhuang/vue-music/tree/%E6%8E%A8%E8%8D%90%E9%A1%B5%E9%9D%A2)
3. [推荐歌曲详情](https://github.com/liu-zhuang/vue-music/tree/%E6%8E%A8%E8%8D%90%E6%AD%8C%E5%8D%95%E8%AF%A6%E6%83%85)
4. [歌手页面](https://github.com/liu-zhuang/vue-music/tree/%E6%AD%8C%E6%89%8B%E9%A1%B5%E9%9D%A2)
5. [歌手详情](https://github.com/liu-zhuang/vue-music/tree/%E6%AD%8C%E6%89%8B%E8%AF%A6%E6%83%85)
6. [歌曲播放](https://github.com/liu-zhuang/vue-music/tree/%E6%AD%8C%E6%9B%B2%E6%92%AD%E6%94%BE)
7. [排行榜](https://github.com/liu-zhuang/vue-music/tree/%E6%8E%92%E8%A1%8C%E6%A6%9C)
8. [搜索](https://github.com/liu-zhuang/vue-music/tree/%E6%90%9C%E7%B4%A2%E9%A1%B5)

