const btnsCancelModal = document.querySelectorAll(".btn--cancel-modal");
const btnsCloseModal = document.querySelectorAll(".btn--close-modal");
const btnSelectAll = document.querySelector(".select-all-btn");
const btnSubmit = document.querySelector("#btn-submit-add");
const btnCancel = document.querySelector("#btn-cancel-add");
const btnClose = document.querySelector("#btn-close-add");
const btnCloseEdit = document.querySelector("#btn-close-edit");
const btnCancelEdit = document.querySelector("#btn-cancel-edit");
const btnSubmitEdit = document.querySelector("#btn-submit-edit");
const modalDel = document.querySelector("#delete-modal");
const inputTextNameStudent = document.querySelector("#name-student-add-modal");
const inputTextAgeStudent = document.querySelector("#age-student-add-modal");
const inputTextAddressStudent = document.querySelector(
  "#address-student-add-modal"
);
const inputTextNameStudentEditModal = document.querySelector("#name-student");
const inputTextAgeStudentEditModal = document.querySelector("#age-student");
const inputTextAddressStudentEditModal =
  document.querySelector("#address-student");

const modalEdit = document.querySelector("#edit-modal");
const modal = document.querySelector("#add-modal");

const tableBody = document.querySelector("tbody");
const textWarningUpdate = document.querySelector("#text-warning-update");
const textWarningAdd = document.querySelector("#text-warning-add");
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

    handleShowBtnDetail(newRow, object[keyObject[0]]);
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
  checkbox.setAttribute("onclick", "checkChecked()");
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

function handleShowBtnDetail(newRow, id) {
  const cellBtnDetail = document.createElement("th");
  const btnDetail = document.createElement("button");
  btnDetail.innerHTML = `<i class="fa fa-eye"></i>`;
  btnDetail.setAttribute("onclick", `showDetail(${id})`);
  cellBtnDetail.setAttribute("scope", "col");
  cellBtnDetail.appendChild(btnDetail);
  newRow.appendChild(cellBtnDetail);
}
function checkChecked() {
  const checkBoxs = document.querySelectorAll(".form-check-input");
  let isChecked = true;

  for (let i = 0; i < checkBoxs.length; i++) {
    if (checkBoxs[i].checked == false) {
      isChecked = false;
      break;
    }
  }
  btnSelectAll.textContent = isChecked ? "Cancel All" : "Select All";
}
const modalShowDetail = document.querySelector("#detail-modal");

function showDetail(id) {
  const nameStudent = document.querySelector(".modal-title > p");
  const idStudent = document.querySelector("#id-student-detail-modal");
  const name = document.querySelector("#name-student-detail-modal");
  const age = document.querySelector("#age-student-detail-modal");
  const address = document.querySelector("#address-student-detail-modal");
  const nameClass = document.querySelector("#name-class-detail-modal");

  const students = JSON.parse(localStorage.getItem("students"));
  const classrooms = JSON.parse(localStorage.getItem("classrooms"));
  const student = students.find((student) => student.id == id);

  nameStudent.innerHTML = student.nameStudent;
  idStudent.value = student.id;
  name.value = student.nameStudent;
  age.value = student.age;
  address.value = student.address;
  nameClass.value = classrooms.find(
    (classroom) => classroom.idClass == student.idClass
  ).nameClass;
  modalShowDetail.style.display = "block";
}

//Handle select all
function selectAll() {
  const checkBoxs = document.querySelectorAll(".form-check-input");
  btnSelectAll.textContent.trim() === "Select All"
    ? (btnSelectAll.textContent = "Cancel All")
    : (btnSelectAll.textContent = "Select All");

  checkBoxs.forEach((checkbox) => {
    if (btnSelectAll.textContent === "Cancel All") checkbox.checked = true;
    else checkbox.checked = false;
  });
}

// Add data

