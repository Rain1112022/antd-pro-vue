import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
// 路由的hash和history: 
// hash:不会向后台发送数据，不需要跟后端沟通
// history:会向后台发送数据请求
export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
