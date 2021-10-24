export function updateData(classrooms) {
  let modalEdit = document.querySelector("#edit-modal");
  let btnEdits = document.querySelectorAll(".edit-btn");
  let btnSubmitEdit = document.querySelector("#btn-submit-edit");
  let btnCloseEdit = document.querySelector("#btn-close-edit");
  let inputTextClassName = document.querySelector("#class-name");
  // Edit
  btnEdits.forEach(function (btnEdit) {
    btnEdit.addEventListener("click", function () {
      let cellNameClass = this.closest("tr").childNodes[1];

      // Popup form edit
      modalEdit.style.display = "block";

      // Fill data to form edit
      let idClassroom = this.closest("tr").getAttribute("class-id");
      let indexClassroom = classrooms.findIndex(
        (classroom) => classroom.idClass == idClassroom
      );
      inputTextClassName.value = classrooms[indexClassroom].nameClass;

      // Submit to edit
      btnSubmitEdit.addEventListener("click", function () {
        classrooms[indexClassroom].nameClass = inputTextClassName.value;
        cellNameClass.innerHTML = inputTextClassName.value;
        modalEdit.style.display = "none";
      });
    });
  });
}
