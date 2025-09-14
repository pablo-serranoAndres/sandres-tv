const deleteProject = async (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const idDelete = li.id.split("-").slice(1).join("-");
  try {
    await fetch(`partial/delete-project?idDelete=${idDelete}`, {
      method: "DELETE",
    });
    await navigate("delete-project");
  } catch (error) {
    alert("Error eliminando el registro", error);
  }
};
