import { createSSRApp } from "vue";
import App from "./App.vue";
import '@tdesign/uniapp/common/style/theme/index.less';

// Polyfill for Uni-app H5 system info issues
if (typeof window !== 'undefined') {
  const originalGetSystemInfoSync = uni.getSystemInfoSync;
  uni.getSystemInfoSync = function() {
    const info = originalGetSystemInfoSync();
    if (info && !info.safeArea) {
      info.safeArea = {
        top: 0,
        left: 0,
        right: window.innerWidth,
        bottom: window.innerHeight,
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
    return info;
  };
}

export function createApp() {
  const app = createSSRApp(App);
  app.config.errorHandler = (err, instance, info) => {
    console.error('Vue Global Error:', err);
    console.log('Error Instance:', instance);
    console.log('Error Info:', info);
  };
  return {
    app,
  };
}
