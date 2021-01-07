<<<<<<< HEAD
import VueRouter from 'vue-router';
import { createApp } from 'vue';
import hljs from 'highlight.js';
import docConfig from '../doc.config';
import { getLang } from '../util/lang';

const localLang = getLang();

function loadDoc (lang, path) {
  const docLang = lang;
  return resolve => require.ensure([], () => resolve(require(`../markdown${path}/${docLang}/index.md`)));
}

createApp().use(VueRouter);
=======
import { createRouter, createWebHashHistory } from 'vue-router';
import { nextTick } from 'vue';
import hljs from 'highlight.js';
import docConfig from '../doc.config';
>>>>>>> upstream/dev-vue@next

export const commonRoutes = [
  {
    path: '/',
    name: 'about',
    meta: {
      name: 'HomePage'
    },
    component: () => import('../markdown/nAbout/zh-CN/index.md')
  }
];

const componentRoutes = [];

const { navConfig } = docConfig;

navConfig.forEach(navItem => {
  navItem.groups.forEach(groupItem => {
    groupItem.list.forEach(item => {
      if (item.path !== '/') {
        componentRoutes.push({
          path: item.path,
          name: item.path.slice(1),
          meta: {
            name: item.path.slice(1)
          },
          component: item.component
        });
      }
    });
  });
});

const routes = componentRoutes.concat(commonRoutes);

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

router.afterEach(route => {
  nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
});

export default router;
