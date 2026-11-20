const courseCatalog = [
  { title: "Modern HTML & CSS", description: "Build responsive websites with HTML and modern CSS.", category: "Web Development", price: "₹2,499", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80", page: "web-dev.html", level: "Beginner" },
  { title: "JavaScript Mastery", description: "Go from language fundamentals to interactive projects.", category: "Web Development", price: "₹2,999", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80", page: "web-dev.html", level: "Intermediate" },
  { title: "React from Scratch", description: "Create dynamic web applications with React.", category: "Web Development", price: "₹3,499", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80", page: "web-dev.html", level: "Intermediate" },
  { title: "Python for Data Science", description: "Analyze real-world datasets using Python.", category: "Data Science", price: "₹3,299", image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?auto=format&fit=crop&w=800&q=80", page: "data-science.html", level: "Beginner" },
  { title: "Pandas & NumPy Bootcamp", description: "Clean, transform, and explore data with Python.", category: "Data Science", price: "₹2,799", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", page: "data-science.html", level: "Intermediate" },
  { title: "Statistics for Data Science", description: "Build a confident foundation in applied statistics.", category: "Data Science", price: "₹2,499", image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80", page: "data-science.html", level: "Beginner" },
  { title: "Machine Learning A–Z", description: "Understand machine learning through practical projects.", category: "AI & ML", price: "₹3,999", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80", page: "ai-ml.html", level: "Intermediate" },
  { title: "Deep Learning with TensorFlow", description: "Train neural networks and build deep learning models.", category: "AI & ML", price: "₹3,599", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", page: "ai-ml.html", level: "Advanced" },
  { title: "AI for Beginners", description: "Explore core AI concepts, tools, and responsible use.", category: "AI & ML", price: "₹2,999", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80", page: "ai-ml.html", level: "Beginner" },
  { title: "UI/UX Design Basics", description: "Design intuitive experiences around real user needs.", category: "UI/UX Design", price: "₹1,999", image: "ui.jpg", page: "uiux.html", level: "Beginner" },
  { title: "Figma for Beginners", description: "Create polished interfaces and interactive prototypes.", category: "UI/UX Design", price: "₹2,499", image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80", page: "uiux.html", level: "Beginner" },
  { title: "Design Systems 101", description: "Build consistent, scalable design systems for products.", category: "UI/UX Design", price: "₹2,799", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80", page: "uiux.html", level: "Intermediate" },
  { title: "Cyber Security Essentials", description: "Learn the principles of safer systems and data.", category: "Cyber Security", price: "₹2,299", image: "cyber.jpg", page: "cyber-security.html", level: "Beginner" },
  { title: "Network Security Fundamentals", description: "Understand core practices for protecting networks.", category: "Cyber Security", price: "₹3,199", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80", page: "cyber-security.html", level: "Intermediate" },
  { title: "Security Operations Basics", description: "Explore monitoring, incident response, and security teams.", category: "Cyber Security", price: "₹2,799", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80", page: "cyber-security.html", level: "Intermediate" },
  { title: "AWS Cloud Practitioner", description: "Get started with AWS services and cloud concepts.", category: "Cloud Computing", price: "₹2,599", image: "aws.webp", page: "cloud-computing.html", level: "Beginner" },
  { title: "Microsoft Azure Fundamentals", description: "Learn the foundations of Microsoft's cloud platform.", category: "Cloud Computing", price: "₹2,999", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80", page: "cloud-computing.html", level: "Beginner" },
  { title: "Kubernetes for Beginners", description: "Explore container orchestration and cloud deployment.", category: "Cloud Computing", price: "₹2,899", image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80", page: "cloud-computing.html", level: "Intermediate" }
];

const storage = {
  read(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.error(`Unable to read ${key} from local storage.`, error);
      return fallback;
    }
  },
  write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Unable to save ${key} to local storage.`, error);
      return false;
    }
  }
};

function getUser() {
  return storage.read("techplement_user", null);
}

function isSignedIn() {
  const user = getUser();
  const session = storage.read("techplement_session", null);
  return Boolean(user && session && session.email === user.email);
}

async function hashPassword(password) {
  if (!window.crypto || !window.crypto.subtle) {
    throw new Error("Secure password hashing is unavailable in this browser.");
  }
  const bytes = new TextEncoder().encode(password);
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function getEnrollments() {
  return storage.read("techplement_enrollments", []);
}

function renderCourseCard(course, enrolled) {
  const card = document.createElement("article");
  card.className = "course-card";
  const image = document.createElement("img");
  image.className = "course-image";
  image.src = course.image;
  image.alt = "";
  image.loading = "lazy";
  image.onerror = () => {
    image.onerror = null;
    image.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80";
  };
  const body = document.createElement("div");
  body.className = "course-body";
  const tag = document.createElement("span");
  tag.className = "course-tag";
  tag.textContent = `${course.category} · ${course.level}`;
  const title = document.createElement("h3");
  title.textContent = course.title;
  const description = document.createElement("p");
  description.textContent = course.description;
  const meta = document.createElement("div");
  meta.className = "course-meta";
  const price = document.createElement("strong");
  price.textContent = course.price;
  const action = document.createElement("button");
  action.className = "btn btn-small";
  action.type = "button";
  action.textContent = enrolled ? "Enrolled" : "Enroll";
  action.disabled = enrolled;
  if (enrolled) action.classList.add("btn-secondary");
  action.addEventListener("click", () => enrollInCourse(course.title));
  meta.append(price, action);
  body.append(tag, title, description, meta);
  card.append(image, body);
  return card;
}

function setupCourses() {
  const grids = document.querySelectorAll("[data-course-grid]");
  grids.forEach((grid) => {
    const category = grid.dataset.category;
    const allCourses = category === "all" ? courseCatalog : courseCatalog.filter((course) => course.category === category);
    const queryInput = document.querySelector("[data-course-search]");
    const count = document.querySelector("[data-course-count]");
    const enrollments = getEnrollments();

    function render() {
      const query = queryInput ? queryInput.value.trim().toLowerCase() : "";
      const matches = allCourses.filter((course) => `${course.title} ${course.description} ${course.category}`.toLowerCase().includes(query));
      grid.replaceChildren();
      matches.forEach((course) => grid.append(renderCourseCard(course, enrollments.includes(course.title))));
      if (!matches.length) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "No courses match that search. Try another keyword.";
        grid.append(empty);
      }
      if (count) count.textContent = `${matches.length} ${matches.length === 1 ? "course" : "courses"}`;
    }
    if (queryInput) queryInput.addEventListener("input", render);
    render();
  });
}

function enrollInCourse(title) {
  if (!isSignedIn()) {
    if (!storage.write("techplement_pending_course", title)) {
      window.alert("Your course selection could not be saved in this browser. Please check your browser storage settings.");
      return;
    }
    window.location.href = `login.html?next=${encodeURIComponent(window.location.pathname.split("/").pop() || "index.html")}`;
    return;
  }
  const enrollments = getEnrollments();
  if (!enrollments.includes(title)) enrollments.push(title);
  if (storage.write("techplement_enrollments", enrollments)) window.location.reload();
  else window.alert("Your enrollment could not be saved in this browser. Please check your browser storage settings.");
}

function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });
  }
  const accountLink = document.querySelector("[data-account-link]");
  if (accountLink && isSignedIn()) {
    accountLink.href = "profile.html";
    accountLink.textContent = "My learning";
  }
}

function setupAuth() {
  const form = document.querySelector("[data-auth-form]");
  if (!form) return;
  const message = form.querySelector("[data-form-message]");
  const type = form.dataset.authForm;
  const password = form.querySelector('[name="password"]');
  const reveal = form.querySelector("[data-show-password]");
  if (reveal && password) reveal.addEventListener("change", () => { password.type = reveal.checked ? "text" : "password"; });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim().toLowerCase();
    const pass = String(data.get("password") || "");
    const currentUser = getUser();
    let result;
    try {
      if (type === "signup") {
        const name = String(data.get("name") || "").trim();
        if (pass.length < 6) result = { error: "Choose a password with at least 6 characters." };
        else if (currentUser && currentUser.email === email) result = { error: "An account with this email already exists. Please sign in." };
        else result = { user: { name, email, passwordHash: await hashPassword(pass) } };
      } else if (!currentUser || currentUser.email !== email || currentUser.passwordHash !== await hashPassword(pass)) {
        result = { error: "We couldn't find an account with those details. Please check and try again." };
      } else result = { user: currentUser };
    } catch (error) {
      console.error("Authentication could not be completed.", error);
      message.textContent = error.message || "Authentication could not be completed in this browser.";
      message.className = "form-message error";
      return;
    }

    if (result.error) {
      message.textContent = result.error;
      message.className = "form-message error";
      return;
    }

    if (type === "signup" && !storage.write("techplement_user", result.user)) {
      message.textContent = "Your account could not be saved in this browser. Please check your browser storage settings.";
      message.className = "form-message error";
      return;
    }
    if (!storage.write("techplement_session", { email: result.user.email })) {
      message.textContent = "Your session could not be saved in this browser. Please check your browser storage settings.";
      message.className = "form-message error";
      return;
    }
    const pendingCourse = storage.read("techplement_pending_course", null);
    if (pendingCourse && courseCatalog.some((course) => course.title === pendingCourse)) {
      const enrollments = getEnrollments();
      if (!enrollments.includes(pendingCourse)) enrollments.push(pendingCourse);
      if (!storage.write("techplement_enrollments", enrollments)) {
        message.textContent = "You are signed in, but your course selection could not be saved. Please enroll again from the course page.";
        message.className = "form-message error";
        return;
      }
      localStorage.removeItem("techplement_pending_course");
    }
    message.textContent = type === "signup" ? "Account created! Taking you to your learning space…" : "Welcome back! Opening your learning space…";
    message.className = "form-message success";
    const next = new URLSearchParams(window.location.search).get("next");
    const destination = next && /^[a-z0-9-]+\.html$/i.test(next) ? next : "profile.html";
    window.setTimeout(() => { window.location.href = destination; }, 650);
  });
}

function setupProfile() {
  const profile = document.querySelector("[data-profile]");
  if (!profile) return;
  const user = getUser();
  const session = storage.read("techplement_session", null);
  if (!user || !session || session.email !== user.email) {
    window.location.href = "login.html";
    return;
  }
  const name = profile.querySelector("[data-profile-name]");
  const email = profile.querySelector("[data-profile-email]");
  const avatar = profile.querySelector("[data-profile-avatar]");
  if (name) name.textContent = user.name || "Learner";
  if (email) email.textContent = user.email;
  if (avatar) avatar.textContent = (user.name || user.email).trim().charAt(0).toUpperCase();
  const grid = document.querySelector("[data-enrolled-grid]");
  if (!grid) return;
  const enrolled = getEnrollments();
  grid.replaceChildren();
  enrolled.map((title) => courseCatalog.find((course) => course.title === title)).filter(Boolean)
    .forEach((course) => grid.append(renderCourseCard(course, true)));
  if (!enrolled.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Your learning journey starts here. Explore the course catalog and enroll in a course.";
    grid.append(empty);
  }
  const logout = document.querySelector("[data-logout]");
  if (logout) logout.addEventListener("click", () => {
    localStorage.removeItem("techplement_session");
    window.location.href = "index.html";
  });
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector("[data-contact-status]");
    status.textContent = "Thanks for reaching out! This demo form is ready to connect to an email service.";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupCourses();
  setupAuth();
  setupProfile();
  setupContactForm();
  document.querySelectorAll("[data-year]").forEach((element) => { element.textContent = new Date().getFullYear(); });
});
