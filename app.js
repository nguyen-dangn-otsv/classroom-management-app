const inputTextIdClass = document.querySelector("#id-add");
const inputTextNameClass = document.querySelector("#class-name-add");
const textWarning = document.querySelector("#text-warning");
const btnCancel = document.querySelector("#btn-cancel-add");
const btnClose = document.querySelector("#btn-close-add");
const btnDel = document.querySelector(".delete-btn");
const btnSelectAll = document.querySelector(".select-all-btn");
const btnSubmit = document.querySelector("#btn-submit-add");
const btnsCancelModal = document.querySelectorAll(".btn--cancel-modal");
const btnsCloseModal = document.querySelectorAll(".btn--close-modal");
const modalDel = document.querySelector("#delete-modal");
const modalAdd = document.querySelector("#add-modal");
const modal = document.querySelector("#add-modal");
const searchInput = document.querySelector("#search-input");
const tableBody = document.querySelector("tbody");

localStorage.setItem("checkAddDuplicateData", "false");

let classrooms = [
  {
    idClass: 1,
    nameClass: "18TCLC_DT1",
  },
  {
    idClass: 2,
    nameClass: "18TCLC_DT2",
  },
  {
    idClass: 3,
    nameClass: "18TCLC_DT3",
  },
];

let students = [
  {
    id: 1,
    nameStudent: "Dang Nhat Nguyen",
    age: 20,
    address: "K7/12 Pasteur",
    idClass: 1,
  },
  {
    id: 2,
    nameStudent: "Tran Phuoc Thinh",
    age: 21,
    address: "k7/13 Pasteur",
    idClass: 1,
  },
  {
    id: 3,
    nameStudent: "Duong Van Chinh",
    age: 19,
    address: "k7/14 Pasteur",
    idClass: 2,
  },
];
let classroomsDataLocalStorage = saveData(classrooms, "classrooms");
let studentDataLocalStorage = saveData(students, "students");
function saveData(listObject, keyName) {
  let classroomsData;
  if (localStorage.getItem(keyName) == null) {
    localStorage.setItem(keyName, JSON.stringify(listObject));
    classroomsData = listObject;
  } else {
    classroomsData = JSON.parse(localStorage.getItem(keyName));
  }
  return classroomsData;
}

// Show data

function showData(listObjects) {
  if (!listObjects.length) return;
  const keyObject = Object.keys(listObjects[0]);
  const table = document.querySelector("tbody");
  listObjects.forEach(function (object) {
    const newRow = document.createElement("tr");
    newRow.setAttribute("class-id", object[keyObject[0]]);

    handleShowData(object, keyObject, newRow);

    handleShowCheckbox(newRow);

    handleShowBtnEdit(newRow, object[keyObject[0]]);
    newRow.setAttribute("onclick", `redirect(event,${object[keyObject[0]]})`);
    table.appendChild(newRow);
  });
}

