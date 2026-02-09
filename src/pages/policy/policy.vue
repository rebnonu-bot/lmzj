<template>
  <view class="page-container">
    <!-- Header with Search -->
    <view class="header">
      <view class="header-top">
        <t-icon name="home" size="44rpx" color="#3B82F6" @click="goHome" />
        <view class="search-box">
          <t-icon name="search" size="32rpx" color="#94A3B8" />
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="搜索" 
            placeholder-class="placeholder"
          />
        </view>
      </view>
    </view>

    <!-- Policy List -->
    <scroll-view scroll-y class="content">
      <!-- Loading State -->
      <view v-if="loading" class="loading-container">
        <t-loading theme="circular" size="80rpx" text="加载中..." inherit-color />
      </view>

      <view v-else>
        <view class="policy-list" v-if="filteredPolicies.length > 0">
          <view 
            class="policy-item" 
            v-for="(item, index) in filteredPolicies" 
            :key="index"
            @click="handlePolicyClick(item)"
          >
            <view class="item-icon"></view>
            <view class="item-main">
              <text class="item-title">{{ item.title }}</text>
              <view class="item-info">
                <text class="item-source">{{ item.source }}</text>
                <text class="item-date">{{ item.date }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- Empty State -->
        <view class="empty-state" v-else>
          <t-icon name="root-list" size="120rpx" color="#3B82F6" />
          <text class="tips">暂无相关政策法规</text>
        </view>
        
        <!-- Footer -->
        <app-footer />
      </view>
    </scroll-view>

    <!-- Tab Bar -->
    <app-tab-bar activePath="pages/policy/policy" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';

const loading = ref(true);

onShow(() => {
  uni.hideTabBar().catch(() => {});
  // 模拟加载过程
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 300);
});

interface Policy {
  title: string;
  source: string;
  date: string;
  pdfUrl?: string;
}

const searchQuery = ref('');

const policies = ref<Policy[]>([
  {
    title: '住宅专项维修资金管理办法',
    source: '中华人民共和国建设部 中华人民共和国财政部',
    date: '2026年02月08日',
    pdfUrl: '/static/3.pdf'
  },
  {
    title: '物业管理条例',
    source: '中华人民共和国国务院',
    date: '2026年02月08日',
    pdfUrl: '/static/2.pdf'
  },
  {
    title: '赣州市中心城区申请住房保障授权与承诺书',
    source: '赣州市住房和城乡建设局',
    date: '2026年02月08日',
    pdfUrl: '/static/1.pdf'
  }
]);

const filteredPolicies = computed(() => {
  if (!searchQuery.value) return policies.value;
  const query = searchQuery.value.toLowerCase();
  return policies.value.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.source.toLowerCase().includes(query)
  );
});

const goHome = () => {
  uni.switchTab({
    url: '/pages/index/index'
  });
};

const handlePolicyClick = (item: Policy) => {
  if (!item.pdfUrl) {
    uni.showToast({
      title: '暂无文档链接',
      icon: 'none'
    });
    return;
  }

  // #ifdef H5
  // H5 环境：跳转到内部预览页面，而不是直接打开新窗口
  uni.navigateTo({
    url: `/pages/policy/pdf-preview?url=${encodeURIComponent(item.pdfUrl)}&title=${encodeURIComponent(item.title)}`
  });
  // #endif

  // #ifndef H5
  // 非 H5 环境（小程序/App）
  if (item.pdfUrl.startsWith('/static/')) {
    // 微信小程序等环境无法直接通过 openDocument 打开包内(static)文件
    // 通常需要先将包内文件复制到本地存储，或者直接提示
    // 这里为了演示，如果是本地文件且在非H5环境，提示预览
    uni.showModal({
      title: '提示',
      content: '本地文档预览建议在 H5 环境下查看，或者使用远程 URL。',
      showCancel: false
    });
    return;
  }

  uni.showLoading({
    title: '正在加载文档...',
    mask: true
  });

  // 下载文件
  uni.downloadFile({
    url: item.pdfUrl,
    success: (res) => {
      if (res.statusCode === 200) {
        const filePath = res.tempFilePath;
        uni.openDocument({
          filePath: filePath,
          showMenu: true,
          success: () => {
            console.log('打开文档成功');
          },
          fail: (err) => {
            console.error('openDocument fail:', {
              errMsg: err.errMsg,
              errCode: err.errCode,
              originalError: err
            });
            uni.showToast({
              title: '打开文件失败',
              icon: 'none'
            });
          },
          complete: () => {
            uni.hideLoading();
          }
        });
      } else {
        uni.hideLoading();
        console.error('Download status code:', res.statusCode);
        uni.showToast({
          title: '下载失败',
          icon: 'none'
        });
      }
    },
    fail: (err) => {
      uni.hideLoading();
      console.error('downloadFile fail:', {
        errMsg: err.errMsg,
        errCode: err.errCode,
        originalError: err
      });
      uni.showToast({
        title: '下载文件失败',
        icon: 'none'
      });
    }
  });
  // #endif
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff; // 列表页通常使用纯白背景以保持清晰度
}

.header {
  flex-shrink: 0;
  height: 100rpx;
  background: #fff;
  padding: 10rpx @page-padding;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #F1F5F9;
  
  .header-top {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20rpx;

    .search-box {
      flex: 1;
      height: 64rpx;
      background: #F1F5F9;
      border-radius: 32rpx;
      display: flex;
      align-items: center;
      padding: 0 24rpx;
      gap: 12rpx;

      input {
        flex: 1;
        font-size: 28rpx;
        color: @text-primary;
      }

      .placeholder {
        color: #94A3B8;
      }
    }
  }
}

.content {
  flex: 1;
  height: 0; // 必须设置高度或 flex: 1 配合 scroll-view
  
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 300rpx;
    color: @primary-blue;
  }
  
  .policy-list {
    padding: 20rpx 0;
    
    .policy-item {
      display: flex;
      padding: 32rpx @page-padding;
      position: relative;
      transition: background-color 0.2s ease;

      &:active {
        background-color: #F8FAFC;
      }

      &::after {
        content: '';
        position: absolute;
        left: @page-padding;
        right: @page-padding;
        bottom: 0;
        height: 1rpx;
        background-color: #F1F5F9;
      }

      .item-icon {
        width: 12rpx;
        height: 12rpx;
        background-color: @primary-blue;
        border-radius: 2rpx;
        margin-top: 14rpx;
        flex-shrink: 0;
      }

      .item-main {
        flex: 1;
        margin-left: 24rpx;
        display: flex;
        flex-direction: column;
        gap: 16rpx;

        .item-title {
          font-size: 30rpx;
          color: @text-primary;
          line-height: 1.5;
          font-weight: 400;
        }

        .item-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20rpx;
          
          .item-source {
            flex: 1;
            font-size: 24rpx;
            color: @text-secondary;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .item-date {
            flex-shrink: 0;
            font-size: 24rpx;
            color: @text-secondary;
          }
        }
      }
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 200rpx;
    .tips {
      margin-top: 32rpx;
      font-size: @font-body;
      color: @text-secondary;
    }
  }
}
</style>
