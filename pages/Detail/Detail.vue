<template>
    <view class="box">
        <view class="header-container">
            <!--日常按钮-->
            <view class="left-section">
                <navigator url="/pages/Detail/Daily/Daily">
                    <view class="icon-text-container">
                        <uni-icons type="list" size="18" vertical-align: middle></uni-icons>
                        <view class="list-word">日常</view>
                    </view>
                </navigator>
            </view>

            <!--年月显示-->
       <view class="center-section">
           <uni-icons type="left" size="16" color="#000000" @click="prevMonth"></uni-icons>
           <text class="current-date" @click="openCalendar">{{ currentYearMonth }}</text>
           <uni-icons type="right" size="16" color="#000000" @click="nextMonth"></uni-icons>
       </view>
	   
	   <uni-popup ref="calendarPopup" type="bottom" :safe-area="true">
	           <view class="calendar-popup-content">
	               <view class="popup-header">
	                   <text class="popup-title">选择日期</text>
	                   <uni-icons type="closeempty" size="24" @click="closeCalendar"></uni-icons>
	               </view>
	               <uni-calendar 
	                   :insert="true" 
	                   :lunar="false" 
	                   :range="false" 
	                   @confirm="selectCalendarDate"
	               />
	           </view>
	   </uni-popup>
		   
            <!--搜索按钮-->
            <view class="right-section">
                <navigator url="/pages/Detail/Search/Search">
                    <uni-icons type="search" size="18" vertical-align: middle></uni-icons>
                </navigator>
            </view>
        </view>

        
        
        <view class="box2">
            <navigator url="/pages/Detail/Budget/Budget">
                <iui-statistic class="budget-statistic" title="预算剩余" :value="remain" :precision="2"></iui-statistic>
            </navigator>
        </view>
        <view class="box3">
            <iui-statistic class="income-statistic" title="收入" :value="totalIncome" :precision="2"></iui-statistic>
            <iui-divider direction="vertical"></iui-divider>
            <iui-statistic class="expense-statistic" title="支出" :value="totalExpense" :precision="2"></iui-statistic>
        </view>

        <!-- 按时间分块的列表 -->
        <view class="list-container">
            <view v-for="(dayData, date) in groupedTransactions" :key="date" class="day-block">
                <view class="day-header">
                    <text class="day-date">{{ date }}</text>
                    <text class="day-income">收入: {{ dayData.income.toFixed(2) }}</text>
                    <text class="day-expense">支出: {{ dayData.expense.toFixed(2) }}</text>
                </view>
                <view v-for="(item, index) in dayData.items" :key="index" class="transaction-item"
                    :class="{ 'income-item': item.type === 'income', 'expense-item': item.type === 'expense' }">
                    <view class="item-left">
                        <uni-icons :type="item.icon" size="20"></uni-icons>
                        <text class="item-name">{{ item.name }}</text>
                    </view>
                    <text class="item-amount">{{ item.amount.toFixed(2) }}</text>
                </view>
            </view>
        </view>

        <!-- 添加按钮 -->
        <view class="box1" @click="openAddModal">
            <uni-icons class="plusempty-icon" type="plusempty" size="40" color="#000000"></uni-icons>
        </view>

        <!-- 添加事项弹窗 -->
        <uni-popup ref="addPopup" type="bottom" :safe-area="true">
            <view class="add-popup-content">
                <view class="popup-header">
                    <text class="popup-title">添加事项</text>
                    <uni-icons type="closeempty" size="24" @click="closeAddModal"></uni-icons>
                </view>
                
                <view class="form-group">
                    <text class="form-label">事项名称</text>
                    <input class="form-input" v-model="newTransaction.name" placeholder="请输入事项名称" />
                </view>
                
                <view class="form-group">
                    <text class="form-label">金额</text>
                    <input class="form-input" v-model="newTransaction.amount" type="digit" placeholder="请输入金额" />
                </view>
                
                <view class="form-group">
                    <text class="form-label">类型</text>
                    <view class="type-selector">
                        <view 
                            class="type-option" 
                            :class="{ 'selected': newTransaction.type === 'income' }"
                            @click="newTransaction.type = 'income'">
                            收入
                        </view>
                        <view 
                            class="type-option" 
                            :class="{ 'selected': newTransaction.type === 'expense' }"
                            @click="newTransaction.type = 'expense'">
                            支出
                        </view>
                    </view>
                </view>
                
                <view class="form-group">
                    <text class="form-label">日期</text>
                    <view class="date-selector" @click="openDateSelector">
                        <text>{{ newTransaction.date || '请选择日期' }}</text>
                        <uni-icons type="arrowright" size="16"></uni-icons>
                    </view>
                </view>
                
                <view class="form-group">
                    <text class="form-label">图标</text>
                    <view class="icon-selector">
                        <uni-icons 
                            v-for="icon in iconOptions" 
                            :key="icon" 
                            :type="icon" 
                            size="24" 
                            :class="{ 'selected-icon': newTransaction.icon === icon }"
                            @click="newTransaction.icon = icon"
                        ></uni-icons>
                    </view>
                </view>
                
                <button class="submit-button" @click="addTransaction">确定</button>
            </view>
        </uni-popup>
        
   </view>
