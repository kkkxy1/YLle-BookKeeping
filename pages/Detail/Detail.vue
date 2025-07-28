<template>
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
	    <view class="center-section" @click="open">
	      <text class="current-date">{{ currentYearMonth }}</text>
	      <uni-icons type="arrowdown" size="14" color="#666"></uni-icons>
	    </view>
	    
	    <!--搜索按钮-->
	    <view class="right-section">
	      <navigator url="/pages/Detail/Search/Search">
	        <uni-icons type="search" size="18" vertical-align: middle></uni-icons>
	      </navigator>
	    </view>
	  </view>
	  
	<view class="calendar-content">
		      <view class="calendar-container">
		        <uni-calendar 
		          ref="calendar"
		          class="uni-calendar--hook"
		          :clear-date="true"
		          :date="info.date"
		          :insert="info.insert"
		          :lunar="info.lunar"
		          :start-date="info.startDate"
		          :end-date="info.endDate"
		          :range="info.range"
		          @confirm="confirm"
		          @close="close"
		        />
		      </view>
	</view>

	<view class="box1">
		<navigator url="/pages/Detail/Add/Add">
			  <uni-icons class="plusempty-icon" type="plusempty" size="40" color="#000000"></uni-icons>
		</navigator>
    </view>
	
	<view class="box2">
	  <navigator url="/pages/Detail/Budget/Budget">
	    <iui-statistic class="budget-statistic" title="预算剩余" :value="2500" :precision="2"></iui-statistic>
	  </navigator>
	</view>			
		
	
	<view class="box3">
	  <iui-statistic class="income-statistic" title="收入：" :value="120" :precision="2"></iui-statistic>
	  <iui-statistic class="expense-statistic" title="支出：" :value="300" :precision="2"></iui-statistic>
	</view>
	
</template>

<script>
	export default {
	  data() {
	    return {
	      showCalendar: true,
	      currentYearMonth: "", 
	      info: {
	        date: '',
	        startDate: '2025-01-01',
	        endDate: '2025-12-31',
	        lunar: false,
	        range: false,
	        insert: false
	      }
	    }
	  },
	  mounted() {
	    this.setCurrentYearMonth();
	  },
	  methods: {
	    
	    setCurrentYearMonth() {
	      const now = new Date();
	      const year = now.getFullYear();
	      const month = now.getMonth() + 1; 
	      this.currentYearMonth = `${year}年${month}月`;
	    },
	    
	    open() {
	      this.$refs.calendar.open();
	    },
	    
	    
	    close() {
	      console.log('日历关闭');
	    },
	    
	    
	    confirm(e) {
	      console.log('选择的日期:', e);
	      
	      const [year, month] = e.fulldate.split('-');
	      this.currentYearMonth = `${year}年${parseInt(month)}月`;
	    }
	  }
	}
</script>

<style>
	
	 .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx;
    background-color: #ffffff;
    border-bottom: 1rpx solid #eee; 
  }
  
  .left-section{
   flex: 0 0 auto;
  }
   
  .right-section {
    margin-right: 20rpx;
  }
  
  .current-date-container {
    display: flex;
    align-items: center;
    padding: 8rpx 25rpx;
    background-color: #f5f5f5;
    border-radius: 30rpx;
  }
  
  .current-date {
    font-size: 16px;
    color: #000000;
    margin-right: 10rpx;
    font-family: "黑体";
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
  
   .calendar-container {
  	 width: 25%;
  	 height: 20px;
  	 border:1px solid #cccccc;
  	 white-space:nowrap;
	 margin-top: -45px;
	 margin-left: 280rpx;
	 border-radius: 15rpx;
  	 }
	
	.plusempty-icon{
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
	  margin-left: 260rpx;
	  margin-top: -18rpx;
	  width: 120px;
	  height: 120px;
	  background-color: orange;
	  border-radius: 50%;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  color: white;
	  font-size: 16px;
	  overflow: hidden; 
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
	  color: #000000;
	  font-weight: bold;
	  margin-bottom: -10rpx;
	  margin-left: 15rpx;
	}
	
	.box2 .budget-statistic /deep/ .iui-statistic-value {
	    font-size: 22px;
	    color: #000000;
		font-family: "黑体";
		font-weight: bold;
	  }
	  
  .box3 {
      display: flex;
      justify-content: space-between;
      padding: 30rpx 60rpx;
      margin-top: 30rpx;
	  margin-left: 10rpx;
	  margin-right: 30rpx;
    }
	
	.box3 .income-statistic /deep/ .iui-statistic-title {
	  font-family: "黑体"; 
	  font-size: 18px; 
	  color: #000000;
	  font-weight: bold;
	  margin-bottom: -10rpx;
	}
	
	.box3 .expense-statistic /deep/ .iui-statistic-title {
	  font-family: "黑体"; 
	  font-size: 18px; 
	  color: #000000;
	  font-weight: bold;
	  margin-bottom: -10rpx;
	}
</style>