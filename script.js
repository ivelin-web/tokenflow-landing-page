// TokenFlow Landing Page Interactions

// Configuration constants
const CHAT_CONFIG = {
    aiResponse: "I'd be happy to help you create a comprehensive guide about machine learning algorithms! Let me break this down into clear sections covering all three main categories...",
    targetTokens: 2700,
    typingSpeed: 45,
    timings: {
        initialDelay: 1500,
        thinkingDelay: 1800,
        fadeDelay: 300,
        widgetDelay: 3600
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced chat simulation
    setupChatSimulation();
    
    // Button interactions
    setupButtonInteractions();
    
    // Parallax effects for background orbs
    setupParallaxEffects();
    
    // Typing effect for hero title
    setupTypingEffect();
    
    // Generate stars background
    generateStars();
    
    // Smooth scroll and performance optimizations
    setupPerformanceOptimizations();
    
    // Demo modal functionality
    setupDemoModal();
});

// Enhanced chat simulation with sequential messages and streaming text
function setupChatSimulation() {
    const typingIndicator = document.getElementById('typing-indicator');
    const aiMessage = document.getElementById('ai-message');
    const aiText = document.getElementById('ai-text');
    const typingCursor = document.getElementById('typing-cursor');
    
    const aiResponse = CHAT_CONFIG.aiResponse;
    
    // Start the chat sequence after a delay
    setTimeout(() => {
        startChatSequence();
    }, CHAT_CONFIG.timings.initialDelay);
    
    function startChatSequence() {
        // Show typing indicator with smooth transition
        typingIndicator.style.display = 'block';
        typingIndicator.style.opacity = '0';
        typingIndicator.style.transition = 'opacity 0.3s ease';
        
        // Fade in typing indicator
        setTimeout(() => {
            typingIndicator.style.opacity = '1';
        }, 50);
        
        // After thinking delay, hide typing indicator and start AI response
        setTimeout(() => {
            typingIndicator.style.opacity = '0';
            
            // Wait for fade out, then hide and show AI message
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                showAiMessage();
            }, CHAT_CONFIG.timings.fadeDelay);
        }, CHAT_CONFIG.timings.thinkingDelay);
    }
    
    function showAiMessage() {
        // Show AI message container with smooth transition
        aiMessage.style.display = 'block';
        aiMessage.style.opacity = '0';
        aiMessage.style.transition = 'opacity 0.4s ease';
        
        // Fade in the message container smoothly
        setTimeout(() => {
            aiMessage.style.opacity = '1';
        }, 50);
        
        // Start streaming text after container fade-in is complete
        setTimeout(() => {
            streamText(aiResponse);
        }, 450); // Wait for transition to complete
    }
    
    function streamText(text) {
        let currentIndex = 0;
        const typingSpeed = CHAT_CONFIG.typingSpeed;
        
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
        const targetTokens = CHAT_CONFIG.targetTokens;
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
    }, CHAT_CONFIG.timings.widgetDelay);
}

