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

//上传文件
export function uploadFile({
	filePath,
	name = 'file',
	formData = {}
}) {
	return http.uploadFile({
		url: '/api/upload/upload',
		filePath: filePath,
		name: name,
		formData: formData
	});
}