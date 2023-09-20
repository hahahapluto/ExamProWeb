import { createRouter, createWebHashHistory } from 'vue-router'
// 创建路由对象
const router = createRouter({
  // 通过 history 属性，指定路由的工作模式
  history: createWebHashHistory(),
  // 通过 routes 数组，指定路由规则
  // path 是 hash 地址，component 是要展示的组件
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/index.vue')
    }
  ]
})

// 声明全局的导航守卫
// router.beforeEach((to, from, next) => {
//   // 如果用户访问登录页直接放行
//   if (to.path === "/login") return next();
//   const token = sessionGetData("token"); // 读取token
//   // 没有 token 直接跳转回 login 页面
//   if (!token) return next("/login");
//   next();
// });

// 向外共享路由对象
export default router
