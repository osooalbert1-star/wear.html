document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Cart state
    let cartCount = 0;
    const cartCountElement = document.getElementById('cart-count');

    // Add click event to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.innerText === 'Add to Cart') {
                const productCard = btn.closest('.product-card');
                const productName = productCard ? productCard.querySelector('h3').innerText : 'Item';

                cartCount++;
                if (cartCountElement) {
                    cartCountElement.innerText = cartCount;
                    cartCountElement.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        cartCountElement.style.transform = 'scale(1)';
                    }, 200);
                }

                showNotification(`${productName} added to cart!`);
            }
        });
    });

    // Notification system
    function showNotification(message) {
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            document.body.appendChild(container);
        }

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerText = message;
        container.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(20px)';
            setTimeout(() => {
                notification.remove();
                if (container.childNodes.length === 0) container.remove();
            }, 400);
        }, 3000);
    }
});
