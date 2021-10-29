const btnsCancelModal = document.querySelectorAll(".btn--cancel-modal");
const btnsCloseModal = document.querySelectorAll(".btn--close-modal");
const btnSelectAll = document.querySelector(".select-all-btn");
const btnSubmit = document.querySelector("#btn-submit-add");
const btnCancel = document.querySelector("#btn-cancel-add");
const btnClose = document.querySelector("#btn-close-add");
const btnCloseEdit = document.querySelector("#btn-close-edit");
const btnCancelEdit = document.querySelector("#btn-cancel-edit");
const btnSubmitEdit = document.querySelector("#btn-submit-edit");
const tableBody = document.querySelector("tbody");
const modalDel = document.querySelector("#delete-modal");
const modalAdd = document.querySelector("#add-modal");
const modalDetail = document.querySelector("#detail-modal");
const inputTextNameStudent = document.querySelector("#name-student-add-modal");
const inputTextAgeStudent = document.querySelector("#age-student-add-modal");
const inputTextAddressStudent = document.querySelector(
  "#address-student-add-modal"
);
const inputTextNameStudentEditModal = document.querySelector("#name-student");
const inputTextAgeStudentEditModal = document.querySelector("#age-student");
const inputTextAddressStudentEditModal =
  document.querySelector("#address-student");
const modalShowDetail = document.querySelector("#detail-modal");
const modalEdit = document.querySelector("#edit-modal");
const modal = document.querySelector("#add-modal");
const textWarningUpdate = document.querySelector("#text-warning-update");
const textWarningAdd = document.querySelector("#text-warning-add");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let idClass = +urlParams.get("class");
const studentData = JSON.parse(localStorage.getItem("students")).filter(
  (student) => student.idClass == idClass
);

function loadHeader() {
  const header = document.querySelector(".header-center > h1");
  const nameClass = JSON.parse(localStorage.getItem("classrooms")).find(
    (Class) => Class.idClass == idClass
  ).nameClass;
  header.innerText = "Students Of Class " + nameClass;
}
loadHeader();
// Show list student

function showData(listStudents) {
  if (!listStudents.length) return;
  const key = Object.keys(listStudents[0]);
  const table = document.querySelector("tbody");
  listStudents.forEach(function (student) {
    const newRow = document.createElement("tr");
    newRow.setAttribute("student-id", student[key[0]]);

    handleShowData(student, key, newRow);

    handleShowCheckbox(newRow);

    handleShowBtnEdit(newRow, student[key[0]]);

    handleShowBtnDetail(newRow, student[key[0]]);
    table.appendChild(newRow);
  });
}

function handleShowData(student, key, newRow) {
  const size = ["5%", "30%", "10%", "10%"];
  for (let i = 0; i < key.length - 1; i++) {
    const newCell = document.createElement("th");
    newCell.setAttribute("scope", "col");
    newCell.style.width = size[i];
    const value = document.createTextNode(student[key[i]]);
    newCell.appendChild(value);

    newRow.appendChild(newCell);
  }
}

function handleShowCheckbox(newRow) {
  const cellCheckbox = document.createElement("th");
  const checkbox = document.createElement("INPUT");

  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("onclick", "checkChecked()");
  checkbox.classList.add("form-check-input");
  cellCheckbox.setAttribute("scope", "col");
  cellCheckbox.appendChild(checkbox);

  newRow.appendChild(cellCheckbox);
}

function handleShowBtnEdit(newRow, idClass) {
  const cellBtnEdit = document.createElement("th");
  const btnEdit = document.createElement("button");

  btnEdit.innerHTML = '<i class="fas fa-edit">';
  btnEdit.classList.add("btn");
  btnEdit.setAttribute("onclick", `updateData(${idClass})`);
  cellBtnEdit.setAttribute("scope", "col");
  cellBtnEdit.appendChild(btnEdit);

  newRow.appendChild(cellBtnEdit);
}

