let newProject = {
  id: "",
  title: "",
  description: "",
  image: "",
  video: "",
  categorie: "",
  scenes: [],
  submenus: [],
};

document.addEventListener("DOMContentLoaded", () => {
  const writeObject = (target, expression, value, path) => {
    switch (expression) {
      case "title":
        target.title = value;
        break;
      case "description":
        target.description = value;
        break;
      case "image":
        target.image = path;
        break;
      case "categorie":
        target.categorie = value;
        break;
      case "video":
        target.video = path;
        break;

      default:
    }
  };

  const nameHandler = (name) => {
    const nameParts = name.split("-");

    const expression = nameParts[2];
    const code = `${nameParts[nameParts.length - 2]}${
      nameParts[nameParts.length - 1]
    }`.slice(2);
    return { code, expression };
  };

  const addScene = (code) => {
    let current = newProject;
    let target = null;

    if (code.length == 1) {
      current = current.scenes;

      if (!current[parseInt(code)]) {
        current[parseInt(code)] = {
          title: "",
          description: "",
          video: "",
          image: "",
        };
      }
      target = current[parseInt(code)];
      return target;
    }

    current = current.submenus;
    for (let i = 0; i < code.length - 1; i++) {
      const index = parseInt(code[i]);
      if (!current[index]) {
        current[index] = {
          title: "",
          description: "",
          image: "",
          audio: "",
          video: "",
          scenes: [],
          submenus: [],
        };
      }
      target = current[index];
      current = current[index].submenus;
    }

    if (!target.scenes[parseInt(code[code.length - 1])]) {
      target.scenes[parseInt(code[code.length - 1])] = {
        title: "",
        description: "",
        image: "",
        video: "",
      };
    }

    target = target.scenes[parseInt(code[code.length - 1])];
    return target;
  };

  const addMenu = (code) => {
    let current = newProject.submenus;
    let target = null;

    for (let i = 0; i < code.length; i++) {
      const index = parseInt(code[i]);

      if (!current[index]) {
        current[index] = {
          title: "",
          description: "",
          image: "",
          // audio: "",
          video: "",
          scenes: [],
          submenus: [],
        };
      }
      target = current[index];
      current = current[index].submenus;
    }
    return target;
  };

  const handleScene = (name, value) => {
    const scenInfo = nameHandler(name);
    const target = addScene(scenInfo.code);
    const path = document.getElementsByName(name)[0].dataset.path;

    writeObject(target, scenInfo.expression, value, path);
  };

  const handleSubmenu = (name, value) => {
    const submenuInfo = nameHandler(name);
    const target = addMenu(submenuInfo.code);
    const path = document.getElementsByName(name)[0].dataset.path;

    writeObject(target, submenuInfo.expression, value, path);
  };

  const handleGeneralInfo = (name, value) => {
    const nameParts = name.split("-");
    const expression = nameParts[nameParts.length - 1];
    const path = document.getElementsByName(name)[0].dataset.path;

    writeObject(newProject, expression, value, path);
  };

  document.body.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formDataArray = Array.from(formData.entries());

    for (let i = 0; i < formDataArray.length; i++) {
      const name = formDataArray[i][0];
      const value = formDataArray[i][1];

      console.log(value);

      if (name.startsWith("main")) handleGeneralInfo(name, value);
      if (name.startsWith("new-scene")) handleScene(name, value);
      if (name.startsWith("new-submenu")) handleSubmenu(name, value);
    }
    // console.log(JSON.stringify(newProject));
    newProject.id = `${newProject.title.toLowerCase().split(" ").join("-")}`;
    sendJson(newProject);
  });

  const addToCategories = () => {
    console.log("adding to categories");
  };

  const sendJson = (json) => {
    addToCategories();

    fetch(`/upload/json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          alert(data.message);
        } else {
          alert(data.message);
        }
      })
      .catch(() => {
        alert("Error al subir el archivo");
      });
  };
});
