
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".menu-container");
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  products
    .filter(p => p.category === "food")
    .forEach(p => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${p.img}" alt="${p.title}" />
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <span class="btn">₹${p.price}</span>
      `;
      container.appendChild(card);
    });
});
