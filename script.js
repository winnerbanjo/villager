document.addEventListener('DOMContentLoaded', () => {
    // Header scroll background effect
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.style.backgroundColor = 'rgba(92, 13, 22, 0.98)';
            header.style.padding = '0.4rem 0';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        } else {
            header.style.backgroundColor = 'rgba(92, 13, 22, 0.96)';
            header.style.padding = '0';
            header.style.boxShadow = 'none';
        }
    });

    // Genesis Image Slider Logic
    const slides = document.querySelectorAll('#genesis-slider .slide');
    const dots = document.querySelectorAll('#slider-dots .dot');
    const prevBtn = document.getElementById('slide-prev');
    const nextBtn = document.getElementById('slide-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
        });

        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 4500);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    startAutoSlide();

    // Parallax Effect for Quote Background
    const quoteBg = document.querySelector('.quote-bg-image');
    if (quoteBg) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            const quotePos = quoteBg.parentElement.offsetTop;
            if (scrollPos > quotePos - window.innerHeight && scrollPos < quotePos + quoteBg.parentElement.offsetHeight) {
                const distance = scrollPos - quotePos;
                quoteBg.style.transform = `translateY(${distance * 0.15}px)`;
            }
        });
    }

    // Scroll Animation Observer (IntersectionObserver)
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Lightbox Modal Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Click on lookbook cards
    const lookbookCards = document.querySelectorAll('.lookbook-card');
    lookbookCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.getAttribute('data-img');
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');

            lightboxImg.src = imgSrc;
            if (title || desc) {
                lightboxCaption.innerHTML = `<strong>${title || ''}</strong><br><span style="font-size:0.95rem; opacity:0.8;">${desc || ''}</span>`;
            } else {
                lightboxCaption.innerHTML = '';
            }
            lightbox.style.display = 'flex';
        });
    });

    // Click on inline interactive images
    const interactiveImgs = document.querySelectorAll('.interactive-img');
    interactiveImgs.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxImg.src = img.src;
            const caption = img.getAttribute('data-caption');
            lightboxCaption.innerHTML = caption ? `<strong>${caption}</strong>` : '';
            lightbox.style.display = 'flex';
        });
    });

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
        }
    });
});
