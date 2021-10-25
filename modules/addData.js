import { showData } from "./readData.js";
import { updateData } from "./updateData.js";
const modal = document.querySelector("#add-modal");
const btnSubmit = document.querySelector("#btn-submit-add");
const inputTextIdClass = document.querySelector("#id-add");
const inputTextNameClass = document.querySelector("#class-name-add");
const textWarning = document.querySelector("#text-warning");
const btnCancel = document.querySelector("#btn-cancel-add");
const btnClose = document.querySelector("#btn-close-add");

export function addData(classrooms) {
  btnSubmit.addEventListener("click", () => {
    const idClass = +inputTextIdClass.value;
    const nameClass = inputTextNameClass.value;

    let listNewObjects = [];

    const isMatch = classrooms.find(
      (classroom) => classroom.idClass == idClass
    );

    if (isMatch) {
      if (localStorage.getItem("checkAddDuplicateData") == "false") {
        textWarning.innerHTML = " * * * Please type another ID";
        localStorage.setItem("checkAddDuplicateData", "true");
      }
    } else {
      const newClass = {
        idClass,
        nameClass,
      };

      listNewObjects.push(newClass);
      classrooms.push(newClass);

      modal.style.display = "none";

      resetForm();
      showData(listNewObjects);
      updateData(listNewObjects);
      localStorage.setItem("classrooms", JSON.stringify(classrooms));
    }
  });

  btnCancel.addEventListener("click", () => {
    localStorage.setItem("checkAddDuplicateData", "false");
    modal.style.display = "none";
    resetForm();
  });

  btnClose.addEventListener("click", () => {
    localStorage.setItem("checkAddDuplicateData", "false");
    modal.style.display = "none";
    resetForm();
  });

  inputTextIdClass.addEventListener("input", () => {
    textWarning.innerHTML = "";
    localStorage.setItem("checkAddDuplicateData", "false");
  });
}

function resetForm() {
  textWarning.innerHTML = "";
  inputTextIdClass.value = "";
  inputTextNameClass.value = "";
}
