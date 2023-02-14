const Layout = () => import(/* webpackChunkName: "layout" */ '@/layout/Index.vue')
const scenarioRouter = {
  path: '/scenario',
  component: Layout,
  redirect: '/scenario/overview',
  meta: {
    title: '想定基础信息',
    icon: 'el-icon-s-flag'
  },
  children: [

    {
      path: 'overview',
      name: 'Overview',
      component: () => import('@/views/scenario/Overview.vue'),
      meta: {
        title: '想定概览'
      },
    },
    // {
    //   path: 'overview',
    //   name: 'Overview',
    //   component: () => import('@/views/scenario/Overview.vue'),
    //   meta: {
    //     title: '想定概览'
    //   },
    // },
    {
      path: 'step',
      name: 'Step',
      component: () => import('@/views/scenario/Step.vue'),
      meta: {
        title: '想定基本信息'
      },
      hidden: true
    },
    // {
    //   path: 'basic-info',
    //   name: 'BasicInfo',
    //   component: () => import('@/views/scenario/components/BasicInfo.vue'),
    //   meta: {
    //     title: '想定基本信息'
    //   },
    //   hidden: true
    // },
    // {
    //   path: 'camp',
    //   name: 'Camp',
    //   component: () => import('@/views/scenario/Camp.vue'),
    //   meta: {
    //     title: '阵营基本信息'
    //   },
    // },
    // {
    //   path: 'formation',
    //   name: 'PowerFormation',
    //   component: () => import('@/views/scenario/PowerFormation.vue'),
    //   meta: {
    //     title: '力量编成'
    //   },
    // },
    // {
    //   path: 'deployment',
    //   name: 'PowerDeployment',
    //   component: () => import('@/views/scenario/PowerDeployment.vue'),
    //   meta: {
    //     title: '力量设施部署'
    //   },
    // },
  ]
}
export default scenarioRouter