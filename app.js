// Import from ./modules
import { showData } from "./modules/readData.js";
import { updateData } from "./modules/updateData.js";
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

// Hidden form modal

// Show classrooms
showData(classrooms);

// Update classrooms
updateData(classrooms);

// Add classrooms

// Close form

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
