import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  UserGroupIcon,
  BookOpenIcon,
  DocumentChartBarIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import { useBooks } from '../hooks/useBooks';
import { useParticipants } from '../hooks/useParticipants';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

// مكون البطاقة الإحصائية
const StatCard = ({ title, value, icon: Icon, color, href }: { 
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  href: string;
}) => (
  <Link to={href} className="block">
    <div className={`bg-white rounded-lg shadow p-6 hover:shadow-md transition duration-200 border-t-4 ${
      color === 'primary' ? 'border-primary-500' : 
      color === 'secondary' ? 'border-secondary-500' :
      color === 'accent' ? 'border-accent-500' :
      `border-${color}-500`
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${
          color === 'primary' ? 'bg-primary-100' : 
          color === 'secondary' ? 'bg-secondary-100' :
          color === 'accent' ? 'bg-accent-100' :
          `bg-${color}-100`
        }`}>
          <Icon className={`h-6 w-6 ${
            color === 'primary' ? 'text-primary-500' : 
            color === 'secondary' ? 'text-secondary-500' :
            color === 'accent' ? 'text-accent-500' :
            `text-${color}-500`
          }`} aria-hidden="true" />
        </div>
      </div>
    </div>
  </Link>
);

const Dashboard = () => {
  const { books, fetchBooks } = useBooks();
  const { participants, fetchParticipants } = useParticipants();
  const [bookStats, setBookStats] = useState({
    underTrial: 0,
    underReview: 0,
    sentForApproval: 0,
  });

  useEffect(() => {
    fetchBooks();
    fetchParticipants();
  }, []);

  useEffect(() => {
    if (books.length > 0) {
      setBookStats({
        underTrial: books.filter(book => book.status === 'تحت التجربة').length,
        underReview: books.filter(book => book.status === 'تحت المراجعة').length,
        sentForApproval: books.filter(book => book.status === 'تم الإرسال للمعتمد').length,
      });
    }
  }, [books]);

  // الكتب المنشورة
  const publishedBooks = books.filter(book => book.publishStatus !== 'غير منشور').length;

  // توزيع الكتب حسب المستوى للعرض في البطاقة
  const getLevelDistribution = () => {
    const distribution = books.reduce((acc, book) => {
      acc[book.level] = (acc[book.level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return distribution;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
        <p className="text-sm text-gray-500">{new Date().toLocaleDateString('ar-SA')}</p>
      </div>

      {/* البطاقات الإحصائية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي المشاركين"
          value={participants.length}
          icon={UserGroupIcon}
          color="primary"
          href="/participants"
        />
        <StatCard
          title="إجمالي المتون العلمية"
          value={books.length}
          icon={BookOpenIcon}
          color="secondary"
          href="/books"
        />
        <StatCard
          title="التسجيلات المنشورة"
          value={publishedBooks}
          icon={DocumentChartBarIcon}
          color="accent"
          href="/reports"
        />
        <StatCard
          title="بانتظار المراجعة"
          value={bookStats.underReview}
          icon={CalendarDaysIcon}
          color="red"
          href="/calendar"
        />
      </div>

      {/* حالة المشاريع */}
      <Card title="حالة المشروعات">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-accent-50 rounded-md p-4 border border-accent-200">
            <h3 className="font-medium text-accent-800">تحت التجربة</h3>
            <p className="text-2xl font-bold text-accent-600 mt-2">{bookStats.underTrial}</p>
          </div>
          <div className="bg-primary-50 rounded-md p-4 border border-primary-200">
            <h3 className="font-medium text-primary-800">تحت المراجعة</h3>
            <p className="text-2xl font-bold text-primary-600 mt-2">{bookStats.underReview}</p>
          </div>
          <div className="bg-secondary-50 rounded-md p-4 border border-secondary-200">
            <h3 className="font-medium text-secondary-800">تم الإرسال للمعتمد</h3>
            <p className="text-2xl font-bold text-secondary-600 mt-2">{bookStats.sentForApproval}</p>
          </div>
        </div>
      </Card>
      
      {/* المتون حسب المستوى */}
      <Card title="توزيع المتون حسب المستوى">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-2">المستوى</th>
                <th className="px-4 py-2">عدد المتون</th>
                <th className="px-4 py-2">النسبة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(getLevelDistribution()).map(([level, count]) => (
                <tr key={level} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{level}</td>
                  <td className="px-4 py-3">{count}</td>
                  <td className="px-4 py-3">
                    {books.length > 0 ? Math.round((count / books.length) * 100) : 0}%
                  </td>
                </tr>
              ))}
              {books.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-3 text-center text-gray-500">
                    لا توجد متون مسجلة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* أحدث المشاركين والكتب */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* أحدث المشاركين */}
        <Card
          title="أحدث المشاركين"
          titleAction={
            <Link to="/participants" className="text-sm text-primary-600 hover:text-primary-700">
              عرض الكل
            </Link>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-2">الاسم</th>
                  <th className="px-4 py-2">المرحلة</th>
                  <th className="px-4 py-2">تاريخ التسجيل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {participants.slice(0, 5).map((participant) => (
                  <tr key={participant.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{participant.fullName}</td>
                    <td className="px-4 py-3">{participant.level}</td>
                    <td className="px-4 py-3">{new Date(participant.registrationDate).toLocaleDateString('ar-SA')}</td>
                  </tr>
                ))}
                {participants.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-center text-gray-500">
                      لا يوجد مشاركين
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* أحدث الكتب */}
        <Card
          title="أحدث المتون العلمية"
          titleAction={
            <Link to="/books" className="text-sm text-primary-600 hover:text-primary-700">
              عرض الكل
            </Link>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-2">عنوان الكتاب</th>
                  <th className="px-4 py-2">القارئ</th>
                  <th className="px-4 py-2">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {books.slice(0, 5).map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{book.title}</td>
                    <td className="px-4 py-3">{book.readerName}</td>
                    <td className="px-4 py-3">
                      {book.status === 'تحت التجربة' && (
                        <Badge variant="warning">{book.status}</Badge>
                      )}
                      {book.status === 'تحت المراجعة' && (
                        <Badge variant="info">{book.status}</Badge>
                      )}
                      {book.status === 'تم الإرسال للمعتمد' && (
                        <Badge variant="success">{book.status}</Badge>
                      )}
                    </td>
                  </tr>
                ))}
                {books.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-center text-gray-500">
                      لا يوجد كتب مسجلة
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
