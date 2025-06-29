import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { mockBooks } from '../lib/mockData';
import type { Book, BookStatus, PublishStatus } from '../types';

// تحقق مما إذا كنا في وضع التطوير
const isDevelopment = import.meta.env.DEV;

// هوك للتعامل مع بيانات الكتب
export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // جلب قائمة الكتب
  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // استخدام البيانات الافتراضية في وضع التطوير
      if (isDevelopment) {
        // محاكاة تأخير الشبكة
        await new Promise(resolve => setTimeout(resolve, 500));
        setBooks(mockBooks);
      } else {
        const { data, error } = await supabase
          .from('books')
          .select('*')
          .order('updatedAt', { ascending: false });

        if (error) {
          throw error;
        }

        setBooks(data || []);
      }
    } catch (err) {
      setError('حدث خطأ في جلب بيانات الكتب');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // جلب كتب مشارك محدد
  const fetchReaderBooks = async (readerId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // استخدام البيانات الافتراضية في وضع التطوير
      if (isDevelopment) {
        // محاكاة تأخير الشبكة
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockBooks.filter(book => book.readerId === readerId);
      } else {
        const { data, error } = await supabase
          .from('books')
          .select('*')
          .eq('readerId', readerId)
          .order('updatedAt', { ascending: false });

        if (error) {
          throw error;
        }

        return data || [];
      }
    } catch (err) {
      setError('حدث خطأ في جلب كتب المشارك');
      console.error(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // إضافة كتاب جديد
  const addBook = async (bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('books')
        .insert([{ 
          ...bookData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }])
        .select();

      if (error) {
        throw error;
      }

      setBooks(prevBooks => [...prevBooks, data[0]]);
      return data[0];
    } catch (err) {
      setError('حدث خطأ في إضافة الكتاب');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // تحديث بيانات كتاب
  const updateBook = async (id: string, bookData: Partial<Book>) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('books')
        .update({ 
          ...bookData,
          updatedAt: new Date().toISOString()
        })
        .eq('id', id)
        .select();

      if (error) {
        throw error;
      }

      setBooks(prevBooks => 
        prevBooks.map(book => 
          book.id === id ? { ...book, ...data[0] } : book
        )
      );
      
      return data[0];
    } catch (err) {
      setError('حدث خطأ في تحديث بيانات الكتاب');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // تحديث حالة كتاب
  const updateBookStatus = async (id: string, status: BookStatus) => {
    return await updateBook(id, { status });
  };

  // تحديث حالة النشر
  const updatePublishStatus = async (id: string, publishStatus: PublishStatus) => {
    return await updateBook(id, { publishStatus });
  };

  // حذف كتاب
  const deleteBook = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setBooks(prevBooks => 
        prevBooks.filter(book => book.id !== id)
      );
      
      return true;
    } catch (err) {
      setError('حدث خطأ في حذف الكتاب');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // جلب إحصائيات الكتب حسب الحالة
  const fetchBookStats = async () => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('status');

      if (error) {
        throw error;
      }

      const stats = {
        total: data.length,
        underTrial: data.filter(book => book.status === 'تحت التجربة').length,
        underReview: data.filter(book => book.status === 'تحت المراجعة').length,
        sentForApproval: data.filter(book => book.status === 'تم الإرسال للمعتمد').length,
      };

      return stats;
    } catch (err) {
      console.error('خطأ في جلب إحصائيات الكتب:', err);
      return {
        total: 0,
        underTrial: 0,
        underReview: 0,
        sentForApproval: 0,
      };
    }
  };

  // جلب البيانات عند تحميل المكون
  useEffect(() => {
    fetchBooks();
  }, []);

  return { 
    books, 
    isLoading, 
    error, 
    fetchBooks,
    fetchReaderBooks,
    addBook, 
    updateBook,
    updateBookStatus,
    updatePublishStatus,
    deleteBook,
    fetchBookStats
  };
}
