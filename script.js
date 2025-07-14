document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript loaded and DOMContentLoaded event fired.');

    // ========= New Mobile Navigation Logic =========
    const hamburgerBtn = document.getElementById('hamburger-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
    const mobileNavLinks = mobileMenu ? mobileMenu.querySelectorAll('.nav-link') : [];

    function openMobileMenu() {
        if (mobileMenu && mobileMenuOverlay) {
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
            console.log('Mobile menu opened.');
        }
    }

    function closeMobileMenu() {
        if (mobileMenu && mobileMenuOverlay) {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Allow background scroll
            console.log('Mobile menu closed.');
        }
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openMobileMenu);
    } else {
        console.warn('Hamburger button not found!');
    }
    if (mobileMenuCloseBtn) {
        mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
    } else {
        console.warn('Mobile menu close button not found!');
    }
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    } else {
        console.warn('Mobile menu overlay not found!');
    }

    // ========= إنشاء تأثير الجسيمات المتحركة في الخلفية =========
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) {
            console.warn('Particles container not found!');
            return;
        }
        const particleCount = 60;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 15 + 8;
            const opacity = Math.random() * 0.4 + 0.2;
            const duration = Math.random() * 35 + 25;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = opacity;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            particlesContainer.appendChild(particle);
        }
        console.log('Particles created.');
    }
    
    createParticles();
    
    // ========= إضافة أنيميشن للعناصر عند ظهورها أثناء التمرير =========
    function animateOnScroll() {
        const elements = document.querySelectorAll('.section-title, .card, .video-container, .team-table');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                if (!element.classList.contains('animate')) {
                    element.classList.add('animate');
                    // console.log('Element animated on scroll:', element.id || element.className); // Too verbose, uncomment if needed
                }
            }
        });
    }
    
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    console.log('Scroll and load listeners for animation attached.');

    // ========= التنقل بين الأقسام وإظهارها/إخفائها بسلاسة =========
    const desktopNavLinks = document.querySelectorAll('#desktop-nav .nav-link');
    const sections = {
        'home': document.getElementById('home-section'),
        'project-news': document.getElementById('project-news-section'),
        'videos': document.getElementById('videos-section'),
        'team': document.getElementById('team-section')
    };

    let currentActiveSectionId = 'home-section';
    if (sections['home']) {
        sections['home'].classList.remove('hidden');
        sections['home'].classList.add('section-transition-enter-active');
        document.querySelector('#desktop-nav .nav-link[data-section="home"]').classList.add('active-link');

        const featuredBox = document.querySelector('#home-section .featured-box');
        const downloadSection = document.querySelector('#home-section .download-section');
        const downloadTitle = document.querySelector('#home-section .section-title');

        if (featuredBox) {
            featuredBox.classList.add('animate');
            console.log('Featured box animated on load.');
        }
        if (downloadSection) {
            downloadSection.classList.add('animate');
            console.log('Download section animated on load.');
        }
        if (downloadTitle) {
            downloadTitle.classList.add('animate');
            console.log('Download title animated on load.');
        }
    } else {
        console.warn('Home section not found!');
    }

    desktopNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSectionData = this.getAttribute('data-section');
            const targetSectionId = targetSectionData + '-section';
            console.log(`Desktop nav link clicked: ${targetSectionData}. Target section ID: ${targetSectionId}`);

            if (targetSectionId === currentActiveSectionId) {
                console.log('Already on target section, scrolling to top.');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            desktopNavLinks.forEach(navLink => navLink.classList.remove('active-link'));
            this.classList.add('active-link');

            const previousSection = sections[currentActiveSectionId.replace('-section', '')];
            const nextSection = sections[targetSectionId.replace('-section', '')];

            if (previousSection) {
                console.log(`Hiding previous section: ${previousSection.id}`);
                previousSection.classList.add('section-transition-exit-active');
                previousSection.classList.remove('section-transition-enter-active');

                previousSection.addEventListener('transitionend', function handler() {
                    previousSection.classList.add('hidden');
                    previousSection.removeEventListener('transitionend', handler);

                    if (nextSection) {
                        console.log(`Showing next section: ${nextSection.id}`);
                        nextSection.classList.remove('hidden');
                        nextSection.classList.add('section-transition-enter-active');
                        nextSection.classList.remove('section-transition-exit-active');
                        animateOnScroll();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        console.warn(`Next section not found: ${targetSectionId}`);
                    }
                    currentActiveSectionId = targetSectionId;
                }, { once: true }); 
            } else {
                console.log('No previous section to hide.');
                if (nextSection) {
                    Object.values(sections).forEach(section => {
                        if (section && section.id !== targetSectionId) section.classList.add('hidden'); 
                    });
                    nextSection.classList.remove('hidden');
                    nextSection.classList.add('section-transition-enter-active');
                    animateOnScroll();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    console.warn(`Next section not found: ${targetSectionId}`);
                }
                currentActiveSectionId = targetSectionId;
            }
        });
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSectionData = this.getAttribute('data-section');
            console.log(`Mobile menu link clicked: ${targetSectionData}`);
            
            const correspondingDesktopLink = document.querySelector(`#desktop-nav .nav-link[data-section="${targetSectionData}"]`);

            if (correspondingDesktopLink) {
                console.log(`Triggering click on corresponding desktop link for: ${targetSectionData}`);
                correspondingDesktopLink.click();
            } else {
                console.warn(`Corresponding desktop link not found for mobile link: ${targetSectionData}`);
            }

            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });

    // ========= وظائف أزرار التحميل والمودال =========
    const downloadV1Btn = document.getElementById('download-v1-btn');
    if (downloadV1Btn) {
        downloadV1Btn.addEventListener('click', function() {
            this.classList.add('animate-pulse');
            setTimeout(() => {
                this.classList.remove('animate-pulse');
            }, 700);
            console.log('Download V1 button clicked.');
        });
    } else {
        console.warn('Download V1 button not found!');
    }

    const downloadFullBtn = document.getElementById('download-full-btn');
    const floatingMessageModal = document.getElementById('floating-message-modal');
    const closeMessageBtn = document.getElementById('close-message-btn');
    const notifyMeBtn = document.getElementById('notify-me-btn');

    if (downloadFullBtn && floatingMessageModal) {
        downloadFullBtn.addEventListener('click', function() {
            floatingMessageModal.classList.add('active');
            console.log('Download Full button clicked, modal opened.');
        });
    } else {
        console.warn('Download Full button or modal not found!');
    }

    if (closeMessageBtn && floatingMessageModal) {
        closeMessageBtn.addEventListener('click', function() {
            floatingMessageModal.classList.remove('active');
            console.log('Modal close button clicked, modal closed.');
        });
    } else {
        console.warn('Modal close button not found!');
    }
    
    if (notifyMeBtn) {
        notifyMeBtn.addEventListener('click', function() {
            if (floatingMessageModal) {
                floatingMessageModal.classList.remove('active');
                console.log('Notify Me button clicked, modal closed.');
            }
            const projectNewsLink = document.querySelector('#desktop-nav .nav-link[data-section="project-news"]');
            if (projectNewsLink) {
                projectNewsLink.click();
                console.log('Navigating to Project News section.');
            } else {
                console.warn('Project News link not found for Notify Me button.');
            }
        });
    } else {
        console.warn('Notify Me button not found!');
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
        
        setTimeout(() => {
            welcomeMessage.classList.remove('translate-y-60', 'opacity-0');
            welcomeMessage.classList.add('translate-y-0', 'opacity-100');
            console.log('Welcome message shown.');
        }, 100);
        
        setTimeout(() => {
            welcomeMessage.classList.remove('translate-y-0', 'opacity-100');
            welcomeMessage.classList.add('translate-y-60', 'opacity-0');
            setTimeout(() => {
                welcomeMessage.remove();
                console.log('Welcome message removed.');
            }, 1000);
        }, 7000);
    }, 3000);
});

