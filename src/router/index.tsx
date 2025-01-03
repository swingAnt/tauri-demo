import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import SplashPage from '@/pages/SplashPage';
import Result from '@/pages/Result';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>  {/* 使用 Routes 替代 Switch */}
        <Route path="/" element={<SplashPage />} />  {/* 使用 element 渲染组件 */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/result" element={<Result />} />

      </Routes>
    </Router>
  );
}

export default App;
