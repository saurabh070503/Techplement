// ===============================
// script.js - Techplement Logic
// ===============================

// --------------------
// Course Rendering
// --------------------
const courses = [
  {
    title: "Modern HTML & CSS",
    desc: "Build responsive websites using HTML5 and CSS3.",
    price: "₹2,499",
    image: "https://img-c.udemycdn.com/course/240x135/1561458_7f3b.jpg"
  },
  {
    title: "JavaScript Mastery",
    desc: "From fundamentals to advanced projects.",
    price: "₹2,999",
    image: "https://img-c.udemycdn.com/course/240x135/851712_fc61_6.jpg"
  },
  {
    title: "React from Scratch",
    desc: "Learn React.js and build dynamic web apps.",
    price: "₹3,499",
    image: "https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg"
  },
  {
    title: "UI/UX Design Basics",
    desc: "Design intuitive user experiences.",
    price: "₹1,999",
    image: "ui.jpg"
  },
  {
    title: "Python for Data Science",
    desc: "Master Python and explore real-world data projects.",
    price: "₹3,299",
    image: "https://img-c.udemycdn.com/course/240x135/2473048_8255_3.jpg"
  },
  {
    title: "Machine Learning A-Z",
    desc: "Learn ML algorithms and apply them practically.",
    price: "₹3,999",
    image: "https://img-c.udemycdn.com/course/240x135/950390_270f_3.jpg"
  },
  {
    title: "Cyber Security Essentials",
    desc: "Protect yourself and your systems from threats.",
    price: "₹2,299",
    image: "cyber.jpg"
  },
  {
    title: "AWS Cloud Practitioner",
    desc: "Get started with AWS and cloud services.",
    price: "₹2,599",
    image: "aws.webp"
  }
];

const courseList = document.getElementById("courseList");
if (courseList) {
  courses.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card";
    card.innerHTML = `
      <img src="${course.image}" alt="${course.title}">
      <h3>${course.title}</h3>
      <p>${course.desc}</p>
      <strong>${course.price}</strong>
    `;
    courseList.appendChild(card);
  });
}

// --------------------
// Modal Controls
// --------------------
function openModal(type) {
  document.getElementById("authModal").style.display = "flex";
  showForm(type);
}

function closeModal() {
  document.getElementById("authModal").style.display = "none";
  document.querySelectorAll(".message").forEach(msg => msg.style.display = "none");
}

window.onclick = function (event) {
  if (event.target === document.getElementById("authModal")) closeModal();
};

function togglePassword(fieldId) {
  const input = document.getElementById(fieldId);
  input.type = input.type === "password" ? "text" : "password";
}

function showForm(type) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");

  if (type === "login") {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
  } else {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    loginTab.classList.remove("active");
    registerTab.classList.add("active");
  }
}

function showMessage(id, text, type) {
  const msg = document.getElementById(id);
  msg.textContent = text;
  msg.className = `message ${type}`;
  msg.style.display = "block";
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --------------------
// Registration Logic
// --------------------
document.getElementById("registerForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = this.querySelector("input[type='text']").value.trim();
  const email = this.querySelector("input[type='email']").value.trim();
  const password = this.querySelector("input[type='password']").value.trim();

  if (!name || !email || !password) return showMessage("registerMsg", "⚠️ Please fill in all fields.", "error");
  if (!validateEmail(email)) return showMessage("registerMsg", "⚠️ Invalid email format.", "error");
  if (password.length < 6) return showMessage("registerMsg", "⚠️ Password must be 6+ characters.", "error");

  localStorage.setItem("techplement_user", JSON.stringify({ name, email, password }));
  showMessage("registerMsg", "✅ Registered successfully!", "success");
  setTimeout(() => {
    closeModal();
    this.reset();
  }, 1500);
});

// --------------------
// Login Logic
// --------------------
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = this.querySelector("input[type='email']").value.trim();
  const password = this.querySelector("input[type='password']").value.trim();

  if (!email || !password) return showMessage("loginMsg", "⚠️ Please fill in all fields.", "error");
  if (!validateEmail(email)) return showMessage("loginMsg", "⚠️ Invalid email.", "error");

  const stored = JSON.parse(localStorage.getItem("techplement_user"));
  if ((email === "user1@gmail.com" && password === "pass@123") || (stored?.email === email && stored?.password === password)) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    showMessage("loginMsg", "✅ Login successful!", "success");
    setTimeout(() => {
      closeModal();
      window.location.href = "/profile.html";
    }, 1000);
  } else {
    showMessage("loginMsg", "❌ Invalid email or password.", "error");
  }
});

// --------------------
// Hide Login/Register After Auth
// --------------------
window.addEventListener("DOMContentLoaded", () => {
  const loggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (loggedIn) {
    const signInBtn = document.querySelector("button[onclick*='login']");
    const registerBtn = document.querySelector("button[onclick*='register']");
    if (signInBtn) signInBtn.style.display = "none";
    if (registerBtn) registerBtn.style.display = "none";
  }
});