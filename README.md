# lmzj - 邻檬智家智慧物业与维修资金管理平台

本项目是一款面向**行业主管部门、开发建设单位、物业服务企业、业主委员会及广大业主**的综合性智慧物业管理系统。平台深度集成维修资金全生命周期管理、物业备案、社区治理及房屋安全鉴定等核心业务，构建多方协同的数字化服务生态。

## 🌟 业务核心

### 1. 维修资金全流程管理
- **资金缴纳**：支持开发建设单位与业主在网签备案后、初始登记前，便捷完成维修资金缴纳，确保权属登记顺畅。
- **使用申报**：为业主委员会及物业服务企业提供线上化申报通道，实现维修资金使用的规范化、透明化管理。
- **受理审核**：为主管部门提供高效的业务受理与审核工作流，提升行政服务效能。
- **收支动态**：新增实时收支趋势图表与明细记录，支持电子凭证预览与交易追溯。

### 2. 智慧物业与社区治理
- **业务备案**：实现小区物业相关业务的标准化备案管理。
- **民主投票**：集成线上投票系统，保障业主权利，提升社区决策效率。
- **报事报修**：提供一站式报修入口与全流程进度跟踪，提升物业响应速度。
- **互动公示**：新增维修资金使用公示模块，增强资金使用的透明度与监督力。

### 3. 房屋安全与辅助决策
- **安全鉴定**：支持房屋安全鉴定业务流程申请与结果追踪，保障居民居住安全。
- **数据中心**：提供多维度数据可视化大屏，辅助管理部门进行科学决策与资源调度。
- **个人中心**：集成消息通知、安全日志、房屋管理等全方位业主自助服务。

## 🚀 技术栈

