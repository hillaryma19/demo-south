import request from "@/utils/axios.js";

// 想定-查询所有想定
export const scenarioFindAll = (params) => {
  return request({
    url: 'scenario/findAll',
    method: 'get',
    params: params,
  })
}
// 想定-通过id查询想定详细信息
export const scenarioInfoById = (id) => {
  return request({
    url: `scenario/info/${id}`,
    method: 'get',
  })
}
// 想定-删除想定信息
export const scenarioRemove = (data) => {
  return request({
    url: 'scenario/remove',
    method: 'post',
    data
  })
}
// 想定-新增想定信息
export const scenarioSave = (data) => {
  return request({
    url: 'scenario/save',
    method: 'post',
    data
  })
}
// 想定-修改想定信息
export const scenarioUpdate = (data) => {
  return request({
    url: 'scenario/update',
    method: 'post',
    data
  })
}
// 想定-模糊查询带分页
export const scenarioFindFuzzy = (data) => {
  return request({
    url: 'scenario/findFuzzy',
    method: 'post',
    data
  })
}

// 想定力量-查询所有设施
export const scenarioPowerFindAll = (params) => {
  return request({
    url: 'scenario/findAll',
    method: 'get',
    params: params,
  })
}
// 想定力量-通过id查询设施详细信息
export const scenarioPowerInfoById = (id) => {
  return request({
    url: `scenario/info/${id}`,
    method: 'get',
  })
}
// 想定力量-删除想定力量
export const scenarioPowerRemove = (data) => {
  return request({
    url: 'scenariopower/remove',
    method: 'post',
    data
  })
}
// 想定力量-新增想定力量
export const scenarioPowerSave = (data) => {
  return request({
    url: 'scenariopower/save',
    method: 'post',
    data
  })
}
// 想定力量-修改想定力量
export const scenarioPowerUpdate = (data) => {
  return request({
    url: 'scenariopower/update',
    method: 'post',
    data
  })
}
// 想定方案-查询所有方案
export const schemeFindAll = (params) => {
  return request({
    url: 'scheme/findByCampId',
    method: 'get',
    params: params,
  })
}
// 想定方案-删除想定方案
export const schemeRemove = (data) => {
  return request({
    url: 'scheme/remove',
    method: 'post',
    data
  })
}
// 想定方案-新增想定方案
export const schemeSave = (data) => {
  return request({
    url: 'scheme/save',
    method: 'post',
    data
  })
}
// 想定方案-修改想定方案
export const schemeUpdate = (data) => {
  return request({
    url: 'scheme/update',
    method: 'post',
    data
  })
}
// 想定编程-查询by id
export const programmingFindByScenarioId = (params) => {
  return request({
    url: 'scenarioprogramming/findByScenarioId',
    method: 'get',
    params: params,
  })
}
// 想定编程-删除想定编程
export const programmingRemove = (data) => {
  return request({
    url: 'scenarioprogramming/remove',
    method: 'post',
    data
  })
}
// 想定编程-新增想定编程
export const programmingSave = (data) => {
  return request({
    url: 'scenarioprogramming/save',
    method: 'post',
    data
  })
}
// 想定编程-修改想定编程
export const programmingUpdate = (data) => {
  return request({
    url: 'scenarioprogramming/update',
    method: 'post',
    data
  })
}