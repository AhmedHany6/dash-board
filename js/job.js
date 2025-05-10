// General Settings
const API_URL = "https://jobizaa.com/api/admin/jobs";
const AUTH_TOKEN = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2pvYml6YWEuY29tL2FwaS9hZG1pbi9sb2dpbiIsImlhdCI6MTc0Njg4NDg4NSwibmJmIjoxNzQ2ODg0ODg1LCJqdGkiOiJKNFRQNDc0VDBYZmVkbHZSIiwic3ViIjoiMSIsInBydiI6ImRmODgzZGI5N2JkMDVlZjhmZjg1MDgyZDY4NmM0NWU4MzJlNTkzYTkiLCJyb2xlcyI6WyJzdXBlci1hZG1pbiJdLCJwZXJtaXNzaW9ucyI6WyJtYW5hZ2UtYWxsLWNvbXBhbmllcyIsIm1hbmFnZS1hbGwtam9icyIsIm1hbmFnZS1yb2xlcyIsIm1hbmFnZS1jb21wYW55LWFkbWlucyIsIm1hbmFnZS1hcHBsaWNhdGlvbnMiLCJ2aWV3LWFwcGxpY2FudC1wcm9maWxlcyIsInNlbmQtbWVzc2FnZXMiXSwiY29tcGFueV9pZCI6bnVsbH0.1okzsacodT2LkZoDo6e7N8nkNekwXxvFAuT1mjH0OE0";
let jobs = [];
let currentPage = 1;
const itemsPerPage = 5;

// Load jobs on page load
document.addEventListener("DOMContentLoaded", fetchJobs);

