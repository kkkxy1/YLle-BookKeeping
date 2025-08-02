<template>
	<view class="container">
		<view class="header">
			<view class="box1">每月预算设置</view>
			<view class="amount-display" v-if="budgetAmount !== null">{{ budgetAmount.toFixed(2) }}</view>
			<uni-icons class="compose-icon" type="compose" size="25" color="orange" @click="openPopup">
			</uni-icons>
		</view>
	</view>

	<uni-popup ref="inputDialog" type="dialog">
		<uni-popup-dialog ref="inputClose" mode="input" title="设置每月预算" value="" placeholder="请输入预算金额"
			@confirm="dialogInputConfirm"></uni-popup-dialog>
	</uni-popup>

	<view class="container">
		<view class="header">
			<view class="box1">剩余预算</view>
			<view class="budget-text">
				{{remain}}
			</view>
		</view>
	</view>

	<view class="container">
		<view class="header">
			<view class="box1">收支结余</view>
			<view class="remain-text">
				0.00
			</view>
		</view>
	</view>

	<view class="container">
		<view class="header">
			<view class="box1">预算周期</view>
			<view class="right-container">
				<picker class="cycle-picker" @change="cycleChange" :value="cycleIndex" :range="cycleOptions">
					<view class="cycle-display">{{cycleOptions[cycleIndex]}}</view>
				</picker>
				<uni-icons type="arrowright" size="20" color="#999"></uni-icons>
			</view>

		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		watch,
		computed
	} from 'vue'
	import {
		useUserStore
	} from '@/stores/user'

	const cycleIndex = ref(0)
	const cycleOptions = ref(['每周', '每月', '每季度', '每年', '永久'])
	const inputDialog = ref(null)

	const user = useUserStore();
	const budgetAmount = ref(user.budget);
	const userBudget = computed(() => user.budget);
	const userIncome = computed(() => user.income);
	const userExpenses = computed(() => user.expenses);
	const remain = computed(() => {
		return userBudget.value + userIncome.value - userExpenses.value;
	});

	const openPopup = () => {
		inputDialog.value.open()
	}

	const dialogInputConfirm = (value) => {
		const amount = parseFloat(value)

		if (!isNaN(amount)) {
			budgetAmount.value = amount
			console.log("预算金额设置为:", budgetAmount.value)

			uni.setStorageSync('monthlyBudget', budgetAmount.value)

			uni.showToast({
				title: `预算设置为: ${budgetAmount.value}元`,
				icon: 'success'
			})
			
			user.updateBudget(budgetAmount.value);
		} else {
			uni.showToast({
				title: '请输入有效的金额',
				icon: 'none'
			})
		}
	}

	const cycleChange = (e) => {
		cycleIndex.value = e.detail.value
		console.log("选择的预算周期:", cycleOptions.value[cycleIndex.value])
	}

	// 监听预算金额变化
	watch(budgetAmount, (newVal) => {
		if (newVal !== null) {
			uni.setStorageSync('monthlyBudget', newVal)
		}
	})

	onMounted(() => {
		const savedBudget = uni.getStorageSync('monthlyBudget')
		if (savedBudget) {
			budgetAmount.value = savedBudget
		}
	})
</script>

<style lang="scss">
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1rpx solid #dbdbdb;
		padding-bottom: 20rpx;
	}

	.header {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.box1 {
		font-size: 30rpx;
		font-family: "黑体";
		color: #595959;
		margin-top: 40rpx;
	}

	.compose-icon {
		margin-top: 30rpx;
		margin-right: 20rpx;
	}

	.amount-display {
		font-size: 28rpx;
		color: #FF9900;
		margin-top: 40rpx;
		margin-left: 270rpx;
	}

	.right-container {
		display: flex;
		align-items: center;
		margin-top: 40rpx;
	}

	.cycle-picker {
		margin-top: 10rpx;
		margin-right: -40rpx;
	}

	.cycle-display {
		font-size: 28rpx;
		color: #000000;
		margin-right: 40rpx;
		margin-top: -8px;
	}

	.budget-text {
		font-size: 30rpx;
		margin-right: 40rpx;
		margin-top: 26rpx;
	}

	.remain-text {
		font-size: 30rpx;
		margin-right: 40rpx;
		margin-top: 26rpx;
	}
</style>