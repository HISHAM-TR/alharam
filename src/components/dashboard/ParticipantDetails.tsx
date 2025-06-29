import { XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useBooks } from '../../hooks/useBooks';
import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import type { Participant, Book } from '../../types';

interface ParticipantDetailsProps {
  participant: Participant;
  onClose: () => void;
  onEdit: () => void;
}

const ParticipantDetails = ({ participant, onClose, onEdit }: ParticipantDetailsProps) => {
  const [participantBooks, setParticipantBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchReaderBooks } = useBooks();

  // جلب كتب المشارك
  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);
      try {
        const books = await fetchReaderBooks(participant.id);
        setParticipantBooks(books);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, [participant.id]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4 pb-2 border-b">
        <h2 className="text-lg font-semibold text-gray-800">تفاصيل المشارك</h2>
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* بيانات المشارك الأساسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <p className="text-sm text-gray-500">الاسم الكامل</p>
            <p className="font-medium">{participant.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">رقم الجوال</p>
            <p className="font-medium">{participant.phoneNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">الجنسية</p>
            <p className="font-medium">{participant.nationality}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">المرحلة</p>
            <p className="font-medium">{participant.level}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">تاريخ التسجيل</p>
            <p className="font-medium">{new Date(participant.registrationDate).toLocaleDateString('ar-SA')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">تاريخ الانتهاء</p>
            <p className="font-medium">
              {participant.completionDate
                ? new Date(participant.completionDate).toLocaleDateString('ar-SA')
                : 'غير محدد'}
            </p>
          </div>
        </div>

        {/* الكتب المقترحة للتسجيل */}
        <div>
          <h3 className="text-md font-medium mb-2">الكتب المقترحة للتسجيل</h3>
          {participant.suggestedBooks && participant.suggestedBooks.length > 0 ? (
            <ul className="list-disc list-inside pr-4 space-y-1">
              {participant.suggestedBooks.map((book, index) => (
                <li key={index}>{book}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">لم يتم تحديد كتب مقترحة</p>
          )}
        </div>

        {/* رأي لجنة المقابلة */}
        <div>
          <h3 className="text-md font-medium mb-2">رأي لجنة المقابلة</h3>
          <p className="bg-gray-50 p-3 rounded border border-gray-200 whitespace-pre-wrap">
            {participant.committeeOpinion || 'لا يوجد رأي مسجل للجنة'}
          </p>
        </div>

        {/* الكتب المسجلة للمشارك */}
        <div>
          <h3 className="text-md font-medium mb-2">الكتب المسجلة</h3>
          {isLoading ? (
            <p>جاري التحميل...</p>
          ) : participantBooks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-3 py-2">عنوان الكتاب</th>
                    <th className="px-3 py-2">المستوى</th>
                    <th className="px-3 py-2">الحالة</th>
                    <th className="px-3 py-2">مدة القراءة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {participantBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-medium">{book.title}</td>
                      <td className="px-3 py-2">{book.level}</td>
                      <td className="px-3 py-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            book.status === 'تحت التجربة'
                              ? 'bg-yellow-100 text-yellow-800'
                              : book.status === 'تحت المراجعة'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {book.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        {Math.floor(book.readingDuration / 60)} دقيقة و{' '}
                        {book.readingDuration % 60} ثانية
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">لا توجد كتب مسجلة لهذا المشارك</p>
          )}
        </div>

        {/* أزرار الإجراءات */}
        <div className="flex justify-end pt-4 border-t mt-4">
          <Button
            variant="outline"
            type="button"
            onClick={onClose}
            className="ml-2"
          >
            إغلاق
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1"
          >
            <PencilIcon className="h-4 w-4" />
            <span>تعديل البيانات</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantDetails;
