// TokenFlow Landing Page Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced chat simulation
    setupChatSimulation();
    
    // Button interactions
    setupButtonInteractions();
    
    // Parallax effects for background orbs
    setupParallaxEffects();
    
    // Typing effect for hero title
    setupTypingEffect();
    
    // Smooth scroll and performance optimizations
    setupPerformanceOptimizations();
});

// Enhanced chat simulation with sequential messages and streaming text
function setupChatSimulation() {
    const typingIndicator = document.getElementById('typing-indicator');
    const aiMessage = document.getElementById('ai-message');
    const aiText = document.getElementById('ai-text');
    const typingCursor = document.getElementById('typing-cursor');
    
    const aiResponse = "I'd be happy to help you create a comprehensive guide about machine learning algorithms! Let me break this down into clear sections covering all three main categories...";
    
    // Start the chat sequence after a delay
    setTimeout(() => {
        startChatSequence();
    }, 1500);
    
    function startChatSequence() {
        // Show typing indicator
        typingIndicator.style.display = 'block';
        typingIndicator.style.opacity = '1';
        
        // After thinking delay, hide typing indicator and start AI response
        setTimeout(() => {
            typingIndicator.style.opacity = '0';
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                showAiMessage();
            }, 300);
        }, 1800);
    }
    
    function showAiMessage() {
        // Show AI message container
        aiMessage.style.display = 'block';
        aiMessage.style.opacity = '0';
        
        // Fade in the message container
        setTimeout(() => {
            aiMessage.style.opacity = '1';
            // Start streaming text after container appears
            setTimeout(() => {
                streamText(aiResponse);
            }, 200);
        }, 100);
    }
    
    function streamText(text) {
        let currentIndex = 0;
        const typingSpeed = 45; // milliseconds per character (faster for better effect)
        
        // Show typing cursor
        typingCursor.style.display = 'inline';
        
        function typeCharacter() {
            if (currentIndex < text.length) {
                aiText.textContent = text.slice(0, currentIndex + 1);
                currentIndex++;
                
                // Update token counter as we type (but only after widget appears)
                setTimeout(() => {
                    updateTokenCounterDuringTyping(currentIndex, text.length);
                }, 500);
                
                setTimeout(typeCharacter, typingSpeed);
            } else {
                // Hide typing cursor when done
                setTimeout(() => {
                    typingCursor.style.display = 'none';
                }, 500);
            }
        }
        
        typeCharacter();
    }
    
    function updateTokenCounterDuringTyping(currentIndex, totalLength) {
        const progress = currentIndex / totalLength;
        const targetTokens = 2700;
        const currentTokens = Math.floor(progress * targetTokens);
        
        // Only update if TokenFlow widget is visible
        const extensionUI = document.querySelector('.extension-ui');
        const tokenCountElement = document.getElementById('current-tokens');
        const percentageElement = document.getElementById('token-percentage');
        
        if (extensionUI && tokenCountElement && percentageElement && 
            parseFloat(extensionUI.style.opacity) > 0) {
            
            const formattedValue = currentTokens >= 1000 ? 
                (currentTokens / 1000).toFixed(1) + 'k' : 
                currentTokens.toString();
            
            const percentage = (currentTokens / 128000) * 100;
            
            tokenCountElement.textContent = formattedValue;
            percentageElement.textContent = Math.round(percentage) + '%';
            
            // Update meter fill smoothly
            const meterFill = document.getElementById('meter-fill');
            if (meterFill) {
                meterFill.style.width = Math.round(percentage) + '%';
            }
        }
    }
    
    // Start TokenFlow widget animation when AI response starts
    setTimeout(() => {
        animateTokenFlowWidget();
    }, 3600); // Start when AI response begins streaming
}

// Animate the TokenFlow widget (modified timing)
function animateTokenFlowWidget() {
    const extensionUI = document.querySelector('.extension-ui');
    if (extensionUI) {
        extensionUI.style.opacity = '1';
        extensionUI.style.transform = 'translateX(0) scale(1)';
        extensionUI.style.transition = 'all 1s ease-out';
    }
}

// Legacy token counter function (now handled by streaming text)
function animateTokenCounter() {
    // This function is now handled by the streaming text effect
    // Token counter updates dynamically as text streams
}

// Setup button interactions and click handlers
function setupButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Add click animation
        button.addEventListener('click', function(e) {
            // Create ripple effect
            createRippleEffect(this, e);
            
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Create ripple effect on button click
function createRippleEffect(button, event) {
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s linear;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    // Add ripple animation CSS if not exists
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => ripple.remove(), 600);
}

// Setup parallax effects for background orbs
function setupParallaxEffects() {
    const orbs = document.querySelectorAll('.gradient-orb');
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    
    document.addEventListener('mousemove', throttle((e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
        isMoving = true;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.3;
            const x = mouseX * speed * 50;
            const y = mouseY * speed * 50;
            
            orb.style.transform = `translate(${x}px, ${y}px) scale(${1 + Math.abs(mouseX) * 0.1})`;
        });
        
        // Reset moving flag after a delay
        setTimeout(() => {
            isMoving = false;
        }, 100);
    }, 16)); // ~60fps
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Ensure focus is visible
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Setup typing effect for hero title
function setupTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const titleText = heroTitle.innerHTML;
    let isTypingComplete = false;
    
    // Only run typing effect on larger screens and if user hasn't scrolled
    if (window.innerWidth > 768 && !sessionStorage.getItem('typingShown')) {
        heroTitle.innerHTML = '';
        heroTitle.style.borderRight = '2px solid #667eea';
        
        let currentIndex = 0;
        const typeSpeed = 50;
        
        function typeCharacter() {
            if (currentIndex < titleText.length) {
                heroTitle.innerHTML = titleText.slice(0, currentIndex + 1);
                currentIndex++;
                setTimeout(typeCharacter, typeSpeed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                    isTypingComplete = true;
                }, 500);
                
                // Mark as shown so it doesn't repeat
                sessionStorage.setItem('typingShown', 'true');
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeCharacter, 800);
    } else {
        // Show title immediately if typing effect is skipped
        isTypingComplete = true;
    }
}

// Performance optimizations and utilities
function setupPerformanceOptimizations() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        
        // Disable floating animations
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach(orb => {
            orb.style.animation = 'none';
        });
    }
    
    // Preload critical images/assets
    preloadAssets();
    
    // Setup intersection observer for performance
    setupIntersectionObserver();
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Preload assets for better performance
function preloadAssets() {
    // Preload fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
}

// Setup intersection observer for animations
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.feature-pills .pill, .platform-item').forEach(el => {
        observer.observe(el);
    });
}

// Show notification (for demo purposes)
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #3B82F6, #1D4ED8)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-weight: 500;
        backdrop-filter: blur(10px);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for focus visibility
const focusStyles = document.createElement('style');
focusStyles.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
    }
    
    .animate {
        animation: fadeInUp 0.6s ease-out;
    }
`;
document.head.appendChild(focusStyles);