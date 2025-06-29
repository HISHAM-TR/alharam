import type { Participant, Book, ParticipantLevel, BookStatus, PublishStatus } from '../types';

// بيانات افتراضية للمشاركين
export const mockParticipants: Participant[] = [
  {
    id: 'p1',
    fullName: 'أحمد محمد علي',
    phoneNumber: '0512345678',
    nationality: 'سعودي',
    level: 'قارئ' as ParticipantLevel,
    suggestedBooks: ['مختصر صحيح البخاري', 'رياض الصالحين'],
    committeeOpinion: 'قارئ متميز وصوته جميل',
    registrationDate: '2025-05-15',
    completionDate: null,
    createdAt: '2025-05-15T10:30:00',
    updatedAt: '2025-05-15T10:30:00',
  },
  {
    id: 'p2',
    fullName: 'عبدالرحمن خالد',
    phoneNumber: '0523456789',
    nationality: 'سعودي',
    level: 'طالب' as ParticipantLevel,
    suggestedBooks: ['الأربعين النووية'],
    committeeOpinion: 'يحتاج إلى تدريب على تجويد القرآن',
    registrationDate: '2025-06-01',
    completionDate: null,
    createdAt: '2025-06-01T13:45:00',
    updatedAt: '2025-06-01T13:45:00',
  },
  {
    id: 'p3',
    fullName: 'عمر فاروق سعد',
    phoneNumber: '0534567890',
    nationality: 'مصري',
    level: 'قاضي' as ParticipantLevel,
    suggestedBooks: ['التبيان في آداب حملة القرآن'],
    committeeOpinion: 'خبير في علوم القرآن',
    registrationDate: '2025-05-20',
    completionDate: '2025-06-20',
    createdAt: '2025-05-20T09:15:00',
    updatedAt: '2025-06-20T14:20:00',
  },
];

// بيانات افتراضية للكتب
export const mockBooks: Book[] = [
  {
    id: 'b1',
    title: 'مختصر صحيح البخاري',
    readerName: 'أحمد محمد علي',
    readerId: 'p1',
    level: 'متقدم',
    status: 'تحت المراجعة' as BookStatus,
    reviewerNotes: 'تسجيل ممتاز، بعض الأخطاء في مخارج الحروف',
    audioReviewer1: 'محمد عبدالله',
    audioReviewer2: 'خالد أحمد',
    recordingEditor: 'عمر علي',
    readingDuration: 1850, // بالثواني
    publishStatus: 'غير منشور' as PublishStatus,
    createdAt: '2025-05-20T10:00:00',
    updatedAt: '2025-06-15T11:30:00',
  },
  {
    id: 'b2',
    title: 'الأربعين النووية',
    readerName: 'عبدالرحمن خالد',
    readerId: 'p2',
    level: 'مبتدئ',
    status: 'تحت التجربة' as BookStatus,
    reviewerNotes: '',
    audioReviewer1: '',
    audioReviewer2: '',
    recordingEditor: 'محمد سعيد',
    readingDuration: 900, // بالثواني
    publishStatus: 'غير منشور' as PublishStatus,
    createdAt: '2025-06-05T14:00:00',
    updatedAt: '2025-06-05T14:00:00',
  },
  {
    id: 'b3',
    title: 'التبيان في آداب حملة القرآن',
    readerName: 'عمر فاروق سعد',
    readerId: 'p3',
    level: 'متقدم',
    status: 'تم الإرسال للمعتمد' as BookStatus,
    reviewerNotes: 'تسجيل ممتاز، جودة صوت عالية',
    audioReviewer1: 'أحمد علي',
    audioReviewer2: 'سعد محمد',
    recordingEditor: 'عبدالله سالم',
    readingDuration: 2400, // بالثواني
    publishStatus: 'تم النشر صوتي' as PublishStatus,
    createdAt: '2025-05-25T09:00:00',
    updatedAt: '2025-06-20T15:45:00',
  }
];
