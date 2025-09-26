// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

// WhatsApp Functions
function openWhatsApp() {
    const message = encodeURIComponent("Olá, desejo um atendimento!");
    window.open(`https://wa.me/5511966078411?text=${message}`, '_blank');
}

function openWhatsAppService(serviceName) {
    const message = encodeURIComponent(`Olá, desejo um atendimento sobre ${serviceName}!`);
    window.open(`https://wa.me/5511966078411?text=${message}`, '_blank');
}

// Smooth scroll to services
function scrollToServices() {
    document.getElementById('servicos').scrollIntoView({ behavior: 'smooth' });
}

// Mobile Menu Functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('show');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('show');
}

// FAQ Toggle
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Loading Modal
function showLoading() {
    const modal = document.getElementById('loadingModal');
    modal.classList.add('show');
}

function hideLoading() {
    const modal = document.getElementById('loadingModal');
    modal.classList.remove('show');
}

// Form Validation
function validateForm() {
    const form = document.getElementById('heroForm');
    const formData = new FormData(form);
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
    });
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
    
    // Validate nome
    const nome = formData.get('nome');
    if (!nome || nome.trim() === '') {
        showFieldError('nome', 'Nome é obrigatório');
        isValid = false;
    }
    
    // Validate CPF
    const cpf = formData.get('cpf');
    if (!cpf || cpf.trim() === '') {
        showFieldError('cpf', 'CPF/CNPJ é obrigatório');
        isValid = false;
    }
    
    // Validate email
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim() === '') {
        showFieldError('email', 'E-mail é obrigatório');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showFieldError('email', 'E-mail inválido');
        isValid = false;
    }
    
    // Validate terms
    const termos = formData.get('termos');
    if (!termos) {
        showFieldError('termos', 'Você deve aceitar os termos');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (!field) return;

    const formGroup = field.closest('.form-group');
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    if (formGroup && errorElement) {
        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Form Submission
document.getElementById('heroForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showToast('Por favor, corrija os campos destacados.', 'error');
        return;
    }
    
    const formData = new FormData(this);
    const submitBtn = document.getElementById('submitBtn');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i data-lucide="loader-2"></i> Enviando...';
    lucide.createIcons();
    
    showLoading();
    
    // Simulate form processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Prepare WhatsApp message (sem campo Banco)
    const message = `Olá, desejo um atendimento!

*Dados do formulário:*
Nome: ${formData.get('nome')}
CPF/CNPJ: ${formData.get('cpf')}
E-mail: ${formData.get('email')}
Mensagem: ${formData.get('mensagem') || 'Não informada'}`;
    
    hideLoading();
    showToast('Formulário enviado! Redirecionando para o WhatsApp...');
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i data-lucide="check-circle"></i> SOLICITAR ATENDIMENTO';
    lucide.createIcons();
    
    // Redirect to WhatsApp after toast
    setTimeout(() => {
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/5511966078411?text=${encodedMessage}`, '_blank');
    }, 1000);
});

// Clear field errors on input
document.querySelectorAll('#heroForm input, #heroForm select, #heroForm textarea').forEach(field => {
    field.addEventListener('input', function() {
        const formGroup = this.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (formGroup.classList.contains('error')) {
            formGroup.classList.remove('error');
            errorElement.classList.remove('show');
        }
    });
});

// Smooth scrolling for navigation links
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

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--background)';
        header.style.backdropFilter = 'none';
    }
});

// Animation on scroll (simple implementation)
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .stat-card, .faq-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.service-card, .stat-card, .faq-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('show');
    }
});

// Form field formatting
document.getElementById('cpf').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
        value = value.replace(/(\d{2})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1/$2');
        value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }
    
    e.target.value = value;
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = requestAnimationFrame(function() {
        animateOnScroll();
    });
}, { passive: true });
