import Router from 'vue-router'
import orgRouter from './modules/organization.js'
import scenarioRouter from './modules/scenario.js'
import schemesRouter from './modules/schemes.js'
import facilityRouter from './modules/facility.js'

const Layout = () => import('@/layout/Index.vue')
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/scenario/overview',
    hidden: false
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登录'
    },
    hidden: true
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/openlayers/Index.vue'),
    meta: {
      title: '地图'
    },
    hidden: true
  },
  scenarioRouter,
  orgRouter,
  // schemesRouter,
  facilityRouter,
]

const createRouter = () => {
  return new Router({
    mode: 'hash',
    routes: constantRoutes,
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-class',
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 }
      }
    }
  })
}

const router = createRouter();

//获取原型对象上的push函数
const originalPush = Router.prototype.push;
//修改原型对象中的push方法
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
export default router;