import request from '@/utils/request'

const api = {
  getInfo:'/setting/server/list/',
  getWarnList:'/setting/count_info/warning_event_list/',
  getWarnType:'/setting/count_info/warning_type_count/',
  getWeekCount:'/setting/count_info/type_week_count/',
  getCameraList:'/setting/count_info/camera_task_list/',
}

export function getInfo () {
  return request({
    url: api.getInfo,
    method: 'get',
  })
}

export function getWarnList () {
  return request({
    url: api.getWarnList,
    method: 'get',
  })
}

export function getWarnType () {
  return request({
    url: api.getWarnType,
    method: 'get',
  })
}

export function getWeekCount () {
  return request({
    url: api.getWeekCount,
    method: 'get',
  })
}

export function getCameraList () {
  return request({
    url: api.getCameraList,
    method: 'get',
  })
}