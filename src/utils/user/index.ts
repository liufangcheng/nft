// import { userApi } from '@/services';
/**
 * 退出登录
 */
export const logout = async () => {
  try {
    localStorage.clear();
    window.location.href = '/home';
    // await userApi.loginOut();
    // localStorage.setItem('userStatus', 'logout');
    // localStorage.setItem('wallets', '[]');
    // window.location.href = '/login';
  } catch (error) {
    // localStorage.setItem('userStatus', 'logout');
    // window.location.href = '/login';
  }
};
