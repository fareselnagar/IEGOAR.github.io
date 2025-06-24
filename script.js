// ========= JavaScript =========
// معالجة تفاعلات المستخدم

// انتظر حتى يتم تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {

    // ========= عرض رسالة التحديث عند فتح الموقع لأول مرة =========
    const welcomeMessageKey = 'hasSeenWelcomeMessage'; // مفتاح للتخزين المحلي للمتصفح

    // تحقق مما إذا كانت الرسالة قد عُرضت من قبل
    if (!localStorage.getItem(welcomeMessageKey)) {
        // إذا لم يتم عرضها، قم بإنشاء وإظهار الرسالة
        const welcomeModal = document.createElement('div');
        welcomeModal.id = 'welcome-message-modal';
        // نستخدم نفس فئات الـ CSS الخاصة بالرسالة العائمة لتطبيق التصميم
        welcomeModal.classList.add('floating-message-overlay');
        welcomeModal.innerHTML = `
            <div class="floating-message-content">
                <button id="close-welcome-btn" class="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl font-bold">×</button>
                <p class="text-3xl md:text-4xl font-bold text-blue-300 mb-4">تحديث هام!</p>
                <p class="text-xl md:text-2xl text-gray-300">تم تحديث نسختكم الأولية وتم إضافة المزيد من المهارات المعربة. حملوها الآن!</p>
                <button id="download-from-welcome" class="btn-primary mt-6" onclick="window.open('https://www.mediafire.com/file/lu90so3fqd7mq1z/S5SJHF-1.zip/file', '_blank');">حمل الآن</button>
            </div>
        `;
        document.body.appendChild(welcomeModal); // أضف النافذة إلى جسم الصفحة

        // إضافة مستمع حدث لزر الإغلاق داخل رسالة الترحيب
        document.getElementById('close-welcome-btn').addEventListener('click', function() {
            welcomeModal.classList.add('hidden'); // إخفاء الرسالة
        });

        // تعيين علامة في LocalStorage تشير إلى أن الرسالة قد عُرضت
        localStorage.setItem(welcomeMessageKey, 'true');
    }

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
            e.preventDefault(); // منع السلوك الافتراضي للانتقال
            const targetSection = this.getAttribute('data-section'); // القسم المستهدف من سمة data-section

            // تحديث الرابط النشط: إزالة active-link من الجميع وإضافتها للرابط الحالي
            navLinks.forEach(navLink => navLink.classList.remove('active-link'));
            this.classList.add('active-link');

            // إخفاء جميع الأقسام ثم إظهار القسم المستهدف فقط
            Object.values(sections).forEach(section => {
                section.classList.add('hidden');
            });
            sections[targetSection].classList.remove('hidden');

            // التمرير إلى أعلى الصفحة بعد تغيير القسم
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // ========= أزرار التحميل =========
    // زر تحميل النسخة الأولى (التحميل الفعلي يتم عبر onclick في HTML)
    document.getElementById('download-v1-btn').addEventListener('click', function() {
        alert('جاري تحميل النسخة الأولى من التعريب... شكراً لثقتكم!');
    });

    // زر تحميل النسخة الكاملة
    document.getElementById('download-full-btn').addEventListener('click', function() {
        document.getElementById('floating-message-modal').classList.remove('hidden'); // إظهار رسالة "اقتربت تلك النسخة!"
    });

    // زر إغلاق رسالة "اقتربت تلك النسخة!"
    document.getElementById('close-message-btn').addEventListener('click', function() {
        document.getElementById('floating-message-modal').classList.add('hidden'); // إخفاء الرسالة
    });
});
