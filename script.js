document.addEventListener("DOMContentLoaded", function () {
  // Responsive Navbar Toggle
  const navToggle = document.createElement("div");
  navToggle.classList.add("nav-toggle");
  navToggle.innerHTML = "☰";
  const navbar = document.querySelector(".navbar");
  const nav = navbar.querySelector("nav");
  navbar.insertBefore(navToggle, nav);
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("show-menu");
  });

  // Theme Switch
  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode");
    });
  }

  // Food Search Filter
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

  // Modal View
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

  // Admin Add Product Logic
  const adminForm = document.getElementById("adminForm");
  if (adminForm) {
    adminForm.addEventListener("submit", function (e) {
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
      AOS.refresh();

      // Modal logic for newly added card
      newCard.querySelector("img").addEventListener("click", () => {
        modalImg.src = img;
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        modalPrice.innerText = `₹${price}`;
        modal.style.display = "flex";
      });

      // Delete logic
      newCard.querySelector(".delete-btn").addEventListener("click", () => {
        newCard.remove();
      });

      this.reset();
    });
  }

  // Add delete button to static cards
  document.querySelectorAll(".card").forEach(card => {
    if (!card.querySelector(".delete-btn")) {
      const del = document.createElement("button");
      del.textContent = "Delete";
      del.className = "delete-btn";
      card.appendChild(del);

      del.addEventListener("click", () => card.remove());
    }
  });
});
