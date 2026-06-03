document.addEventListener('DOMContentLoaded', function () {

    // Header Scroll Effect
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            header.style.padding = '0.7rem 0';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
            header.style.padding = '1rem 0';
        }
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');

        // Animate Links
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Custom Intersection Observer for Reveal Animations


    // Adding reveal classes to elements
    const revealElements = document.querySelectorAll('.hero-content, .service-card, .about-image, .about-content, .portfolio-item, .contact-wrapper');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);
    revealElements.forEach(el => {
        el.classList.add('reveal-hidden'); // Initial state
        observer.observe(el);
    });

    // Portfolio Main Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');

            if (targetId === 'sliders') {
                initSliders();
            }
        });
    });

    // Before/After Sliders Interactivity
    function initSliders() {
        const sliders = document.querySelectorAll('.comparison-slider');
        
        sliders.forEach(slider => {
            if (slider.dataset.initialized) return;
            slider.dataset.initialized = "true";

            const updateSlider = (clientX) => {
                const rect = slider.getBoundingClientRect();
                const x = clientX - rect.left;
                let positionPercent = (x / rect.width) * 100;
                
                if (positionPercent < 0) positionPercent = 0;
                if (positionPercent > 100) positionPercent = 100;
                
                slider.style.setProperty('--position', `${positionPercent}%`);
            };

            let isDragging = false;

            slider.addEventListener('mousedown', (e) => {
                isDragging = true;
                updateSlider(e.clientX);
            });

            window.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                updateSlider(e.clientX);
            });

            window.addEventListener('mouseup', () => {
                isDragging = false;
            });

            slider.addEventListener('touchstart', (e) => {
                isDragging = true;
                updateSlider(e.touches[0].clientX);
            }, { passive: true });

            window.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                updateSlider(e.touches[0].clientX);
            }, { passive: true });

            window.addEventListener('touchend', () => {
                isDragging = false;
            });
        });
    }

    // Run once on load
    initSliders();

    // ITE Process Stepper
    const stepButtons = document.querySelectorAll('.process-step-btn');
    const processImg = document.getElementById('process-image');
    const processTitle = document.getElementById('process-title');
    const processDesc = document.getElementById('process-description');
    const processStepIndicator = document.getElementById('process-step-indicator');

    const stepsData = {
        1: {
            img: "Resized_Screenshot_20260601_135439_Gallery.jpg",
            title: "Étape 1 : Diagnostic & Préparation du Support",
            desc: "Avant toute intervention, nous effectuons un diagnostic précis des façades. Les murs sont nettoyés à haute pression pour éliminer les impuretés, les peintures cloquées et les mousses. Les fissures sont purgées et réparées pour garantir un support parfaitement sain, plan et adhérent."
        },
        2: {
            img: "Resized_Screenshot_20260601_135434_Gallery.jpg",
            title: "Étape 2 : Pose des Panneaux Isolants (ITE)",
            desc: "Nous procédons au calage et collage des panneaux isolants en polystyrène expansé blanc haute performance directement sur la maçonnerie. Cette enveloppe isolante continue supprime tous les ponts thermiques de votre habitation."
        },
        3: {
            img: "Resized_Screenshot_20260601_135428_Gallery.jpg",
            title: "Étape 3 : Chevillage et Traitement des Joints",
            desc: "Pour assurer une résistance mécanique parfaite aux vents et chocs, les panneaux sont fixés en complément à l'aide de chevilles à expansion spécifiques. Les joints entre les plaques isolantes sont calfeutrés à l'aide de mortier-colle."
        },
        4: {
            img: "Resized_Screenshot_20260601_135423_Gallery.jpg",
            title: "Étape 4 : Application du Sous-Enduit Armé",
            desc: "Une couche de sous-enduit colle est appliquée sur les panneaux, dans laquelle nous marouflons une armature en fibre de verre (trame). Cette étape cruciale arme la façade et prévient tout risque de microfissuration futur."
        },
        5: {
            img: "Resized_Screenshot_20260601_135418_Gallery.jpg",
            title: "Étape 5 : Finition Décorative & Peinture",
            desc: "Après séchage complet, nous appliquons l'enduit de finition taloché suivi d'une peinture ou d'un revêtement minéral ou organique imperméable et respirant. Votre maison bénéficie d'un aspect neuf, moderne, tout en respirant idéalement."
        }
    };

    if (stepButtons.length > 0 && processImg) {
        stepButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const stepNum = btn.getAttribute('data-step');
                
                stepButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                processImg.classList.add('fade-out');
                
                setTimeout(() => {
                    const data = stepsData[stepNum];
                    processImg.src = data.img;
                    processImg.alt = data.title;
                    processTitle.textContent = data.title;
                    processDesc.textContent = data.desc;
                    processStepIndicator.textContent = stepNum;
                    
                    processImg.classList.remove('fade-out');
                }, 300);
            });
        });
    }

    // Gallery Filter Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                        item.style.animation = 'none';
                        item.offsetHeight; // trigger reflow
                        item.style.animation = 'fadeIn 0.4s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});
// Add dynamic CSS for animations
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .reveal-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .hamburger.toggle span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.toggle span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.toggle span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(styleSheet);
