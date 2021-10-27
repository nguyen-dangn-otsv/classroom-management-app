const btnsCancelModal = document.querySelectorAll(".btn--cancel-modal");
const btnsCloseModal = document.querySelectorAll(".btn--close-modal");
const btnSelectAll = document.querySelector(".select-all-btn");
const btnSubmit = document.querySelector("#btn-submit-add");
const btnCancel = document.querySelector("#btn-cancel-add");
const btnClose = document.querySelector("#btn-close-add");

const inputTextNameStudent = document.querySelector("#name-student-add-modal");
const inputTextAgeStudent = document.querySelector("#age-student-add-modal");
const inputTextAddressStudent = document.querySelector(
  "#address-student-add-modal"
);

const textWarning = document.querySelector("#text-warning");
const modal = document.querySelector("#add-modal");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let idClass = +urlParams.get("class");
const studentData = JSON.parse(localStorage.getItem("students")).filter(
  (student) => student.idClass == idClass
);

// Show data

function showData(listObjects) {
  if (!listObjects.length) return;
  const keyObject = Object.keys(listObjects[0]);
  const table = document.querySelector("tbody");
  listObjects.forEach(function (object) {
    const newRow = document.createElement("tr");
    newRow.setAttribute("student-id", object[keyObject[0]]);

    handleShowData(object, keyObject, newRow);

    handleShowCheckbox(newRow);

    handleShowBtnEdit(newRow, object[keyObject[0]]);
    table.appendChild(newRow);
  });
}

function handleShowData(object, keyObject, newRow) {
  for (let i = 0; i < keyObject.length - 1; i++) {
    const newCell = document.createElement("th");
    newCell.setAttribute("scope", "col");
    const value = document.createTextNode(object[keyObject[i]]);
    newCell.appendChild(value);

    newRow.appendChild(newCell);
  }
}

function handleShowCheckbox(newRow) {
  const cellCheckbox = document.createElement("th");
  cellCheckbox.setAttribute("scope", "col");
  const checkbox = document.createElement("INPUT");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("form-check-input");

  cellCheckbox.appendChild(checkbox);

  newRow.appendChild(cellCheckbox);
}

function handleShowBtnEdit(newRow, idClass) {
  const cellBtnEdit = document.createElement("th");
  cellBtnEdit.setAttribute("scope", "col");
  const btnEdit = document.createElement("button");
  const newBtnText = document.createTextNode("Edit");
  btnEdit.appendChild(newBtnText);
  btnEdit.classList.add("edit-btn");
  btnEdit.setAttribute("onclick", `updateData(${idClass})`);
  cellBtnEdit.appendChild(btnEdit);

  newRow.appendChild(cellBtnEdit);
}

//handle select all
btnSelectAll.addEventListener("click", selectAll);
function selectAll() {
  const checkBoxs = document.querySelectorAll(".form-check-input");

  this.textContent === "Select All"
    ? (this.textContent = "Cancel All")
    : (this.textContent = "Select All");

  checkBoxs.forEach((checkbox) => {
    if (this.textContent === "Cancel All") checkbox.checked = true;
    else checkbox.checked = false;
  });
}

// Add data

function addData() {
  btnSubmit.addEventListener("click", () => {
    const nameStudent = inputTextNameStudent.value;
    const age = +inputTextAgeStudent.value;
    const address = inputTextAddressStudent.value;
    let listNewStudent = [];
    let students = JSON.parse(localStorage.getItem("students"));
    let id = students.length;
    ++id;

    if (age !== 0 && address !== "" && nameStudent !== "") {
      const newStudent = {
        id,
        nameStudent,
        age,
        address,
        idClass,
      };

      listNewStudent.push(newStudent);
      students.push(newStudent);

      modal.style.display = "none";
      localStorage.setItem("students", JSON.stringify(students));

      showData(listNewStudent);
      resetForm();
    } else {
      textWarning.innerHTML = " * * * Please type full information";
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
}

function resetForm() {
  textWarning.innerHTML = "";
  inputTextNameStudent.value = "";
  inputTextAgeStudent.value = "";
  inputTextAddressStudent.value = "";
}

// Handle event close modal
function closeModal() {
  btnsCloseModal.forEach(function (closeBtn) {
    closeBtn.onclick = function () {
      closeBtn.closest(".modal").style.display = "none";
    };
  });

  btnsCancelModal.forEach((btnCancel) => {
    btnCancel.addEventListener("click", (e) => {
      btnCancel.closest(".modal").style.display = "none";
    });
  });
}
closeModal();

showData(studentData);

addData();