</template>

<script setup>
       import {
            ref,
            onMounted,
            computed
        } from 'vue'
       import {
           useUserStore
       } from '@/stores/user'
   
       // 修改为使用当前日期对象
       const currentDate = ref(new Date())
       
       // 计算当前年月显示文本
       const currentYearMonth = computed(() => {
           const year = currentDate.value.getFullYear()
           const month = currentDate.value.getMonth() + 1
           return `${year}年${month}月`
       })
   
       // 上个月
       const prevMonth = () => {
           const newDate = new Date(currentDate.value)
           newDate.setMonth(newDate.getMonth() - 1)
           currentDate.value = newDate
           loadMonthData() // 加载该月数据
       }
   
       // 下个月
       const nextMonth = () => {
           const newDate = new Date(currentDate.value)
           newDate.setMonth(newDate.getMonth() + 1)
           currentDate.value = newDate
           loadMonthData() // 加载该月数据
       }
   
       // 加载当前月份数据
       const loadMonthData = () => {
           const year = currentDate.value.getFullYear()
           const month = currentDate.value.getMonth() + 1
           console.log(`加载 ${year}年${month}月 的数据`)
           // 这里可以添加实际加载月份数据的逻辑
       }
	   
	// 添加日历弹窗的ref
	    const calendarPopup = ref(null)
	    
	    // 打开日历
	    const openCalendar = () => {
	        calendarPopup.value?.open()
	    }
	    
	    // 关闭日历
	    const closeCalendar = () => {
	        calendarPopup.value?.close()
	    }
	    
	    // 选择日历日期
	    const selectCalendarDate = (e) => {
	        const dateStr = e.fulldate
	        const dateObj = new Date(dateStr)
	        currentDate.value = dateObj
	        loadMonthData()
	        closeCalendar()
	    }
			
    const user = useUserStore();
    const userBudget = computed(() => user.budget);
    const userIncome = computed(() => user.income);
    const userExpenses = computed(() => user.expenses);
    const remain = computed(() => {
        return userBudget.value + userIncome.value - userExpenses.value;
    });

    const info = ref({
        date: '',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        lunar: false,
        range: false,
        insert: false
    })

    const calendar = ref(null)
    const addPopup = ref(null)
    const datePopup = ref(null)
    
    // 模拟交易数据
    const transactions = ref([
        { id: 1, name: '工资', amount: 8000, type: 'income', date: '2023-05-01', icon: 'wallet' },
        { id: 2, name: '午餐', amount: 25, type: 'expense', date: '2023-05-01', icon: 'food' },
        { id: 3, name: '交通费', amount: 15, type: 'expense', date: '2023-05-01', icon: 'bus' },
        { id: 4, name: '奖金', amount: 1000, type: 'income', date: '2023-05-05', icon: 'gift' },
        { id: 5, name: '晚餐', amount: 60, type: 'expense', date: '2023-05-05', icon: 'food' },
        { id: 6, name: '房租', amount: 2000, type: 'expense', date: '2023-05-10', icon: 'home' },
    ])
    
    // 新交易表单数据
    const newTransaction = ref({
        name: '',
        amount: '',
        type: 'expense',
        date: '',
        icon: 'wallet'
    })
    
    // 图标选项
    const iconOptions = ref([
        'wallet', 'food', 'bus', 'home', 'gift', 'cart', 'phone', 'medical'
    ])
    
    // 计算每日收入和支出
    const groupedTransactions = computed(() => {
        const grouped = {}
        
        transactions.value.forEach(item => {
            if (!grouped[item.date]) {
                grouped[item.date] = {
                    income: 0,
                    expense: 0,
                    items: []
                }
            }
            
            grouped[item.date].items.push(item)
            
            if (item.type === 'income') {
                grouped[item.date].income += item.amount
            } else {
                grouped[item.date].expense += item.amount
            }
        })
        
        // 按日期排序
        const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a))
        const sortedGrouped = {}
        sortedDates.forEach(date => {
            sortedGrouped[date] = grouped[date]
        })
        
        return sortedGrouped
    })
    
    // 计算总收入和总支出
    const totalIncome = computed(() => {
        return transactions.value
            .filter(item => item.type === 'income')
            .reduce((sum, item) => sum + item.amount, 0)
    })
    
    const totalExpense = computed(() => {
        return transactions.value
            .filter(item => item.type === 'expense')
            .reduce((sum, item) => sum + item.amount, 0)
    })

    
    // 添加交易
    const addTransaction = () => {
        if (!newTransaction.value.name || !newTransaction.value.amount || !newTransaction.value.date) {
            uni.showToast({
                title: '请填写完整信息',
                icon: 'none'
            })
            return
        }
        
        const transaction = {
            id: Date.now(),
            name: newTransaction.value.name,
            amount: parseFloat(newTransaction.value.amount),
            type: newTransaction.value.type,
            date: newTransaction.value.date,
            icon: newTransaction.value.icon
        }
        
        transactions.value.unshift(transaction)
        
        // 重置表单
        newTransaction.value = {
            name: '',
            amount: '',
            type: 'expense',
            date: '',
            icon: 'wallet'
        }
        
        addPopup.value.close()
        
        uni.showToast({
            title: '添加成功',
            icon: 'success'
        })
    }