function handleShowData(object, keyObject, newRow) {
  keyObject.forEach(function (key) {
    const newCell = document.createElement("th");
    newCell.setAttribute("scope", "col");
    const value = document.createTextNode(object[key]);
    newCell.appendChild(value);

    newRow.appendChild(newCell);
  });
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

function showAddModal() {
  modalAdd.style.display = "block";
}
// Update data

function updateData(idClass) {
  const modalEdit = document.querySelector("#edit-modal");

  const btnSubmitEdit = document.querySelector("#btn-submit-edit");
  const inputTextNameClassModal = document.querySelector("#class-name");
  const tableBody = document.querySelector("tbody");

  const classrooms = JSON.parse(localStorage.getItem("classrooms"));
  const idxClassroom = classrooms.findIndex(
    (classroom) => classroom.idClass == idClass
  );

  const row = tableBody.childNodes[idxClassroom];

  const cellNameClass = row.childNodes[1];
  inputTextNameClassModal.value = classrooms[idxClassroom].nameClass;

  modalEdit.style.display = "block";

  btnSubmitEdit.onclick = function () {
    classrooms[idxClassroom].nameClass = inputTextNameClassModal.value;
    cellNameClass.innerText = inputTextNameClassModal.value;

    modalEdit.style.display = "none";

    localStorage.setItem("classrooms", JSON.stringify(classrooms));
  };
}

// Add data

function addData() {
  btnSubmit.addEventListener("click", () => {
    const idClass = +inputTextIdClass.value;
    const nameClass = inputTextNameClass.value;
    let listNewObjects = [];
    let classrooms = JSON.parse(localStorage.getItem("classrooms"));
    if (idClass !== 0 && nameClass !== "") {
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
        localStorage.setItem("classrooms", JSON.stringify(classrooms));
        resetForm();
        showData(listNewObjects);
      }
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
function resetCheckboxs() {
  const checkBoxs = document.querySelectorAll(".form-check-input");
  checkBoxs.forEach((checkBox) => {
    if (checkBox.checked){checkBox.checked = false}
  })
}
function checkChecked(){
  const checkBoxs = document.querySelectorAll(".form-check-input");
  let isChecked = true
  for (let i = 0; i < checkBoxs.length; i++){
    if (checkBoxs[i].checked == false) {
      isChecked = false;
      break;
    }
  }
  btnSelectAll.textContent = isChecked ? "Cancel All": "Select All" ;
}

//Select all
function selectAll() {
  const checkBoxs = document.querySelectorAll(".form-check-input");
  btnSelectAll.textContent = btnSelectAll.textContent.trim() === "Select All" ? "Cancel All": "Select All"
  checkBoxs.forEach((checkbox) => {
    if (btnSelectAll.textContent === "Cancel All") checkbox.checked = true;
    else checkbox.checked = false;
  });
}
// Delete data
function checkDataDelete(listObject) {
  let checkBoxs = document.querySelectorAll("input[type = checkbox]");
  if (checkBoxs) {
    let delData = [];
    checkBoxs.forEach(function (checkbox) {
      if (checkbox.checked == true) {
        let delRow = checkbox.closest("tr");
        let rowID = delRow.getAttribute("class-id");
        let delClass = listObject.find(function (object) {
          return object.idClass == rowID;
        });
        delData.push(delClass);
      }
    });
    return delData;
  }
}
function handleDeleteData() {
  const delMessage = modalDel.querySelector(".modal-body-message");
  const delTable = modalDel.querySelector("tbody");
  const submitBtn = modalDel.querySelector(".btn--submit-modal");
  let delData = checkDataDelete(JSON.parse(localStorage.getItem("classrooms")));

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
    let newClassroom = deleteData(
      JSON.parse(localStorage.getItem("classrooms"))
    );
    localStorage.setItem("classrooms", JSON.stringify(newClassroom));
    const newStudents = deleteAllStudents(delData)
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
        let rowID = delRow.getAttribute("class-id");
        let delClass = listObject.find(function (object) {
          return object.idClass == rowID;
        });
        listObject.splice(listObject.indexOf(delClass), 1);
        delRow.remove();
      }
    });
    return listObject;
  }
}

function deleteAllStudents(listDeletedClasses) {
  const students = JSON.parse(localStorage.getItem('students'))
  const deletedStudents = listDeletedClasses.reduce(function(delStudents,deletedClass) {
    const del = students.filter(function(student) {return student.idClass === deletedClass.idClass})
    return delStudents.concat(del)
  },[])
  deletedStudents.forEach(function(deletedStudent){
    students.splice(students.indexOf(deletedStudent),1)
  })
  return students
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

function searchData(e){
  // console.log(e.target.value)
  const classList = JSON.parse(localStorage.getItem("classrooms"))
  if (e.target.value.trim().length){
    const searchClasses = classList.filter((Class) => Class.idClass.toString().includes(e.target.value.trim()))
    tableBody.innerHTML = ""
    showData(searchClasses)
  }
  else{
    tableBody.innerHTML = ""
    showData(classList)
  }
}

function redirect(e,idClass) {
  // const row = document.querySelector(`tr[class-id="${idClass}"]`);
  e = e || window.event;
  // const idClass = row.getAttribute("class-id");
  if (!e.target.matches('input[type = "checkbox"]') && !e.target.matches(".edit-btn")) {
    resetCheckboxs()
    window.location.href = `./student.html?class=${idClass}`;
  }
}

showData(classroomsDataLocalStorage);
checkChecked()
addData();
closeModal();
