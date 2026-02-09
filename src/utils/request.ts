/**
 * 统一网络请求封装
 */

interface RequestConfig extends UniApp.RequestOptions {
  showLoading?: boolean;
  loadingText?: string;
}

interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

const BASE_URL = ''; // 可以在此处配置基础URL

export const request = <T = any>(config: RequestConfig): Promise<ApiResponse<T>> => {
  const { 
    url, 
    method = 'GET', 
    data, 
    header = {}, 
    showLoading = true, 
    loadingText = '加载中...',
    ...rest 
  } = config;

  if (showLoading) {
    uni.showLoading({
      title: loadingText,
      mask: true
    });
  }

  // 可以在此处添加鉴权Token
  const token = uni.getStorageSync('token');
  const authHeader = token ? { 'Authorization': `Bearer ${token}` } : {};

  return new Promise((resolve, reject) => {
    uni.request({
      url: url.startsWith('http') ? url : `${BASE_URL}${url}`,
      method,
      data,
      header: {
        ...header,
        ...authHeader
      },
      ...rest,
      success: (res) => {
        const response = res.data as ApiResponse<T>;
        
        // 根据业务状态码处理
        if (res.statusCode === 200) {
          resolve(response);
        } else if (res.statusCode === 401) {
          // 处理登录失效
          uni.removeStorageSync('token');
          uni.showToast({
            title: '登录已过期，请重新登录',
            icon: 'none'
          });
          reject(new Error('Unauthorized'));
        } else {
          uni.showToast({
            title: response.message || '请求失败',
            icon: 'none'
          });
          reject(new Error(response.message || 'Request failed'));
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
        reject(err);
      },
      complete: () => {
        if (showLoading) {
          uni.hideLoading();
        }
      }
    });
  });
};

// 快捷方法封装
export const http = {
  get: <T = any>(url: string, data?: any, config?: Partial<RequestConfig>) => 
    request<T>({ ...config, url, method: 'GET', data }),
    
  post: <T = any>(url: string, data?: any, config?: Partial<RequestConfig>) => 
    request<T>({ ...config, url, method: 'POST', data }),
    
  put: <T = any>(url: string, data?: any, config?: Partial<RequestConfig>) => 
    request<T>({ ...config, url, method: 'PUT', data }),
    
  delete: <T = any>(url: string, data?: any, config?: Partial<RequestConfig>) => 
    request<T>({ ...config, url, method: 'DELETE', data })
};
