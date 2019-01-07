# @lydxwj/vue-fullpage

#### 安装

```
npm install @lydxwj/vue-fullpage --save
```

#### 使用

```
// 入口文件
import FullPage from '../src/index.js'
Vue.use(FullPage);
```

```
// 项目中文件
<template>
  <PageContainer @onChange="onChange" @onChangeEnd="onChangeEnd">
    <Pages :sty="{
      backgroundColor: '#51eabe',
    }">
      <div>第一</div>
    </Pages>
    <Pages :sty="{
      backgroundColor: '#f4ea2a',
    }">
      <div>第二</div>
    </Pages>
    <Pages :sty="{
      backgroundColor: '#1afa29',
    }">
      <div>第三</div>
    </Pages>
    <Pages :sty="{
      backgroundColor: '#1296db',
    }" :againCof="{
      isShow: true,
      text: '重播'
    }" @again="again">
      <div>第四</div>
    </Pages>
  </PageContainer>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    onChange: (nowIdx, newIdx) => {
      console.log(nowIdx);
      console.log(newIdx);
    },
    onChangeEnd: (nowIdx) => {
      console.log(nowIdx);
    },
    again: () => {
      console.log('重播');
    },
  },
};
</script>
<style lang="stylus" scoped>
</style>
```

#### 组件介绍

```
<PageContainer></PageContainer>
<Pages></Pages>
// PageContainer翻页组件盒子,用于嵌套Pages，Pages单个翻页组件
```

#### 组件配置

- PageContainer

| 配置项      | 介绍                 | 参数/默认值                                  |
| ----------- | -------------------- | -------------------------------------------- |
| onChange    | 页面翻转前回调       | nowIdx（当前页索引）, newIdx（翻转页页索引） |
| onChangeEnd | 页面翻转后回调       | nowIdx（当前页索引）                         |
| isArrow     | 是否显示下滑提示箭头 | true（默认值）                               |
| isNav       | 是否显示指示器       | true（默认值）                               |
| sty         | 样式对象             | 建议不设置height、width                      |

```
// PageContainer里面嵌套Pages来使用
<PageContainer>
  <Pages></Pages>
</PageContainer>
```

- Pages

| 配置项   | 介绍     | 参数/默认值                                      |
| -------- | -------- | ------------------------------------------------ |
| againCof | 回看配置 | {  isShow: true,//是否显示 text: '', //文案配置} |
| again    | 回看回调 | 无                                               |
| sty      | 样式对象 | 建议不设置height、width                          |

```
// Pages可以嵌套自己想要的页面内容
<Pages>
  <div>页面内容</div>
</Pages>
```

说明: 仅支持移动端

[react版本](https://github.com/lydxwj/lydxwj-react-fullpage)

### 如果有问题欢迎交流