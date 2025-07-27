<template>
	<view class="profile">
		<navigator url='/pages/ProfilePage/MyProfile/MyProfile'>
			<view class="avatar-profile">
				<iui-avatar :size="72" :src="userUrl" :avatarName="userName" :avatarDesc="Desription">
					<template #avatarName>
						<text style="font-size: 16px;">{{userName}}</text>
					</template>
					<template #avatarDesc>
						<text style="font-size: 10px;">{{Desription}}</text>
					</template>
				</iui-avatar>
				<uni-icons type="right"></uni-icons>
			</view>
		</navigator>
		<iui-list arrow>
			<iui-cell label="修改密码" @click="showPasswordPopup">
			</iui-cell>
		</iui-list>
		<iui-list arrow>
			<iui-cell label="手机绑定" :extra="phoneStatus" @click="showPhonePopup">
			</iui-cell>
			<iui-cell label="邮箱绑定" :extra="emailStatus" @click="showEmailPopup">
			</iui-cell>
		</iui-list>
		<iui-list arrow>
			<iui-cell label="账单导出"></iui-cell>
			<iui-cell label="账单发送"></iui-cell>
			<iui-cell label="邀请好友"></iui-cell>
		</iui-list>
		<iui-cell label="关于应用" arrow></iui-cell>
		<!-- 修改密码弹窗 -->
		<uni-popup ref="passwordPopup" type="dialog">
			<view class="popup-content">
				<view class="popup-title">修改密码</view>
				<input class="popup-input" type="password" v-model="oldPassword" placeholder="请输入原密码" />
				<input class="popup-input" type="password" v-model="newPassword" placeholder="请输入新密码" />
				<input class="popup-input" type="password" v-model="confirmPassword" placeholder="请确认新密码" />
				<view class="popup-buttons">
					<button class="popup-btn cancel" @click="closePasswordPopup">取消</button>
					<button class="popup-btn confirm" @click="changePassword">确定</button>
				</view>
			</view>
		</uni-popup>
		<!-- 手机绑定弹窗 -->
		<uni-popup ref="phonePopup" type="dialog">
			<view class="popup-content">
				<view class="popup-title">手机绑定</view>
				<input class="popup-input" type="number" v-model="phone" placeholder="请输入手机号" />
				<view class="code-row">
					<input class="code-input" type="number" v-model="verifyCode" placeholder="请输入验证码" />
					<button class="code-btn" :disabled="codeDisabled" @click="sendVerifyCode">
						{{ codeText }}
					</button>
				</view>
				<view class="popup-buttons">
					<button class="popup-btn cancel" @click="closePhonePopup">取消</button>
					<button class="popup-btn confirm" @click="bindPhone">确定</button>
				</view>
			</view>
		</uni-popup>
		<!-- 邮箱绑定弹窗 -->
		<uni-popup ref="emailPopup" type="dialog">
			<view class="popup-content">
				<view class="popup-title">邮箱绑定</view>
				<input class="popup-input" type="text" v-model="email" placeholder="请输入邮箱地址" />
				<view class="code-row">
					<input class="code-input" type="number" v-model="emailCode" placeholder="请输入验证码" />
					<button class="code-btn" :disabled="emailCodeDisabled" @click="sendEmailCode">
						{{ emailCodeText }}
					</button>
				</view>
				<view class="popup-buttons">
					<button class="popup-btn cancel" @click="closeEmailPopup">取消</button>
					<button class="popup-btn confirm" @click="bindEmail">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue';
	import {
		useUserStore
	} from '@/stores/user'

	const user = useUserStore();
	const userName = computed(() => user.name);
	const userID = computed(() => user.id);
	const Desription = computed(() => "用户ID :" + user.id);
	const userUrl = computed(() => user.url);

	// 绑定状态
	const phoneStatus = ref('未绑定');
	const emailStatus = ref('未绑定');

	// 弹窗引用
	const passwordPopup = ref(null);
	const phonePopup = ref(null);
	const emailPopup = ref(null);

	// 修改密码相关
	const oldPassword = ref('');
	const newPassword = ref('');
	const confirmPassword = ref('');

	// 手机绑定相关
	const phone = ref('');
	const verifyCode = ref('');
	const codeDisabled = ref(false);
	const codeText = ref('获取验证码');
	const codeCountdown = ref(0);

	// 邮箱绑定相关
	const email = ref('');
	const emailCode = ref('');
	const emailCodeDisabled = ref(false);
	const emailCodeText = ref('获取验证码');
	const emailCountdown = ref(0);

	// 显示修改密码弹窗
	const showPasswordPopup = () => {
		passwordPopup.value.open();
	};

	// 关闭修改密码弹窗
	const closePasswordPopup = () => {
		passwordPopup.value.close();
		resetPasswordForm();
	};

	// 显示手机绑定弹窗
	const showPhonePopup = () => {
		phonePopup.value.open();
	};

	// 关闭手机绑定弹窗
	const closePhonePopup = () => {
		phonePopup.value.close();
		resetPhoneForm();
	};

	// 显示邮箱绑定弹窗
	const showEmailPopup = () => {
		emailPopup.value.open();
	};

	// 关闭邮箱绑定弹窗
	const closeEmailPopup = () => {
		emailPopup.value.close();
		resetEmailForm();
	};

	// 重置密码表单
	const resetPasswordForm = () => {
		oldPassword.value = '';
		newPassword.value = '';
		confirmPassword.value = '';
	};

	// 重置手机表单
	const resetPhoneForm = () => {
		phone.value = '';
		verifyCode.value = '';
		codeDisabled.value = false;
		codeText.value = '获取验证码';
		codeCountdown.value = 0;
	};
	// 重置邮箱表单
	const resetEmailForm = () => {
		email.value = '';
		emailCode.value = '';
		emailCodeDisabled.value = false;
		emailCodeText.value = '获取验证码';
		emailCountdown.value = 0;
	};

	// 修改密码
	const changePassword = () => {
		if (!oldPassword.value) {
			uni.showToast({
				title: '请输入原密码',
				icon: 'none'
			});
			return;
		}
		if (!newPassword.value) {
			uni.showToast({
				title: '请输入新密码',
				icon: 'none'
			});
			return;
		}
		if (newPassword.value !== confirmPassword.value) {
			uni.showToast({
				title: '两次密码输入不一致',
				icon: 'none'
			});
			return;
		}

		// 这里调用修改密码的API
		uni.showToast({
			title: '密码修改成功',
			icon: 'success'
		});
		closePasswordPopup();
	};

	// 发送手机验证码
	const sendVerifyCode = () => {
		if (!phone.value || !/^1[3-9]\d{9}$/.test(phone.value)) {
			uni.showToast({
				title: '请输入正确的手机号',
				icon: 'none'
			});
			return;
		}

		// 这里调用发送验证码的API
		startPhoneCountdown();
		uni.showToast({
			title: '验证码已发送',
			icon: 'success'
		});
	};

	// 手机验证码倒计时
	const startPhoneCountdown = () => {
		codeDisabled.value = true;
		codeCountdown.value = 60;
		const timer = setInterval(() => {
			codeCountdown.value--;
			codeText.value = `${codeCountdown.value}s后重发`;
			if (codeCountdown.value <= 0) {
				clearInterval(timer);
				codeDisabled.value = false;
				codeText.value = '获取验证码';
			}
		}, 1000);
	};

	// 绑定手机
	const bindPhone = () => {
		if (!phone.value || !/^1[3-9]\d{9}$/.test(phone.value)) {
			uni.showToast({
				title: '请输入正确的手机号',
				icon: 'none'
			});
			return;
		}
		if (!verifyCode.value) {
			uni.showToast({
				title: '请输入验证码',
				icon: 'none'
			});
			return;
		}

		// 这里调用绑定手机的API
		phoneStatus.value = phone.value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
		uni.showToast({
			title: '手机绑定成功',
			icon: 'success'
		});
		closePhonePopup();
	};

	// 发送邮箱验证码
	const sendEmailCode = () => {
		if (!email.value || !/^\w+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
			uni.showToast({
				title: '请输入正确的邮箱地址',
				icon: 'none'
			});
			return;
		}

		// 这里调用发送邮箱验证码的API
		startEmailCountdown();
		uni.showToast({
			title: '验证码已发送',
			icon: 'success'
		});
	};

	// 邮箱验证码倒计时
	const startEmailCountdown = () => {
		emailCodeDisabled.value = true;
		emailCountdown.value = 60;
		const timer = setInterval(() => {
			emailCountdown.value--;
			emailCodeText.value = `${emailCountdown.value}s后重发`;
			if (emailCountdown.value <= 0) {
				clearInterval(timer);
				emailCodeDisabled.value = false;
				emailCodeText.value = '获取验证码';
			}
		}, 1000);
	};

	// 绑定邮箱
	const bindEmail = () => {
		if (!email.value || !/^\w+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
			uni.showToast({
				title: '请输入正确的邮箱地址',
				icon: 'none'
			});
			return;
		}
		if (!emailCode.value) {
			uni.showToast({
				title: '请输入验证码',
				icon: 'none'
			});
			return;
		}

		// 这里调用绑定邮箱的API
		emailStatus.value = '已绑定';
		uni.showToast({
			title: '邮箱绑定成功',
			icon: 'success'
		});
		closeEmailPopup();
	};
