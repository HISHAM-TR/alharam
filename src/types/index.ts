// تعريف أنواع البيانات المستخدمة في التطبيق

// نوع المرحلة للمشاركين
export type ParticipantLevel = 'طالب' | 'قاضي' | 'قارئ';

// نوع حالة الكتاب
export type BookStatus = 
  | 'تحت التجربة' 
  | 'تحت المراجعة' 
  | 'تم الإرسال للمعتمد';

// نوع حالة النشر
export type PublishStatus = 'غير منشور' | 'تم النشر صوتي' | 'تم النشر مرئي';

// نموذج بيانات المشارك
export interface Participant {
  id: string;
  fullName: string;
  phoneNumber: string;
  nationality: string;
  level: ParticipantLevel;
  suggestedBooks: string[];
  committeeOpinion: string;
  registrationDate: string;
  completionDate: string | null;
  createdAt: string;
  updatedAt: string;
}

// نموذج بيانات الكتب العلمية
export interface Book {
  id: string;
  title: string;
  level: string;
  readerId: string;
  readerName: string;
  status: BookStatus;
  reviewerNotes: string;
  audioReviewer1: string;
  audioReviewer2: string;
  recordingEditor: string;
  readingDuration: number; // بالثواني
  publishStatus: PublishStatus;
  createdAt: string;
  updatedAt: string;
}

// نموذج البيانات المستخدمة في التقارير
export interface ReportFilters {
  bookTitle?: string;
  readerName?: string;
  status?: BookStatus;
  level?: string;
  startDate?: string;
  endDate?: string;
}

// نموذج البيانات المستخدمة في التقويم
export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  status: BookStatus;
  readerName: string;
}

// إحصائيات لوحة الجدولة الشهرية
export interface MonthlyStats {
  month: string;
  underTrial: number;
  underReview: number;
  sentForApproval: number;
  total: number;
}
