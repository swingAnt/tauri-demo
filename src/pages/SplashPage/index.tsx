import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {positionWindow} from "@/utils"
import reactLogo from "@/assets/1.gif";
import './index.css'; // 修改这里的导入方式
const SplashPage: React.FC = () => {
  const navigate = useNavigate();  // 使用 useNavigate 替代 useHistory

  useEffect(() => {
    positionWindow()
    const timer = setTimeout(() => {
      navigate('/home');  // 使用 navigate() 来跳转页面
    }, 5000); // 3秒后跳转到主页面
    return () => {timer&&clearTimeout(timer)};
  }, [navigate]);

  return <div className={'content'}>          <img src={reactLogo} width={150} height={100} className="logo react" alt="gif" />
</div>;
}

export default SplashPage;
