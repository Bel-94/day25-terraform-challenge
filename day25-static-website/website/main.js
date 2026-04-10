/* ── Data ── */
const services = [
  { icon: "🚀", title: "Cloud Migration", desc: "I'll move your existing workloads to AWS with a clear plan, zero surprise downtime, and a full rollback strategy if anything goes sideways." },
  { icon: "🏗️", title: "Infrastructure as Code", desc: "Everything built in Terraform — version-controlled, documented, and handed over to you so you're never locked in to me." },
  { icon: "💰", title: "Cost Optimisation", desc: "I audit your AWS bill, cut the waste, and set up budgets and alerts so you always know what you're spending and why." },
  { icon: "🔒", title: "Security & Compliance", desc: "Proper IAM, VPC design, and security baselines so your infrastructure is locked down from day one — not bolted on later." },
  { icon: "⚙️", title: "Ongoing Cloud Support", desc: "Monthly retainer or pay-as-you-go. I monitor your infrastructure, handle incidents, and keep things running smoothly." },
  { icon: "🐳", title: "Containers & Serverless", desc: "Need ECS, EKS, or Lambda? I design and deploy container and serverless architectures sized right for your actual traffic." },
];

const stack = [
  { icon: "🟠", name: "Terraform", desc: "IaC" },
  { icon: "🐙", name: "GitHub Actions", desc: "CI/CD" },
  { icon: "🐳", name: "Docker", desc: "Containers" },
  { icon: "☸️",  name: "Kubernetes", desc: "Orchestration" },
  { icon: "📊", name: "Grafana", desc: "Observability" },
  { icon: "🔐", name: "Vault", desc: "Secrets Mgmt" },
  { icon: "🌐", name: "CloudFront", desc: "CDN" },
  { icon: "🗄️", name: "RDS / Aurora", desc: "Databases" },
];

/* ── Render Services ── */
const grid = document.getElementById("servicesGrid");
services.forEach(s => {
  grid.insertAdjacentHTML("beforeend", `
    <div class="card">
      <div class="card__icon">${s.icon}</div>
      <h3 class="card__title">${s.title}</h3>
      <p class="card__desc">${s.desc}</p>
    </div>
  `);
});

/* ── Render Stack ── */
const stackGrid = document.getElementById("stackGrid");
stack.forEach(s => {
  stackGrid.insertAdjacentHTML("beforeend", `
    <div class="stack-item">
      <div class="stack-item__icon">${s.icon}</div>
      <div class="stack-item__name">${s.name}</div>
      <div class="stack-item__desc">${s.desc}</div>
    </div>
  `);
});

/* ── Cloud Diagram ── */
const nodes = [
  { label: "☁ CloudFront", top: "10%",  left: "30%" },
  { label: "🪣 S3 Bucket",  top: "38%",  left: "5%"  },
  { label: "⚡ Lambda",     top: "38%",  left: "58%" },
  { label: "🗄 RDS",        top: "65%",  left: "5%"  },
  { label: "🔒 IAM",        top: "65%",  left: "58%" },
  { label: "🌐 Route 53",   top: "82%",  left: "30%" },
];
const diagram = document.getElementById("cloudDiagram");
nodes.forEach(n => {
  const el = document.createElement("div");
  el.className = "node";
  el.textContent = n.label;
  el.style.top  = n.top;
  el.style.left = n.left;
  diagram.appendChild(el);
});

/* ── Navbar scroll effect ── */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

/* ── Mobile burger ── */
const burger = document.getElementById("burger");
const navLinks = document.querySelector(".nav__links");
burger.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav__links a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

/* ── Counter animation ── */
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const statsSection = document.querySelector(".stats");
let counted = false;
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    document.querySelectorAll(".stat").forEach((stat, i) => {
      animateCounter(document.getElementById(`stat${i}`), +stat.dataset.target);
    });
  }
}, { threshold: 0.4 });
observer.observe(statsSection);

/* ── Contact form ── */
const form     = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");

form.addEventListener("submit", e => {
  e.preventDefault();
  const name    = document.getElementById("name").value.trim();
  const email   = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    feedback.textContent = "Please fill in your name, email, and message.";
    feedback.className   = "form__feedback error";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    feedback.textContent = "Please enter a valid email address.";
    feedback.className   = "form__feedback error";
    return;
  }

  // Simulate submission (no backend — static site)
  const btn = form.querySelector("button[type=submit]");
  btn.disabled     = true;
  btn.textContent  = "Sending…";
  setTimeout(() => {
    feedback.textContent = `Thanks ${name}! We'll be in touch within 24 hours.`;
    feedback.className   = "form__feedback success";
    form.reset();
    btn.disabled    = false;
    btn.textContent = "Send Message";
  }, 1200);
});

/* ── Footer year ── */
document.getElementById("year").textContent = new Date().getFullYear();
