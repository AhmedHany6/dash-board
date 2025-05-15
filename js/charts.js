const ctx1 = document.getElementById("chart-1").getContext("2d");
const myChart = new Chart(ctx1, {
  type: "pie",
  data: {
    labels: ["Registered", "Pending"],
    datasets: [
      {
        // label: 'registeredUsers',

        data: [600, 800],
        backgroundColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
      },
    ],
  },
  options: {
    responsive: true,
  },
});

const ctx2 = document.getElementById("chart-2").getContext("2d");
const myChart2 = new Chart(ctx2, {
  type: "bar",
  data: {
    labels: ["Engineer", "Designer", "Manager", "HR"],
    datasets: [
      {
        label: "Applications",
        data: [30, 20, 25, 15],
        backgroundColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
      },
    ],
  },
  options: {
    responsive: true,
  },
});

const ctx3 = document.getElementById("chart-3").getContext("2d");
const myChart3 = new Chart(ctx3, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Applications",
        data: [10, 20, 15, 25, 30],
        borderColor: "red",
        borderWidth: 1,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
  },
});

const ctx4 = document.getElementById("chart-4").getContext("2d");
const myChart4 = new Chart(ctx4, {
  type: "doughnut",
  data: {
    labels: ["Active Jobs", "Inactive Jobs", "New Jobs"],
    datasets: [
      {
        label: "Quick Stats",
        data: [50, 30, 20],
        backgroundColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
      },
    ],
  },
  options: {
    responsive: true,
  },
});

// ✅ إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyEXAMPLE-API-KEY",
  authDomain: "visitor-tracker.firebaseapp.com",
  databaseURL: "https://visitor-tracker-default-rtdb.firebaseio.com",
  projectId: "visitor-tracker",
  storageBucket: "visitor-tracker.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefg123456",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ✅ تسجيل دخول أي زائر جديد
function trackVisitor() {
  const userId = `visitor_${Date.now()}`;
  db.ref("visitors/" + userId).set({
    timestamp: new Date().toISOString(),
  });
}

trackVisitor(); // تسجيل الزائر عند تحميل الصفحة

// ✅ إنشاء رسم بياني باستخدام Chart.js
var ctx = document.getElementById("visitorChart").getContext("2d");
var visitorChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "عدد الزوار",
        data: [],
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: { display: true },
      y: { beginAtZero: true },
    },
  },
});

// ✅ تحديث الرسم البياني عند دخول زائر جديد
function updateChart() {
  db.ref("visitors").on("value", (snapshot) => {
    const visitors = snapshot.val();
    if (visitors) {
      const visitorCount = Object.keys(visitors).length;
      const currentTime = new Date().toLocaleTimeString();

      visitorChart.data.labels.push(currentTime);
      visitorChart.data.datasets[0].data.push(visitorCount);
      visitorChart.update();
    }
  });
}

updateChart(); // تشغيل تحديث البيانات
