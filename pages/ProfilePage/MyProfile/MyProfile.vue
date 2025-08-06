<template>
	<view class="user-info-page">
		<view class="info-list">
			<!-- 头像 -->
			<view class="info-item">
			    <text class="label">头像</text>
			    <view class="right-content">
			        <image v-if="avatarUrl" :src="avatarUrl" class="avatar"></image>
			        <button v-else 
			                class="avatar-wrapper"
			                open-type="chooseAvatar" 
			                @chooseavatar="handleChooseAvatar">
			            授权登录
			        </button>
			        <uni-icons type="arrowright" color="#ccc" size="16"></uni-icons>
			    </view>
			</view>

			<!-- 昵称 -->
				<view class="info-item">
					<text class="label">昵称</text>
					<view class="right-content">
						<text v-if="userName && userName !== '请输入昵称'" class="value">{{ userName }}</text>
						<button v-else
						        class="auth-btn"
						        @click="handleGetUserInfo">
						    授权获取昵称
						</button>
						<uni-icons v-if="userName && userName !== '请输入昵称'" 
						           type="arrowright" 
						           color="#ccc" 
						           size="16"
						           @click="editName"></uni-icons>
					</view>
				</view>

			<!-- ID -->
			<view class="info-item">
				<text class="label">ID</text>
				<view class="right-content">
					<text class="value">{{ userID }}</text>
				</view>
			</view>

			<!-- 性别 -->
			<view class="info-item" @click="changeSex">
				<text class="label">性别</text>
				<view class="right-content">
					<text class="value">{{ userSex }}</text>
					<uni-icons type="arrowright" color="#ccc" size="16"></uni-icons>
				</view>
			</view>

			<!-- 生日 -->
			<view class="info-item" @click="editBirthday">
				<text class="label">生日</text>
				<view class="right-content">
					<text class="value">{{ userBirthday }}</text>
					<uni-icons type="arrowright" color="#ccc" size="16"></uni-icons>
				</view>
			</view>

			<!-- 个人标签 -->
			<view class="info-item" @click="editTag">
				<text class="label">个人标签</text>
				<view class="right-content">
					<text class="value">{{ userTag }}</text>
					<uni-icons type="arrowright" color="#ccc" size="16"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 操作按钮 -->
		<view class="button-group">
			<button class="reset-btn" @click="resetInfo">重 置 信 息</button>
			<button class="save-btn" @click="saveChanges">保 存 修 改</button>
		</view>

		<!-- 生日选择器 -->
		<uni-popup ref="birthdayPopup" type="bottom">
			<uni-datetime-picker type="date" :value="userBirthday !== '未知' ? userBirthday : ''"
				@change="confirmBirthday">
			</uni-datetime-picker>
		</uni-popup>

		<!-- 标签修改弹窗 -->
		<uni-popup ref="tagPopup" type="dialog">
			<uni-popup-dialog mode="input" title="修改个人标签" :value="userTag" placeholder="请输入个人标签" @confirm="confirmTag">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		useUserStore
	} from '@/stores/user';
	import {
		onLoad
	} from '@dcloudio/uni-app';

	const user = useUserStore();
	const userName = ref(user.name);
	const userID = ref(user.id);
	const userSex = ref(user.sex);
	const userBirthday = ref(user.birthday);
	const userTag = ref(user.tag);
	const avatarUrl = ref(user.url);

	// 获取头像
	const handleChooseAvatar = (e) => {
	  const tempFilePath = e.detail.avatarUrl;
	  avatarUrl.value = tempFilePath;

	  user.updateUrl(tempFilePath);
	};
	
	// 处理获取用户信息（昵称）
	const handleGetUserInfo = async () => {
	  try {
	    const res = await uni.getUserProfile({
	      desc: '用于完善会员资料'
	    });
	    if (res.userInfo) {
	      const nickName = res.userInfo.nickName;
	      userName.value = nickName;
	      user.updateName(nickName);
	    }
	  } catch (err) {
	    console.error('获取用户信息失败:', err);
	  }
	};
	
	// 弹窗引用
	const birthdayPopup = ref(null);
	const tagPopup = ref(null);


	// 修改性别
	const changeSex = () => {
		userSex.value = userSex.value === '男' ? '女' : '男';
	};

	// 编辑生日
	const editBirthday = () => {
		birthdayPopup.value.open();
	};

	// 确认修改生日
	const confirmBirthday = (e) => {
		userBirthday.value = e;
		birthdayPopup.value.close();
	};

	// 编辑标签
	const editTag = () => {
		tagPopup.value.open();
	};

	// 确认修改标签
	const confirmTag = (value) => {
		if (value !== undefined) {
			userTag.value = value || '无';
		}
	};

	// 保存修改
	const saveChanges = () => {
		user.updateName(userName.value);
		user.updateSex(userSex.value);
		user.updateBirthday(userBirthday.value);
		user.updateTag(userTag.value);
		user.updateUrl(avatarUrl.value);

		uni.showToast({
			title: '保存成功',
			icon: 'success'
		});
	};

	// 重置信息
	const resetInfo = () => {
		uni.showModal({
			title: '确认重置',
			content: '确定要重置所有个人信息吗？',
			success: (res) => {
				if (res.confirm) {
					user.resetUserInfo();
					userName.value = user.name;
					userSex.value = user.sex;
					userBirthday.value = user.birthday;
					userTag.value = user.tag;
					avatarUrl.value = user.url;

					uni.showToast({
						title: '已重置',
						icon: 'success'
					});
				}
			}
		});
	};

	// 页面加载时同步数据
	onMounted(() => {
		userName.value = user.name;
		userID.value = user.id;
		userSex.value = user.sex;
		userBirthday.value = user.birthday;
		userTag.value = user.tag;
	});
