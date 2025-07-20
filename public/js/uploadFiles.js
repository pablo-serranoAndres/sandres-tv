let uploads = 0;

document.addEventListener("change", (e) => {
  if (e.target && e.target.matches('input[type="file"]')) {
    const file = e.target.files[0];
    const type = e.target.accept.split("/")[0];
    if (file) {
      const formData = new FormData();
      const saveBtn = document.getElementById("save-project-btn");
      const iconLoader = document.getElementById("icon-loader");

      formData.append("file", file);

      if (uploads === 0) {
        saveBtn.style.display = "none";
        iconLoader.style.display = "block";
        saveBtn.disabled = true;
      }

      uploads++;

      fetch(`/upload/${type}`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            alert(data.message);
            console.log(data.path);
            document.getElementById(e.target.id).dataset.path = data.path;
          } else {
            alert(data.message);
          }
        })
        .finally(() => {
          uploads--;
          if (uploads === 0) {
            saveBtn.disabled = false;
            iconLoader.style.display = "none";
            saveBtn.style.display = "block";
          }
        });
    } else {
      alert("No se ha subido ningun archivo.");
    }
  }
});
