const API_URL = "https://jobizaa.com/api/admin/applications";
const AUTH_TOKEN =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2pvYml6YWEuY29tL2FwaS9hZG1pbi9sb2dpbiIsImlhdCI6MTc0NzM1NDM3MiwibmJmIjoxNzQ3MzU0MzcyLCJqdGkiOiJ3czF0Y2l0TWpHVTFTUUJ1Iiwic3ViIjoiMyIsInBydiI6ImRmODgzZGI5N2JkMDVlZjhmZjg1MDgyZDY4NmM0NWU4MzJlNTkzYTkiLCJyb2xlcyI6WyJhZG1pbiJdLCJwZXJtaXNzaW9ucyI6WyJtYW5hZ2Utb3duLWNvbXBhbnkiLCJtYW5hZ2UtY29tcGFueS1qb2JzIiwibWFuYWdlLWNvbXBhbnktYWRtaW5zIiwibWFuYWdlLWFwcGxpY2F0aW9ucyIsInZpZXctYXBwbGljYW50LXByb2ZpbGVzIiwic2VuZC1tZXNzYWdlcyJdLCJjb21wYW55X2lkIjozfQ.JBCFpEIcnclld6WtyjCCS-ETYv9P_r5lilN933QolHI";
let usersData = [];

document.addEventListener("DOMContentLoaded", async function () {
  await updateDashboard();
  loadUserProfile();
  setupNotifications();
});

async function updateDashboard() {
  showLoader();
  await fetchUsers();
  hideLoader();
}

async function fetchUsers() {
  if (!AUTH_TOKEN) return console.error("No auth token found.");

  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: ` Bearer ${AUTH_TOKEN.trim()}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result = await response.json();
    console.log("API Response:", result);

    usersData = result.data.applications || [];
    populateTable(usersData);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

function populateTable(users) {
  const tableBody = document.getElementById("user-table-body");
  const cardsContainer = document.getElementById("cards-container");

  tableBody.innerHTML = "";
  cardsContainer.innerHTML = "";

  if (!Array.isArray(users)) return;

  users.forEach((user) => {
    const name = user.user?.name || "N/A";
    const email = user.user?.email || "N/A";

    // Table Row
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.id}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>
            <button class="accept btn btn-success" onclick="acceptUser(${user.id})">Accept</button>
            <button class="details btn btn-info" onclick="viewDetails(${user.id})">Details</button>
            <button class="delete btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
    tableBody.appendChild(row);

    // Card View
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <h3>ID: ${user.id}</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <div class="card-buttons">
                <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
                <button class="accept" onclick="acceptUser(${user.id})">Accept</button>
                <button class="details" onclick="viewDetails(${user.id})">Details</button>
            </div>
        `;
    cardsContainer.appendChild(card);
  });
}

async function deleteUser(userId) {
  const result = await Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });

      if (response.ok) {
        Swal.fire("Deleted!", "User deleted successfully!", "success");
        await updateDashboard();
      } else {
        Swal.fire("Error!", "Error deleting user.", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  }
}

async function acceptUser(userId) {
  if (!userId || userId === "undefined") {
    console.error("Invalid userId:", userId);
    Swal.fire("Error!", "User ID is missing or invalid", "error");
    return;
  }

  const result = await Swal.fire({
    icon: "question",
    title: "Are you sure?",
    text: "Do you want to accept this user?",
    showCancelButton: true,
    confirmButtonColor: "#28a745",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, accept!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    try {
      const response = await fetch(`${API_URL}/${userId}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "accepted",
          feedback: "Accepted by admin",
        }),
      });

      if (response.ok) {
        Swal.fire(
          "Accepted!",
          ` admin has accepted the user with ID: ${userId}`,
          "success"
        );
        await updateDashboard();
      } else {
        Swal.fire("Error!", "Failed to accept the user.", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  }
}

async function viewDetails(userId) {
  const user = usersData.find((u) => u.id === userId);
  if (!user) return;

  const html = `
    <p><strong>ID:</strong> ${user.id}</p>
    <p><strong>Name:</strong> ${user.user?.name || "N/A"}</p>
    <p><strong>Email:</strong> ${user.user?.email || "N/A"}</p>
    <label><strong>Status:</strong></label>
    <select id="statusSelect" class="swal2-select">
      <option value="reviewed" ${
        user.status === "reviewed" ? "selected" : ""
      }>Submitted</option>
<option value="accepted" ${
    user.status === "accepted" ? "selected" : ""
  }>reviewed</option>
<option value="rejected" ${
    user.status === "rejected" ? "selected" : ""
  }>accepted</option>
<option value="submitted" ${
    user.status === "submitted" ? "selected" : ""
  }>rejected</option>
<option value="team-matching" ${
    user.status === "team-matching" ? "selected" : ""
  }>Team Matching</option>
<option value="final-hr-interview" ${
    user.status === "final-hr-interview" ? "selected" : ""
  }>Final HR Interview</option>
<option value="technical-interview" ${
    user.status === "technical-interview" ? "selected" : ""
  }>Technical Interview</option>
<option value="screening-interview" ${
    user.status === "screening-interview" ? "selected" : ""
  }>Screening Interview</option>
    </select>
`;

  const result = await Swal.fire({
    title: ` Details for ${user.user?.name || "User"}`,
    html: html,
    confirmButtonText: "Save",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    preConfirm: () => {
      const newStatus = document.getElementById("statusSelect").value;
      return { status: newStatus };
    },
    width: 600,
  });

  if (result.isConfirmed) {
    try {
      const response = await fetch(`${API_URL}/${user.id}/status`, {
        method: "PUT",
        headers: {
          Authorization: ` Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          status: result.value.status,
          feedback: "Updated from details modal",
        }),
      });

      if (response.ok) {
        Swal.fire("Saved!", "Status updated successfully.", "success");
        await updateDashboard();
      } else {
        Swal.fire("Error!", "Failed to update status.", "error");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  }
}

function searchUsers() {
  const searchValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filtered = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchValue)
  );
  populateTable(filtered);
}

function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

function loadUserProfile() {
  const username = localStorage.getItem("username");
  const profileImage = localStorage.getItem("profileImage");

  if (username) {
    document.querySelector(".user-profile span").textContent =
      "Hi, " + username;
    document.querySelector(".user-info h3").textContent = username;
  }

  const img = document.querySelector(".user-profile img");
  if (img) {
    img.src =
      profileImage || "./images/pngtree-vector-users-icon-png-image_856952.jpg";
  }
}

function setupNotifications() {
  const bellIcon = document.getElementById("notificationBell");
  const dropdown = document.getElementById("notificationDropdown");
  const viewAllLink = document.querySelector(".view-all");

  if (bellIcon) {
    bellIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });
  }

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".notification-container")) {
      dropdown.style.display = "none";
    }
  });

  document.querySelector(".mark-read")?.addEventListener("click", function () {
    document
      .querySelectorAll(".unread")
      .forEach((item) => item.classList.remove("unread"));
    const badge = document.querySelector(".notification-badge");
    if (badge) badge.textContent = "0";
  });

  viewAllLink?.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = this.getAttribute("href");
  });
}
