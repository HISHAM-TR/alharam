import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { mockParticipants } from '../lib/mockData';
import type { Participant } from '../types';

// تحقق مما إذا كنا في وضع التطوير
const isDevelopment = import.meta.env.DEV;

// هوك للتعامل مع بيانات المشاركين
export function useParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // جلب قائمة المشاركين
  const fetchParticipants = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // استخدام البيانات الافتراضية في وضع التطوير
      if (isDevelopment) {
        // محاكاة تأخير الشبكة
        await new Promise(resolve => setTimeout(resolve, 500));
        setParticipants(mockParticipants);
      } else {
        const { data, error } = await supabase
          .from('participants')
          .select('*')
          .order('registrationDate', { ascending: false });

        if (error) {
          throw error;
        }

        setParticipants(data || []);
      }
    } catch (err) {
      setError('حدث خطأ في جلب بيانات المشاركين');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // إضافة مشارك جديد
  const addParticipant = async (participantData: Omit<Participant, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('participants')
        .insert([{ 
          ...participantData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }])
        .select();

      if (error) {
        throw error;
      }

      // تحديث القائمة بعد الإضافة
      setParticipants(prevParticipants => [...prevParticipants, data[0]]);
      return data[0];
    } catch (err) {
      setError('حدث خطأ في إضافة المشارك');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // تحديث بيانات مشارك
  const updateParticipant = async (id: string, participantData: Partial<Participant>) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('participants')
        .update({ 
          ...participantData,
          updatedAt: new Date().toISOString()
        })
        .eq('id', id)
        .select();

      if (error) {
        throw error;
      }

      // تحديث القائمة
      setParticipants(prevParticipants => 
        prevParticipants.map(participant => 
          participant.id === id ? { ...participant, ...data[0] } : participant
        )
      );
      
      return data[0];
    } catch (err) {
      setError('حدث خطأ في تحديث بيانات المشارك');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // حذف مشارك
  const deleteParticipant = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase
        .from('participants')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // تحديث القائمة بعد الحذف
      setParticipants(prevParticipants => 
        prevParticipants.filter(participant => participant.id !== id)
      );
      
      return true;
    } catch (err) {
      setError('حدث خطأ في حذف المشارك');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // جلب البيانات عند تحميل المكون
  useEffect(() => {
    fetchParticipants();
  }, []);

  return { 
    participants, 
    isLoading, 
    error, 
    fetchParticipants, 
    addParticipant, 
    updateParticipant,
    deleteParticipant 
  };
}
