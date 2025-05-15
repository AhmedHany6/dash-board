// General Settings
const API_URL = "https://jobizaa.com/api/admin";

const ACTIVE_TOKEN =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2pvYml6YWEuY29tL2FwaS9hZG1pbi9sb2dpbiIsImlhdCI6MTc0NzE1MDQzMSwibmJmIjoxNzQ3MTUwNDMxLCJqdGkiOiI0OVJpWkZhWmxVU0s4cm4xIiwic3ViIjoiMSIsInBydiI6ImRmODgzZGI5N2JkMDVlZjhmZjg1MDgyZDY4NmM0NWU4MzJlNTkzYTkiLCJyb2xlcyI6WyJzdXBlci1hZG1pbiJdLCJwZXJtaXNzaW9ucyI6WyJtYW5hZ2UtYWxsLWNvbXBhbmllcyIsIm1hbmFnZS1hbGwtam9icyIsIm1hbmFnZS1yb2xlcyIsIm1hbmFnZS1jb21wYW55LWFkbWlucyIsIm1hbmFnZS1hcHBsaWNhdGlvbnMiLCJ2aWV3LWFwcGxpY2FudC1wcm9maWxlcyIsInNlbmQtbWVzc2FnZXMiXSwiY29tcGFueV9pZCI6bnVsbH0.A7ZHAITLLRLnHYdlz0HSGDlkKgnMDz5hP8clyswzJT0";

document.addEventListener("DOMContentLoaded", function () {
  fetchOrders();
});

function fetchOrders() {
  fetch("https://jsonplaceholder.typicode.com/posts") // رابط API للحصول على البيانات
    .then((response) => response.json())
    .then((data) => {
      const ordersTable = document.getElementById("orders-data");
      ordersTable.innerHTML = "";

      data.forEach((order) => {
        const row = document.createElement("tr");

        row.innerHTML = `
                    <td data-label="Jobs ID">#${order.id}</td>
                    <td data-label="Customer Name">${order.title}</td>
                    <td data-label="Jobs Date">2025-02-23</td> <!-- تاريخ افتراضي -->
                    <td data-label="Price">$${(Math.random() * 1000).toFixed(
                      2
                    )}</td> <!-- سعر عشوائي -->
                    <td data-label="Jobs Status">
                        <span class="status-pending">Pending</span> <!-- حالة افتراضية -->
                    </td>
                    <td data-label="Payment Method">Credit Card</td> <!-- طريقة دفع افتراضية -->
                `;

        ordersTable.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching orders:", error));
}

// @author  A.A
// @desc    Get Users & Companies & Jobs Count
// @route   GET /api/admin/(users|companies|jobs)
document.addEventListener("DOMContentLoaded", fetchData);
async function fetchData() {
  // Get Users Count
  try {
    const usersRresponse = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: ACTIVE_TOKEN,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const companiesRresponse = await fetch(`${API_URL}/companies`, {
      method: "GET",
      headers: {
        Authorization: ACTIVE_TOKEN,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const jobsRresponse = await fetch(`${API_URL}/jobs`, {
      method: "GET",
      headers: {
        Authorization: ACTIVE_TOKEN,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const users = await usersRresponse.json();
    const companies = await companiesRresponse.json();
    const jobs = await jobsRresponse.json();

    const usersCount = document.getElementById("userCount");
    const activeUser = document.getElementById("activeUser");
    const companyCount = document.getElementById("companyCount");
    const jobCount = document.getElementById("jobCount");
    usersCount.textContent = users.data.users.length;
    activeUser.textContent = users.data.users.length;
    companyCount.textContent = companies.data.length;
    jobCount.textContent = jobs.data.jobs.length;

    return users;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to fetch users data.",
      confirmButtonText: "OK",
    });
    return null;
  }
}

// تبديل عرض الإشعارات
document
  .getElementById("notificationBell")
  .addEventListener("click", function (e) {
    e.stopPropagation();
    const dropdown = document.getElementById("notificationDropdown");
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });

// إغلاق الدروبداون عند النقر خارجها
document.addEventListener("click", function (e) {
  if (!e.target.closest(".notification-container")) {
    document.getElementById("notificationDropdown").style.display = "none";
  }
});

// تحديد كل الإشعارات كمقروءة
document.querySelector(".mark-read").addEventListener("click", function () {
  document.querySelectorAll(".unread").forEach((item) => {
    item.classList.remove("unread");
  });
  document.querySelector(".notification-badge").textContent = "0";
});
