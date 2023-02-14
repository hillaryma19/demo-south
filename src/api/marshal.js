import request from "@/utils/axios.js";

// 编组-查询所有编组
export const marshalFindAll = (params) => {
    return request({
        url: 'marshal/findAll',
        method: 'get',
        params: params,
    })
}
// 编组-通过id查询编组详细信息
// export const facilityInfoById = (id) => {
//     return request({
//         url: `facility/info/${id}`,
//         method: 'get',
//     })
// }
//编组-删除想定编组
export const marshalRemove = (data) => {
    return request({
        url: 'marshal/remove',
        method: 'post',
        data
    })
}
// 编组-新增想定编组
export const marshalSave = (data) => {
    return request({
        url: 'marshal/save',
        method: 'post',
        data
    })
}
// 编组-修改想定编组
export const marshalUpdate = (data) => {
    return request({
        url: 'marshal/update',
        method: 'post',
        data
    })
}
