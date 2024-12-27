import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashPage: React.FC = () => {
  const navigate = useNavigate();  // 使用 useNavigate 替代 useHistory

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');  // 使用 navigate() 来跳转页面
    }, 3000); // 3秒后跳转到主页面
    return () => clearTimeout(timer);
  }, [navigate]);

  return <div>加载中...</div>;
}

export default SplashPage;
