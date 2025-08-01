<template>
    <view class="container">
        <view class="header">
            <view class="top">
                我的钱包
            </view>
            <uni-icons class="compose-icon" type="compose" size="25"></uni-icons>
        </view>

        <!-- 新增净资产模块 -->
        <view class="net-worth-container">
            <text class="net-worth-title">净资产</text>
            <text class="net-worth-value">￥10,000.00</text>
            <view class="assets-liabilities">
                <text class="liability">负债: ￥2,000.00</text>
                <text class="asset">资产: ￥12,000.00</text>
            </view>
        </view>

        <!-- 我的账户 -->
        <uni-section class="title-box" title="我的账户">
            <uni-card class="custom-card" title="现金" sub-title="现金账户" extra="￥：0.00" thumbnail="/static/xianjin.jpg"
                @click="gotoAccount('cash')">
            </uni-card>
            <uni-card title="储蓄卡" sub-title="储蓄卡账户" extra="￥：0.00" thumbnail="/static/chuxuka.jpg"
                @click="gotoAccount('savings')">
            </uni-card>
            <uni-card title="信用卡" sub-title="信用卡账户" extra="待还 ￥：0.00" thumbnail="/static/xinyongka.jpg"
                @click="gotoAccount('credit')">
            </uni-card>
            <uni-card title="支付宝" sub-title="网络账户" extra="￥：0.00" thumbnail="/static/zhifubao.jpg"
                @click="gotoAccount('alipay')">
            </uni-card>
            <uni-card title="微信" sub-title="网络账户" extra="￥：0.00" thumbnail="/static/weixin.jpg"
                @click="gotoAccount('wechat')">
            </uni-card>
        </uni-section>

        <uni-section title="我的借款">
            <uni-card title="借入" sub-title="我得还" extra="0.00" thumbnail="/static/jieru.jpg">
            </uni-card>
            <uni-card title="借出" sub-title="我得要" extra="0.00" thumbnail="/static/jiechu.jpg">
            </uni-card>
            <uni-card title="报销" sub-title="我得要" extra="0.00" thumbnail="/static/baoxiao.jpg">
            </uni-card>
        </uni-section>
    </view>
</template>

<script setup>
    import {
        ref
    } from 'vue';

    const gotoAccount = (type) => {
        let url = '';

        switch (type) {
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

<style scoped>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        position: relative;
        padding: 20rpx;
        box-sizing: border-box;
    }

    .top {
        font-family: "黑体";
        flex: 1;
        text-align: center;
        font-size: 36rpx;
        font-weight: bold;
    }

    .compose-icon {
        position: absolute;
        right: 20rpx;
    }

    /* 净资产模块样式 */
    .net-worth-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f8f9fa;
        border-radius: 20rpx;
        margin: 20rpx;
        padding: 40rpx 20rpx;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
    }

    .net-worth-title {
        font-size: 32rpx;
        color: #666;
        margin-bottom: 10rpx;
    }

    .net-worth-value {
        font-size: 48rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 20rpx;
    }

    .assets-liabilities {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 500rpx;
    }

    .liability,
    .asset {
        font-size: 28rpx;
        color: #888;
    }

    /* 其他原有样式保持不变 */
    .uni-section {
        margin-bottom: 0 !important;
    }

    .title-box :deep(.uni-section__header) {
        margin-bottom: -30rpx !important;
        padding-top: 20rpx !important;
    }

    :deep(.uni-card) {
        margin-top: 0rpx !important;
        margin-bottom: 20rpx !important;
    }

    :deep(.uni-card__header) {
        padding: 20rpx 30rpx !important;
    }
</style>