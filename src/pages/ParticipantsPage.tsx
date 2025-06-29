import { useState } from 'react';
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { useParticipants } from '../hooks/useParticipants';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ParticipantForm from '../components/dashboard/ParticipantForm';
import ParticipantDetails from '../components/dashboard/ParticipantDetails';
import type { Participant } from '../types';

const ParticipantsPage = () => {
  const { participants, isLoading, deleteParticipant } = useParticipants();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // التصفية حسب كلمة البحث
  const filteredParticipants = searchTerm
    ? participants.filter(participant => 
        participant.fullName.includes(searchTerm) || 
        participant.phoneNumber.includes(searchTerm) ||
        participant.nationality.includes(searchTerm)
      )
    : participants;

  // فتح نموذج إضافة مشارك جديد
  const handleAddNew = () => {
    setSelectedParticipant(null);
    setIsEditing(false);
    setIsFormOpen(true);
  };

  // فتح نموذج تعديل مشارك
  const handleEdit = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  // عرض تفاصيل المشارك
  const handleViewDetails = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsDetailsOpen(true);
  };

  // حذف مشارك
  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشارك؟')) {
      await deleteParticipant(id);
    }
  };

  // إغلاق النموذج
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  // إغلاق التفاصيل
  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedParticipant(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">إدارة المشاركين</h1>
        <Button
          variant="primary"
          onClick={handleAddNew}
          className="flex items-center gap-1"
        >
          <PlusIcon className="h-5 w-5" />
          <span>إضافة مشارك</span>
        </Button>
      </div>

      {/* شريط البحث */}
      <Card>
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full p-2 pr-10 text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-primary-500 focus:border-primary-500 text-right"
            placeholder="بحث عن مشارك..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      {/* جدول المشاركين */}
      <Card title="قائمة المشاركين">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">الاسم الكامل</th>
                <th className="px-4 py-3">رقم الجوال</th>
                <th className="px-4 py-3">الجنسية</th>
                <th className="px-4 py-3">المرحلة</th>
                <th className="px-4 py-3">تاريخ التسجيل</th>
                <th className="px-4 py-3">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center">
                    جاري التحميل...
                  </td>
                </tr>
              ) : filteredParticipants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                    لم يتم العثور على مشاركين
                  </td>
                </tr>
              ) : (
                filteredParticipants.map((participant) => (
                  <tr key={participant.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{participant.fullName}</td>
                    <td className="px-4 py-3">{participant.phoneNumber}</td>
                    <td className="px-4 py-3">{participant.nationality}</td>
                    <td className="px-4 py-3">{participant.level}</td>
                    <td className="px-4 py-3">
                      {new Date(participant.registrationDate).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2 justify-end">
                        <button
                          onClick={() => handleViewDetails(participant)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                          title="عرض التفاصيل"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(participant)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-md"
                          title="تعديل"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(participant.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                          title="حذف"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* نموذج إضافة/تعديل مشارك */}
      {isFormOpen && (
        <div className="fixed inset-0 z-30 bg-gray-800 bg-opacity-50 flex justify-center items-center overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 m-4 max-w-xl w-full">
            {selectedParticipant && (
              <ParticipantForm
                participant={selectedParticipant}
                onClose={handleCloseForm}
                isEditing={isEditing}
              />
            )}
          </div>
        </div>
      )}

      {/* تفاصيل المشارك */}
      {isDetailsOpen && selectedParticipant && (
        <div className="fixed inset-0 z-30 bg-gray-800 bg-opacity-50 flex justify-center items-center overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 m-4 max-w-2xl w-full">
            <ParticipantDetails
              participant={selectedParticipant}
              onClose={handleCloseDetails}
              onEdit={() => {
                handleCloseDetails();
                handleEdit(selectedParticipant);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantsPage;
