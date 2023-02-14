const Layout = () => import(/* webpackChunkName: "layout" */ '@/layout/Index.vue')
const schemesRouter = {
  path: '/schemes',
  component: Layout,
  redirect: '/schemes/plan-formulation',
  meta: {
    title: '方案与计划',
    icon: 'el-icon-date'
  },
  children: [
    {
      path: 'plan-formulation',
      name: 'PlanFormulation',
      component: () => import('@/views/schemes/PlanFormulation.vue'),
      meta: {
        title: '方案制定模块'
      },
    },
    {
      path: 'scheme-formulation',
      name: 'SchemeFormulation',
      component: () => import('@/views/schemes/SchemeFormulation.vue'),
      meta: {
        title: '计划制定模块'
      },
    },
  ]
}
export default schemesRouter