// ✅ الإشعارات
document.getElementById('notificationBell').addEventListener('click', function(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});
document.addEventListener('click', function(e) {
    if (!e.target.closest('.notification-container')) {
        document.getElementById('notificationDropdown').style.display = 'none';
    }
});
document.querySelector('.mark-read').addEventListener('click', function() {
    document.querySelectorAll('.unread').forEach(item => {
        item.classList.remove('unread');
    });
    document.querySelector('.notification-badge').textContent = '0';
});
// Fetch jobs from API
async function fetchJobs() {
    document.getElementById("loading").style.display = "block";
    try {
      const response = await fetch(`${API_URL}?page=${currentPage}&limit=${itemsPerPage}`, {
        method: "GET",
        headers: {
          "Authorization": AUTH_TOKEN,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

    // if (!response.ok) {
    //     Swal.fire({
    //       title: "Error!",
    //       text: `${data.message || "Access denied."} (${response.status})`,
    //       icon: "error"
    //     });
    //     return;
    //   }
    //   if (!data.jobs || data.jobs.length === 0) {
    //     Swal.fire({
    //       icon: "info",
    //       title: "No Jobs Available",
    //       text: "The job list is currently empty.",
    //     });
    //     return;
    //   }
    
  const respons = await response.json();
console.log("Response:", respons);

// جرب احتمالات متعددة حسب شكل الريسبونس
const jobList =
  respons?.data?.jobs?.data ||
  respons?.data?.jobs ||
  respons?.jobs?.data ||
  respons?.jobs ||
  respons?.data ||
  [];

let alljobs = [];

if (Array.isArray(jobList) && jobList.length > 0) {
  alljobs = jobList.map(job => ({
    id: job.id,
    title: job.title,
    company: job.company?.name || "No company",
    applicants: Math.floor(Math.random() * 50),
    status: job.job_status || "Pending"
  }));
} else {
  console.warn("No jobs available");
}

displayJobs(alljobs);

    
  
    // يمكنك استخدام alljobs هنا مثلاً:
    displayJobs(alljobs); // أو أي دالة تعرض البيانات

  } catch (error) {
    console.error("Error fetching jobs:", error);
  } finally {
    document.getElementById("loading").style.display = "none";
  }
}
// View job details
function viewJob(jobId) {
  fetch(`${API_URL}/${jobId}`, {
    method: "GET",
    headers: {
      "Authorization": AUTH_TOKEN,
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(job => {
      Swal.fire({
        title: job.title,
        html: `
          <p><strong>Company:</strong> ${job.description || "No company"}</p>
          <p><strong>Location:</strong> ${job.location}</p>
          <p><strong>Salary:</strong> ${job.salary}</p>
          <p><strong>Status:</strong> ${job.job_status}</p>
        `,
        icon: "info"
      });
    })
    .catch(err => console.error("Error fetching job details:", err));
    window.location.href = "view.html";
}

// Display jobs in the table
function displayJobs(filteredJobs) {
  const jobTable = document.getElementById("jobTable");
  jobTable.innerHTML = "";
  let start = (currentPage - 1) * itemsPerPage;
  let paginatedJobs = filteredJobs.slice(start, start + itemsPerPage);
  paginatedJobs.forEach(job => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${job.id}</td>
      <td>${job.title}</td>
      <td>${job.company}</td>
      <td>${job.applicants}</td>
      <td><span class="status ${job.status.toLowerCase()}">${job.status}</span></td>
      <td>
        <button class="view-btn" onclick="viewJob(${job.id})">
          <i class="fa-solid fa-eye"></i> View
        </button>
        <button class="edit-btn" onclick="openEditJobModal(${job.id})">
          <i class="fa-solid fa-pen-to-square"></i> Edit
        </button>
        <button class="delete-btn" onclick="deleteJob(${job.id})">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      </td>
    `;
    jobTable.appendChild(row);
  });
}

// Generate pagination buttons
function generatePagination(totalItems) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  let totalPages = Math.ceil(totalItems / itemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    let button = document.createElement("button");
    button.innerHTML = `<i class="fa-solid fa-circle"></i> ${i}`;
    button.onclick = () => {
      currentPage = i;
      fetchJobs();
    };
    pagination.appendChild(button);
  }
}

// Apply search and filter
function applyFilters() {
  let searchValue = document.getElementById("searchInput").value.toLowerCase();
  let statusFilter = document.getElementById("statusFilter").value;
  let filteredJobs = jobs.filter(job =>
    (job.title.toLowerCase().includes(searchValue) || job.company.toLowerCase().includes(searchValue)) &&
    (statusFilter === "" || job.status.toLowerCase() === statusFilter.toLowerCase())
  );
  displayJobs(filteredJobs);
}

// Delete a job
async function deleteJob(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": AUTH_TOKEN,
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        });
        const resultData = await response.json();
        console.log("Job deleted:", resultData);
        fetchJobs();
        Swal.fire({
          title: "Deleted!",
          text: "Job has been deleted successfully.",
          icon: "success"
        });
      } catch (err) {
        console.error("Error deleting job:", err);
      }
    }
  });
}

// Open add job modal
function openAddJobModal() {
  document.getElementById("modalJobId").value = "";
  document.getElementById("modalTitle").value = "";
  document.getElementById("modalCompany").value = "";
  document.getElementById("modalApplicants").value = "";
  document.getElementById("modalStatus").value = "Pending";
  document.getElementById("modalTitleText").innerText = "Add Job";
  document.getElementById("jobModal").style.display = "flex";
}

// Open edit job modal
function openEditJobModal(id) {
  let job = jobs.find(j => j.id === id);
  if (!job) return;
  document.getElementById("modalJobId").value = job.id;
  document.getElementById("modalTitle").value = job.title;
  document.getElementById("modalCompany").value = job.company;
  document.getElementById("modalApplicants").value = job.applicants;
  document.getElementById("modalStatus").value = job.status;
  document.getElementById("modalTitleText").innerText = "Edit Job";
  document.getElementById("jobModal").style.display = "flex";
}

// Save or update job
async function saveChanges() {
  let id = document.getElementById("modalJobId").value;
  let title = document.getElementById("modalTitle").value;
  let company = document.getElementById("modalCompany").value;
  let applicants = document.getElementById("modalApplicants").value;
  let status = document.getElementById("modalStatus").value;

  const formData = new URLSearchParams();
  formData.append("title", title);
  formData.append("description", company);
  formData.append("job_status", "Open"); // لازم تكون قيمة مقبولة
  formData.append("category_name", "Engineering"); // لازم اسم كاتيجوري فعلي
  formData.append("location", "Cairo");
  formData.append("salary", "4000");
  formData.append("requirement", "2 years experience");
  formData.append("benefits", "None");
  formData.append("job_type", "Full-time");
  formData.append("position", "Software Engineer");

  const options = {
    method:  "POST",
    headers: {
      "Authorization": AUTH_TOKEN,
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formData
  };

  const url = id ? `${API_URL}/${id}` : `${API_URL}/add-job`;

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log("Saved job:", result);
    closeModal();
    fetchJobs();
  } catch (error) {
    console.error("Error saving job:", error);
  }
}

// Close the modal
function closeModal() {
  document.getElementById("jobModal").style.display = "none";
}