// Animate the TokenFlow widget (modified timing)
function animateTokenFlowWidget() {
    const extensionUI = document.querySelector('.extension-ui');
    if (extensionUI) {
        // Set initial state and transition
        extensionUI.style.transition = 'all 1s ease-out';
        extensionUI.style.opacity = '0';
        extensionUI.style.transform = 'translateX(20px) scale(0.95)';
        
        // Animate to final state after a brief delay
        setTimeout(() => {
            extensionUI.style.opacity = '1';
            extensionUI.style.transform = 'translateX(0) scale(1)';
        }, 100);
    }
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
    
    document.addEventListener('mousemove', throttle((e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.3;
            const x = mouseX * speed * 50;
            const y = mouseY * speed * 50;
            
            orb.style.transform = `translate(${x}px, ${y}px) scale(${1 + Math.abs(mouseX) * 0.1})`;
        });
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
    
    // Only run typing effect on larger screens and if user hasn't scrolled
    if (window.innerWidth > 768 && !sessionStorage.getItem('typingShown')) {
        // Split text into two parts
        const firstLine = 'Monitor AI Token Usage';
        const secondLine = 'in Real-Time';
        
        // Clear content and start typing immediately
        heroTitle.innerHTML = '';
        heroTitle.style.borderRight = '2px solid #667eea';
        
        let currentIndex = 0;
        const typeSpeed = 50;
        let typingSecondLine = false;
        
        function typeCharacter() {
            if (!typingSecondLine && currentIndex < firstLine.length) {
                // Typing first line
                heroTitle.innerHTML = firstLine.slice(0, currentIndex + 1);
                currentIndex++;
                setTimeout(typeCharacter, typeSpeed);
            } else if (!typingSecondLine && currentIndex === firstLine.length) {
                // Finished first line, start second line
                heroTitle.innerHTML = firstLine + '<br><span class="gradient-text"></span>';
                typingSecondLine = true;
                currentIndex = 0;
                setTimeout(typeCharacter, typeSpeed);
            } else if (typingSecondLine && currentIndex < secondLine.length) {
                // Typing second line
                heroTitle.innerHTML = firstLine + '<br><span class="gradient-text">' + secondLine.slice(0, currentIndex + 1) + '</span>';
                currentIndex++;
                setTimeout(typeCharacter, typeSpeed);
            } else {
                // Finished typing
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 500);
                
                // Mark as shown so it doesn't repeat
                sessionStorage.setItem('typingShown', 'true');
            }
        }
        
        // Start typing immediately
        typeCharacter();
    } else {
        // Show title immediately if typing effect is skipped
        // Ensure proper HTML structure is maintained
        heroTitle.innerHTML = 'Monitor AI Token Usage<br><span class="gradient-text">in Real-Time</span>';
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

// Generate subtle stars background
function generateStars() {
    const starsContainer = document.querySelector('.stars-container');
    const starCount = 18;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Small size back to original
        const size = Math.random() * 2 + 1; // 1px to 3px
        
        // Random animation delay and duration
        const delay = Math.random() * 4;
        const duration = Math.random() * 2 + 2.5; // 2.5-4.5 seconds
        
        star.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;
        
        starsContainer.appendChild(star);
    }
}

// Modal chat simulation (separate from main page)
function setupModalChatSimulation() {
    const typingIndicator = document.getElementById('modal-typing-indicator');
    const aiMessage = document.getElementById('modal-ai-message');
    const aiText = document.getElementById('modal-ai-text');
    const typingCursor = document.getElementById('modal-typing-cursor');
    
    const aiResponse = CHAT_CONFIG.aiResponse;
    
    // Reset modal state
    function resetModalState() {
        if (typingIndicator) {
            typingIndicator.style.display = 'block';
            typingIndicator.style.opacity = '0';
        }
        if (aiMessage) {
            aiMessage.style.display = 'none';
            aiMessage.style.opacity = '0';
        }
        if (aiText) {
            aiText.textContent = '';
        }
        if (typingCursor) {
            typingCursor.style.display = 'none';
        }
        
        // Reset TokenFlow widget completely
        const extensionUI = document.getElementById('modal-extension-ui');
        if (extensionUI) {
            extensionUI.style.opacity = '0';
            extensionUI.style.transform = 'translateX(20px) scale(0.95)';
            extensionUI.style.visibility = 'hidden'; // Ensure it's completely hidden
        }
        
        // Reset token counter immediately and force update
        const tokenCountElement = document.getElementById('modal-current-tokens');
        const percentageElement = document.getElementById('modal-token-percentage');
        const meterFill = document.getElementById('modal-meter-fill');
        
        if (tokenCountElement) {
            tokenCountElement.textContent = '0';
            tokenCountElement.style.opacity = '1'; // Ensure visibility
        }
        if (percentageElement) {
            percentageElement.textContent = '0%';
            percentageElement.style.opacity = '1'; // Ensure visibility
        }
        if (meterFill) {
            meterFill.style.width = '0%';
            meterFill.style.transition = 'none'; // Remove transition for instant reset
            // Restore transition after reset
            setTimeout(() => {
                if (meterFill) meterFill.style.transition = '';
            }, 10);
        }
    }
    
    function startModalChatSequence() {
        if (!typingIndicator) return;
        
        // Show typing indicator with smooth transition after same delay as desktop
        setTimeout(() => {
            typingIndicator.style.transition = 'opacity 0.3s ease';
            
            // Fade in typing indicator
            setTimeout(() => {
                typingIndicator.style.opacity = '1';
            }, 50);
            
            // After thinking delay, hide typing indicator and start AI response
            setTimeout(() => {
                typingIndicator.style.opacity = '0';
                
                // Wait for fade out, then hide and show AI message
                setTimeout(() => {
                    typingIndicator.style.display = 'none';
                    showModalAiMessage();
                }, CHAT_CONFIG.timings.fadeDelay);
            }, CHAT_CONFIG.timings.thinkingDelay);
        }, CHAT_CONFIG.timings.initialDelay);
    }
    
    function showModalAiMessage() {
        if (!aiMessage) return;
        
        // Show AI message container with smooth transition
        aiMessage.style.display = 'block';
        aiMessage.style.transition = 'opacity 0.4s ease';
        
        // Fade in the message container smoothly
        setTimeout(() => {
            aiMessage.style.opacity = '1';
        }, 50);
        
        // Start streaming text after container fade-in is complete
        setTimeout(() => {
            streamModalText(aiResponse);
        }, 450);
    }
    
    function streamModalText(text) {
        let currentIndex = 0;
        const typingSpeed = CHAT_CONFIG.typingSpeed;
        
        // Show typing cursor
        if (typingCursor) {
            typingCursor.style.display = 'inline';
        }
        
        function typeCharacter() {
            if (currentIndex < text.length && aiText) {
                aiText.textContent = text.slice(0, currentIndex + 1);
                currentIndex++;
                
                // Update token counter as we type
                setTimeout(() => {
                    updateModalTokenCounter(currentIndex, text.length);
                }, 500);
                
                setTimeout(typeCharacter, typingSpeed);
            } else {
                // Hide typing cursor when done
                if (typingCursor) {
                    setTimeout(() => {
                        typingCursor.style.display = 'none';
                    }, 500);
                }
            }
        }
        
        typeCharacter();
    }
    
    function updateModalTokenCounter(currentIndex, totalLength) {
        const progress = currentIndex / totalLength;
        const targetTokens = CHAT_CONFIG.targetTokens;
        const currentTokens = Math.floor(progress * targetTokens);
        
        const extensionUI = document.getElementById('modal-extension-ui');
        const tokenCountElement = document.getElementById('modal-current-tokens');
        const percentageElement = document.getElementById('modal-token-percentage');
        const meterFill = document.getElementById('modal-meter-fill');
        
        if (extensionUI && tokenCountElement && percentageElement && 
            parseFloat(extensionUI.style.opacity) > 0) {
            
            const formattedValue = currentTokens >= 1000 ? 
                (currentTokens / 1000).toFixed(1) + 'k' : 
                currentTokens.toString();
            
            const percentage = (currentTokens / 128000) * 100;
            
            tokenCountElement.textContent = formattedValue;
            percentageElement.textContent = Math.round(percentage) + '%';
            
            if (meterFill) {
                meterFill.style.width = Math.round(percentage) + '%';
            }
        }
    }
    
    function animateModalTokenFlowWidget() {
        const extensionUI = document.getElementById('modal-extension-ui');
        if (extensionUI) {
            extensionUI.style.transition = 'all 1s ease-out';
            extensionUI.style.visibility = 'visible'; // Make sure it's visible before animating
            
            setTimeout(() => {
                extensionUI.style.opacity = '1';
                extensionUI.style.transform = 'translateX(0) scale(1)';
            }, 100);
        }
    }
    
    // Public function to start the simulation
    return {
        start: function() {
            startModalChatSequence();
            // Start TokenFlow widget animation with exact desktop timing
            setTimeout(() => {
                animateModalTokenFlowWidget();
            }, CHAT_CONFIG.timings.widgetDelay);
        },
        reset: function() {
            resetModalState();
        }
    };
}

// Demo Modal functionality
function setupDemoModal() {
    const demoBtn = document.getElementById('demo-btn');
    const demoModal = document.getElementById('demo-modal');
    const demoModalClose = document.getElementById('demo-modal-close');
    const demoModalOverlay = document.getElementById('demo-modal-overlay');
    
    if (!demoBtn || !demoModal) return;
    
    // Initialize modal chat simulation
    const modalChatSimulation = setupModalChatSimulation();
    
    // Open modal
    demoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openDemoModal();
    });
    
    // Close modal
    demoModalClose.addEventListener('click', function(e) {
        e.preventDefault();
        closeDemoModal();
    });
    
    // Close modal when clicking overlay
    demoModalOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        closeDemoModal();
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && demoModal.classList.contains('active')) {
            closeDemoModal();
        }
    });
    
    function openDemoModal() {
        demoModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        
        // Add smooth animation
        const modalContent = demoModal.querySelector('.demo-modal-content');
        modalContent.style.transform = 'scale(0.9)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transition = 'all 0.3s ease';
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        }, 50);
        
        // Start modal chat simulation after modal opens (state already reset)
        setTimeout(() => {
            modalChatSimulation.start();
        }, 400);
        
        // Focus on close button for accessibility
        setTimeout(() => {
            demoModalClose.focus();
        }, 300);
    }
    
    function closeDemoModal() {
        // Reset modal state IMMEDIATELY before any animations
        modalChatSimulation.reset();
        
        const modalContent = demoModal.querySelector('.demo-modal-content');
        
        modalContent.style.transition = 'all 0.2s ease';
        modalContent.style.transform = 'scale(0.9)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            demoModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
            
            // Return focus to demo button
            demoBtn.focus();
        }, 200);
    }
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