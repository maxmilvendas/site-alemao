// Mobile Menu
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('active');
}

// WhatsApp Link
// WhatsApp Link
function openWhatsApp() {
    const message = "Olá, desejo um atendimento!";
    const phone = "551151924444";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}


// Smooth Scroll
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// FAQ Toggle
function toggleFAQ(index) {
    const faqItem = document.querySelectorAll('.faq-item')[index];
    faqItem.classList.toggle('active');
    
    // Close other FAQ items
    document.querySelectorAll('.faq-item').forEach((item, i) => {
        if (i !== index) {
            item.classList.remove('active');
        }
    });
}

// Testimonials
const testimonials = [
    {
        name: "Maria Silva",
        role: "Empresária • São Paulo, SP",
        content: "Atendimento excepcional! Em menos de 24 horas conseguiram resolver uma pendência que me incomodava há meses. A equipe é extremamente profissional e o processo foi totalmente transparente.",
        savings: "Economia de 70%",
        avatar: "M"
    },
    {
        name: "João Santos",
        role: "Contador • Rio de Janeiro, RJ", 
        content: "Fiquei impressionado com a competência da equipe. Negociaram um desconto incrível para quitação do meu débito e me mantiveram informado durante todo o processo. Recomendo sem reservas!",
        savings: "Desconto de 60%",
        avatar: "J"
    },
    {
        name: "Ana Costa",
        role: "Professora • Belo Horizonte, MG",
        content: "Atendimento humanizado que faz toda a diferença! Me senti segura e confiante durante toda a negociação. A solução encontrada superou minhas expectativas.",
        savings: "Parcelamento facilitado",
        avatar: "A"
    },
    {
        name: "Carlos Oliveira",
        role: "Comerciante • Salvador, BA",
        content: "Profissionais extremamente preparados! Resolveram um problema complexo que eu tinha há anos em apenas 2 dias. O investimento no serviço se pagou com a economia obtida.",
        savings: "Economia de 80%",
        avatar: "C"
    },
    {
        name: "Luciana Ferreira", 
        role: "Advogada • Brasília, DF",
        content: "Serviço de altíssima qualidade! A transparência e eficiência da equipe são notáveis. Conseguiram uma negociação que eu nunca imaginei ser possível.",
        savings: "Desconto de 65%",
        avatar: "L"
    }
];

let currentTestimonial = 0;

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonial];
    
    document.getElementById('testimonial-text').textContent = `"${testimonial.content}"`;
    document.getElementById('author-name').textContent = testimonial.name;
    document.getElementById('author-role').textContent = testimonial.role;
    document.getElementById('author-avatar').textContent = testimonial.avatar;
    document.getElementById('savings-text').textContent = testimonial.savings;
    
    // Update indicators
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentTestimonial);
    });
}

function changeTestimonial(direction) {
    currentTestimonial += direction;
    if (currentTestimonial >= testimonials.length) currentTestimonial = 0;
    if (currentTestimonial < 0) currentTestimonial = testimonials.length - 1;
    updateTestimonial();
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonial();
}

// Auto-advance testimonials
setInterval(() => {
    changeTestimonial(1);
}, 6000);

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Initialize testimonials
    updateTestimonial();
});

// Add scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .benefit-card, .faq-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Initial styles for animation elements
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.service-card, .benefit-card, .faq-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
    });
    
    // Trigger initial animation check
    animateOnScroll();
});