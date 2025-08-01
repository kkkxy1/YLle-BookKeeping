<template>
    <view class="container">
        <!-- 账户余额区域 -->
        <view class="balance-section">
            <view class="balance-header">
                <text class="balance-title">账户余额</text>
                <text class="edit-icon" @click="editBalance">✏️</text>
            </view>
            <view class="balance-amount">¥ {{ balance.toFixed(2) }}</view>
        </view>

        <!-- 流入流出统计 -->
        <view class="flow-section">
            <view class="flow-item">
                <text class="flow-title">总流入</text>
                <text class="flow-income">+¥ {{ income.toFixed(2) }}</text>
            </view>
            <view class="flow-item">
                <text class="flow-title">总流出</text>
                <text class="flow-expense">-¥ {{ expense.toFixed(2) }}</text>
            </view>
        </view>

        <!-- 记录列表 -->
        <view class="records-section">
            <text class="records-title">交易记录</text>
            <view class="records-list">
                <view 
                    class="record-item" 
                    v-for="(record, index) in records" 
                    :key="index"
                    @click="viewRecordDetail(record)"
                >
                    <view class="record-left">
                        <view class="record-icon" :class="record.type === 'income' ? 'income-icon' : 'expense-icon'">
                            {{ record.type === 'income' ? '💰' : '💸' }}
                        </view>
                        <view class="record-info">
                            <text class="record-name">{{ record.name }}</text>
                            <text class="record-time">{{ record.time }}</text>
                        </view>
                    </view>
                    <view class="record-right">
                        <text 
                            class="record-amount" 
                            :class="record.type === 'income' ? 'amount-income' : 'amount-expense'"
                        >
                            {{ record.type === 'income' ? '+' : '-' }}¥{{ record.amount.toFixed(2) }}
                        </text>
                    </view>
                </view>
            </view>
        </view>

        <!-- 转账按钮 -->
        <view class="transfer-button" @click="transferMoney">
            🔄
        </view>

        <!-- 编辑余额弹窗 -->
        <view class="modal" v-if="showEditModal">
            <view class="modal-content">
                <text class="modal-title">编辑余额</text>
                <input 
                    class="balance-input" 
                    type="digit" 
                    v-model="editForm.balance" 
                    placeholder="请输入新的余额"
                />
                <view class="modal-buttons">
                    <text class="modal-button cancel" @click="cancelEdit">取消</text>
                    <text class="modal-button confirm" @click="confirmEdit">确认</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'

// 数据定义
const balance = ref(12850.50)
const income = ref(25600.00)
const expense = ref(12749.50)

// 弹窗控制和表单数据
const showEditModal = ref(false)
const editForm = ref({
    balance: ''
})

// 交易记录数据
const records = ref([
    {
        id: 1,
        name: '工资收入',
        time: '2024-01-15 09:30',
        amount: 8000.00,
        type: 'income'
    },
    {
        id: 2,
        name: '购物消费',
        time: '2024-01-14 15:20',
        amount: 325.50,
        type: 'expense'
    },
    {
        id: 3,
        name: '投资收益',
        time: '2024-01-13 11:45',
        amount: 1200.00,
        type: 'income'
    },
    {
        id: 4,
        name: '餐饮支出',
        time: '2024-01-12 19:15',
        amount: 89.90,
        type: 'expense'
    },
    {
        id: 5,
        name: '奖金收入',
        time: '2024-01-11 14:20',
        amount: 2000.00,
        type: 'income'
    },
    {
        id: 6,
        name: '交通费用',
        time: '2024-01-10 08:30',
        amount: 45.00,
        type: 'expense'
    }
])

// 方法定义
const editBalance = () => {
    editForm.value.balance = balance.value.toString()
    showEditModal.value = true
}

const cancelEdit = () => {
    showEditModal.value = false
    editForm.value.balance = ''
}

const confirmEdit = () => {
    if (editForm.value.balance && !isNaN(editForm.value.balance)) {
        balance.value = parseFloat(editForm.value.balance)
        showEditModal.value = false
        editForm.value.balance = ''
        // 这里可以添加保存到服务器的逻辑
        uni.showToast({
            title: '余额更新成功',
            icon: 'success'
        })
    } else {
        uni.showToast({
            title: '请输入有效金额',
            icon: 'none'
        })
    }
}

const transferMoney = () => {
    uni.showToast({
        title: '转账功能开发中',
        icon: 'none'
    })
}

const viewRecordDetail = (record) => {
    uni.showToast({
        title: '查看详情功能开发中',
        icon: 'none'
    })
}
</script>

