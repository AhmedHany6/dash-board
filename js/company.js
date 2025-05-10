// Sidebar highlighting
let list = document.querySelectorAll(".sidebar li");
function activeLink() {
  list.forEach((item) => item.classList.remove("hovered"));
  this.classList.add("hovered");
}
list.forEach((item) => item.addEventListener("mouseover", activeLink));

// API Constants
const API_BASE = 'https://jobizaa.com/api/admin/companies';
const TOKEN = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2pvYml6YWEuY29tL2FwaS9hZG1pbi9sb2dpbiIsImlhdCI6MTc0Njg4NDg4NSwibmJmIjoxNzQ2ODg0ODg1LCJqdGkiOiJKNFRQNDc0VDBYZmVkbHZSIiwic3ViIjoiMSIsInBydiI6ImRmODgzZGI5N2JkMDVlZjhmZjg1MDgyZDY4NmM0NWU4MzJlNTkzYTkiLCJyb2xlcyI6WyJzdXBlci1hZG1pbiJdLCJwZXJtaXNzaW9ucyI6WyJtYW5hZ2UtYWxsLWNvbXBhbmllcyIsIm1hbmFnZS1hbGwtam9icyIsIm1hbmFnZS1yb2xlcyIsIm1hbmFnZS1jb21wYW55LWFkbWlucyIsIm1hbmFnZS1hcHBsaWNhdGlvbnMiLCJ2aWV3LWFwcGxpY2FudC1wcm9maWxlcyIsInNlbmQtbWVzc2FnZXMiXSwiY29tcGFueV9pZCI6bnVsbH0.1okzsacodT2LkZoDo6e7N8nkNekwXxvFAuT1mjH0OE0"; 

let companies = [];

// Fetch companies from API
async function fetchCompanies() {
  try {
    const response = await fetch(API_BASE, {
      headers: {
        'Authorization': TOKEN,
        'Accept': 'application/json'
      }
    });

    if (!response.ok)
      throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    console.log("Nested Data:", data.data);
    console.log("Full API Response:", data);

    const companiesArray = data.data.items || [];
    if (!Array.isArray(companiesArray)) {
      console.error("Expected array but got:", data.data);
      return;
    }

    companies = companiesArray.map(company => ({
      id: company.id || 0,
      name: company.name || "N/A",
      email: company.email || "N/A",
      jobs: company.jobs_count || 0,
      status: Math.random() > 0.5 ? 'Active' : 'Inactive'
    }));

console.log(companies);

    displayCompanies(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
  }
}

// Add a company
async function addCompany(formData) {
  try {
    const response = await fetch(`${API_BASE}`/add-company, {
      method: 'POST',
      headers: {
        'Authorization': TOKEN,
        'Accept': 'application/json'
      },
      body: formData
    });

    if (!response.ok)
      throw new Error('Failed to add company');

    await fetchCompanies();
  } catch (error) {
    console.error("Error adding company:", error);
  }
}

// Update company
async function updateCompany(id, formData) {
  formData.append("_method", "PUT");

  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': TOKEN,
        'Accept': 'application/json'
      },
      body: formData
    });

    if (!response.ok)
      throw new Error('Failed to update company');

    await fetchCompanies();
  } catch (error) {
    console.error("Error updating company:", error);
  }
}

// Delete company
async function deleteCompany(id) {
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
  });

  if (confirm.isConfirmed) {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': TOKEN,
          'Accept': 'application/json'
        }
      });

      if (!response.ok)
        throw new Error(`Failed to delete company with id ${id}`);

      companies = companies.filter(c => c.id !== id);
      displayCompanies();

      Swal.fire("Deleted!", "Company has been deleted successfully.", "success");
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  }
}

// Change company status (local only)
function changeStatus(id, newStatus) {
  companies = companies.map(company =>
    company.id === id ? { ...company, status: newStatus } : company
  );
  displayCompanies();
}

// Display companies
function displayCompanies(companiesList = companies) {
  let tableBody = document.getElementById("companyTableBody");
  let companyListContainer = document.getElementById("companyList");

  tableBody.innerHTML = "";
  companyListContainer.innerHTML = "";

  if (companiesList.length === 0) {
    tableBody.innerHTML =` <tr><td colspan="5">No companies found</td></tr>`;
    return;
  }

  companiesList.forEach(company => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${company.name}</td>
      <td>${company.email}</td>
      <td>${company.jobs}</td>
      <td>${company.status}</td>
      <td>
        <button class="delete-btn" onclick="deleteCompany(${company.id})">Delete</button>
        <button class="suspend-btn" onclick="changeStatus(${company.id}, 'Inactive')">Suspend</button>
        <button class="activate-btn" onclick="changeStatus(${company.id}, 'Active')">Activate</button>
      </td>
    `;
    tableBody.appendChild(row);

    let item = document.createElement('div');
    item.classList.add('company-item');
    item.innerHTML = `
      <label>Company Name:</label><p>${company.name}</p>
      <label>Email:</label><p>${company.email}</p>
      <label>Job Count:</label><p>${company.jobs}</p>
      <label>Status:</label><p>${company.status}</p>
      <div class="actions">
        <button class="delete-btn" onclick="deleteCompany(${company.id})">Delete</button>
        <button class="suspend-btn" onclick="changeStatus(${company.id}, 'Inactive')">Suspend</button>
        <button class="activate-btn" onclick="changeStatus(${company.id}, 'Active')">Activate</button>
      </div>
    `;
    companyListContainer.appendChild(item);
  });

  updateDisplayMode();
}

// Filter companies
function filterCompanies() {
  let status = document.getElementById("statusFilter").value;
  let jobCount = document.getElementById("jobsFilter").value;

  let filtered = companies.filter(company =>
    (status === "" || company.status === status) &&
    (jobCount === "" || company.jobs >= jobCount)
  );

  displayCompanies(filtered);
}

function updateDisplayMode() {
  let table = document.querySelector("table");
  let companyListContainer = document.getElementById("companyList");

  if (window.innerWidth <= 768) {
    table.style.display = "none";
    companyListContainer.style.display = "block";
  } else {
    table.style.display = "table";
    companyListContainer.style.display = "none";
  }
}

window.addEventListener("resize", updateDisplayMode);
window.onload = () => fetchCompanies();
