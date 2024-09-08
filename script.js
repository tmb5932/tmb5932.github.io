/* External Links for Contact Section */
document.getElementById("github-contact")
.addEventListener("click", function () {
    window.open("https://github.com/tmb5932", '_blank');
});

document.getElementById("linkedin-contact")
.addEventListener("click", function () {
    window.open("https://linkedin.com/in/tbrown5932", '_blank');
});

document.getElementById("resume-contact")
.addEventListener("click", function () {
    window.open("assets/TB_Resume.pdf", '_blank');
});

/* Internal links to move between sections */
document.getElementById("home-nav").addEventListener("click", function () {
  const section = document.getElementById("home");
  section.scrollIntoView({ behavior: "smooth" });
});

document.getElementById("project-nav").addEventListener("click", function () {
  const section = document.getElementById("projects");
  section.scrollIntoView({ behavior: "smooth" });
});

document.getElementById("contact-nav").addEventListener("click", function () {
  const section = document.getElementById("contact");
  section.scrollIntoView({ behavior: "smooth" });
});