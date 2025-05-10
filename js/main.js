


// start logic in header

function toggleDropdown() {

    document.querySelector(".user-profile").classList.toggle("active");

}

// ✅ إغلاق القائمة عند الضغط خارجها
document.addEventListener("click", function (event) {
    let profile = document.querySelector(".user-profile");
    if (!profile.contains(event.target)) {
        profile.classList.remove("active");
    }
});


// Ens logic in header

// ##########################################################


// start logic sidebar

let toggle = document.querySelector(".toggle-btn");

let sidebar = document.querySelector(".sidebar");


let topBar = document.querySelector(".top-bar");
let mainPanel = document.querySelector(".main-panel");


toggle.addEventListener("click", function () {

    sidebar.classList.toggle('open');
    topBar.classList.toggle('open');

    mainPanel.classList.toggle('open');

});



// document.addEventListener('DOMContentLoaded', function () {
//     const listItems = document.querySelectorAll(".sidebar li");

//     // If there is no element saved in localStorage, index.html is automatically activated.

//     // 'dashboard' is the data-id of the index.html page.

//     const activeItemId = localStorage.getItem('activeSidebarItem') || 'dashboard';

//     // Activate the appropriate element
//     listItems.forEach(item => {
//         item.classList.remove('active-link');
//         if (item.getAttribute('data-id') === activeItemId) {
//             item.classList.add('active-link');
//         }
//     });

//     listItems.forEach(item => {
//         item.addEventListener('click', function () {
//             listItems.forEach(li => li.classList.remove('active-link'));
//             this.classList.add('active-link');

//             // Save the active item to localStorage

//             const itemId = this.getAttribute('data-id');
//             localStorage.setItem('activeSidebarItem', itemId);
//         });
//     });
// });


document.addEventListener('DOMContentLoaded', function () {
    const listItems = document.querySelectorAll(".sidebar li");
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    listItems.forEach(item => {
        const link = item.querySelector('a').getAttribute('href');
        item.classList.toggle('active-link', link === currentPage);

        item.addEventListener('click', function () {
            listItems.forEach(li => li.classList.remove('active-link'));
            this.classList.add('active-link');
        });
    });
});

// end logic sidebar

// ##########################################################
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



document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");
    if (username) {
        document.querySelector(".user-profile span").textContent = "Hi, " + username;
        document.querySelector(".user-info h3").textContent = username;
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const imgElement = document.querySelector(".user-profile img");
    const profileImage = localStorage.getItem("profileImage");

    if (imgElement) {
        if (profileImage) {
            imgElement.src = profileImage;
        } else {
            imgElement.src = "./images/pngtree-vector-users-icon-png-image_856952.jpg"; // صورة افتراضية عند الحذف
        }
    }
});

