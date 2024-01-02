
import './App.css';

// App.js
import React from 'react';
import ResponsiveAppBar from './components/ResponsiveAppBar'; 
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VlookupPage from './pages/VlookupSingle/VlookupPage';
import VlookupMultiplePage from './pages/VlookupMultiple/VlookupMultiplePage';
import VlookupJapantimemallPage from './pages/VlookupJapantimemall/VlookupJapantimemallPage';

  // 2-1. multiple criteria route setup and show different title
  // => check

  // 2-2. coupang excel base 등록 및 추출 칼럼 선택
  // => check

const App = () => {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/vlookup" element={<VlookupPage />} />
        <Route path="/vlookup-multiple" element={<VlookupMultiplePage />} />
        <Route path="/japantimemall" element={<VlookupJapantimemallPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

  // "시작했으면 끝을 내는 습관" => 1년 허탕도 가능
  // "2차는 다른것" => 마케팅 집중

  // 1차 목표: google ad로 사용하는지 확인 (구매대행, ..., 외국인 사용 용도 등 custom target에 제공)
  // 2차 목표: export는 premium