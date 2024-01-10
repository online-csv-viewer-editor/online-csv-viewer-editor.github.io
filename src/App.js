
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
  // 1-1. base 업로드 시 옵션ID, 이름, 추출해서 match 생성
  // => check
  // 1-2. match 생성 시 상품 정보 column 추가
  // => check
  // 1-3. result 생성. 생성 시 base에서 그 외 필요한 정보 획득
  // => check
  // 1-4. 일부 column 명 변경 후 추가
  // => check

const App = () => {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/vlookup/single" element={<VlookupPage />} />
        <Route path="/vlookup/multiple" element={<VlookupMultiplePage />} />
        <Route path="/japantimemall" element={<VlookupJapantimemallPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

  // "시작했으면 끝을 내는 습관" => 1년 허탕도 가능

  // 1차 목표: google ad로 사용하는지 확인
  // 2차 목표: japantimemall 사용 용도 등 custom target에 제공 - 1월 12일