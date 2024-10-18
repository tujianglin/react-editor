import App from '@/App.tsx';
import '@/assets/iconfont/iconfont.css';
import '@/styles/index.less';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { createRoot } from 'react-dom/client';
import 'uno.css';

createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN} componentSize="small">
    <App />
  </ConfigProvider>,
);
