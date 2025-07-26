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
		<uni-card class="custom-card" title="现金" sub-title="现金账户" extra="￥：0.00"  thumbnail="/static/xianjin.jpg" @click="gotoAccount('cash')">
		</uni-card>
 	</uni-section>
	
	<uni-section>
		<uni-card title="储蓄卡" sub-title="储蓄卡账户" extra="￥：0.00"  thumbnail="/static/chuxuka.jpg" @click="gotoAccount('savings')">
		</uni-card>
	</uni-section>
	
	<uni-section>
		<uni-card title="信用卡" sub-title="信用卡账户" extra="待还 ￥：0.00"  thumbnail="/static/xinyongka.jpg" @click="gotoAccount('credit')">
		</uni-card>
	</uni-section>
	
	<uni-section>
		<uni-card title="支付宝" sub-title="网络账户" extra="￥：0.00"  thumbnail="/static/zhifubao.jpg" @click="gotoAccount('alipay')">
		</uni-card>
	</uni-section>
	
	<uni-section>
		<uni-card title="微信" sub-title="网络账户" extra="￥：0.00"  thumbnail="/static/weixin.jpg" @click="gotoAccount('wechat')">
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
	
	const gotoAccount = (type) => {
		let url = '';
		
		switch(type) {
			case 'cash':
				url = '/pages/Purse/Xianjin/Xianjin';
				break;
				
			case 'savings':
			    url = '/pages/Purse/Chuxuka/Chuxuka';
			    break;
			
			case 'credit':
			    url = '/pages/Purse/Xinyongka/Xinyongka';
			    break;
				
			case 'alipay':
			    url = '/pages/Purse/Zhifubao/Zhifubao';
			    break;	
			 
			case 'wechat':
			    url = '/pages/Purse/Wechat/Wechat';
			    break;	
		}
		
		// 执行页面跳转
		uni.navigateTo({
			url: url
		});
	}

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
