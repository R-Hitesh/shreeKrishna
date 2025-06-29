// script.js

// Responsive Navbar Toggle
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.createElement("div");
  navToggle.classList.add("nav-toggle");
  navToggle.innerHTML = "☰";
  const navbar = document.querySelector(".navbar");
  const nav = navbar.querySelector("nav");

  // Add toggle button for small screens
  navbar.insertBefore(navToggle, nav);

  navToggle.addEventListener("click", () => {
    nav.classList.toggle("show-menu");
  });
});













// Theme Switch
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("themeToggle");
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
  });
});










// Food Search Filter
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      const keyword = this.value.toLowerCase();
      document.querySelectorAll(".card").forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(keyword) ? "block" : "none";
      });
    });
  }
});




















// Modal View
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalPrice = document.getElementById("modalPrice");
  const modalClose = document.getElementById("modalClose");

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      modalImg.src = card.querySelector("img").src;
      modalTitle.textContent = card.querySelector("h3").textContent;
      modalDesc.textContent = card.querySelector("p").textContent;
      modalPrice.textContent = card.querySelector("span").textContent;
      modal.style.display = "block";
    });
  });

  modalClose.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});









<script>
  // Admin Add Product Logic
  document.getElementById("adminForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;
    const img = document.getElementById("img").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;

    const container = document.querySelector(".menu-container");

    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.setAttribute("data-category", category);
    newCard.setAttribute("data-aos", "fade-up");

    newCard.innerHTML = `
      <img src="${img}" alt="${title}" />
      <h3>${title}</h3>
      <p>${desc}</p>
      <span class="btn">₹${price}</span>
      <button class="delete-btn">Delete</button>
    `;

    container.appendChild(newCard);
    AOS.refresh(); // reinitialize animation

    // Modal logic
    newCard.querySelector("img").addEventListener("click", () => {
      document.getElementById("modalImg").src = img;
      document.getElementById("modalTitle").innerText = title;
      document.getElementById("modalDesc").innerText = desc;
      document.getElementById("modalPrice").innerText = `₹${price}`;
      document.getElementById("modal").style.display = "flex";
    });

    // Delete logic
    newCard.querySelector(".delete-btn").addEventListener("click", () => {
      newCard.remove();
    });

    this.reset();
  });

  // Add delete button to all static cards
  document.querySelectorAll(".card").forEach(card => {
    const del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "delete-btn";
    card.appendChild(del);

    del.addEventListener("click", () => card.remove());
  });
</script>
