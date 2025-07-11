document.addEventListener('DOMContentLoaded', function() {
    // ========= إنشاء تأثير الجسيمات المتحركة في الخلفية =========
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 60; // زيادة عدد الجسيمات لمظهر أكثر حيوية
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // أحجام وألوان وسرعات عشوائية للجسيمات
            const size = Math.random() * 15 + 8; // حجم بين 8 و 23 بكسل
            const opacity = Math.random() * 0.4 + 0.2; // شفافية بين 0.2 و 0.6
            const duration = Math.random() * 35 + 25; // مدة الأنيميشن بين 25 و 60 ثانية
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = opacity;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${Math.random() * 20}s`; // تأخير عشوائي لبدء الأنيميشن
            particle.style.left = `${Math.random() * 100}%`; // موقع أفقي عشوائي
            particle.style.top = `${Math.random() * 100}%`; // موقع رأسي عشوائي (لتبدأ من أي مكان)
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles(); // استدعاء دالة إنشاء الجسيمات عند تحميل الصفحة
    
    // ========= إضافة أنيميشن للعناصر عند ظهورها أثناء التمرير =========
    function animateOnScroll() {
        // العناصر التي نريد إضافة أنيميشن لها عند التمرير
        const elements = document.querySelectorAll('.section-title, .featured-box, .download-section, .card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top; // موقع العنصر بالنسبة لإطار العرض
            const elementVisible = 150; // المسافة التي يجب أن يظهر فيها العنصر لبدء الأنيميشن
            
            // إذا كان العنصر ضمن منطقة الرؤية، أضف فئة 'animate'
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            } else {
                // إزالة فئة 'animate' إذا خرج العنصر من منطقة الرؤية (لإعادة الأنيميشن عند التمرير لأعلى وأسفل)
                element.classList.remove('animate');
            }
        });
    }
    
    // تشغيل أنيميشن التمرير عند تحميل الصفحة وعند كل تمرير
    window.addEventListener('load', animateOnScroll); // عند تحميل جميع الموارد (بما في ذلك الصور)
    window.addEventListener('scroll', animateOnScroll); // عند التمرير

    // ========= التنقل بين الأقسام وإظهارها/إخفائها بسلاسة =========
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = {
        'home': document.getElementById('home-section'),
        'project-news': document.getElementById('project-news-section'),
        'videos': document.getElementById('videos-section'),
        'team': document.getElementById('team-section')
    };

    let currentActiveSection = 'home'; // تتبع القسم النشط حالياً

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // منع السلوك الافتراضي للرابط (الانتقال الفوري)
            const targetSectionId = this.getAttribute('data-section'); // الحصول على اسم القسم المستهدف

            if (targetSectionId === currentActiveSection) {
                // إذا كان القسم المستهدف هو نفسه القسم النشط، فقط قم بالتمرير لأعلى الصفحة
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            // إزالة فئة 'active-link' من جميع الروابط
            navLinks.forEach(navLink => navLink.classList.remove('active-link'));
            // إضافة فئة 'active-link' للرابط الذي تم النقر عليه
            this.classList.add('active-link');

            // إخفاء القسم الحالي بأنيميشن خروج
            if (sections[currentActiveSection]) {
                sections[currentActiveSection].classList.add('section-transition-exit-active');
                sections[currentActiveSection].classList.remove('section-transition-enter-active');
                // لا تخفي العنصر فورًا، دعه يختفي بالأنيميشن
            }

            // إظهار القسم الجديد بأنيميشن دخول بعد فترة قصيرة
            setTimeout(() => {
                // إخفاء جميع الأقسام بعد انتهاء أنيميشن الخروج للقسم السابق
                Object.values(sections).forEach(section => section.classList.add('hidden'));
                // إظهار القسم المستهدف
                sections[targetSectionId].classList.remove('hidden');
                
                // إضافة فئة أنيميشن الدخول
                sections[targetSectionId].classList.add('section-transition-enter-active');
                sections[targetSectionId].classList.remove('section-transition-exit-active');

                // إعادة تشغيل أنيميشن التمرير للقسم الجديد
                animateOnScroll();
                window.scrollTo({ top: 0, behavior: 'smooth' }); // التمرير إلى أعلى الصفحة بسلاسة
                currentActiveSection = targetSectionId; // تحديث القسم النشط
            }, 850); // تم تقليل التأخير ليتناسب مع سرعة أنيميشن الخروج (0.8 ثانية + 50ms)
        });
    });

    // ========= وظائف أزرار التحميل والمودال =========
    document.getElementById('download-v1-btn').addEventListener('click', function() {
        // إضافة تأثير نبض عند النقر على زر التحميل
        this.classList.add('animate-pulse');
        setTimeout(() => {
            this.classList.remove('animate-pulse');
        }, 700); // تم تقليل التأخير ليتناسب مع أنيميشن النبض (0.7 ثانية)
    });

    document.getElementById('download-full-btn').addEventListener('click', function() {
        // إظهار مودال الرسالة العائمة عند النقر على زر "النسخة الكاملة"
        document.getElementById('floating-message-modal').classList.add('active');
    });

    document.getElementById('close-message-btn').addEventListener('click', function() {
        // إخفاء مودال الرسالة العائمة عند النقر على زر الإغلاق
        document.getElementById('floating-message-modal').classList.remove('active');
    });
    
    // زر "أخبرني عند الإصدار" - توجيه إلى قسم أخبار المشروع
    document.getElementById('notify-me-btn').addEventListener('click', function() {
        // إخفاء الرسالة المنبثقة
        document.getElementById('floating-message-modal').classList.remove('active');
        
        // تفعيل الانتقال إلى قسم أخبار المشروع
        document.querySelector('.nav-link[data-section="project-news"]').click();
    });
    
    // ========= رسالة الترحيب التلقائية =========
    setTimeout(() => {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'fixed bottom-8 right-8 bg-blue-900 text-white p-5 rounded-lg shadow-lg z-40 max-w-sm transform transition-transform duration-1000 translate-y-60 opacity-0';
        welcomeMessage.innerHTML = `
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-9 w-9 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-xl font-medium">مرحباً بك في موقع تعريب IEGO!</p>
                    <p class="mt-2 text-lg">استمتع بأحدث إصدارات التعريب</p>
                </div>
            </div>
        `;
        document.body.appendChild(welcomeMessage);
        
        // إظهار رسالة الترحيب
        setTimeout(() => {
            welcomeMessage.classList.remove('translate-y-60', 'opacity-0');
            welcomeMessage.classList.add('translate-y-0', 'opacity-100');
        }, 100);
        
        // إخفاء رسالة الترحيب بعد 7 ثوانٍ
        setTimeout(() => {
            welcomeMessage.classList.remove('translate-y-0', 'opacity-100');
            welcomeMessage.classList.add('translate-y-60', 'opacity-0');
            setTimeout(() => {
                welcomeMessage.remove(); // إزالة العنصر من DOM بعد انتهاء الأنيميشن
            }, 1000); // يتناسب مع مدة انتقال الإخفاء (1 ثانية)
        }, 7000); // إظهار رسالة الترحيب لمدة 7 ثوانٍ
    }, 3000); // إظهار رسالة الترحيب بعد 3 ثوانٍ من تحميل الصفحة
});
