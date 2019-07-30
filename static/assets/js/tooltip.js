let tippy = require('tippy.js');

tippy.setDefaults({
    arrow: true,
    arrowType: 'round',
});


tippy('#file-name', {
    content: 'اسم الملف',
});

tippy('#open-file-icon', {
    content: 'فتح',
});

tippy('#new-file-icon', {
    content: 'جديد',
});

tippy('#save-icon', {
    content: 'حفظ باسم',
    multiple: true,
});

tippy('#insert-table', {
    content: 'إدراج جدول',
    multiple: true,
    placement: 'bottom'
});

tippy('#insert-ayah', {
    content: 'إدراج آية قرآنية',
    multiple: true,
    placement: 'bottom'
});

tippy('#insert-hadith', {
    content: 'إدراج حديث نبوي',
    multiple: true,
    placement: 'bottom'
});

tippy('#insert-poetry', {
    content: 'إدراج بيت شعر',
    multiple: true,
    placement: 'bottom'
});

tippy('.ql-header', {
    content: 'حجم النص',
});

tippy('.ql-size', {
    content: 'حجم الخط',
});
tippy('.ql-color', {
    content: 'لون الخط',
});
tippy('.ql-background', {
    content: 'لون خلفية الخط',
});

tippy('.ql-bold', {
    content: 'عريض',

});

tippy('.ql-italic', {
    content: 'مائل',
});

tippy('.ql-underline', {
    content: 'سطر تحتي',
});

tippy('.ql-strike', {
    content: 'سطر نصفي',
});

tippy('button[value="sub"]', {
    content: 'نص مصغر',
});

tippy('button[value="super"]', {
    content: 'نص مضخم',
});

tippy('button[value="ordered"]', {
    content: 'قائمة مرقمة',
});

tippy('button[value="bullet"]', {
    content: 'قائمة منقطة',
});

tippy('button[value=""]', {
    content: 'محاذاة لليسار',
});


tippy('button[value="center"]', {
    content: 'محاذاة للوسط',
});


tippy('button[value="right"]', {
    content: 'محاذاة لليمين',
});


tippy('button[value="justify"]', {
    content: 'موازنة',
});


tippy('.ql-image', {
    content: 'صورة',
});

tippy('.ql-video', {
    content: 'مقطع',
});

tippy('.ql-link', {
    content: 'رابط',
});

tippy('.ql-blockquote', {
    content: 'اقتباس',
});

tippy('.ql-code-block', {
    content: 'كود برمجي',
});

tippy('button[value="+1"]', {
    content: 'زيادة المسافة البادئة',
});

tippy('button[value="-1"]', {
    content: 'تقليل المسافة البادئة',
});

tippy('.ql-direction', {
    content: 'اتجاه النص',
});

tippy('.ql-clean', {
    content: 'محو التنسيق',
});