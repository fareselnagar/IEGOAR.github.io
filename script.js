document.addEventListener('DOMContentLoaded', function() {
    // ========= وظائف قائمة الهامبرغر (الموبايل) =========
    const hamburgerBtn = document.getElementById('hamburger-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener('click', () => {
            mobileNav.classList.remove('translate-x-full'); // إظهار القائمة
            mobileNav.classList.add('translate-x-0');
            document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
        });
    }

    if (closeBtn && mobileNav) {
        closeBtn.addEventListener('click', () => {
            mobileNav.classList.remove('translate-x-0'); // إخفاء القائمة
            mobileNav.classList.add('translate-x-full');
            document.body.style.overflow = ''; // السماح بالتمرير مرة أخرى
        });
    }

    // إغلاق القائمة عند النقر على أي رابط داخلها (لتحسين تجربة المستخدم)
    if (mobileNav) { 
        const navLinksInMobile = mobileNav.querySelectorAll('.nav-link');
        if (navLinksInMobile) {
            navLinksInMobile.forEach(link => {
                link.addEventListener('click', () => {
                    // تأكد من أننا على شاشة موبايل قبل إغلاق القائمة
                    if (window.innerWidth <= 768) { // 768px هو breakpoint الـ md في Tailwind
                        mobileNav.classList.remove('translate-x-0'); // إخفاء القائمة
                        mobileNav.classList.add('translate-x-full');
                        document.body.style.overflow = ''; // السماح بالتمرير مرة أخرى
                    }
                });
            });
        }
    }


    // ========= إنشاء تأثير الجسيمات المتحركة في الخلفية =========
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return; // تأكد من وجود العنصر
        const particleCount = 60; // عدد الجسيمات
        
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
        const elements = document.querySelectorAll('.section-title, .featured-box, .download-section, .card, .video-container, .team-table');
        
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

    let currentActiveSection = 'home-section'; // استخدم الـ ID كقيمة أولية
    // تأكد من عرض القسم الافتراضي عند تحميل الصفحة
    if (sections['home']) { // استخدم 'home' كـ key هنا
        sections['home'].classList.remove('hidden');
        sections['home'].classList.add('section-transition-enter-active');
        // تأكد من أن الرابط الرئيسي نشط عند تحميل الصفحة
        document.querySelector('.nav-link[data-section="home"]').classList.add('active-link');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSectionId = this.getAttribute('data-section') + '-section'; // أضف '-section' للحصول على الـ ID الكامل

            if (targetSectionId === currentActiveSection) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            // إزالة فئة 'active-link' من جميع الروابط
            navLinks.forEach(navLink => navLink.classList.remove('active-link'));
            // إضافة فئة 'active-link' للرابط الذي تم النقر عليه
            this.classList.add('active-link');

            const previousSection = sections[currentActiveSection.replace('-section', '')];
            const nextSection = sections[targetSectionId.replace('-section', '')];

            if (previousSection) {
                // إعداد القسم الحالي لأنيميشن الخروج
                previousSection.classList.add('section-transition-exit-active');
                previousSection.classList.remove('section-transition-enter-active');

                // الانتظار حتى انتهاء أنيميشن الخروج قبل إظهار القسم الجديد
                previousSection.addEventListener('transitionend', function handler() {
                    previousSection.classList.add('hidden');
                    previousSection.removeEventListener('transitionend', handler); // إزالة الـ event listener بعد الاستخدام

                    // إظهار القسم الجديد
                    if (nextSection) {
                        nextSection.classList.remove('hidden');
                        nextSection.classList.add('section-transition-enter-active');
                        nextSection.classList.remove('section-transition-exit-active');
                        animateOnScroll();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    currentActiveSection = targetSectionId; // تحديث القسم النشط بعد ظهور الجديد
                }, { once: true }); // استخدام {once: true} لضمان أن الـ event listener يتم تشغيله مرة واحدة فقط
            } else {
                // في حالة عدم وجود قسم سابق (أول تحميل للصفحة مثلاً)
                if (nextSection) {
                    Object.values(sections).forEach(section => {
                        if (section) section.classList.add('hidden'); // التأكد من وجود القسم قبل إضافة الكلاس
                    });
                    nextSection.classList.remove('hidden');
                    nextSection.classList.add('section-transition-enter-active');
                    animateOnScroll();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                currentActiveSection = targetSectionId;
            }
        });
    });

    // ========= وظائف أزرار التحميل والمودال =========
    document.getElementById('download-v1-btn').addEventListener('click', function() {
        // إضافة تأثير نبض عند النقر على زر التحميل
        this.classList.add('animate-pulse');
        setTimeout(() => {
            this.classList.remove('animate-pulse');
        }, 700); // تم تقليل التأخير ليتناسب مع أنيميشن النبض (0.7 ثانية)
        // يمكنك هنا إضافة منطق التحميل الفعلي
        // alert('بدء تحميل النسخة التجريبية V1...');
    });

    const downloadFullBtn = document.getElementById('download-full-btn');
    const floatingMessageModal = document.getElementById('floating-message-modal');
    const closeMessageBtn = document.getElementById('close-message-btn');
    const notifyMeBtn = document.getElementById('notify-me-btn');

    if (downloadFullBtn && floatingMessageModal) {
        downloadFullBtn.addEventListener('click', function() {
            // إظهار مودال الرسالة العائمة عند النقر على زر "النسخة الكاملة"
            floatingMessageModal.classList.add('active');
        });
    }

    if (closeMessageBtn && floatingMessageModal) {
        closeMessageBtn.addEventListener('click', function() {
            // إخفاء مودال الرسالة العائمة عند النقر على زر الإغلاق
            floatingMessageModal.classList.remove('active');
        });
    }
    
    // زر "أخبرني عند الإصدار" - توجيه إلى قسم أخبار المشروع
    if (notifyMeBtn) {
        notifyMeBtn.addEventListener('click', function() {
            // إخفاء الرسالة المنبثقة
            if (floatingMessageModal) {
                floatingMessageModal.classList.remove('active');
            }
            
            // تفعيل الانتقال إلى قسم أخبار المشروع
            const projectNewsLink = document.querySelector('.nav-link[data-section="project-news"]');
            if (projectNewsLink) {
                projectNewsLink.click();
            }
        });
    }
    
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
