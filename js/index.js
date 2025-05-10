document.addEventListener("DOMContentLoaded", function () {
    fetchOrders();
});

function fetchOrders() {
    fetch("https://jsonplaceholder.typicode.com/posts")  // رابط API للحصول على البيانات
        .then(response => response.json())
        .then(data => {
            const ordersTable = document.getElementById("orders-data");
            ordersTable.innerHTML = "";

            data.forEach(order => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td data-label="Jobs ID">#${order.id}</td>
                    <td data-label="Customer Name">${order.title}</td>
                    <td data-label="Jobs Date">2025-02-23</td> <!-- تاريخ افتراضي -->
                    <td data-label="Price">$${(Math.random() * 1000).toFixed(2)}</td> <!-- سعر عشوائي -->
                    <td data-label="Jobs Status">
                        <span class="status-pending">Pending</span> <!-- حالة افتراضية -->
                    </td>
                    <td data-label="Payment Method">Credit Card</td> <!-- طريقة دفع افتراضية -->
                `;

                ordersTable.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching orders:", error));
}




// تبديل عرض الإشعارات
document.getElementById('notificationBell').addEventListener('click', function(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// إغلاق الدروبداون عند النقر خارجها
document.addEventListener('click', function(e) {
    if (!e.target.closest('.notification-container')) {
        document.getElementById('notificationDropdown').style.display = 'none';
    }
});

// تحديد كل الإشعارات كمقروءة
document.querySelector('.mark-read').addEventListener('click', function() {
    document.querySelectorAll('.unread').forEach(item => {
        item.classList.remove('unread');
    });
    document.querySelector('.notification-badge').textContent = '0';
});


// document.addEventListener('DOMContentLoaded', function () {
//     const allowedPages = JSON.parse(localStorage.getItem('allowed_pages') || '[]');
//     const currentPage = window.location.pathname.split('/').pop();

//     if (!allowedPages.includes(currentPage)) {
//         document.body.innerHTML = ''; // إزالة المحتوى

//         const dialog = document.createElement('div');
//         dialog.className = 'confirmation-dialog';

//         const title = document.createElement('div');
//         title.className = 'confirmation-title';
//         title.textContent = '🚫 Not logged in';

//         const message = document.createElement('div');
//         message.className = 'confirmation-message';
//         message.textContent = 'You do not have permission to access this page.';

//         const buttons = document.createElement('div');
//         buttons.className = 'confirmation-buttons';

//         const backButton = document.createElement('button');
//         backButton.textContent = 'Back';
//         backButton.style.cssText = "padding: 8px 20px; margin-right: 10px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;";
//         backButton.onclick = () => {
//             window.location.href = 'job.html';
//         };

//         const logoutButton = document.createElement('button');
//         logoutButton.textContent = 'exit';
//         logoutButton.style.cssText = "padding: 8px 20px; background-color: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;";
//         logoutButton.onclick = () => {
//             localStorage.removeItem('access_token');
//             window.location.href = 'login.html';
//         };

//         buttons.appendChild(backButton);
//         buttons.appendChild(logoutButton);

//         dialog.appendChild(title);
//         dialog.appendChild(message);
//         dialog.appendChild(buttons);

//         document.body.style.display = 'flex';
//         document.body.style.justifyContent = 'center';
//         document.body.style.alignItems = 'center';
//         document.body.style.height = '100vh';
//         document.body.style.background = '#f0f0f0';
//         document.body.appendChild(dialog);
//     }
// });
