# استوديو إدارة صوتيات متون علمية

تطبيق ويب لإدارة مشروع تسجيل المتون العلمية باللغة العربية.

## الميزات الرئيسية

### لوحة التحكم للمشرف
- إدارة بيانات المشاركين (الاسم، رقم الجوال، الجنسية، المرحلة، الكتب المقترحة، إلخ)

### إدارة المتون العلمية
- إدارة قائمة الكتب/المتون لكل قارئ مع بيانات المستوى، الحالة، الملاحظات والمراجعين

### التقارير والمتابعة
- إنشاء تقارير آلية لمتابعة حالة كل تسجيل وتصفيتها حسب معايير متعددة

### لوحة الجدولة
- عرض الحالات المختلفة للتسجيلات عبر تقويم شهري وجداول إحصائية

## المواصفات الفنية

- واجهة كاملة باللغة العربية (من اليمين لليسار)
- تصميم متجاوب يعمل على الأجهزة المختلفة
- مبني باستخدام React وTailwind CSS
- يستخدم Supabase كقاعدة بيانات سحابية
- يدعم تصدير التقارير بصيغة Excel أو PDF

## متطلبات التشغيل

- Node.js v18 أو أحدث
- حساب Supabase

## تثبيت المشروع

1. نسخ المشروع:
```bash
git clone <repository-url>
cd alharam
```

2. تثبيت التبعيات:
```bash
npm install
```

3. إعداد ملف البيئة:
```bash
cp .env.example .env
```

4. تعديل متغيرات البيئة في ملف `.env` لإضافة معلومات اتصال Supabase الخاصة بك.

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
