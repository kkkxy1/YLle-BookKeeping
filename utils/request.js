const BASE_URL = 'https://alqrfdhqjmmn.sealoshzh.site';

// 默认请求头，可根据需要调整
const DEFAULT_HEADER = {
	'Content-Type': 'application/json'
};

// 请求拦截器 (可在此添加 token 等)
function requestInterceptor(config, isUpload = false) {
	// 显示loading
	uni.showLoading({
		title: '加载中...'
	});

	// 添加token
	const token = uni.getStorageSync('token');
	if (token) {
		config.header = {
			...config.header,
			Authorization: `Bearer ${token}`
		};
	}

	// 添加统一请求头
	if (!isUpload) {
		config.header = {
			...config.header,
			'Content-Type': 'application/json',
			'X-App-Version': '1.0.0',
			'X-Platform': uni.getSystemInfoSync().platform
		};
	}

	console.log('🚀 请求发送:', {
		url: config.url,
		method: config.method,
		data: config.data
	});

	return config;
}

// 响应拦截器 (可在此统一处理响应状态码、错误等)
function responseInterceptor(response) {
	// 隐藏loading
	uni.hideLoading();

	console.log('收到响应:', response);

	// 根据不同的状态码进行处理
	switch (response.statusCode) {
		case 200:
		case 201:
			// 请求成功，返回数据
			return response.data;

		case 401:
			// 未授权，token过期
			uni.showToast({
				title: '登录已过期，请重新登录',
				icon: 'none'
			});
			uni.removeStorageSync('token');
			// 跳转到登录页
			uni.redirectTo({
				url: '/pages/login/login'
			});
			return Promise.reject(response);

		case 403:
			// 禁止访问
			uni.showToast({
				title: '没有权限访问',
				icon: 'none'
			});
			return Promise.reject(response);

		case 404:
			// 资源不存在
			uni.showToast({
				title: '请求的资源不存在',
				icon: 'none'
			});
			return Promise.reject(response);

		case 500:
			// 服务器错误
			uni.showToast({
				title: '服务器内部错误',
				icon: 'none'
			});
			return Promise.reject(response);

		default:
			// 其他错误
			uni.showToast({
				title: response.data?.message || '请求失败',
				icon: 'none'
			});
			return Promise.reject(response);
	}
}

/**
 * 封装 uni.request
 * @param {Object} options - 请求选项，遵循 uni.request 的参数
 * @returns {Promise} - 返回 Promise 对象 [[1]]
 */
function request(options = {}) {
	// 合并基础配置
	const config = {
		url: '',
		method: 'GET', // 默认 GET 请求
		header: {
			...DEFAULT_HEADER
		},
		data: {},
		...options,
		url: BASE_URL + (options.url || '') // 拼接基础 URL
	};

	// 执行请求拦截器
	const interceptedConfig = requestInterceptor(config, false);

	// 返回 Promise 封装的请求 [[1]]
	return new Promise((resolve, reject) => {
		uni.request({
			...interceptedConfig,
			success: (res) => {
				// 执行响应拦截器
				const processedRes = responseInterceptor(res);
				resolve(processedRes);
			},
			fail: (err) => {
				console.error('网络请求失败:', err);
				uni.showToast({
					title: '网络请求失败',
					icon: 'none'
				});
				reject(err);
			}
		});
	});
}

/**
 * 封装 uni.uploadFile
 * @param {Object} options - 上传选项，遵循 uni.uploadFile 的参数，但 url 会自动拼接 BASE_URL
 * @param {string} options.url - 相对于 BASE_URL 的上传接口路径 (e.g., '/api/upload')
 * @param {string} options.filePath - 要上传文件资源的路径
 * @param {string} options.name - 文件对应的 key，开发者在服务器端通过这个 key 可以获取到文件二进制内容
 * @param {Object} [options.formData={}] - HTTP 请求中其他额外的 form data
 * @param {Object} [options.header={}] - HTTP 请求 Header, header 中不能设置 Referer
 * @returns {Promise} - 返回 Promise 对象，resolve 的是服务器返回的数据（已尝试 JSON.parse）
 */

function uploadFile(options = {}) {
	// 基础配置
	const baseConfig = {
		url: '',
		filePath: '',
		name: 'file', // 默认 name 为 'file'，与后端对应
		header: {
			...DEFAULT_HEADER
		},
		formData: {},
		...options,
		url: BASE_URL + (options.url || '') // 拼接基础 URL
	};

	// 执行请求拦截器 (标记为上传)
	const interceptedConfig = requestInterceptor(baseConfig, false);

	// 返回 Promise 封装的上传
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			...interceptedConfig, // 包含 url, filePath, name, header, formData
			success: (uploadRes) => {
				// 执行响应拦截器
				try {
					const processedRes = responseInterceptor(uploadRes);
					resolve(processedRes);
				} catch (error) {
					// 如果响应拦截器内部抛出错误（例如重定向），也应 reject
					reject(error);
				}
			},
			fail: (err) => {
				console.error('文件上传失败:', err);
				uni.hideLoading(); // 确保失败时也隐藏 loading
				uni.showToast({
					title: '文件上传失败',
					icon: 'none'
				});
				reject(err);
			}
		});
	});
}

// 可以导出常用的请求方法
function get(url, data = {}, options = {}) {
	return request({
		url,
		data,
		method: 'GET',
		...options
	});
}

function post(url, data = {}, options = {}) {
	return request({
		url,
		data,
		method: 'POST',
		...options
	});
}

function put(url, data = {}, options = {}) {
	return request({
		url,
		data,
		method: 'PUT',
		...options
	});
}

function del(url, data = {}, options = {}) {
	return request({
		url,
		data,
		method: 'DELETE',
		...options
	});
}

// 导出函数供其他模块使用 [[8]]
export default {
	request,
	get,
	post,
	put,
	del,
	uploadFile
};