- **框架**: [Uni-app](https://uniapp.dcloud.net.cn/) (Vue 3 + Composition API)
- **构建工具**: [Vite](https://vitejs.dev/) 5.2.8
- **UI 组件库**: [TDesign UniApp](https://tdesign.tencent.com/uniapp/) v0.7.1
- **编程语言**: TypeScript 4.9.4
- **样式预处理器**: Less 4.4.2
- **包管理器**: pnpm

## 📁 项目架构

```
lmzj/
├── src/
│   ├── components/           # 组件目录
│   │   ├── common/           # 通用组件
│   │   │   ├── PageSkeleton.vue    # 页面骨架屏
│   │   │   ├── PageHeader.vue      # 页面头部
│   │   │   └── ErrorBoundary.vue   # 错误边界
│   │   ├── skeleton/         # 骨架屏组件
│   │   ├── home/             # 首页组件
│   │   ├── business/         # 业务组件
│   │   └── ...
│   ├── composables/          # Vue3 组合式函数
│   │   ├── useRouteGuard.ts  # 路由守卫
│   │   ├── useCache.ts       # 数据缓存
│   │   ├── useFormValidate.ts # 表单验证
│   │   ├── useTheme.ts       # 主题管理
│   │   ├── useNumberAnimation.ts # 数字动画
│   │   ├── useFundStore.ts   # 资金状态
│   │   └── useHomeData.ts    # 首页数据
│   ├── config/               # 配置文件
│   │   ├── constants.ts      # 全局常量
│   │   └── community.ts      # 小区数据
│   ├── mocks/                # Mock 数据
│   │   ├── voting.mock.ts
│   │   ├── notice.mock.ts
│   │   └── fund.mock.ts
│   ├── pages/                # 页面目录
│   ├── styles/               # 全局样式
│   │   ├── variable.less     # Less 变量
│   │   ├── animations.less   # 动画库
│   │   └── theme.css         # 主题变量
│   ├── utils/                # 工具函数
│   │   ├── request.ts        # HTTP 请求
│   │   ├── eventBus.ts       # 事件总线
│   │   └── errorHandler.ts   # 错误处理
│   ├── types/                # TypeScript 类型
│   └── App.vue               # 应用入口
├── design-system/            # 设计系统文档
├── CHANGELOG.md              # 更新日志
└── README.md                 # 本文件
```

## 🎯 核心功能使用

### 路由守卫
```typescript
import { useRouteGuard } from '@/composables/useRouteGuard';

const { checkGuard, autoCheck } = useRouteGuard({
  requireLogin: true,
  requireRealName: true,
  requireHouse: false
});

// 自动在页面显示时检查权限
autoCheck();
```

### 数据缓存
```typescript
import { useListCache } from '@/composables/useCache';

const { list, loadList, refreshList } = useListCache('votes', {
  ttl: 5 * 60 * 1000,  // 缓存5分钟
  persist: true         // 持久化到本地存储
});

// 首次加载（优先读缓存）
await loadList(fetchVotes);

// 下拉刷新（强制更新）
await refreshList(fetchVotes);
```

### 表单验证
```typescript
import { useFormValidate, Validators } from '@/composables/useFormValidate';

const { values, errors, validateAll, reset } = useFormValidate({
  phone: {
    label: '手机号',
    rules: [Validators.required(), Validators.phone()]
  },
  content: {
    label: '内容',
    rules: [Validators.required(), Validators.length(10, 200)]
  }
});

// 提交验证
const onSubmit = () => {
  const { valid } = validateAll();
  if (valid) {
    // 提交数据
  }
};
```

### 主题切换
```typescript
import { useTheme } from '@/composables/useTheme';

const { isDark, toggle, setMode } = useTheme();

// 切换主题
toggle();

// 设置指定模式
setMode('dark');

// 跟随系统
setMode('auto');
```

### 事件总线
```typescript
import { useEventBus, Events } from '@/utils/eventBus';

const { on, emit } = useEventBus();

// 监听事件
on(Events.HOUSE_CHANGE, (house) => {
  console.log('房屋切换:', house);
});

// 触发事件
emit(Events.HOUSE_CHANGE, { name: '阳光水岸' });
```

## 🛠️ 快速开始

### 1. 安装依赖

```bash
npm install --legacy-peer-deps
```

### 2. 启动开发服务器

**H5 开发：**
```bash
npm run dev:h5
```

**微信小程序开发：**
```bash
npm run dev:mp-weixin
```

**支付宝小程序开发：**
```bash
npm run dev:mp-alipay
```

### 3. 构建生产环境

```bash
# H5
npm run build:h5

# 微信小程序
npm run build:mp-weixin
```

## 📝 更新日志

### [v2.3.0] - 2026-02-15

#### ✨ 新增功能

**通用组件库**
- `PageSkeleton` - 页面骨架屏组件，支持6种类型
- `PageHeader` - 统一页面头部组件
- `ErrorBoundary` - 错误边界组件
- `Skeleton` 系列 - 拆分为5个独立骨架屏组件

**状态管理增强**
- `useRouteGuard` - 路由守卫，统一权限验证
- `useCache` / `useListCache` - 数据缓存策略
- `useFormValidate` - 表单验证方案
- `eventBus` - 页面间事件通信

**主题系统**
- `theme.css` - CSS 变量定义亮色/暗黑主题
- `useTheme` - 主题切换逻辑，支持 light/dark/auto

**全局错误处理**
- `errorHandler.ts` - 全局错误状态管理

#### 🔧 优化改进

- **Mock 数据统一** - 集中到 `src/mocks/` 目录
- **常量抽取** - 全局常量在 `src/config/constants.ts`
- **小区数据合并** - 避免重复定义
- **动画统一** - 扩充到25个动画工具类
- **性能优化** - 数字动画使用 `performance.now()`

#### 📁 新增文件

```
src/components/common/
├── PageSkeleton.vue
├── PageHeader.vue
└── ErrorBoundary.vue

src/composables/
├── useRouteGuard.ts
├── useCache.ts
├── useFormValidate.ts
└── useTheme.ts

src/mocks/
├── voting.mock.ts
├── notice.mock.ts
└── fund.mock.ts

src/styles/
└── theme.css
```

查看完整更新日志：[CHANGELOG.md](./CHANGELOG.md)

### [v2.2.1] (2026-02-10)
- 消息中心"全部已读"按钮优化
- 公示公告年份选择器联动
- 代码库分支清理

### [v2.2.0] (2026-02-10)
- 个人中心扁平化设计
- 二级页面导航栏重构
- 消息中心整页滚动

### [v2.0.0] (2026-02-09)
- 重大架构升级
- TDesign 组件库定制
- UI/UX 全面焕新

### [v1.0.0]
- 初始化项目
- 首页基础架构
- 小区资金展示

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

[MIT](LICENSE) © 邻檬智家

---

<p align="center">
  <sub>Built with ❤️ by 邻檬智家团队</sub>
</p>