<style scoped>
.container {
    min-height: 100vh;
    background: #f5f5f5;
    padding: 20rpx;
    box-sizing: border-box;
    position: relative;
}

/* 账户余额区域 - 缩小占比 */
.balance-section {
    background: white;
    border-radius: 15rpx;
    padding: 25rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.balance-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15rpx;
}

.balance-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
}

.edit-icon {
    font-size: 28rpx;
    padding: 12rpx;
    border-radius: 50%;
    background: #f0f0f0;
    cursor: pointer;
    transition: all 0.3s;
    width: 50rpx;
    height: 50rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.edit-icon:active {
    background: #e0e0e0;
    transform: scale(0.95);
}

.balance-amount {
    font-size: 48rpx;
    font-weight: bold;
    color: #333;
    text-align: left;
    font-family: 'Arial', sans-serif;
}

/* 流入流出统计 - 顶左边屏幕 */
.flow-section {
    display: flex;
    gap: 30rpx;
    margin-bottom: 25rpx;
    justify-content: flex-start;
}

.flow-item {
    background: white;
    border-radius: 15rpx;
    padding: 20rpx 25rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
    min-width: 200rpx;
}

.flow-title {
    display: block;
    font-size: 26rpx;
    color: #666;
    margin-bottom: 8rpx;
}

.flow-income {
    display: block;
    font-size: 30rpx;
    font-weight: bold;
    color: #4caf50;
}

.flow-expense {
    display: block;
    font-size: 30rpx;
    font-weight: bold;
    color: #f44336;
}

/* 记录列表 */
.records-section {
    background: white;
    border-radius: 15rpx;
    padding: 25rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.records-title {
    display: block;
    font-size: 30rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 25rpx;
}

.records-list {
    display: flex;
    flex-direction: column;
    gap: 15rpx;
}

.record-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
    background: #fafafa;
    border-radius: 12rpx;
    transition: all 0.2s;
}

.record-item:active {
    background: #f0f0f0;
    transform: scale(0.98);
}

.record-left {
    display: flex;
    align-items: center;
    gap: 20rpx;
}

.record-icon {
    width: 70rpx;
    height: 70rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
}

.income-icon {
    background: #e8f5e8;
    color: #4caf50;
}

.expense-icon {
    background: #ffebee;
    color: #f44336;
}

.record-info {
    display: flex;
    flex-direction: column;
}

.record-name {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
    margin-bottom: 5rpx;
}

.record-time {
    font-size: 22rpx;
    color: #999;
}

.record-right {
}

.record-amount {
    font-size: 28rpx;
    font-weight: bold;
}

.amount-income {
    color: #4caf50;
}

.amount-expense {
    color: #f44336;
}

/* 转账按钮 */
.transfer-button {
    position: fixed;
    bottom: 50rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background: white;
    border: 3rpx solid #667eea;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40rpx;
    box-shadow: 0 5rpx 20rpx rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: all 0.2s;
    z-index: 100;
}

.transfer-button:active {
    transform: translateX(-50%) scale(0.95);
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.3);
}

/* 弹窗样式 */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 15rpx;
    padding: 40rpx;
    width: 85%;
    max-width: 500rpx;
}

.modal-title {
    display: block;
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 30rpx;
}

.balance-input {
    width: 100%;
    padding: 25rpx;
    border: 2rpx solid #ddd;
    border-radius: 10rpx;
    font-size: 30rpx;
    margin-bottom: 30rpx;
    box-sizing: border-box;
    height: 80rpx;
}

.modal-buttons {
    display: flex;
    gap: 20rpx;
}

.modal-button {
    flex: 1;
    padding: 25rpx;
    border-radius: 10rpx;
    text-align: center;
    font-size: 30rpx;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
}

.cancel {
    background: #f5f5f5;
    color: #666;
}

.cancel:active {
    background: #e0e0e0;
}

.confirm {
    background: #667eea;
    color: white;
}

.confirm:active {
    background: #5a6fd8;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
    .container {
        padding: 15rpx;
    }
    
    .balance-section {
        padding: 20rpx;
    }
    
    .balance-amount {
        font-size: 40rpx;
    }
    
    .flow-section {
        gap: 15rpx;
    }
    
    .flow-item {
        padding: 15rpx 20rpx;
        min-width: 160rpx;
    }
    
    .transfer-button {
        width: 80rpx;
        height: 80rpx;
        font-size: 35rpx;
        bottom: 30rpx;
    }
    
    .balance-input {
        padding: 20rpx;
        font-size: 28rpx;
        height: 70rpx;
    }
    
    .modal-button {
        padding: 20rpx;
        font-size: 28rpx;
    }
}
</style>