// Import from ./modules
import { showData, handleShowData } from "./modules/readData.js";
import { updateData } from "./modules/updateData.js";
import { checkDataDelete, deleteData } from "./modules/deleteData.js";
import { saveData } from "./modules/saveData.js";
import { addData } from "./modules/addData.js";



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

//get class id
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
console.log(typeof urlParams.get('class'));



let btnsCancelModal = document.querySelectorAll(".btn--cancel-modal");
let btnsCloseModal = document.querySelectorAll(".btn--close-modal");

//handle select all 
var btnAll = document.querySelector(".select-all-btn");
var checkboxs = document.querySelectorAll(".form-check-input");
btnAll.onclick = function () {
  btnAll.textContent === "Select All"
    ? btnAll.textContent = "Cancel All"
    : btnAll.textContent = "Select All";
    console.log(btnAll.textContent);
    checkboxs.forEach(function (checkbox) {
      if (btnAll.textContent === "Cancel All") checkbox.checked = true;
      else checkbox.checked = false;
      console.log(btnAll.textContent);
    });
};

// handle button modal close button 
btnsCloseModal.forEach(function (closeBtn) {
  closeBtn.onclick = function () {
    closeBtn.closest(".modal").style.display = "none";
  };
});

// handle button modal cancel button 
btnsCancelModal.forEach((btnCancel) => {
  btnCancel.addEventListener("click", (e) => {
    btnCancel.closest(".modal").style.display = "none";
  });
});