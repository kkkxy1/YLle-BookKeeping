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
			<iui-cell label="修改密码">
			</iui-cell>
		</iui-list>
		<iui-list arrow>
			<iui-cell label="手机绑定" extra="未绑定">
			</iui-cell>
			<iui-cell label="邮箱绑定" extra="未绑定">
			</iui-cell>
		</iui-list>
		<iui-list arrow>
			<iui-cell label="账单导出"></iui-cell>
			<iui-cell label="账单发送"></iui-cell>
			<iui-cell label="邀请好友"></iui-cell>
		</iui-list>
		<iui-cell label="关于应用" arrow></iui-cell>
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
</style>