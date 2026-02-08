// Mock 数据存储
const mockStore: Record<string, any> = {};

// 初始化 Mock 数据
export function initMock() {
  // 首页数据
  mockStore['/home/cards'] = {
    code: 200,
    message: '请求成功',
    data: [
      {
        url: '/static/home/card0.png',
        desc: '关于2025年第一季度维修资金公示',
        tags: [
          { text: '维修资金', theme: 'primary' },
          { text: '公示', theme: 'success' },
        ],
      },
      {
        url: '/static/home/card1.png',
        desc: '2号楼电梯维修进度实时更新',
        tags: [
          { text: '物业服务', theme: 'primary' },
          { text: '进行中', theme: 'warning' },
        ],
      },
      {
        url: '/static/home/card3.png',
        desc: '社区民主投票：关于增加充电桩的决议',
        tags: [
          { text: '民主投票', theme: 'primary' },
          { text: '热门', theme: 'danger' },
        ],
      },
      {
        url: '/static/home/card2.png',
        desc: '春季社区环境美化活动通知',
        tags: [
          { text: '社区治理', theme: 'primary' },
          { text: '通知', theme: 'success' },
        ],
      },
      {
        url: '/static/home/card4.png',
        desc: '房屋安全鉴定温馨提示',
        tags: [
          { text: '房屋安全', theme: 'primary' },
          { text: '提示', theme: 'success' },
        ],
      },
    ],
  };

  mockStore['/home/swipers'] = {
    code: 200,
    message: '请求成功',
    data: [
      { image: '/static/home/swiper0.png' },
      { image: '/static/home/card0.png' },
      { image: '/static/home/card1.png' },
    ],
  };

  // 搜索数据
  mockStore['/api/searchHistory'] = {
    code: 200,
    data: {
      historyWords: ['维修资金', '物业备案', '报修进度', '投票结果', '安全鉴定'],
    },
  };

  mockStore['/api/searchPopular'] = {
    code: 200,
    data: {
      popularWords: ['维修资金缴纳', '电梯报修', '业委会选举', '房屋加固', '物业费查询'],
    },
  };

  // 登录数据
  mockStore['/login/getSendMessage'] = {
    success: true,
    data: { message: '验证码已发送' },
  };

  mockStore['/login/postPasswordLogin'] = {
    success: true,
    data: { token: 'mock_token_12345' },
  };

  mockStore['/login/postCodeVerify'] = {
    success: true,
    data: { token: 'mock_token_12345' },
  };

  // 我的页面数据
  mockStore['/api/getServiceList'] = {
    code: 200,
    data: {
      service: [
        { name: '报事报修', image: '/static/icon_doc.png', url: '' },
        { name: '我的投票', image: '/static/icon_map.png', url: '' },
        { name: '业主交流', image: '/static/icon_qq.png', url: '' },
        { name: '官方公告', image: '/static/icon_td.png', url: '' },
      ],
    },
  };

  mockStore['/api/genPersonalInfo'] = {
    code: 200,
    data: {
      name: '张先生',
      image: '/static/avatar1.png',
      star: '金牌业主',
      city: '深圳',
      gender: 1,
      birth: '1985-05-20',
      address: ['440000', '440300'],
      introduction: '致力于打造和谐美好的社区环境。',
      photos: [
        { url: '/static/image1.png', name: 'image1.png', type: 'image' },
        { url: '/static/image2.png', name: 'image2.png', type: 'image' },
      ],
    },
  };

  // 数据中心
  mockStore['/dataCenter/member'] = {
    code: 200,
    data: {
      template: {
        succ: {
          data: {
            list: [
              { name: '累计缴纳(万元)', number: 1250 },
              { name: '已使用(万元)', number: 340 },
              { name: '结余(万元)', number: 910 },
            ],
          },
        },
      },
    },
  };

  mockStore['/dataCenter/interaction'] = {
    code: 200,
    data: {
      template: {
        succ: {
          data: {
            list: [
              { name: '报修总量', number: 850 },
              { name: '已完成', number: 720 },
              { name: '好评率', number: 95 },
              { name: '投诉量', number: 12 },
            ],
          },
        },
      },
    },
  };

  mockStore['/dataCenter/complete-rate'] = {
    code: 200,
    data: {
      template: {
        succ: {
          data: {
            list: [
              { time: '维修资金申报', percentage: 92 },
              { time: '报事报修响应', percentage: 98 },
              { time: '安全鉴定执行', percentage: 85 },
              { time: '投票决策参与', percentage: 76 },
            ],
          },
        },
      },
    },
  };

  mockStore['/dataCenter/area'] = {
    code: 200,
    data: {
      template: {
        succ: {
          data: {
            list: [],
          },
        },
      },
    },
  };

  // 拦截 uni.request
  const originalRequest = uni.request;
  // @ts-ignore
  uni.request = function (options: UniApp.RequestOptions) {
    const url = options.url || '';
    
    // 检查是否有对应的 mock 数据
    for (const key in mockStore) {
      if (url.endsWith(key)) {
        const mockData = mockStore[key];
        setTimeout(() => {
          if (options.success) {
            options.success({
              data: mockData,
              statusCode: 200,
              header: {},
              cookies: [],
              errMsg: 'request:ok',
            } as UniApp.RequestSuccessCallbackResult);
          }
          if (options.complete) {
            options.complete({} as any);
          }
        }, 300);
        return { abort: () => {} } as UniApp.RequestTask;
      }
    }
    
    // 如果没有 mock 数据，调用原始请求
    return originalRequest(options);
  };
}

export default { initMock };
