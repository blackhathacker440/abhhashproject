document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('loaded');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Skills Ball Animation - Improved Version
    const skillsBall = document.getElementById('skillsBall');
    const skills = [
        { name: 'Java', icon: 'fab fa-java', level: 95 },
        { name: 'Spring Boot', icon: 'fas fa-leaf', level: 95 },
        { name: 'JavaScript', icon: 'fab fa-js', level: 85 },
        { name: 'Python', icon: 'fab fa-python', level: 80 },
        { name: 'React', icon: 'fab fa-react', level: 85 },
        { name: 'Angular', icon: 'fab fa-angular', level: 75 },
        { name: 'Docker', icon: 'fab fa-docker', level: 90 },
        { name: 'Git', icon: 'fab fa-git-alt', level: 95 },
        { name: 'PostgreSQL', icon: 'fas fa-database', level: 90 },
        { name: 'Kafka', icon: 'fas fa-stream', level: 85 }
    ];

    // Create skill circles with better positioning
    function createSkillCircles() {
        const radius = skillsBall.offsetWidth / 2.5;
        const centerX = skillsBall.offsetWidth / 2;
        const centerY = skillsBall.offsetHeight / 2;
        
        skills.forEach((skill, index) => {
            const angle = (index * (360 / skills.length)) * (Math.PI / 180);
            const x = centerX + radius * Math.cos(angle) - 25; // 25 is half of circle width
            const y = centerY + radius * Math.sin(angle) - 25;
            
            const skillCircle = document.createElement('div');
            skillCircle.className = 'skill-circle';
            skillCircle.innerHTML = `<i class="${skill.icon}"></i>`;
            skillCircle.setAttribute('data-skill', skill.name);
            skillCircle.setAttribute('data-level', skill.level);
            skillCircle.style.left = `${x}px`;
            skillCircle.style.top = `${y}px`;
            
            skillsBall.appendChild(skillCircle);
        });
    }

    // Initialize skill circles
    createSkillCircles();

    // Animate skill circles on scroll
    let skillsBallAnimated = false;
    
    function animateSkillsBall() {
        const skillsSection = document.getElementById('skills');
        const skillsSectionTop = skillsSection.offsetTop;
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition > skillsSectionTop - 400 && !skillsBallAnimated) {
            skillsBallAnimated = true;
            
            const skillCircles = document.querySelectorAll('.skill-circle');
            skillCircles.forEach((circle, index) => {
                setTimeout(() => {
                    circle.classList.add('animate__animated', 'animate__bounceIn');
                    
                    // Show tooltip on hover
                    circle.addEventListener('mouseenter', function() {
                        const tooltip = document.createElement('div');
                        tooltip.className = 'skill-tooltip';
                        tooltip.textContent = `${this.getAttribute('data-skill')} - ${this.getAttribute('data-level')}%`;
                        this.appendChild(tooltip);
                    });
                    
                    circle.addEventListener('mouseleave', function() {
                        const tooltip = this.querySelector('.skill-tooltip');
                        if (tooltip) {
                            tooltip.remove();
                        }
                    });
                }, index * 100);
            });
        }
    }
    
    window.addEventListener('scroll', animateSkillsBall);
    animateSkillsBall(); // Run once in case the section is already in view

    // Make skill balls float up and down
    function floatSkillBalls() {
        const skillCircles = document.querySelectorAll('.skill-circle');
        const now = Date.now();
        
        skillCircles.forEach((circle, index) => {
            // Each circle gets a slightly different animation timing
            const offset = index * 100;
            const floatValue = Math.sin((now + offset) / 800) * 10;
            
            circle.style.transform = `translateY(${floatValue}px)`;
        });
        
        requestAnimationFrame(floatSkillBalls);
    }
    
    // Start the floating animation
    floatSkillBalls();

    // Animate skill bars on scroll
    let skillBarsAnimated = false;
    
    function animateSkillBars() {
        const skillsSection = document.getElementById('skills');
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillsSectionTop = skillsSection.offsetTop;
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition > skillsSectionTop - 400 && !skillBarsAnimated) {
            skillBarsAnimated = true;
            
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = `${width}%`;
            });
        }
    }
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Run once in case the section is already in view

    // Projects Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'block';
                    card.classList.add('animate__animated', 'animate__fadeIn');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // // Contact Form Submission
    // const contactForm = document.getElementById('contactForm');
    // const formResponse = document.getElementById('formResponse');
    
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         const formData = new FormData(this);
            
    //         fetch(this.action, {
    //             method: 'POST',
    //             body: formData,
    //             headers: {
    //                 'Accept': 'application/json'
    //             }
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //             formResponse.style.display = 'block';
    //             if (data.success) {
    //                 formResponse.innerHTML = '<p>Message sent successfully! I will get back to you soon.</p>';
    //                 formResponse.className = 'success';
    //                 contactForm.reset();
    //             } else {
    //                 formResponse.innerHTML = '<p>There was an error sending your message. Please try again later.</p>';
    //                 formResponse.className = 'error';
    //             }
    //         })
    //         .catch(error => {
    //             formResponse.style.display = 'block';
    //             formResponse.innerHTML = '<p>There was an error sending your message. Please try again later.</p>';
    //             formResponse.className = 'error';
    //         });
    //     });
    // }

   form.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();
    const formData = new FormData(form);
    const response = await fetch('https://formly.email/submit', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    console.log('API Response:', result); // Add this line
    
    if (result.success) {
      formResponse.style.display = 'block';
      formResponse.innerHTML = '<p>Message sent successfully! I will get back to you soon.</p>';
      formResponse.className = 'success';
      form.reset();
    } else {
      formResponse.style.display = 'block';
      formResponse.innerHTML = `<p>Error: ${result.message || 'There was an error sending your message.'}</p>`;
      formResponse.className = 'error';
    }
  } catch (error) {
    console.error('Submission Error:', error);
    formResponse.style.display = 'block';
    formResponse.innerHTML = `<p>Network Error: ${error.message}</p>`;
    formResponse.className = 'error';
  }
});

    // Initialize animations on elements
    const animateElements = document.querySelectorAll('.animate');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = 1;
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('load', checkIfInView);
});