</script>

<style>
    .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: linear-gradient(to bottom, #f0f0f0 10%, #ffffff 20%);
        min-height: 100vh;
        padding-bottom: 100rpx;
    }

    .header-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        width: 95%;
        padding: 5rpx;
    }

    .left-section {
        display: flex;
        width: 20%;
        justify-content: flex-start;
    }

    .right-section {
        display: flex;
        width: 20%;
        justify-content: flex-end;
    }

    .center-section {
       display: flex;
       align-items: center;
       justify-content: center;
       border: 1px solid #ccc;
       padding: 1px 8px;
       border-radius: 10px;
       gap: 10rpx; 
	   margin-left: 35rpx;
    }
	
	
	 .calendar-popup-content {
	        background-color: #ffffff;
	        border-top-left-radius: 20rpx;
	        border-top-right-radius: 20rpx;
	        padding: 20rpx;
	        height: 70vh;
			margin-bottom: -68rpx;
	    }
	    
	 .current-date {
	      padding: 0 10rpx;
	 }
    .icon-text-container {
        display: flex;
        align-items: center;
    }

    .list-word {
        margin-top: -2rpx;
        margin-left: 4rpx;
        font-size: 14px;
        line-height: 1;
    }

    .calendar-content {
        padding: 20rpx;
    }

    .plusempty-icon {
        position: fixed;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
        width: 55px;
        height: 55px;
        background-color: #ffffff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)
    }

    .box2 {
        width: 120px;
        height: 120px;
        background-color: orange;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        overflow: hidden;
        background-color: white;
        border: 5px solid orange;
        margin-top: 20rpx;
    }

    .budget-statistic {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .box2 .budget-statistic /deep/ .iui-statistic-title {
        font-family: "黑体";
        font-size: 16px;
        color: orange;
        font-weight: bold;
        margin-bottom: -10rpx;
    }

    .box2 .budget-statistic /deep/ .iui-statistic-value {
        font-size: 18px;
        color: orange;
        font-family: "黑体";
        font-weight: bold;
    }

    .box3 {
        display: flex;
        justify-content: center;
        margin-top: 20rpx;
    }

    .box3 .income-statistic /deep/ .iui-statistic-title {
        font-family: "黑体";
        font-size: 12px;
        color: #000000;
        font-weight: bold;
        margin-bottom: -10rpx;
    }

    .box3 .expense-statistic /deep/ .iui-statistic-title {
        font-family: "黑体";
        font-size: 12px;
        color: #000000;
        font-weight: bold;
        margin-bottom: -10rpx;
    }

    .box3 .income-statistic /deep/ .iui-statistic-value,
    .box3 .expense-statistic /deep/ .iui-statistic-value {
        font-size: 16px;
        color: #000000;
        font-family: "黑体";
        font-weight: bold;
    }
    
    /* 列表样式 */
    .list-container {
        width: 95%;
        margin-top: 30rpx;
    }
    
    .day-block {
        background-color: #ffffff;
        border-radius: 10rpx;
        margin-bottom: 20rpx;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    .day-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .day-date {
        font-weight: bold;
        font-size: 16px;
    }
    
    .day-income {
        color: #4caf50;
        font-weight: bold;
    }
    
    .day-expense {
        color: #f44336;
        font-weight: bold;
    }
    
    .transaction-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .transaction-item:last-child {
        border-bottom: none;
    }
    
    .income-item {
        border-left: 4px solid #4caf50;
    }
    
    .expense-item {
        border-left: 4px solid #f44336;
    }
    
    .item-left {
        display: flex;
        align-items: center;
    }
    
    .item-name {
        margin-left: 10rpx;
        font-size: 14px;
    }
    
    .item-amount {
        font-weight: bold;
        font-size: 16px;
    }
    
    /* 弹窗样式 */
    .add-popup-content, .date-popup-content {
        background-color: #ffffff;
        border-top-left-radius: 20rpx;
        border-top-right-radius: 20rpx;
        padding: 30rpx;
        min-height: 60vh;
    }
    
    .popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30rpx;
    }
    
    .popup-title {
        font-size: 18px;
        font-weight: bold;
    }
    
    .form-group {
        margin-bottom: 30rpx;
    }
    
    .form-label {
        display: block;
        margin-bottom: 10rpx;
        font-weight: bold;
    }
    
    .form-input {
        width: 100%;
        padding: 15rpx;
        border: 1px solid #ccc;
        border-radius: 10rpx;
        font-size: 16px;
    }
    
    .type-selector {
        display: flex;
        border: 1px solid #ccc;
        border-radius: 10rpx;
        overflow: hidden;
    }
    
    .type-option {
        flex: 1;
        text-align: center;
        padding: 15rpx;
        background-color: #f0f0f0;
    }
    
    .type-option.selected {
        background-color: #007aff;
        color: #ffffff;
    }
    
    .date-selector {
        padding: 15rpx;
        border: 1px solid #ccc;
        border-radius: 10rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f9f9f9;
    }
    
    .icon-selector {
        display: flex;
        flex-wrap: wrap;
        gap: 20rpx;
    }
    
    .icon-selector .uni-icons {
        padding: 10rpx;
        border: 1px solid #f0f0f0;
        border-radius: 10rpx;
    }
    
    .icon-selector .uni-icons.selected-icon {
        border-color: #007aff;
        background-color: #e6f2ff;
    }
    
    .submit-button {
        width: 100%;
        background-color: #007aff;
        color: #ffffff;
        border: none;
        padding: 15rpx;
        border-radius: 10rpx;
        font-size: 16px;
    }
</style>