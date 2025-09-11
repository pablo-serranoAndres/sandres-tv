const toggleClass = (e) => {
  if (!e.target.closest(".featured-edit-project-btn")) return;

  const button = e.target.closest(".featured-edit-project-btn");
  const icon = button.querySelector("i");

  icon.classList.toggle("fa-solid");
  icon.classList.toggle("fa-regular");
};

const saveFeaturedProjects = async () => {
  const projectsRAW = document.querySelectorAll("#featured-project-list li");

  const projects = Array.from(projectsRAW)
    .filter((li) => li.querySelector("i").classList.contains("fa-solid"))
    .map((li) => {
      return {
        id: li.querySelector("span").dataset.id,
        // title: span.textContent.trim(),
        featured: true,
      };
    });
  try {
    const response = await fetch(`/upload/featuredProjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projects),
    });
    alert("Datos actualizados correctamente");
  } catch (error) {
    alert(`Ha ocurrdio un eror al guardar, ${error}`);
  }
};
