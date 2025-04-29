// Complete front_page.js with all necessary functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary elements
    const video = document.getElementById('background-video');
    const typewriterText = document.querySelector('.typewriter-text');
    const mainTitle = document.querySelector('.main-title');
    const loadingOverlay = document.querySelector('.loading-overlay');
    const dropdowns = document.querySelectorAll('.dropdown');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const regularLinks = document.querySelectorAll('.nav-links > a:not(.dropdown-toggle)');
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    
    // 1. Video background handling
    if (video) {
        video.addEventListener('canplaythrough', function() {
            video.play();
        });
        
        video.addEventListener('error', function() {
            document.querySelector('.video-background').style.backgroundImage = 'url("background.jpg")';
        });
    }
    
    // 2. Typewriter effect for tagline
    if (typewriterText) {
        const textToType = typewriterText.getAttribute('data-text') || 
                          "Exploring conventional and non-conventional navigation through the APJ building at FLAME University";
        typewriterText.textContent = ''; // Clear initial text
        let i = 0;
        let typingSpeed = 60;
        
        function typeWriter() {
            if (i < textToType.length) {
                typewriterText.textContent += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        // Start typewriter animation after page loads
        setTimeout(typeWriter, 2000);
    }
    
    // 3. Show loading overlay function
    function showLoadingOverlay() {
        if (loadingOverlay) {
            loadingOverlay.classList.remove('hidden');
            // Force browser to recognize the change
            void loadingOverlay.offsetWidth;
        }
    }
    
    // 4. Fix dropdown menu behavior
    dropdownToggles.forEach(toggle => {
        // Add click listener for dropdown toggles
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = this.closest('.dropdown');
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
    });
    
    // 5. Add hover functionality for dropdowns on desktop
    if (window.matchMedia('(min-width: 992px)').matches) {
        dropdowns.forEach(dropdown => {
            let hoverTimeout;
            
            dropdown.addEventListener('mouseenter', function() {
                clearTimeout(hoverTimeout);
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Open this dropdown
                dropdown.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                hoverTimeout = setTimeout(function() {
                    dropdown.classList.remove('active');
                }, 200);
            });
        });
    }
    
    // 6. Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
    
    // 7. Handle regular navigation links (with loading animation)
    regularLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only show loading for HTML page navigation (not anchors)
            if (href && href.includes('.html')) {
                e.preventDefault();
                showLoadingOverlay();
                
                setTimeout(function() {
                    window.location.href = href;
                }, 800);
            }
        });
    });
    
    // 8. Handle dropdown menu links
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent navigation for anchor links
            if (href && href.includes('.html')) {
                e.preventDefault();
                showLoadingOverlay();
                
                setTimeout(function() {
                    window.location.href = href;
                }, 800);
            }
        });
    });
    
    // 9. Make the title visible and styled correctly
    if (mainTitle) {
        setTimeout(function() {
            mainTitle.style.opacity = '1';
            mainTitle.style.visibility = 'visible';
            mainTitle.style.display = 'block';
            mainTitle.style.color = '#F1C40F'; // Yellow color
            mainTitle.style.textShadow = '3px 3px 0 rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.7)';
        }, 500);
    }
    
    // 10. Hide loading overlay after page loads
    setTimeout(function() {
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }, 1000);
});

// 11. Failsafe to ensure loading overlay always disappears
setTimeout(function() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay && !loadingOverlay.classList.contains('hidden')) {
        console.log('Failsafe: Hiding loading overlay after timeout');
        loadingOverlay.classList.add('hidden');
    }
}, 5000);