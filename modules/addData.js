import { showData } from "./readData.js";
import { updateData } from "./updateData.js";
const modal = document.querySelector("#add-modal");
const btnSubmit = document.querySelector("#btn-submit-add");
const inputTextIdClass = document.querySelector("#id-add");
const inputTextNameClass = document.querySelector("#class-name-add");
const textWarning = document.querySelector("#text-warning");
const btnCancel = document.querySelector("#btn-cancel-add");
const btnClose = document.querySelector("#btn-close-add");

let listNewObjects = [];
export function addData(classrooms) {
  // Submit modal data
  btnSubmit.addEventListener("click", () => {
    // Get value from browser.
    const idClass = inputTextIdClass.value;
    const nameClass = inputTextNameClass.value;

    // Check if ID was duplicated or not.
    const isMatch = classrooms.find(
      (classroom) => classroom.idClass == idClass
    );
    if (isMatch) {
      // If ID was duplicated, show warning.
      if (localStorage.getItem("checkAddDuplicateData") == "false") {
        textWarning.innerHTML = " * * * Please type another ID";
        localStorage.setItem("checkAddDuplicateData", "true");
      }
    } else {
      // Add new data to classrooms.
      const newClass = {
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
