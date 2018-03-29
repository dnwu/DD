import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

const Login = () => import ('@/components/Login/Login')
const Index = () => import ('@/components/Index/Index')
const Order = () => import ('@/components/Index/Order/Order')
const Plan = () => import ('@/components/Index/Plan/Plan')
const PlanStep1 = () => import ('@/components/Index/Plan/PlanStep1')
const PlanStep2 = () => import ('@/components/Index/Plan/PlanStep2')
const PlanStep3 = () => import ('@/components/Index/Plan/PlanStep3')
const Result = () => import ('@/components/Index/Plan/Result')
const CarInfo = () => import('@/components/Index/Info/CarInfo')
const GoodsInfo = () => import('@/components/Index/Info/GoodsInfo')
const PositionInfo = () => import('@/components/Index/Info/PositionInfo')
const StaffInfo = () => import('@/components/Index/Info/StaffInfo')
const Monitor = () => import('@/components/Index/Monitor/Monitor')
const Form = () => import('@/components/Index/Form/Form')
const Center = () => import('@/components/Index/Center/Center')

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/index/Order',
      children: [
        {
          path: '/index/Order',
          component: Order
        },
        {
          path: '/index/plan',
          component: Plan
        },
        {
          path: '/index/planstep1',
          component: PlanStep1
        },
        {
          path: '/index/planstep2',
          component: PlanStep2
        },
        {
          path: '/index/planstep3',
          component: PlanStep3
        },
        {
          path: '/index/result',
          component: Result
        },
        {
          path: '/index/carinfo',
          component: CarInfo
        },
        {
          path: '/index/GoodsInfo',
          component: GoodsInfo
        },
        {
          path: '/index/PositionInfo',
          component: PositionInfo
        },
        {
          path: '/index/StaffInfo',
          component: StaffInfo
        },
        {
          path: '/index/Monitor',
          component: Monitor
        },
        {
          path: '/index/Form',
          component: Form
        },
        {
          path: '/index/Center',
          component: Center
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in if not, redirect to login page.
    // if (!auth.loggedIn()) {   next({     path: '/login',     query: { redirect:
    // to.fullPath }   }) } else {   next() }
  } else {
    next() // 确保一定要调用 next()
  }
})
export default router
