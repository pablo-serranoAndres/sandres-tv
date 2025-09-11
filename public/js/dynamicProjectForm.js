document.addEventListener("DOMContentLoaded", () => {
  // New scene
  document.body.addEventListener("click", async (e) => {
    if (e.target && e.target.id.startsWith("add-scene-btn")) {
      const nameParts = e.target.name.split("-");
      const newSceneParent = `${nameParts[nameParts.length - 2]}${
        nameParts[nameParts.length - 1]
      }`;

      const container = e.target.closest(".scenes-container");
      const articles = container.querySelectorAll("article");
      const order = articles.length;

      const newSceneName = `${newSceneParent}-${order}`;
      const newSceneId = `${Date.now()}`;

      const response = await fetch(
        `/partial/new-scene?id=${newSceneId}&name=${newSceneName}`
      );
      const newSceneString = await response.text();

      const newSceneContainer = document.createElement("article");
      newSceneContainer.setAttribute("id", `scene-${newSceneId}`);
      newSceneContainer.setAttribute("name", `scene-${newSceneName}`);
      newSceneContainer.setAttribute("class", "new-scene");

      newSceneContainer.innerHTML = newSceneString;
      container.appendChild(newSceneContainer);
    }

    //   }

    // New submenu
    if (e.target && e.target.id.startsWith("add-submenu-btn")) {
      const nameParts = e.target.name.split("-");

      const newSubmenuParent = `${nameParts[nameParts.length - 2]}${
        nameParts[nameParts.length - 1]
      }`;

      const container = e.target.closest(".submenu-container");

      const articles = container.querySelectorAll(":scope > article");
      const order = articles.length;

      const newSubmenuName = `${newSubmenuParent}-${order}`;

      const newSubmenuId = `${Date.now()}`;

      const response = await fetch(
        `/partial/new-submenu?id=${newSubmenuId}&name=${newSubmenuName}`
      );
      const subMenuString = await response.text();

      const subMenuContainer = document.createElement("article");
      subMenuContainer.setAttribute("id", `submenu-${newSubmenuId}`);
      subMenuContainer.setAttribute("name", `submenu-${newSubmenuName}`);
      subMenuContainer.setAttribute("class", "main-info new-submenu");

      subMenuContainer.innerHTML = subMenuString;
      container.appendChild(subMenuContainer);
    }

    // Eliminate scene
    if (
      e.target &&
      (e.target.id.startsWith("eliminate-scene") ||
        e.target.id.startsWith("eliminate-submenu"))
    ) {
      const idParts = e.target.id.split("-");
      const uuidEliminate = idParts[idParts.length - 1];

      const itemEliminate =
        idParts[1] === "scene"
          ? document.getElementById(`scene-${uuidEliminate}`)
          : document.getElementById(`submenu-${uuidEliminate}`);
      itemEliminate.remove();
    }
  });
});
