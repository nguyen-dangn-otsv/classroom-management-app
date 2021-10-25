export function updateData(classrooms) {
  const modalEdit = document.querySelector("#edit-modal");
  const btnEdits = document.querySelectorAll(".edit-btn");
  const btnSubmitEdit = document.querySelector("#btn-submit-edit");
  const inputTextNameClassModal = document.querySelector("#class-name");

  btnEdits.forEach(function (btnEdit) {
    btnEdit.addEventListener("click", function () {
      const row = this.closest("tr");
      const cellNameClass = row.childNodes[1];
      const idClassroom = row.getAttribute("class-id");
      const idxClassroom = classrooms.findIndex(
        (classroom) => classroom.idClass == idClassroom
      );

      inputTextNameClassModal.value = classrooms[idxClassroom].nameClass;

      modalEdit.style.display = "block";

      btnSubmitEdit.onclick = function () {
        classrooms[idxClassroom].nameClass = inputTextNameClassModal.value;
        cellNameClass.innerText = inputTextNameClassModal.value;

        modalEdit.style.display = "none";

        localStorage.setItem("classrooms", JSON.stringify(classrooms));
      };
    });
  });
}
