

  // حماية الصفحة للـ super-admin و admin
  auth.protectPage(["super-admin","admin"]);

  // التحكم في إظهار الروابط
  const role = auth.parseRole(auth.getToken());
  document.querySelectorAll(".admin-only").forEach(el => {
    el.style.display = (role === "super-admin") ? "block" : "none";
  });
  document.querySelectorAll(".user-only").forEach(el => {
    el.style.display = (["super-admin","admin"].indexOf(role) !== -1)
      ? "block" : "none";
  });

  // ربط زرّ الخروج
  document.querySelectorAll("[onclick='logout()']").forEach(btn => {
    btn.addEventListener("click", auth.logout);
  });
document.addEventListener("DOMContentLoaded", function () {
  const token = sessionStorage.getItem("token");
  const role = window.parseRole(token);

  // إخفاء عناصر الـ sidebar حسب الدور
  document.querySelectorAll(".admin-only").forEach((el) => {
    el.style.display = role === "super-admin" ? "block" : "none";
  });

  document.querySelectorAll(".user-only").forEach((el) => {
    el.style.display = ["admin", "super-admin"].includes(role)
      ? "block"
      : "none";
  });

  // تقييد دخول admin إلى صفحات غير مسموح بها
  const allowedPagesForAdmin = [
    "job.html",
    "view.html",
    "profile.html",
    "chat.html",
  ];

  if (role === "admin") {
    const currentPage = window.location.pathname.split("/").pop().toLowerCase();

    if (!allowedPagesForAdmin.includes(currentPage)) {
      const accessDeniedDiv = document.getElementById("access-denied");
      if (accessDeniedDiv) {
        accessDeniedDiv.style.display = "block";
        accessDeniedDiv.textContent = "🚫 Access Denied Only for super admin";
      } else {
        document.body.insertAdjacentHTML(
          "afterbegin",
          `<div id="access-denied" style="
            background: #ffe0e0;
            color: #d8000c;
            padding: 15px;
            text-align: center;
            font-weight: bold;
          ">🚫 Access Denied Only for super admin</div>`
        );
      }
    }
  }
});
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



    const map = L.map('world-map').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    const fakeApiData = [
        { name: "user1", lat: 30.0444, lon: 31.2357, country: "Egypt" },
        { name: "user2", lat: 40.7128, lon: -74.0060, country: "America" },
        { name: "user3", lat: 48.8566, lon: 2.3522, country:" France" },
        { name: "user4", lat: 51.5074, lon: -0.1278, country: "Britain" },
        { name: "user5", lat: 35.6895, lon: 139.6917, country: "Japan" }
    ];

    let markers = [];

    function loadUserLocations() {
        clearMapMarkers(); // تنظيف أي علامات قديمة
        fakeApiData.forEach(user => {
            const marker = L.marker([user.lat, user.lon]).addTo(map);
            marker.bindPopup(`<b>${user.name}</b><br>country: ${user.country}`);
            markers.push(marker);
        });
    }

    function clearMapMarkers() {
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];
    }


