// Import from ./modules
import { showData, handleShowData } from "./modules/readData.js";
import { updateData } from "./modules/updateData.js";
import { checkDataDelete, deleteData } from "./modules/deleteData.js";
import { saveData } from "./modules/saveData.js";
import { addData } from "./modules/addData.js";

let btnsCancelModal = document.querySelectorAll(".btn--cancel-modal");
let btnsCloseModal = document.querySelectorAll(".btn--close-modal");

// Mock data for classrooms
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

// Mock data for students
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

//Save data (local storage)
let classroomsData = saveData(classrooms, "classrooms");
localStorage.setItem("checkAddDuplicateData", "false");

// Show classrooms
showData(classroomsData);

// Update classrooms
updateData(classroomsData);

// Add classrooms
addData(classrooms);

// Close form

//handle select all
var btnAll = document.querySelector(".select-all-btn");
var checkboxs = document.querySelectorAll(".form-check-input");
btnAll.onclick = function () {
  btnAll.textContent === "Select All"
    ? (btnAll.textContent = "Cancel All")
    : (btnAll.textContent = "Select All");
  console.log(btnAll.textContent);
  checkboxs.forEach(function (checkbox) {
    if (btnAll.textContent === "Cancel All") checkbox.checked = true;
    else checkbox.checked = false;
    console.log(btnAll.textContent);
  });
};

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

//handle delete data
var modalDel = document.querySelector("#delete-modal");
var btnDel = document.querySelector(".delete-btn");
btnDel.onclick = function () {
  // pop up delete modal
  modalDel.style.display = "block";

  // load delData into modal
  let delMessage = modalDel.querySelector(".modal-body-message");
  let delTable = modalDel.querySelector("tbody");
  delTable.innerHTML = "";
  let delData = checkDataDelete(classroomsData);
  console.log(delData);
  if (!delData.length) {
    delMessage.textContent = "Nothing to delete !!!!";
  } else {
    delMessage.innerText = "Do you sure to delete";
    var keyObject = Object.keys(delData[0]);
    delData.forEach(function (object) {
      var newRow = document.createElement("tr");
      handleShowData(object, keyObject, newRow);

      delTable.appendChild(newRow);
    });
  }
  // submit delete
  let submitBtn = modalDel.querySelector(".btn--submit-modal");
  submitBtn.onclick = function () {
    let newClassroom = deleteData(classroomsData);
    localStorage.setItem("classrooms", JSON.stringify(newClassroom));
    modalDel.style.display = "none";
  };
};
