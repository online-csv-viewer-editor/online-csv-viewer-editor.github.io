
import './App.css';

// App.js
import React from 'react';
import ResponsiveAppBar from './components/ResponsiveAppBar'; 
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VlookupPage from './pages/VlookupSingle/VlookupPage';
import VlookupMultiplePage from './pages/VlookupMultiple/VlookupMultiplePage';
import VlookupJapantimemallPage from './pages/VlookupJapantimemall/VlookupJapantimemallPage';

  // japantimemall
  // 1-1. remainder: 묶음그룹 (숫자 자동), 배송 방법, 대행 구분 drop down
  // => check

const App = () => {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/vlookup/single" element={<VlookupPage />} />
        <Route path="/vlookup/multiple" element={<VlookupMultiplePage />} />
        <Route path="/japantimemall" element={<VlookupJapantimemallPage />} />
        <Route path="" element={<VlookupMultiplePage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

  // "시작했으면 끝을 내는 습관" => 1년 허탕도 가능

  // 2차 목표: japantimemall 사용 용도 등 custom target에 제공 - 1월 20일. 오픈 톡방. 온꿈사. is 가치? => feedback.
  // => 한글 영어 romanizer 까지 => 2차는 주문번호.
  // 1월 31일 목표: 영어용으로 shopee 제공. 수요 테스트.

  // 3차 목표: global service 수요 조사.