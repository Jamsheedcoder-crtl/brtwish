document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('wishForm');
    const formSection = document.getElementById('formSection');
    const wishesSection = document.getElementById('wishesSection');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const message = document.getElementById('message').value;
        
        // Display the entered information
        document.getElementById('displayedName').textContent = name;
        document.getElementById('displayedAge').textContent = age;
        document.getElementById('displayedMessage').textContent = message || `Wishing ${name} a wonderful birthday filled with joy and happiness!`;
        
        // Handle photo upload
        const photoInput = document.getElementById('photo');
        if (photoInput.files && photoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'media-item';
                img.alt = 'Birthday photo';
                document.getElementById('mediaContainer').appendChild(img);
            }
            reader.readAsDataURL(photoInput.files[0]);
        }
        
        // Handle video upload
        const videoInput = document.getElementById('video');
        if (videoInput.files && videoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const video = document.createElement('video');
                video.src = e.target.result;
                video.controls = true;
                video.className = 'media-item';
                video.alt = 'Birthday video';
                document.getElementById('mediaContainer').appendChild(video);
            }
            reader.readAsDataURL(videoInput.files[0]);
        }
        
        // Switch to wishes section
        formSection.style.display = 'none';
        wishesSection.style.display = 'block';
        
        // Trigger cake animation after a delay
        setTimeout(() => {
            animateCake();
        }, 1000);
    });
    
    window.copyLink = function() {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(function() {
            // Show a temporary notification
            const notification = document.createElement('div');
            notification.textContent = 'Link copied to clipboard!';
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.backgroundColor = '#4CAF50';
            notification.style.color = 'white';
            notification.style.padding = '10px 20px';
            notification.style.borderRadius = '5px';
            notification.style.zIndex = '1000';
            document.body.appendChild(notification);
            
            setTimeout(function() {
                document.body.removeChild(notification);
            }, 2000);
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
            alert('Failed to copy link. Please try again.');
        });
    };
    
    window.goBack = function() {
        formSection.style.display = 'block';
        wishesSection.style.display = 'none';
        
        // Clear the form
        document.getElementById('wishForm').reset();
        
        // Clear media container
        document.getElementById('mediaContainer').innerHTML = '';
    };
    
    function animateCake() {
        const candles = document.querySelectorAll('.candle');
        const flames = document.querySelectorAll('.flame');
        
        // Animate each flame disappearing one by one
        flames.forEach((flame, index) => {
            setTimeout(() => {
                // Add animation class to make flame disappear
                flame.style.animation = 'fadeOut 0.5s forwards';
                
                // Create confetti effect when flame goes out
                createConfetti();
            }, index * 500); // Stagger the timing
        });
        
        // After all flames are gone, animate the cake
        setTimeout(() => {
            const cake = document.querySelector('.cake');
            cake.style.animation = 'pulse 0.5s 3';
            
            // Add celebration text
            const celebrationText = document.createElement('div');
            celebrationText.innerHTML = '🎂 Happy Birthday! 🎂';
            celebrationText.style.fontSize = '2rem';
            celebrationText.style.fontWeight = 'bold';
            celebrationText.style.margin = '20px 0';
            celebrationText.style.color = '#9370DB';
            celebrationText.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
            celebrationText.style.animation = 'bounce 1s';
            
            // Insert after the cake
            const cakeContainer = document.querySelector('.cake-container');
            cakeContainer.parentNode.insertBefore(celebrationText, cakeContainer.nextSibling);
            
            // Add cake cutting effect
            addCakeCuttingEffect();
        }, flames.length * 500 + 300);
    }
    
    function addCakeCuttingEffect() {
        const cake = document.querySelector('.cake');
        
        // Create a knife element
        const knife = document.createElement('div');
        knife.style.position = 'absolute';
        knife.style.width = '30px';
        knife.style.height = '5px';
        knife.style.background = '#C0C0C0';
        knife.style.border = '1px solid #A9A9A9';
        knife.style.borderRadius = '2px';
        knife.style.zIndex = '10';
        knife.style.transformOrigin = 'left center';
        
        // Position the knife near the cake
        const cakeRect = cake.getBoundingClientRect();
        const containerRect = cake.parentElement.getBoundingClientRect();
        
        knife.style.left = (cakeRect.left - containerRect.left + cakeRect.width/2) + 'px';
        knife.style.top = (cakeRect.top - containerRect.top + cakeRect.height/2) + 'px';
        
        // Add the knife to the container
        cake.parentElement.appendChild(knife);
        
        // Animate the knife cutting motion
        const knifeAnimation = knife.animate([
            { transform: 'rotate(0deg)', offset: 0 },
            { transform: 'rotate(-30deg)', offset: 0.2 },
            { transform: 'rotate(20deg)', offset: 0.5 },
            { transform: 'rotate(-10deg)', offset: 0.8 },
            { transform: 'rotate(0deg)', offset: 1.0 }
        ], {
            duration: 1500,
            easing: 'ease-out'
        });
        
        // Remove the knife after animation
        knifeAnimation.onfinish = () => {
            knife.remove();
            
            // Create a cake slice effect
            createCakeSliceEffect();
        };
    }
    
    function createCakeSliceEffect() {
        const cake = document.querySelector('.cake');
        
        // Create a slice of cake
        const slice = document.createElement('div');
        slice.classList.add('cake-slice');
        
        // Position the slice next to the cake
        const cakeRect = cake.getBoundingClientRect();
        const containerRect = cake.parentElement.getBoundingClientRect();
        
        slice.style.left = (cakeRect.left - containerRect.left + cakeRect.width) + 'px';
        slice.style.top = (cakeRect.top - containerRect.top) + 'px';
        slice.style.height = cakeRect.height + 'px';
        
        // Add the slice to the container
        cake.parentElement.appendChild(slice);
        
        // Animate the slice appearing
        slice.style.opacity = '0';
        slice.style.transform = 'translateX(-20px) rotate(-5deg)';
        
        // Use requestAnimationFrame for smooth animation
        requestAnimationFrame(() => {
            slice.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            slice.style.opacity = '1';
            slice.style.transform = 'translateX(0) rotate(0)';
        });
    }
    
    function createConfetti() {
        // Create confetti particles
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-particle');
            confetti.style.position = 'absolute';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.background = ['#ff69b4', '#9370db', '#32cd32', '#ffd700', '#ff4500'][Math.floor(Math.random() * 5)];
            confetti.style.borderRadius = '50%';
            confetti.style.left = '50%';
            confetti.style.top = '40%';
            confetti.style.opacity = '0';
            confetti.style.zIndex = '100';
            
            document.body.appendChild(confetti);
            
            // Animate the confetti
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const duration = 1000 + Math.random() * 1000;
            
            const animation = confetti.animate([
                { opacity: 1, transform: 'translate(0, 0)' },
                { opacity: 0, transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)` }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0,0,0.2,1)'
            });
            
            animation.onfinish = () => {
                confetti.remove();
            };
        }
    }
    
    // Add CSS for fadeOut animation dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeOut {
            0% { opacity: 1; transform: scaleY(1); }
            100% { opacity: 0; transform: scaleY(0); }
        }
    `;
    document.head.appendChild(style);
});