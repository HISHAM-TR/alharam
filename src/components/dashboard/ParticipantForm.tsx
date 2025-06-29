import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useParticipants } from '../../hooks/useParticipants';
import Button from '../ui/Button';
import type { Participant } from '../../types';

interface ParticipantFormProps {
  participant: Participant | null;
  onClose: () => void;
  isEditing: boolean;
}

const ParticipantForm = ({ participant, onClose, isEditing }: ParticipantFormProps) => {
  const defaultValues = isEditing && participant
    ? {
        ...participant,
        suggestedBooks: participant.suggestedBooks ? participant.suggestedBooks.join('\n') : '',
      }
    : {
        fullName: '',
        phoneNumber: '',
        nationality: '',
        level: 'قارئ',
        suggestedBooks: '',
        committeeOpinion: '',
        registrationDate: new Date().toISOString().split('T')[0],
        completionDate: '',
      };

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addParticipant, updateParticipant } = useParticipants();

  // معالجة إرسال النموذج
  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      
      // تحويل النص إلى مصفوفة للكتب المقترحة
      const formattedData = {
        ...data,
        suggestedBooks: data.suggestedBooks.split('\n').filter((book: string) => book.trim() !== ''),
      };

      if (isEditing && participant) {
        await updateParticipant(participant.id, formattedData);
      } else {
        await addParticipant(formattedData);
      }
      
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 pb-2 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          {isEditing ? 'تعديل بيانات المشارك' : 'إضافة مشارك جديد'}
        </h2>
        <button 
          className="text-gray-500 hover:text-gray-700" 
          onClick={onClose}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* الاسم الكامل */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الاسم الكامل*
          </label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md text-right ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('fullName', { required: 'هذا الحقل مطلوب' })}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName.message?.toString()}</p>
          )}
        </div>

        {/* رقم الجوال */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            رقم الجوال*
          </label>
          <input
            type="text"
            dir="ltr"
            className={`w-full px-3 py-2 border rounded-md ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('phoneNumber', { 
              required: 'هذا الحقل مطلوب',
              pattern: {
                value: /^(\+\d{1,3})?[ -]?\d{10,}$/,
                message: 'يرجى إدخال رقم جوال صحيح'
              }
            })}
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message?.toString()}</p>
          )}
        </div>

        {/* الجنسية */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الجنسية*
          </label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md text-right ${
              errors.nationality ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('nationality', { required: 'هذا الحقل مطلوب' })}
          />
          {errors.nationality && (
            <p className="mt-1 text-sm text-red-600">{errors.nationality.message?.toString()}</p>
          )}
        </div>

        {/* المرحلة */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            المرحلة*
          </label>
          <select
            className={`w-full px-3 py-2 border rounded-md text-right ${
              errors.level ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('level', { required: 'هذا الحقل مطلوب' })}
          >
            <option value="طالب">طالب</option>
            <option value="قاضي">قاضي</option>
            <option value="قارئ">قارئ</option>
          </select>
          {errors.level && (
            <p className="mt-1 text-sm text-red-600">{errors.level.message?.toString()}</p>
          )}
        </div>

        {/* الكتب المقترحة للتسجيل */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الكتب المقترحة للتسجيل (كتاب في كل سطر)
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-right h-24"
            placeholder="أدخل كل كتاب في سطر منفصل"
            {...register('suggestedBooks')}
          ></textarea>
        </div>

        {/* رأي لجنة المقابلة */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            رأي لجنة المقابلة
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-right h-24"
            {...register('committeeOpinion')}
          ></textarea>
        </div>

        {/* تاريخ التسجيل */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            تاريخ التسجيل*
          </label>
          <input
            type="date"
            className={`w-full px-3 py-2 border rounded-md ${
              errors.registrationDate ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('registrationDate', { required: 'هذا الحقل مطلوب' })}
          />
          {errors.registrationDate && (
            <p className="mt-1 text-sm text-red-600">{errors.registrationDate.message?.toString()}</p>
          )}
        </div>

        {/* تاريخ الانتهاء */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            تاريخ الانتهاء
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            {...register('completionDate')}
          />
        </div>

        {/* أزرار الإجراءات */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button
            variant="outline"
            type="button"
            onClick={onClose}
            className="ml-2"
          >
            إلغاء
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'جاري الحفظ...' : isEditing ? 'تحديث البيانات' : 'إضافة مشارك'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ParticipantForm;
