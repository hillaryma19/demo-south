import { Message } from 'element-ui'
import router from './router/index.js';
import { getCookie, removeCookie } from './utils/cookie';

const whiteList = ['/login'];
router.beforeEach(async (to, from, next) => {
  let token = getCookie('token')
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      try {
        next()
      } catch (error) {
        // remove token and go to login page to re-login
        removeCookie('token')
        Message.error(error || 'Has Error')
        next('/login')
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})