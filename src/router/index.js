import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)
let originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [{
  path: '/',
  component: Index,
  children: [{
      name: "Home",
      path: '/',
      component: () => import('../views/home'),
      meta: {
        index: 0
      }
    },
    {
      name: "test1",
      path: 'Test1',
      component: () => import('../views/test/test1'),
      meta: {
        title: "Test1",
        index: 1
      }
    }, {
      name: "test2",
      path: 'Test2',
      component: () => import('../views/test/test2'),
      meta: {
        title: "Test2",
        index: 2
      }
    }, {
      name: "test3",
      path: 'Test3',
      component: () => import('../views/test/test3'),
      meta: {
        title: "Test3",
        index: 3
      }
    }, {
      path: 'dept',
      component: () => import('../views/dept/index.vue'),
      children: [{
        name: "部門管理",
        path: "deptlist",
        component: () => import('../views/dept/deptlist.vue'),
        meta: {
          index: 4
        }
      }]

    }, {
      path: 'position',
      component: () => import('../views/position/index.vue'),
      children: [{
        name: "職位管理",
        path: "positionlist",
        component: () => import('../views/position/positionlist.vue'),
      }]

    },
    {
      path: 'staff',
      component: () => import('../views/staff/index.vue'),
      children: [{
        name: "員工信息",
        path: "stafflist",
        component: () => import('../views/staff/stafflist.vue'),
      }]

    },
    {
      path: 'user',
      component: () => import('../views/user/index.vue'),
      children: [{
        name: "用戶管理",
        path: "userlist",
        component: () => import('../views/user/userlist.vue'),
      }]

    },
    {
      path: 'usergp',
      component: () => import('../views/usergp/index.vue'),
      children: [{
        name: "用戶組管理",
        path: "usergplist",
        component: () => import('../views/usergp/usergplist.vue'),
      }]

    },
    {
      path: 'holiday',
      component: () => import('../views/holiday/index.vue'),
      children: [{
        name: "假期管理",
        path: "holidaylist",
        component: () => import('../views/holiday/holidaylist.vue'),
      }]
    },
    {
      path: 'area',
      component: () => import('../views/areas/index.vue'),
      children: [{
        name: "區域管理",
        path: "arealist",
        component: () => import('../views/areas/areaslist.vue'),
      }]
    },
    {
      path: 'patrolItem',
      component: () => import('../views/patrolItem/index.vue'),
      children: [{
        name: "巡查項管理",
        path: "patrolItemList",
        component: () => import('../views/patrolItem/patrolItemlist.vue'),
      }]
    }
  ]
}, {
  name: "login",
  path: '/login',
  component: () => import('../views/login')
}]


const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})



export default router