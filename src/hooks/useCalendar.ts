import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { CalendarEvent, MonthlyStats } from '../types';

export function useCalendar() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // جلب أحداث التقويم للشهر المحدد
  const fetchCalendarEvents = async (year: number, month: number): Promise<CalendarEvent[]> => {
    try {
      setIsLoading(true);
      setError(null);

      // تحديد بداية ونهاية الشهر
      const startDate = new Date(year, month - 1, 1).toISOString();
      const endDate = new Date(year, month, 0).toISOString();

      const { data, error } = await supabase
        .from('books')
        .select('id, title, updatedAt, status, readerName')
        .gte('updatedAt', startDate)
        .lte('updatedAt', endDate);

      if (error) {
        throw error;
      }

      // تنسيق البيانات كأحداث للتقويم
      const events: CalendarEvent[] = data.map(book => ({
        id: book.id,
        title: book.title,
        date: book.updatedAt,
        status: book.status,
        readerName: book.readerName
      }));

      return events;
    } catch (err) {
      setError('حدث خطأ في جلب أحداث التقويم');
      console.error(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // جلب الإحصائيات الشهرية
  const fetchMonthlyStats = async (year: number): Promise<MonthlyStats[]> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // أسماء الشهور بالعربية
      const monthNames = [
        'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
      ];

      // جلب جميع الكتب لهذا العام
      const startDate = new Date(year, 0, 1).toISOString();
      const endDate = new Date(year, 11, 31).toISOString();

      const { data, error } = await supabase
        .from('books')
        .select('status, updatedAt')
        .gte('updatedAt', startDate)
        .lte('updatedAt', endDate);

      if (error) {
        throw error;
      }

      // إنشاء إحصائيات شهرية
      const monthlyData: MonthlyStats[] = [];
      
      for (let month = 0; month < 12; month++) {
        const booksInMonth = data.filter(book => {
          const bookMonth = new Date(book.updatedAt).getMonth();
          return bookMonth === month;
        });

        monthlyData.push({
          month: monthNames[month],
          underTrial: booksInMonth.filter(book => book.status === 'تحت التجربة').length,
          underReview: booksInMonth.filter(book => book.status === 'تحت المراجعة').length,
          sentForApproval: booksInMonth.filter(book => book.status === 'تم الإرسال للمعتمد').length,
          total: booksInMonth.length
        });
      }

      return monthlyData;
    } catch (err) {
      setError('حدث خطأ في جلب إحصائيات الشهر');
      console.error(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    fetchCalendarEvents,
    fetchMonthlyStats
  };
}
