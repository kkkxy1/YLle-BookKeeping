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
	    <uni-popup-dialog 
	      ref="inputClose" 
	      mode="input" 
	      title="设置每月预算" 
	      value="" 
	      placeholder="请输入预算金额"
	      @confirm="dialogInputConfirm"
	    ></uni-popup-dialog>
	  </uni-popup>
	
	<view class="container">
		<view class="header">
			<view class="box1">剩余预算</view>
			<view class="budget-text">
				3000.00
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

<script>
	export default {
	  data() {
	    return {
	      budgetAmount: null ,
		   cycleIndex: 0,     
		            cycleOptions: ['每周','每月', '每季度', '每年','永久'] 
	    }
	  },
	  methods: {
	    
	    openPopup() {
	      this.$refs.inputDialog.open();
	    },
	    
	    
	    dialogInputConfirm(value) {
	      
	      const amount = parseFloat(value);
	      
	      
	      if (!isNaN(amount)) {
	        this.budgetAmount = amount;
	        console.log("预算金额设置为:", this.budgetAmount);
	        
	        uni.setStorageSync('monthlyBudget', this.budgetAmount);
	        
	        uni.showToast({
	          title: `预算设置为: ${this.budgetAmount}元`,
	          icon: 'success'
	        });
	      } else {
	        uni.showToast({
	          title: '请输入有效的金额',
	          icon: 'none'
	        });
	      }
	    },
		 cycleChange(e) {
		    this.cycleIndex = e.detail.value;
		    console.log("选择的预算周期:", this.cycleOptions[this.cycleIndex]);
		  }
		
	  },
	  
	  mounted() {
	    const savedBudget = uni.getStorageSync('monthlyBudget');
	    if (savedBudget) {
	      this.budgetAmount = savedBudget;
	    }
	  }
	}
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
	
	.budget-text{
		font-size: 30rpx;
		margin-right: 40rpx;
		margin-top: 26rpx;
	}
	.remain-text{
		font-size: 30rpx;
		margin-right: 40rpx;
		margin-top: 26rpx;
	}
	
</style>