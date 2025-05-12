// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll behavior
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show/hide header based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
        
        // Show/hide back to top button
        const backToTopButton = document.querySelector('.back-to-top');
        if (scrollTop > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('projectModal');
    const closeButton = modal.querySelector('.close-button');
    const detailButtons = document.querySelectorAll('.details-btn');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalVisitLink = document.getElementById('modalVisitLink');
    const modalGithubLink = document.getElementById('modalGithubLink');
    
    // Project data
    const projectData = {
        'osurea': {
            title: 'osurea - Tablet Area Calculator',
            image: 'img/Osurea.avif',
            visitLink: 'https://osurea.vercel.app/',
            githubLink: 'https://github.com/sammy08300/osurea'
        },
        'skins': {
            title: 'osu-yuzu-skins - Skin Collection',
            image: 'img/OsuYuzuskins.avif',
            visitLink: 'https://osu-yuzu-skins.vercel.app/',
            githubLink: 'https://github.com/sammy08300/osu-yuzu-skins'
        }
    };
    
    // Open modal with project details
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                modalImage.src = project.image;
                modalTitle.textContent = project.title;
                modalVisitLink.href = project.visitLink;
                modalGithubLink.href = project.githubLink;
                
                // Show modal
                modal.style.display = 'block';
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
                
                // Prevent body scrolling when modal is open
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal when clicking the close button
    closeButton.addEventListener('click', closeModal);
    
    // Close modal when clicking outside of it
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 400); // Match the transition duration
    }
    
    // Navigation active state based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            } else if (current === '' && link.getAttribute('href') === '#') {
                // Home link is active when at the top
                link.classList.add('active');
            }
        });
    });
    
    // Animation for elements when they come into view
    const animateOnScroll = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const options = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver(animateOnScroll, options);
    
    document.querySelectorAll('.feature-card, .project-card, .connect-link').forEach(element => {
        element.classList.remove('animate-fadeIn');
        observer.observe(element);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}); 