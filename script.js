// ========= JavaScript =========
document.addEventListener('DOMContentLoaded', function() {
    // ========= عرض رسالة التحديث عند فتح الموقع لأول مرة =========
    const welcomeMessageKey = 'hasSeenWelcomeMessage';
    
    if (!localStorage.getItem(welcomeMessageKey)) {
        const welcomeModal = document.createElement('div');
        welcomeModal.id = 'welcome-message-modal';
        welcomeModal.classList.add('floating-message-overlay');
        welcomeModal.innerHTML = `
            <div class="floating-message-content">
                <button id="close-welcome-btn" class="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl font-bold">×</button>
                <p class="text-3xl md:text-4xl font-bold text-blue-300 mb-4">تحديث هام!</p>
                <p class="text-xl md:text-2xl text-gray-300">تم تحديث نسختكم الأولية وتم إضافة المزيد من المهارات المعربة. حملوها الآن!</p>
                <button id="download-from-welcome" class="btn-primary mt-6 px-6 py-2" onclick="window.open('https://www.mediafire.com/file/lu90so3fqd7mq1z/S5SJHF-1.zip/file', '_blank');">حمل الآن</button>
            </div>
        `;
        document.body.appendChild(welcomeModal);
        
        document.getElementById('close-welcome-btn').addEventListener('click', function() {
            welcomeModal.classList.add('hidden');
        });
        
        localStorage.setItem(welcomeMessageKey, 'true');
    }

    // ========= التنقل بين الأقسام =========
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = {
        'home': document.getElementById('home-section'),
        'project-news': document.getElementById('project-news-section'),
        'videos': document.getElementById('videos-section'),
        'team': document.getElementById('team-section')
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            navLinks.forEach(navLink => navLink.classList.remove('active-link'));
            this.classList.add('active-link');
            
            Object.values(sections).forEach(section => {
                section.classList.add('hidden');
            });
            sections[targetSection].classList.remove('hidden');
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // ========= أزرار التحميل =========
    document.getElementById('download-v1-btn').addEventListener('click', function() {
        alert('جاري تحميل النسخة الأولى من التعريب... شكراً لثقتكم!');
    });

    document.getElementById('download-full-btn').addEventListener('click', function() {
        document.getElementById('floating-message-modal').classList.remove('hidden');
    });

    document.getElementById('close-message-btn').addEventListener('click', function() {
        document.getElementById('floating-message-modal').classList.add('hidden');
    });
    
    // زر "أخبرني عند الإصدار" - توجيه إلى قسم أخبار المشروع
    document.getElementById('notify-me-btn').addEventListener('click', function() {
        // إخفاء الرسالة المنبثقة
        document.getElementById('floating-message-modal').classList.add('hidden');
        
        // تغيير القسم إلى أخبار المشروع
        navLinks.forEach(navLink => navLink.classList.remove('active-link'));
        document.querySelector('.nav-link[data-section="project-news"]').classList.add('active-link');
        
        // إظهار قسم أخبار المشروع وإخفاء الأقسام الأخرى
        Object.values(sections).forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById('project-news-section').classList.remove('hidden');
        
        // التمرير إلى أعلى الصفحة
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
