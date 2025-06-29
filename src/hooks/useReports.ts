import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Book, ReportFilters } from '../types';

export function useReports() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // جلب التقارير حسب المعايير المحددة
  const fetchFilteredBooks = async (filters: ReportFilters): Promise<Book[]> => {
    try {
      setIsLoading(true);
      setError(null);

      let query = supabase
        .from('books')
        .select('*');

      // تطبيق المعايير على الاستعلام
      if (filters.bookTitle) {
        query = query.ilike('title', `%${filters.bookTitle}%`);
      }

      if (filters.readerName) {
        query = query.ilike('readerName', `%${filters.readerName}%`);
      }

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      if (filters.level) {
        query = query.eq('level', filters.level);
      }

      if (filters.startDate && filters.endDate) {
        query = query.gte('createdAt', filters.startDate)
                    .lte('createdAt', filters.endDate);
      } else if (filters.startDate) {
        query = query.gte('createdAt', filters.startDate);
      } else if (filters.endDate) {
        query = query.lte('createdAt', filters.endDate);
      }

      // تنفيذ الاستعلام
      const { data, error } = await query.order('updatedAt', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (err) {
      setError('حدث خطأ في جلب التقرير');
      console.error(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // تصدير البيانات كملف إكسل (يتطلب مكتبة جانب العميل)
  const exportToExcel = async (books: Book[]) => {
    try {
      // هذه الدالة تحتاج لمكتبة مثل xlsx لتكون مكتملة
      // لكن يمكن أن نرسل البيانات بتنسيق CSV بدلاً من ذلك
      
      const headers = 'عنوان الكتاب,اسم القارئ,المستوى,الحالة,ملاحظات المراجعين,المراجع 1,المراجع 2,المدقق,مدة القراءة (ثوان),حالة النشر\n';
      
      const csvContent = books.reduce((csv, book) => {
        return csv + `${book.title},${book.readerName},${book.level},${book.status},${book.reviewerNotes},${book.audioReviewer1},${book.audioReviewer2},${book.recordingEditor},${book.readingDuration},${book.publishStatus}\n`;
      }, headers);

      // إنشاء رابط للتنزيل
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `تقرير_الكتب_${new Date().toLocaleDateString('ar-SA')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return true;
    } catch (err) {
      setError('حدث خطأ في تصدير البيانات');
      console.error(err);
      return false;
    }
  };

  // تصدير البيانات كملف PDF (يتطلب مكتبة جانب العميل)
  const exportToPdf = async () => {
    try {
      setError('هذه الميزة غير متوفرة حاليًا');
      return false;
    } catch (err) {
      setError('حدث خطأ في تصدير البيانات');
      console.error(err);
      return false;
    }
  };

  return {
    isLoading,
    error,
    fetchFilteredBooks,
    exportToExcel,
    exportToPdf
  };
}
