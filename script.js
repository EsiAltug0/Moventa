// ==================== THEME TOGGLE ==================== 
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
    
    // Tema tercihini localStorage'a kaydet
    const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
}

// Sayfa yüklendiğinde kaydedilen temayı uygula
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
});

// ==================== MOBILE MENU ==================== 
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
}

// ==================== SEARCH FUNCTIONALITY ==================== 
function toggleSearch() {
    const searchInput = prompt('Arama yapın:');
    if (searchInput) {
        console.log('Arama yapılıyor:', searchInput);
        alert('Arama sonuçları: ' + searchInput);
    }
}

// ==================== HERO SLIDER ==================== 
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[n].classList.add('active');
    dots[n].classList.add('active');
    currentSlide = n;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function goToSlide(n) {
    showSlide(n);
}

// Otomatik slider (her 5 saniyede bir)
setInterval(nextSlide, 5000);

// ==================== GENRE FILTER ==================== 
function filterByGenre(button) {
    // Tüm genre butonlarından active sınıfını kaldır
    document.querySelectorAll('.genre-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Tıklanan butona active sınıfı ekle
    button.classList.add('active');
    
    const genre = button.textContent;
    console.log('Seçilen tür:', genre);
    
    // Burada API'ye istek gönderebilirsiniz
    // fetchMoviesByGenre(genre);
}

// ==================== MOVIE CARD INTERACTIONS ==================== 
function addToWatchlist(event) {
    event.preventDefault();
    const button = event.target;
    const movieTitle = button.closest('.movie-card').querySelector('h3').textContent;
    
    // Burada API'ye istek gönderebilirsiniz
    // addMovieToWatchlist(movieTitle);
    
    // Geçici olarak UI'da göster
    button.textContent = '✓ Eklendi';
    button.style.background = '#00d97e';
    
    setTimeout(() => {
        button.textContent = '+ Listeye Ekle';
        button.style.background = 'var(--primary-color)';
    }, 2000);
    
    console.log('İzleme listesine eklendi:', movieTitle);
}

// Tüm "Listeye Ekle" butonlarına event listener ekle
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', addToWatchlist);
    });
});

// ==================== MOOD CARDS ==================== 
function handleMoodClick(card) {
    const mood = card.querySelector('h3').textContent;
    console.log('Seçilen ruh hali:', mood);
    
    // Burada API'ye istek gönderebilirsiniz
    // fetchMoviesByMood(mood);
    
    alert(mood + ' kategorisindeki filmler yükleniyor...');
}

// Tüm mood kartlarına event listener ekle
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.mood-card').forEach(card => {
        card.addEventListener('click', () => handleMoodClick(card));
    });
});

// ==================== PLAY BUTTON ==================== 
function playTrailer(event) {
    event.stopPropagation();
    const movieTitle = event.target.closest('.movie-card').querySelector('h3').textContent;
    console.log('Fragman oynatılıyor:', movieTitle);
    
    // Burada video modal'ı açabilirsiniz
    alert(movieTitle + ' fragmanı oynatılıyor...');
}

// Tüm play butonlarına event listener ekle
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.play-btn').forEach(button => {
        button.addEventListener('click', playTrailer);
    });
});

// ==================== SCROLL ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.5s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.movie-card, .mood-card, .stat-card').forEach(el => {
        observer.observe(el);
    });
});

// ==================== NAVIGATION SMOOTH SCROLL ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== ACTIVE NAV LINK ==================== 
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== WATCHLIST BUTTON ==================== 
document.addEventListener('DOMContentLoaded', () => {
    const watchlistBtn = document.querySelector('.watchlist-btn');
    if (watchlistBtn) {
        watchlistBtn.addEventListener('click', () => {
            console.log('İzleme listesi sayfasına yönlendiriliyor...');
            // window.location.href = '/watchlist';
            alert('İzleme listesi sayfasına yönlendirileceksiniz...');
        });
    }
});

// ==================== AUTH BUTTON ==================== 
document.addEventListener('DOMContentLoaded', () => {
    const authBtn = document.querySelector('.auth-btn');
    if (authBtn) {
        authBtn.addEventListener('click', () => {
            console.log('Giriş sayfasına yönlendiriliyor...');
            // window.location.href = '/login';
            alert('Giriş sayfasına yönlendirileceksiniz...');
        });
    }
});

// ==================== CONSOLE LOGS ==================== 
console.log('Moventa - Film ve Dizi Keşif Platformu');
console.log('Sürüm: 1.0.0');
console.log('Tema: Mavi-Siyah Premium');
