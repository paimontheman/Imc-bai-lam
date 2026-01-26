document.addEventListener('DOMContentLoaded', () => {
   
    const hamburger = document.getElementById('hamburger');
    const fullMenu = document.getElementById('fullMenu');
    const menuLinks = document.querySelectorAll('.menu-items a');

   
    if (hamburger && fullMenu) {
        hamburger.addEventListener('click', () => {
           
            hamburger.classList.toggle('active');
            fullMenu.classList.toggle('open');

           
            if (fullMenu.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

 
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            fullMenu.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    });

   
    const bookingForm = document.querySelector('#bookingForm');
    if (bookingForm) {
        bookingForm.onsubmit = (e) => {
            e.preventDefault();
            
            const btn = e.target.querySelector('button');
            const originalText = btn.innerHTML;
            
           
            btn.innerHTML = '<span>⏳</span> Đang xử lý...';
            btn.disabled = true;

            setTimeout(() => {
                const data = {
                    user: document.querySelector('#name').value,
                    time: document.querySelector('#time').value
                };
                
               
                localStorage.setItem('lastBooking', JSON.stringify(data));
                
               
                showToast("Đặt bàn thành công! Hẹn gặp lại bạn.");
                
                
                btn.innerHTML = originalText;
                btn.disabled = false;
                bookingForm.reset();
            }, 1500);
        };
    }
});


function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #d4a373;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 10000;
    `;
    toast.innerText = msg;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

document.querySelectorAll('.btn-buy').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.product-card');
        const item = {
            name: card.querySelector('h3').innerText,
            price: card.querySelector('.price').innerText,
            time: new Date().toLocaleString()
        };

        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));

       
        showToast(`Đã thêm ${item.name} vào đơn hàng!`);
    });
});