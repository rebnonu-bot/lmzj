# lmzj - 智慧物业与维修资金管理平台

本项目是一款面向**行业主管部门、开发建设单位、物业服务企业、业主委员会及广大业主**的综合性智慧物业管理系统。平台深度集成维修资金全生命周期管理、物业备案、社区治理及房屋安全鉴定等核心业务，构建多方协同的数字化服务生态。

## 🌟 业务核心

### 1. 维修资金全流程管理
- **资金缴纳**：支持开发建设单位与业主在网签备案后、初始登记前，便捷完成维修资金缴纳，确保权属登记顺畅。
- **使用申报**：为业主委员会及物业服务企业提供线上化申报通道，实现维修资金使用的规范化、透明化管理。
- **受理审核**：为主管部门提供高效的业务受理与审核工作流，提升行政服务效能。

### 2. 智慧物业与社区治理
- **业务备案**：实现小区物业相关业务的标准化备案管理。
- **民主投票**：集成线上投票系统，保障业主权利，提升社区决策效率。
- **报事报修**：提供一站式报修入口与全流程进度跟踪，提升物业响应速度。

### 3. 房屋安全与辅助决策
- **安全鉴定**：支持房屋安全鉴定业务流程申请与结果追踪，保障居民居住安全。
- **数据中心**：提供多维度数据可视化大屏，辅助管理部门进行科学决策与资源调度。

## 🚀 技术栈

- **框架**: [Uni-app](https://uniapp.dcloud.net.cn/) (Vue 3)
- **构建工具**: [Vite](https://vitejs.dev/)
- **UI 组件库**: [TDesign UniApp](https://tdesign.tencent.com/uniapp/)
- **编程语言**: TypeScript
- **样式**: Less
- **设计智能**: 集成了 `ui-ux-pro-max` 技能库，提供专业级 UI/UX 设计支持。


## 📁 项目结构

```text
├── .trae/               # Trae 配置文件及技能库
│   └── skills/          # ui-ux-pro-max 设计技能库
├── src/
│   ├── pages/           # 页面目录 (目前仅包含 index 首页)
│   ├── styles/          # 全局样式及变量
│   ├── App.vue          # 应用入口
│   ├── main.ts          # 脚本入口
│   └── pages.json       # 页面路由配置
├── package.json         # 依赖及脚本配置
└── vite.config.ts       # Vite 配置文件
```

## 🛠️ 快速开始

### 1. 安装依赖

建议使用 npm 安装依赖（已配置兼容性处理）：

```bash
npm install --legacy-peer-deps
```

### 2. 启动开发服务器

启动 H5 预览：

```bash
npm run dev:h5
```

启动微信小程序编译：

```bash
npm run dev:mp-weixin
```

## 🤝 贡献与同步

项目已关联 GitHub 远程仓库：[rebnonu-bot/lmzj](https://github.com/rebnonu-bot/lmzj.git)

提交代码前请确保运行：
```bash
git pull origin main
git add .
git commit -m "feat: your description"
git push origin main
```
