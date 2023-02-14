import request from "@/utils/axios.js";

//指挥-查询所有人员
export const commandStaffFindAll = (data) => {
  return request({
    url: 'commandstaff/findAll',
    method: 'get',
    data
  })
}
//指挥-添加指挥人员
export const commandStaffSave = (data) => {
  return request({
    url: 'commandstaff/save',
    method: 'post',
    data
  })
}
//指挥-修改指挥人员
export const commandStaffUpdate = (data) => {
  return request({
    url: 'commandstaff/update',
    method: 'post',
    data
  })
}
//通讯-查询通讯人员
export const communicationFindById = (data) => {
  return request({
    url: 'communicationrelationships/findById',
    method: 'get',
    data
  })
}
//通讯-添加通讯人员
export const communicationSave = (data) => {
  return request({
    url: 'communicationrelationships/save',
    method: 'get',
    data
  })
}
//通讯-修改通讯人员
export const communicationUpdate = (data) => {
  return request({
    url: 'communicationrelationships/update',
    method: 'get',
    data
  })
}
//通讯-删除通讯人员
export const communicationRemove = (data) => {
  return request({
    url: 'communicationrelationships/remove',
    method: 'get',
    data
  })
}
//阵营-查询所有阵营
export const campFindAll = (data) => {
  return request({
    url: 'camp/findAll',
    method: 'get',
    data
  })
}
//阵营-删除阵营信息
export const campRemove = (data) => {
  return request({
    url: 'camp/remove',
    method: 'get',
    data
  })
}
//阵营-新增阵营信息
export const campSave = (data) => {
  return request({
    url: 'camp/save',
    method: 'post',
    data
  })
}
//阵营-修改阵营信息
export const campUpdate = (data) => {
  return request({
    url: 'camp/update',
    method: 'post',
    data
  })
}
//阵营关系-查询所有阵营关系
export const campRelationShipFindAll = (data) => {
  return request({
    url: 'camprelationship/findAll',
    method: 'get',
    data
  })
}
//阵营关系-删除阵营关系
export const campRelationShipRemove = (data) => {
  return request({
    url: 'camprelationship/remove',
    method: 'post',
    data
  })
}
//阵营关系-新增阵营关系
export const campRelationShipSave = (data) => {
  return request({
    url: 'camprelationship/save',
    method: 'post',
    data
  })
}
//阵营关系-修改阵营关系
export const campRelationShipUpdate = (data) => {
  return request({
    url: 'camprelationship/update',
    method: 'post',
    data
  })
}
