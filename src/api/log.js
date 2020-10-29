import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: '/log/list',
    method: 'get',
    params: params
  })
}

export function deleteLog(id) {
  return request({
    url: '/log/delete/' + id,
    method: 'post'
  })
}
