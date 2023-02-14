const Layout = () => import(/* webpackChunkName: "layout" */ '@/layout/Index.vue')
const orgRouter = {
  path: '/org',
  component: Layout,
  redirect: '/org/groups',
  meta: {
    title: '组织结构',
    icon: 'el-icon-s-grid'
  },
  children: [
    {
      path: 'marshal',
      name: 'GroupList',
      component: () => import('@/views/organization/List.vue'),
      meta: {
        title: '组织编组'
      },
    },

    // {
    //   path: 'groups/:id',
    //   name: 'GroupSeats',
    //   component: () => import('@/views/organization/GroupSeats.vue'),
    //   meta: {
    //     title: '组织编组与席位配置'
    //   },
    //   hidden: true
    // },
    // {
    //   path: 'list',
    //   name: 'GroupList',
    //   component: () => import('@/views/organization/List.vue'),
    //   meta: {
    //     title: '组织编组'
    //   },
    // },
    // {
    //   path: 'groups/1',
    //   name: 'GroupSeats',
    //   component: () => import('@/views/organization/GroupSeats.vue'),
    //   meta: {
    //     title: '组织编组与席位配置'
    //   },
    // },
    // {
    //   path: 'groups/2',
    //   name: 'SeatsAuthority',
    //   component: () => import('@/views/organization/GroupSeats.vue'),
    //   meta: {
    //     title: '席位权限配置'
    //   },
    // },
    // {
    //   path: 'groups/3',
    //   name: 'CommunicationRelationship',
    //   component: () => import('@/views/organization/GroupSeats.vue'),
    //   meta: {
    //     title: '通讯关系配置'
    //   },
    // },
    // // {
    // //   path: 'authority',
    // //   name: 'SeatsAuthority',
    // //   component: () => import('@/views/organization/SeatsAuthority.vue'),
    // //   meta: {
    // //     title: '席位权限配置'
    // //   },
    // // },
    // // {
    // //   path: 'relationship',
    // //   name: 'CommunicationRelationship',
    // //   component: () => import('@/views/organization/CommunicationRelationship.vue'),
    // //   meta: {
    // //     title: '通讯关系配置'
    // //   },
    // // },
  ]
}
export default orgRouter