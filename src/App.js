
import './App.css';

// App.js
import React from 'react';
import ResponsiveAppBar from './components/ResponsiveAppBar'; 
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VlookupPage from './pages/VlookupSingle/VlookupPage';
import VlookupMultiplePage from './pages/VlookupMultiple/VlookupMultiplePage';
import VlookupJapantimemallPage from './pages/VlookupJapantimemall/VlookupJapantimemallPage';

  // 1-1-1. 사전 예약 페이지 기획
  // 잡아라의 이런 분들께 추천해요
  // => check

  // 1-1-1-1. 큰 틀 잡기
  // => check

  // 1-1-1-2. 서비스 소개
  // => check

  // 1-1-2. remainder: 묶음그룹 (숫자 자동), 배송 방법, 대행 구분 drop down
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

  // 1월 30일. 랜딩 페이지 및 1명에게 DB 획득. (안되고 있다 => 교육 신청)