</script>

<style scoped>
	.user-info-page {
		min-height: 100vh;
		background-color: #f5f5f5;
		padding: 20rpx;
	}

	.header {
		background-color: #fff;
		padding: 30rpx;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		text-align: center;
	}

	.title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
	}

	.info-list {
		background-color: #fff;
		border-radius: 10rpx;
		overflow: hidden;
	} 
	
	.avatar {
	    width: 90rpx;
	    height: 90rpx;
	    border-radius: 50%;
	}
	
	.avatar-wrapper {
        width: 90rpx;
        height: 90rpx;
        border-radius: 50%;
		color: #646464;
		padding: 0;
		font-size: 20rpx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 20rpx; 
		box-sizing: border-box; 
	}
	
	.auth-btn {
	  background: none;
	  border: none;
	  padding: 0;
	  margin: 0;
	  font-size: 28rpx;
	  color: #999;
	  line-height: 1;
	  height: auto;
	}
	
	.auth-btn::after {
	  border: none;
	}
	
	.right-content {
	  display: flex;
	  align-items: center;
	  gap: 10rpx;
	}
	
	.info-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1rpx solid #eee;
	}

	.info-item:last-child {
		border-bottom: none;
	}

	.label {
		font-size: 30rpx;
		color: #333;
	}

	.right-content {
		display: flex;
		align-items: center;
	}

	.value {
		font-size: 28rpx;
		color: #999;
		margin-right: 10rpx;
	}

	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}

	.button-group {
		display: flex;
		margin-top: 50rpx;
		padding: 0 30rpx;
		gap: 40px;
	}

	.save-btn {
		display: flex;
		width: 200px;
		height: 44px;
		background-color: #007AFF;
		color: #fff;
		border: none;
		border-radius: 30rpx;
		font-size: 30rpx;
		margin-bottom: 20rpx;
		align-items: center;
		justify-content: center;
	}

	.reset-btn {
		display: flex;
		width: 200px;
		height: 44px;
		background-color: #fff;
		color: #ff4757;
		border: 1rpx solid #ff4757;
		border-radius: 30rpx;
		font-size: 30rpx;
		align-items: center;
		justify-content: center;
	}

	.save-btn:active,
	.reset-btn:active {
		opacity: 0.8;
	}
</style>