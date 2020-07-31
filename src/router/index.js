import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../views/login/Login.vue'], resolve)
  },
  {
    path: '/index',
    name: 'index',
    component: resolve => require(['../views/index/Index.vue'], resolve)
  },
  {
    path: '/agreement',
    name: 'agreement',
    component: resolve => require(['../views/agreement/Agreement.vue'], resolve)
  },
  {
    path: '/addApply',
    name: 'addApply',
    component: resolve => require(['../views/add-apply/AddApply.vue'], resolve)
  },
  {
    path: '/applyMap',
    name: 'map',
    component: resolve => require(['../views/map/Map.vue'], resolve)
  },
  {
    path: '/commitLetter',
    name: 'commitLetter',
    component: resolve => require(['../views/commit-letter/CommitLetter.vue'], resolve)
  },
  {
    path: '/applyFinished',
    name: 'applyFinished',
    component: resolve => require(['../views/apply-finished/ApplyFinished.vue'], resolve)
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router