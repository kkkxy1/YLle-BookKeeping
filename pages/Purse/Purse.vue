<template>
	<view class="container">
		<view class="header">
		  <view class="top">
			我的钱包
		  </view>
		<uni-icons class="compose-icon" type="compose" size="25"></uni-icons>
		</view>
	</view>
	
	<uni-section>
		<uni-card class="custom-card" title="现金" sub-title="现金账户" extra="￥：0.00"  thumbnail="/static/xianjin.jpg">
		</uni-card>
 	</uni-section>
	
	<uni-section>
		<uni-card title="储蓄卡" sub-title="储蓄卡账户" extra="￥：0.00"  thumbnail="/static/chuxuka.jpg">
		</uni-card>
	</uni-section>
	
	<uni-section>
		<uni-card title="信用卡" sub-title="信用卡账户" extra="待还 ￥：0.00"  thumbnail="/static/xinyongka.jpg">
		</uni-card>
	</uni-section>
	
	<uni-section>
		<uni-card title="支付宝" sub-title="网络账户" extra="￥：0.00"  thumbnail="/static/zhifubao.jpg">
		</uni-card>
	</uni-section>
	
	<uni-section>
		<uni-card title="微信" sub-title="网络账户" extra="￥：0.00"  thumbnail="/static/weixin.jpg">
		</uni-card>
	</uni-section>
	
	<uni-section>
		<uni-card title="借入" sub-title="我得还" extra="0.00"  thumbnail="/static/jieru.jpg">
		</uni-card>
	</uni-section>
	
	<uni-section>
		<uni-card title="借出" sub-title="我得要" extra="0.00"  thumbnail="/static/jiechu.jpg">
		</uni-card>
	</uni-section>
	
	<uni-section>
		<uni-card title="报销" sub-title="我得要" extra="0.00"  thumbnail="/static/baoxiao.jpg">
		</uni-card>
	</uni-section>
</template>

<script setup>
    import { ref } from 'vue';
	

</script>

<style>
.header {
		display: flex;          
	    justify-content: space-between;  
		align-items: center;   
		width: 100%;             
		position: relative;     
	}
	.top {
		font-family: "黑体";
		flex: 1;                
		text-align: center;   
	}	
	.compose-icon {
		position: absolute;    
		right: 15rpx;         
	}
		
	.uni-section {
		margin-bottom: -30px;
	}
</style>
