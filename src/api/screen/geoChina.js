import request from '@/utils/request'

const api = {
  getInfo:'/api/',
}

export function getInfo () {
  return request({
    url: api.getInfo,
    method: 'get',
  })
}