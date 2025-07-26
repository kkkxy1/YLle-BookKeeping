<template>
	<view>
		<view class="avatar-profile">
			<iui-avatar :size="72" :avatarName="userName" :avatarDesc="Desription">
				<template #avatarName>
					<text style="font-size: 16px;">{{userName}}</text>
				</template>
				<template #avatarDesc>
					<text style="font-size: 10px;">{{Desription}}</text>
				</template>
			</iui-avatar>
			<uni-icons type="right"></uni-icons>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const userName = ref("请输入昵称");
	const userID = ref("123456789");
	const Desription = ref("用户ID :" + userID.value);
</script>

<style lang="scss">
	.avatar-profile {
		background-color: white;
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>