// Organti - Script Principal para as Novas Páginas
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Smooth Scrolling
    initSmoothScrolling();
    
    // Form Handling
    initFormHandling();
    
    // Search Functionality
    initSearchFunctionality();
    
    // Animation on Scroll
    initScrollAnimations();
    
    // Newsletter Signup
    initNewsletterSignup();
    
    // FAQ Accordion
    initFAQAccordion();
    
    // Loading States
    initLoadingStates();
    
    // Theme Toggle (modo escuro)
    initThemeToggle();
});

// Mobile Menu
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navbar || !navLinks) return;
    
    // Verificar se já existe o botão
    let mobileMenuBtn = navbar.querySelector('.mobile-menu-btn');
    
    if (!mobileMenuBtn) {
        // Criar botão do menu mobile
        mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.setAttribute('aria-label', 'Menu');
        
        // Adicionar o botão ao navbar
        navbar.appendChild(mobileMenuBtn);
    }
    
    // Toggle do menu
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-active');
        mobileMenuBtn.classList.toggle('active');
        
        // Alterar ícone
        if (navLinks.classList.contains('mobile-active')) {
            mobileMenuBtn.innerHTML = '✕';
        } else {
            mobileMenuBtn.innerHTML = '☰';
        }
    });
    
    // Fechar menu ao clicar em um link
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : '';
            
            // Loading state
            if (submitBtn) {
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
            }
            
            // Simular envio (em produção, seria uma requisição real)
            setTimeout(() => {
                showNotification('Mensagem enviada com sucesso!', 'success');
                form.reset();
                
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }, 2000);
        });
    });
}

// Search Functionality
function initSearchFunctionality() {
    const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="esquis"], input[type="text"][placeholder*="earch"]');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            
            // Para FAQ
            if (window.location.pathname.includes('faq.html')) {
                searchFAQ(query);
            }
            
            // Para Central de Ajuda
            if (window.location.pathname.includes('help-center.html')) {
                searchHelpCenter(query);
            }
        });
    });
}

function searchFAQ(query) {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (question.includes(query) || answer.includes(query) || query === '') {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function searchHelpCenter(query) {
    const helpCategories = document.querySelectorAll('.help-category');
    
    helpCategories.forEach(category => {
        const links = category.querySelectorAll('a');
        let hasVisibleLinks = false;
        
        links.forEach(link => {
            const text = link.textContent.toLowerCase();
            if (text.includes(query) || query === '') {
                link.parentElement.style.display = 'block';
                hasVisibleLinks = true;
            } else {
                link.parentElement.style.display = 'none';
            }
        });
        
        // Mostrar/ocultar categoria inteira
        category.style.display = hasVisibleLinks || query === '' ? 'block' : 'none';
    });
}

// Animation on Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem ser animados
    const animatedElements = document.querySelectorAll('.card, .stat-item, .blog-post, .job-listing');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Newsletter Signup
function initNewsletterSignup() {
    const newsletterInputs = document.querySelectorAll('input[type="email"][placeholder*="email"]');
    
    newsletterInputs.forEach(input => {
        const form = input.closest('form') || input.parentElement;
        const button = form.querySelector('a[href="#"], button');
        
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const email = input.value;
                if (validateEmail(email)) {
                    // Simular inscrição
                    showNotification('Inscrição realizada com sucesso!', 'success');
                    input.value = '';
                } else {
                    showNotification('Por favor, insira um email válido.', 'error');
                }
            });
        }
    });
}

// FAQ Accordion
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Fechar todas as outras respostas
            document.querySelectorAll('.faq-answer.active').forEach(ans => {
                ans.classList.remove('active');
                ans.style.maxHeight = '0';
            });
            document.querySelectorAll('.faq-question.active').forEach(q => {
                q.classList.remove('active');
            });
            
            // Abrir/fechar a resposta clicada
            if (!isActive) {
                answer.classList.add('active');
                this.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Loading States
function initLoadingStates() {
    const buttons = document.querySelectorAll('.btn-hero, button[type="submit"]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('loading')) return;
            
            // Adicionar estado de loading para links externos ou ações
            if (this.href && !this.href.includes('#') && !this.href.includes(window.location.hostname)) {
                this.classList.add('loading');
                this.textContent = 'Carregando...';
            }
        });
    });
}

// Theme Toggle
function initThemeToggle() {
    // Verificar se já existe o botão
    let themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) {
        // Criar botão de tema (modo escuro)
        themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.setAttribute('aria-label', 'Alternar tema');
        themeToggle.title = 'Modo escuro';
        
        // Adicionar ao header
        const header = document.querySelector('.header .container');
        if (header) {
            header.appendChild(themeToggle);
        }
    }
    
    // Verificar preferência salva
    const savedTheme = localStorage.getItem('organti-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '☀️';
        themeToggle.title = 'Modo claro';
    }
    
    // Toggle do tema
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            this.innerHTML = '☀️';
            this.title = 'Modo claro';
            localStorage.setItem('organti-theme', 'dark');
        } else {
            this.innerHTML = '🌙';
            this.title = 'Modo escuro';
            localStorage.setItem('organti-theme', 'light');
        }
    });
}

// Utility Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Adicionar ao body
    document.body.appendChild(notification);
    
    // Mostrar com animação
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Lazy Loading para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
initLazyLoading();

