<!-- pages/login/login.vue -->
<template>
	<view class="login-container">
		<!-- Logo 区域 -->
		<view class="logo-section">
			<text class="app-name">怡乐记账</text>
		</view>

		<!-- 登录按钮区域 -->
		<view class="login-section">
			<button class="wechat-login-btn" @click="handleWechatLogin">
				<text class="btn-text">微信一键登录</text>
			</button>

			<view class="agreement-section">
				<label class="agreement-label">
					<checkbox :checked="agreed" @click="agreed = !agreed" color="#07c160"
						style="transform:scale(0.7)" />
					<text class="agreement-text">同意</text>
					<text class="agreement-link" @click="openAgreement">用户协议</text>
					<text class="agreement-text">和</text>
					<text class="agreement-link" @click="openPrivacy">隐私政策</text>
				</label>
			</view>
		</view>

		<!-- 简单 Loading 提示 -->
		<view v-if="loading" class="loading-mask">
			<view class="loading-content">
				<text class="loading-text">登录中...</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		wechatLogin
	} from '@/api/index'
	import {
		useUserStore
	} from '@/stores/user';

	// 响应式数据
	const agreed = ref(false)
	const loading = ref(false)

	// 微信登录
	const handleWechatLogin = () => {
		if (!agreed.value) {
			uni.showToast({
				title: '请先同意协议',
				icon: 'none'
			})
			return
		}

		// #ifdef MP-WEIXIN
		performWechatLogin()
		// #endif

		// #ifdef H5
		uni.showToast({
			title: '请在微信中打开',
			icon: 'none'
		})
		// #endif
	}

	const performWechatLogin = () => {
		loading.value = true

		// 直接调用微信登录接口获取 code
		uni.login({
			provider: 'weixin',
			success: (loginRes) => {
				console.log('微信登录成功，code:', loginRes.code)

				// 将 code 发送到后端进行登录验证
				wechatLoginToServer(loginRes.code)
			},
			fail: (err) => {
				console.error('微信登录失败', err)
				uni.showToast({
					title: '微信登录失败',
					icon: 'none'
				})
				loading.value = false
			}
		})
	}

	// 发送到后端登录
	const wechatLoginToServer = (code) => {
		// 调用您封装的 API
		wechatLogin({
			code: code
			// 不再传递用户信息，由后端通过 code 获取
		}).then(res => {
			// 登录成功处理
			uni.setStorageSync('token', res.token);
			const user=useUserStore();
			user.updateAvatar(res.data.user.avatarUrl);
			user.updateName(res.data.user.username);
			user.updateId(res.data.user.id);
			
			
			uni.showToast({
				title: '登录成功',
				icon: 'success'
			})

			// 跳转到首页
			setTimeout(() => {
				uni.switchTab({
					url: '/pages/Detail/Detail'
				})
			}, 1500)
		}).catch(err => {
			console.error('登录失败:', err)
			// 错误已在 request.js 的拦截器中处理
		}).finally(() => {
			loading.value = false
		})
	}

	// 打开协议页面
	const openAgreement = () => {
		uni.showToast({
			title: '用户协议',
			icon: 'none'
		})
	}

	const openPrivacy = () => {
		uni.showToast({
			title: '隐私政策',
			icon: 'none'
		})
	}

	// 检查登录状态
	// onShow(() => {
	// 	const token = uni.getStorageSync('token')
	// 	if (token) {
	// 		uni.switchTab({
	// 			url: '/pages/Detail/Detail'
	// 		})
	// 	}
	// })
</script>

<style scoped>
	.login-container {
		min-height: 100vh;
		background: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 50rpx;
		box-sizing: border-box;
	}

	.logo-section {
		text-align: center;
		margin-bottom: 200rpx;
	}

	.app-name {
		font-size: 60rpx;
		color: #333333;
		font-weight: bold;
	}

	.login-section {
		width: 100%;
	}

	.wechat-login-btn {
		background: #07c160;
		border: none;
		border-radius: 100rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 50rpx;
		box-shadow: 0 10rpx 30rpx rgba(7, 193, 96, 0.3);
		transition: all 0.3s;
	}

	.wechat-login-btn:active {
		transform: scale(0.98);
		background: #06ad56;
	}

	.btn-text {
		color: white;
		font-size: 36rpx;
		font-weight: bold;
	}

	.agreement-section {
		text-align: center;
	}

	.agreement-label {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
	}

	.agreement-text {
		color: #666666;
		font-size: 28rpx;
		margin: 0 10rpx;
	}

	.agreement-link {
		color: #07c160;
		font-size: 28rpx;
		margin: 0 10rpx;
		text-decoration: underline;
	}

	/* 简单 Loading 遮罩 */
	.loading-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}

	.loading-content {
		background: white;
		border-radius: 20rpx;
		padding: 50rpx;
		text-align: center;
	}

	.loading-text {
		color: #333;
		font-size: 30rpx;
	}
</style>