function handleShowBtnDetail(newRow, id) {
  const cellBtnDetail = document.createElement("th");
  const btnDetail = document.createElement("button");
  btnDetail.innerHTML = `<i class="fa fa-eye"></i>`;
  btnDetail.setAttribute("onclick", `showDetail(${id})`);
  btnDetail.classList.add("btn");
  cellBtnDetail.setAttribute("scope", "col");
  cellBtnDetail.appendChild(btnDetail);
  newRow.appendChild(cellBtnDetail);
}
function iconChecked() {
  const iconChecked = document.createElement("i");
  iconChecked.setAttribute("class", "fas fa-check");
  iconChecked.setAttribute("aria-hidden", "true");
  return iconChecked;
}
function iconUnchecked() {
  const iconUnchecked = document.createElement("i");
  iconUnchecked.setAttribute("class", "fas fa-times");
  iconUnchecked.setAttribute("aria-hidden", "true");
  return iconUnchecked;
}

function showAddModal() {
  modalAdd.style.display = "block";
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
  const iconCheck = isChecked ? iconUnchecked() : iconChecked();
  btnSelectAll.firstElementChild.replaceWith(iconCheck);
}

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

function selectAll() {
  const checkBoxs = document.querySelectorAll(".form-check-input");
  const iconCheck =
    btnSelectAll.firstElementChild.className === "fas fa-check"
      ? iconUnchecked()
      : iconChecked();
  btnSelectAll.firstElementChild.replaceWith(iconCheck);
  checkBoxs.forEach((checkbox) => {
    if (btnSelectAll.firstElementChild.className === "fas fa-times")
      checkbox.checked = true;
    else checkbox.checked = false;
  });
}

// Add data

function addData() {
  btnSubmit.addEventListener("click", () => {
    const nameStudent = inputTextNameStudent.value.trim();
    const address = inputTextAddressStudent.value.trim();
    let listNewStudent = [];
    let students = JSON.parse(localStorage.getItem("students"));
    let id = students.length == 0 ? 0 : students[students.length - 1].id;
    ++id;
    const age = Number(inputTextAgeStudent.value);
    if (Number.isNaN(age) || !Number.isInteger(age)) {
      textWarningAdd.innerHTML = "Please fill Age by a number !!!!!!";
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
        checkChecked();
        resetForm();
      } else {
        textWarningAdd.innerHTML = "Please type full information !!!!!!";
      }
    }
  });
}
function closeAddModal() {
  resetForm();
  modal.style.display = "none";
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
    if (
      !Number.isNaN(age) &&
      Number.isInteger(age) &&
      inputTextNameStudentEditModal.value.trim() !== "" &&
      inputTextAddressStudentEditModal.value.trim() !== "" &&
      inputTextAgeStudentEditModal.value.trim() !== ""
    ) {
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
      textWarningUpdate.innerHTML = "Please Fill Correct Format";
    }
  };
}
function closeEditModal() {
  textWarningUpdate.innerHTML = "";
  modalEdit.style.display = "none";
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

function closeDeleteModal() {
  modalDel.style.display = "none";
}

function searchData(e) {
  const studentData = JSON.parse(localStorage.getItem("students")).filter(
    (student) => student.idClass == idClass
  );
  if (e.target.value.trim().length) {
    const searchStudents = studentData.filter((student) =>
      student.id.toString().includes(e.target.value.trim())
    );
    tableBody.innerHTML = "";
    showData(searchStudents);
    checkChecked();
  } else {
    tableBody.innerHTML = "";
    showData(studentData);
    checkChecked();
  }
}
function searchDataByName(e) {
  const messageRow = document.createElement("tr");
  const messageH3 = document.createElement("h3");
  messageH3.style.color = "red";
  const message = document.createTextNode("There is no data to show");
  messageH3.appendChild(message);
  messageRow.appendChild(messageH3);
  const studentData = JSON.parse(localStorage.getItem("students")).filter(
    (student) => student.idClass == idClass
  );
  if (e.target.value.trim().length) {
    const searchStudents = studentData.filter((student) =>
      student.nameStudent
        .toString()
        .toLowerCase()
        .includes(e.target.value.trim().toLowerCase())
    );
    if (searchStudents.length) {
      tableBody.innerHTML = "";
      showData(searchStudents);
      checkChecked();
    } else {
      tableBody.innerHTML = "";
      tableBody.appendChild(messageRow);
    }
  } else {
    tableBody.innerHTML = "";
    showData(studentData);
    checkChecked();
  }
}

function closeDetailModal() {
  modalDetail.style.display = "none";
}

showData(studentData);

addData();

checkChecked();