function addData() {
  btnSubmit.addEventListener("click", () => {
    const nameStudent = inputTextNameStudent.value;
    const address = inputTextAddressStudent.value;
    let listNewStudent = [];
    let students = JSON.parse(localStorage.getItem("students"));
    let id = students.length == 0 ? 0 : students[students.length - 1].id;
    ++id;
    const age = Number(inputTextAgeStudent.value);
    if (Number.isNaN(age) || !Number.isInteger(age)) {
      textWarningAdd.innerHTML = " * * * Please fill Age by a number";
    } else {
      if (
        inputTextAgeStudent.value !== "" &&
        address !== "" &&
        nameStudent !== ""
      ) {
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
        textWarningAdd.innerHTML = " * * * Please type full information";
      }
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
  textWarningAdd.innerHTML = "";
  inputTextNameStudent.value = "";
  inputTextAgeStudent.value = "";
  inputTextAddressStudent.value = "";
}

// Update

function updateData(id) {
  const studentsLocalStorage = JSON.parse(localStorage.getItem("students"));
  const students = studentsLocalStorage.filter(
    (student) => student.idClass == idClass
  );
  const idxStudentLocalStorage = studentsLocalStorage.findIndex(
    (student) => student.id == id
  );
  const idxStudent = students.findIndex((student) => student.id == id);

  const row = tableBody.childNodes[idxStudent];
  const cellNameStudent = row.childNodes[1];
  const cellAgeStudent = row.childNodes[2];
  const cellAddressStudent = row.childNodes[3];

  inputTextNameStudentEditModal.value = students[idxStudent].nameStudent;
  inputTextAgeStudentEditModal.value = students[idxStudent].age;
  inputTextAddressStudentEditModal.value = students[idxStudent].address;

  modalEdit.style.display = "block";

  btnSubmitEdit.onclick = function () {
    let age = Number(inputTextAgeStudentEditModal.value);
    if (!Number.isNaN(age) && Number.isInteger(age)) {
      studentsLocalStorage[idxStudentLocalStorage].nameStudent =
        inputTextNameStudentEditModal.value;
      studentsLocalStorage[idxStudentLocalStorage].age =
        +inputTextAgeStudentEditModal.value;
      studentsLocalStorage[idxStudentLocalStorage].address =
        inputTextAddressStudentEditModal.value;

      cellNameStudent.innerText = inputTextNameStudentEditModal.value;
      cellAgeStudent.innerText = inputTextAgeStudentEditModal.value;
      cellAddressStudent.innerText = inputTextAddressStudentEditModal.value;

      modalEdit.style.display = "none";
      textWarningUpdate.innerHTML = "";
      localStorage.setItem("students", JSON.stringify(studentsLocalStorage));
    } else {
      textWarningUpdate.innerHTML = "Please fill Age by a number";
    }
  };
}
// Delete data
function checkDataDelete(listObject) {
  let checkBoxs = document.querySelectorAll("input[type = checkbox]");
  if (checkBoxs) {
    let delData = [];
    checkBoxs.forEach(function (checkbox) {
      if (checkbox.checked == true) {
        let delRow = checkbox.closest("tr");
        let rowID = delRow.getAttribute("student-id");
        let delStudent = listObject.find(function (object) {
          return object.id == rowID;
        });
        delData.push(delStudent);
      }
    });
    return delData;
  }
}
function handleDeleteData() {
  const delMessage = modalDel.querySelector(".modal-body-message");
  const delTable = modalDel.querySelector("tbody");
  const submitBtn = modalDel.querySelector(".btn--submit-modal");
  let delData = checkDataDelete(JSON.parse(localStorage.getItem("students")));

  modalDel.style.display = "block";
  delTable.innerHTML = "";
  if (!delData.length) {
    delMessage.textContent = "Nothing to delete !!!!";
  } else {
    const keyObject = Object.keys(delData[0]);
    delMessage.innerText = "Do you sure to delete";
    delData.forEach(function (object) {
      const newRow = document.createElement("tr");
      handleShowData(object, keyObject, newRow);
      delTable.appendChild(newRow);
    });
  }

  submitBtn.onclick = function () {
    let newStudents = deleteData(JSON.parse(localStorage.getItem("students")));
    localStorage.setItem("students", JSON.stringify(newStudents));
    modalDel.style.display = "none";
  };
}

function deleteData(listObject) {
  let checkBoxs = document.querySelectorAll("input[type = checkbox]");
  if (checkBoxs) {
    checkBoxs.forEach(function (checkbox) {
      if (checkbox.checked == true) {
        let delRow = checkbox.closest("tr");
        let rowID = delRow.getAttribute("student-id");
        let delClass = listObject.find(function (object) {
          return object.id == rowID;
        });
        listObject.splice(listObject.indexOf(delClass), 1);
        delRow.remove();
      }
    });
    return listObject;
  }
}
// Handle event close modal
function closeModal() {
  btnsCloseModal.forEach(function (closeBtn) {
    closeBtn.onclick = function () {
      closeBtn.closest(".modal").style.display = "none";
      textWarningUpdate.innerHTML = "";
    };
  });

  btnsCancelModal.forEach((btnCancel) => {
    btnCancel.addEventListener("click", (e) => {
      btnCancel.closest(".modal").style.display = "none";
      textWarningUpdate.innerHTML = "";
    });
  });
}
closeModal();

showData(studentData);

addData();

checkChecked();