</script>

<style lang="scss">
	.profile {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.avatar-profile {
		background-color: white;
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}


	.popup-content {
		background-color: white;
		border-radius: 10px;
		padding: 20px;
		width: 300px;
	}

	.popup-title {
		font-size: 18px;
		font-weight: bold;
		text-align: center;
		margin-bottom: 20px;
		color: #333;
	}

	.popup-input {
		width: 100%;
		height: 44px;
		border: 1px solid #e5e5e5;
		border-radius: 6px;
		padding: 0 15px;
		margin-bottom: 15px;
		font-size: 14px;
		box-sizing: border-box;
	}

	.code-row {
		display: flex;
		gap: 10px;
		margin-bottom: 20px;
	}

	.code-input {
		flex: 1;
		height: 44px;
		border: 1px solid #e5e5e5;
		border-radius: 6px;
		padding: 0 15px;
		font-size: 14px;
	}

	.code-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100px;
		height: 44px;
		background-color: #007AFF;
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 14px;
	}

	.code-btn:disabled {
		background-color: #ccc;
	}

	.popup-buttons {
		display: flex;
		gap: 10px;
	}

	.popup-btn {
		flex: 1;
		height: 40px;
		border: none;
		border-radius: 6px;
		font-size: 16px;
	}

	.popup-btn.cancel {
		background-color: #f5f5f5;
		color: #666;
	}

	.popup-btn.confirm {
		background-color: #007AFF;
		color: white;
	}

	.popup-btn:active {
		opacity: 0.8;
	}
</style>