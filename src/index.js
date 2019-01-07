import PageContainer from './packages/page_container/index.js';
import Pages from './packages/pages/index.js';

const components = [
  PageContainer,
  Pages
]

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  PageContainer,
  Pages
}