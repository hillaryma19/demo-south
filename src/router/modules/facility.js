const Layout = () => import(/* webpackChunkName: "layout" */ '@/layout/Index.vue')
const facilityRouter = {
  path: '/facility',
  component: Layout,
  redirect: '/facility/list',
  meta: {
    title: '设施管理',
    icon: 'el-icon-data-line'
  },
  children: [
    {
      path: 'list',
      name: 'FacilityList',
      component: () => import('@/views/facility/List.vue'),
      meta: {
        title: '设施管理'
      },
    },
  ]
}
export default facilityRouter