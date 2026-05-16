// FILTRO
const filterBtns = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projects.forEach(card => {
      if (filter === "all" || card.dataset.category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// MODAL
const modal = document.getElementById("portfolioModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

document.querySelectorAll(".open-modal").forEach(btn => {
  btn.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = btn.dataset.img;
    modalTitle.innerText = btn.dataset.title;
    modalDesc.innerText = btn.dataset.desc;
  });
});

document.querySelector(".close-modal").addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
