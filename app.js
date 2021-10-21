// Import from ./modules
import { showData } from "./modules/readData.js";
import { updateData } from "./modules/updateData.js";

// Fake data for classrooms
var classrooms = [
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

// Fake data for students
var students = [
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

// Show list classrooms
document.querySelector("body").onload = showData(classrooms);

// Popup form for edit classrooms
var modalEdit = document.querySelector("#edit-modal");
var btnEdits = document.querySelectorAll(".edit-btn");
btnEdits.forEach(function (btnEdit) {
  btnEdit.onclick = function () {
    modalEdit.style.display = "block";
    console.log(this);
  };
});

var checkboxs = document.querySelectorAll(".form-check-input");
btnAll.onclick = function () {
  btnAll.textContent == "Select All"
    ? (btnAll.textContent = "Cancel All")
    : (btnAll.textContent = "Select All");
  checkboxs.forEach(function (checkbox) {
    if (btnAll.textContent == "Cancel All") checkbox.checked = true;
    else checkbox.checked = false;
  });
};
