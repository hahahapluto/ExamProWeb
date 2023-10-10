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
      component: () => import('../views/index.vue'),
      children: [
        { path: '/index/examRegistration', name: '报名考试', component: () => import('../component/exam/examRegistration.vue') },
        { path: '/index/myExam', name: '我的考试', component: () => import('../component/exam/myExam.vue') },
        { path: '/index/myExamRecord', name: '考试记录', component: () => import('../component/exam/myExamRecord.vue') },
        { path: '/index/markPaper', name: '评分卷子', component: () => import('../component/mark/markPaper.vue') },
        { path: '/index/paper', name: '试卷管理', component: () => import('../component/paper/paper.vue') },
        {
          path: '/index/quesBank',
          name: '题库管理',
          component: () => import('../component/paper/quesBank.vue')
        },
        {
          path: '/index/question',
          name: '试题管理',
          component: () => import('../component/paper/question.vue'),
          children: [
            {
              path: '/index/question/add',
              name: '新增题目',
              component: () => import('../component/add/addQues.vue')
            }
          ]
        },
        { path: '/index/teaTopicPool', name: '老师的题目池管理', component: () => import('../component/paper/teaTopicPool.vue') },
        { path: '/index/topicPool', name: '题目池', component: () => import('../component/topic/topicPool.vue') },
        {
          path: '/index/addBanl',
          name: '新增题库',
          component: () => import('../component/add/addBank.vue')
        },
        { path: '/index/quesBank/add', name: '题目添加进题库', component: () => import('../component/paper/bank/addQuesInBank.vue') },
        { path: '/index/exam', name: '考试管理', component: () => import('../component/paper/exam.vue') }
      ]
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
