// import { showData, handleShowData } from "./modules/readData.js";
// import { updateData } from "./modules/updateData.js";
// import { checkDataDelete, deleteData } from "./modules/deleteData.js";
// import { saveData } from "./modules/saveData.js";
// import { addData } from "./modules/addData.js";

let btnsCancelModal = document.querySelectorAll(".btn--cancel-modal");
let btnsCloseModal = document.querySelectorAll(".btn--close-modal");

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
  },
  {
    id: 2,
    nameStudent: "Tran Phuoc Thinh",
    age: 21,
    address: "k7/13 Pasteur",
  },
  {
    id: 3,
    nameStudent: "Duong Van Chinh",
    age: 19,
    address: "k7/14 Pasteur",
  },
];

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

let classroomsDataLocalStorage = saveData(classrooms, "classrooms");
localStorage.setItem("checkAddDuplicateData", "false");

// showData(classroomsDataLocalStorage);

function showData(listObjects) {
  if (!listObjects.length) return; // check if listObject is empty
  var keyObject = Object.keys(listObjects[0]);
  var table = document.querySelector("tbody");
  listObjects.forEach(function (object) {
    // Create new row
    var newRow = document.createElement("tr");
    newRow.setAttribute("class-id", object[keyObject[0]]);

    // Create new column base object
    handleShowData(object, keyObject, newRow);

    // Add column checkbox
    handleShowCheckbox(newRow);
    // Add column button edit
    handleShowBtnEdit(newRow, object[keyObject[0]]);

    table.appendChild(newRow);
  });
}

// Add data into table
function handleShowData(object, keyObject, newRow) {
  keyObject.forEach(function (key) {
    var newCell = document.createElement("th");
    newCell.setAttribute("scope", "col");
    var value = document.createTextNode(object[key]);
    newCell.appendChild(value);

    newRow.appendChild(newCell);
  });
}
// Add chekcbox into table
function handleShowCheckbox(newRow) {
  var cellCheckbox = document.createElement("th");
  cellCheckbox.setAttribute("scope", "col");
  var checkbox = document.createElement("INPUT");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("form-check-input");

  cellCheckbox.appendChild(checkbox);

  newRow.appendChild(cellCheckbox);
}
// Add edit button into table
function handleShowBtnEdit(newRow, idClass) {
  var cellBtnEdit = document.createElement("th");
  cellBtnEdit.setAttribute("scope", "col");
  var btnEdit = document.createElement("button");
  var newBtnText = document.createTextNode("Edit");
  btnEdit.appendChild(newBtnText);
  btnEdit.classList.add("edit-btn");
  btnEdit.setAttribute("onclick", `updateData(${idClass})`);
  cellBtnEdit.appendChild(btnEdit);

  newRow.appendChild(cellBtnEdit);
}

showData(classroomsDataLocalStorage);

// updateData(classroomsDataLocalStorage);

function updateData(idClass) {
  const modalEdit = document.querySelector("#edit-modal");

  const btnSubmitEdit = document.querySelector("#btn-submit-edit");
  const inputTextNameClassModal = document.querySelector("#class-name");
  const tableBody = document.querySelector("tbody");
  console.log(tableBody.childNodes.length);
  const classrooms = JSON.parse(localStorage.getItem("classrooms"));
  const idxClassroom = classrooms.findIndex(
    (classroom) => classroom.idClass == idClass
  );
  console.log(idxClassroom);
  const cellNameClass = tableBody.childNodes[idxClassroom].childNodes[1];

  inputTextNameClassModal.value = classrooms[idxClassroom].nameClass;

  modalEdit.style.display = "block";

  btnSubmitEdit.onclick = function () {
    classrooms[idxClassroom].nameClass = inputTextNameClassModal.value;
    cellNameClass.innerText = inputTextNameClassModal.value;

    modalEdit.style.display = "none";

    localStorage.setItem("classrooms", JSON.stringify(classrooms));
  };
}

const modal = document.querySelector("#add-modal");
const btnSubmit = document.querySelector("#btn-submit-add");
const inputTextIdClass = document.querySelector("#id-add");
const inputTextNameClass = document.querySelector("#class-name-add");
const textWarning = document.querySelector("#text-warning");
const btnCancel = document.querySelector("#btn-cancel-add");
const btnClose = document.querySelector("#btn-close-add");

function addData(classrooms) {
  btnSubmit.addEventListener("click", () => {
    const idClass = +inputTextIdClass.value;
    const nameClass = inputTextNameClass.value;
    console.log(inputTextIdClass.value, inputTextNameClass.value);
    let listNewObjects = [];

    const isMatch = classrooms.find(
      (classroom) => classroom.idClass == idClass
    );

    if (isMatch) {
      if (localStorage.getItem("checkAddDuplicateData") == "false") {
        textWarning.innerHTML = " * * * Please type another ID";
        console.log("abc");
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
addData(classroomsDataLocalStorage);

// Delete data
const btnAll = document.querySelector(".select-all-btn");
const checkboxs = document.querySelectorAll(".form-check-input");
btnAll.onclick = function () {
  btnAll.textContent === "Select All"
    ? (btnAll.textContent = "Cancel All")
    : (btnAll.textContent = "Select All");

  checkboxs.forEach(function (checkbox) {
    if (btnAll.textContent === "Cancel All") checkbox.checked = true;
    else checkbox.checked = false;
  });
};

// handle button modal close button
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

const modalDel = document.querySelector("#delete-modal");
const btnDel = document.querySelector(".delete-btn");
btnDel.onclick = function () {
  modalDel.style.display = "block";

  const delMessage = modalDel.querySelector(".modal-body-message");
  const delTable = modalDel.querySelector("tbody");
  delTable.innerHTML = "";
  let delData = checkDataDelete(classroomsDataLocalStorageData);

  if (!delData.length) {
    delMessage.textContent = "Nothing to delete !!!!";
  } else {
    delMessage.innerText = "Do you sure to delete";
    const keyObject = Object.keys(delData[0]);
    delData.forEach(function (object) {
      const newRow = document.createElement("tr");
      handleShowData(object, keyObject, newRow);

      delTable.appendChild(newRow);
    });
  }

  const submitBtn = modalDel.querySelector(".btn--submit-modal");
  submitBtn.onclick = function () {
    let newClassroom = deleteData(classroomsDataLocalStorageData);
    localStorage.setItem("classrooms", JSON.stringify(newClassroom));
    modalDel.style.display = "none";
  };
};

//handle show student in a class (redirect student page)
let classRows = document.querySelectorAll("tbody tr");
classRows.forEach(function (row) {
  row.onclick = (e) => {
    if (
      !e.target.closest('input[type = "checkbox"]') &&
      !e.target.closest(".edit-btn")
    ) {
      console.log(row.getAttribute("class-id"));
      const idClass = row.getAttribute("class-id");
      window.location.href = `./student.html?class=${idClass}`;
    }
  };
});
