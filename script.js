// ========= JavaScript ========= 
// معالجة تفاعلات المستخدم

// انتظر حتى يتم تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // ========= التنقل بين الأقسام =========
    const navLinks = document.querySelectorAll('.nav-link'); // جميع روابط القائمة
    const sections = { // عناصر الأقسام
        'home': document.getElementById('home-section'),
        'project-news': document.getElementById('project-news-section'),
        'videos': document.getElementById('videos-section'),
        'team': document.getElementById('team-section')
    };

    // إضافة مستمعين للأحداث لكل رابط
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // منع السلوك الافتراضي
            const targetSection = this.getAttribute('data-section'); // القسم المستهدف
            
            // تحديث الرابط النشط
            navLinks.forEach(navLink => navLink.classList.remove('active-link'));
            this.classList.add('active-link');
            
            // إخفاء جميع الأقسام وإظهار القسم المستهدف فقط
            Object.values(sections).forEach(section => {
                section.classList.add('hidden');
            });
            sections[targetSection].classList.remove('hidden');
            
            // التمرير إلى أعلى الصفحة
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // ========= أزرار التحميل =========
    // زر تحميل النسخة الأولى
    document.getElementById('download-v1-btn').addEventListener('click', function() {
        alert('جاري تحميل النسخة الأولى من التعريب... شكراً لثقتكم!');
    });

    // زر تحميل النسخة الكاملة
    document.getElementById('download-full-btn').addEventListener('click', function() {
        document.getElementById('floating-message-modal').classList.remove('hidden'); // إظهار الرسالة
    });

    // زر إغلاق الرسالة العائمة
    document.getElementById('close-message-btn').addEventListener('click', function() {
        document.getElementById('floating-message-modal').classList.add('hidden'); // إخفاء الرسالة
    });
});