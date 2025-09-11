let current = "main-page";

document.addEventListener("DOMContentLoaded", () => {
  const navigation = document.querySelector(".navigation");
  if (!navigation) return;

  navigation.addEventListener("click", async (e) => {
    await showModal(current, e.target);
  });
});

const navigate = async (wantedUrl) => {
  if (wantedUrl) {
    const optionSelected = document.getElementById(wantedUrl).closest("li");
    const menuItems = document.querySelectorAll(".navigation li");

    menuItems.forEach((li) => {
      li.className = "";
    });

    optionSelected.className = "active";

    switch (wantedUrl) {
      case "admin-page":
        loadPartial("main-page");
        break;
      case "new-project":
        loadPartial("new-project-form");
        break;
      case "edit-project":
        loadPartial("project-list");
        break;
      case "edit-featured":
        loadPartial("featured-projects-list");
        break;

      default:
        break;
    }
  } else {
    cancelNavigation(document.getElementById("current-page").textContent);
  }
};

const showModal = async (current, wantedUrl) => {
  const container = document.getElementById("content");
  try {
    const response = await fetch(
      `/partial/user-check?current=${current}&wantedUrl=${wantedUrl.id}&messageType=alertToChange`
    );
    const content = await response.text();
    container.innerHTML = content;
  } catch (error) {
    container.innerHTML = "<p>Error cargando contenido.</p>";
  }
};

const loadPartial = async (url) => {
  const container = document.getElementById("content");
  container.innerHTML = "";

  try {
    const response = await fetch(`/partial/${url}`);
    const content = await response.text();
    container.innerHTML = content;
  } catch (err) {
    container.innerHTML = "<p>Error cargando contenido.</p>";
  }
};

const cancelNavigation = (current) => {
  const modal = document.getElementById("modal-overlay");
  modal.style.display = "none";
  loadPartial(current);
};

const continueNavigation = (wantedUrl) => {
  navigate(wantedUrl);
};
