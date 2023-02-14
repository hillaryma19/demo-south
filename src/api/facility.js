import request from "@/utils/axios.js";

// 设施-查询所有设施
export const facilityFindAll = (params) => {
  return request({
    url: 'facility/findAll',
    method: 'get',
    params: params,
  })
}
// 设施-通过id查询设施详细信息
export const facilityInfoById = (id) => {
  return request({
    url: `facility/info/${id}`,
    method: 'get',
  })
}
// 设施-删除设施信息
export const facilityRemove = (data) => {
  return request({
    url: 'facility/remove',
    method: 'post',
    data
  })
}
// 设施-新增设施信息
export const facilitySave = (data) => {
  return request({
    url: 'facility/save',
    method: 'post',
    data
  })
}
// 设施-修改设施信息
export const facilityUpdate = (data) => {
  return request({
    url: 'facility/update',
    method: 'post',
    data
  })
}
