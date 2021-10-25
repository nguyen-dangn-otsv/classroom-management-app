// Import from ./modules
import { showData, handleShowData } from "./modules/readData.js";
import { updateData } from "./modules/updateData.js";
import {checkDataDelete, deleteData } from "./modules/deleteData.js"
import { saveData } from "./modules/saveData.js"

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




//Save data (local storage)
let classroomsData = saveData(classrooms, "classrooms") 

// Show classrooms
showData(classroomsData);

// Update classrooms
updateData(classroomsData);

// Add classrooms

// Close form

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

//handle delete data
var modalDel = document.querySelector("#delete-modal");
var btnDel = document.querySelector(".delete-btn");
btnDel.onclick = function () {
  // pop up delete modal
  modalDel.style.display = "block";

  // load delData into modal
  let delMessage = modalDel.querySelector(".modal-body-message");
  let delTable = modalDel.querySelector("tbody");
  delTable.innerHTML = ""
  let delData = checkDataDelete(classroomsData)
  console.log(delData);
  if (!delData.length) {
    delMessage.textContent = "Nothing to delete !!!!"
  }
  else{
    delMessage.innerText = "Do you sure to delete"
    var keyObject = Object.keys(delData[0]); 
    delData.forEach(function (object) {
      var newRow = document.createElement("tr");
      handleShowData(object,keyObject, newRow)

      delTable.appendChild(newRow);

  })
  }
  // submit delete
  let submitBtn = modalDel.querySelector('.btn--submit-modal')
  submitBtn.onclick = function () {
    let newClassroom = deleteData(classroomsData)
    localStorage.setItem('classrooms', JSON.stringify(newClassroom))
    modalDel.style.display = "none"
  }
  
};

//handle show student in a class (redirect student page)
let classRows = document.querySelectorAll("tbody tr")
classRows.forEach(function (row) {
  row.onclick =  (e) => {
    if (!e.target.closest('input[type = "checkbox"]') &&  !e.target.closest(".edit-btn")){
      console.log(row.getAttribute("class-id"))
      const classID = row.getAttribute("class-id")
      window.location.href= `./student.html?class=${classID}`
    }
  }
})

