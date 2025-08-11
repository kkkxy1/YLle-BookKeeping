// api/index.js

import http from '@/utils/request'; 

//微信登录
export function wechatLogin(data) {
    return http.post('/api/auth/wechat-login', data);
}

//保存用户信息
export function updateUserInfo(data) {
    return http.post('/api/auth/update-info', data);
}

// 示例：获取用户信息接口
// export function getUserInfo() {
//     return http.get('/api/user/info'); // 假设获取用户信息接口是 /api/user/info
// }

// 示例：更新用户信息接口
// export function updateUserInfo(data) {
//     return http.put('/api/user/info', data); // 假设更新用户信息接口是 /api/user/info
// }

// 示例：删除用户接口
// export function deleteUser(id) {
//     return http.del(`/api/user/${id}`); // 假设删除用户接口是 /api/user/{id}
// }

// ... 其他 API 接口