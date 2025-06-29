import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ParticipantsPage from './pages/ParticipantsPage';

// استيراد صفحات إضافية سيتم إنشاؤها لاحقًا
// import BooksPage from './pages/BooksPage';
// import ReportsPage from './pages/ReportsPage';
// import CalendarPage from './pages/CalendarPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="participants" element={<ParticipantsPage />} />
          {/* صفحات إضافية سيتم إنشاؤها لاحقًا */}
          <Route path="books" element={<div className="p-8 text-center">صفحة إدارة المتون العلمية - قيد الإنشاء</div>} />
          <Route path="reports" element={<div className="p-8 text-center">صفحة التقارير والمتابعة - قيد الإنشاء</div>} />
          <Route path="calendar" element={<div className="p-8 text-center">صفحة لوحة الجدولة - قيد الإنشاء</div>} />
          
          {/* إعادة توجيه المسارات غير المعروفة */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
