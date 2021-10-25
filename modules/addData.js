import { showData } from "./readData.js";
import { updateData } from "./updateData.js";
let modal = document.querySelector("#add-modal");
let btnSubmit = document.querySelector("#btn-submit-add");
let inputTextIdClass = document.querySelector("#id-add");
let inputTextNameClass = document.querySelector("#class-name-add");
let textWarning = document.querySelector("#text-warning");
let btnCancel = document.querySelector("#btn-cancel-add");
let btnClose = document.querySelector("#btn-close-add");

let listNewObjects = [];
export function addData(classrooms) {
  // Submit modal data
  btnSubmit.addEventListener("click", () => {
    // Get value from browser.
    let idClass = inputTextIdClass.value;
    let nameClass = inputTextNameClass.value;

    // Check if ID was duplicated or not.
    let isMatch = classrooms.find((classroom) => classroom.idClass == idClass);
    if (isMatch) {
      // If ID was duplicated, show warning.
      if (localStorage.getItem("checkAddDuplicateData") == "false") {
        textWarning.innerHTML = " * * * Please type another ID";
        localStorage.setItem("checkAddDuplicateData", "true");
      }
    } else {
      // Add new data to classrooms.
      let newClass = {
        idClass,
        nameClass,
      };
      listNewObjects.push(newClass);
      classrooms.push(newClass);

      modal.style.display = "none";

      // Add success and rerender data.
      resetForm();
      showData(listNewObjects);
      updateData(listNewObjects);
    }
  });

  // Cancel modal add data.
  btnCancel.addEventListener("click", () => {
    localStorage.setItem("checkAddDuplicateData", "false");
    modal.style.display = "none";
    resetForm();
  });

  // Close modal add data.
  btnClose.addEventListener("click", () => {
    localStorage.setItem("checkAddDuplicateData", "false");
    modal.style.display = "none";
    resetForm();
  });

  // Hide warning when type data.
  inputTextIdClass.addEventListener("input", () => {
    textWarning.innerHTML = "";
    localStorage.setItem("checkAddDuplicateData", "false");
  });
}

// Reset.
function resetForm() {
  textWarning.innerHTML = "";
  inputTextIdClass.value = "";
  inputTextNameClass.value = "";
}
