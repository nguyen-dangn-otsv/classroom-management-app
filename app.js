import { showData, handleShowData } from "./modules/readData.js";
import { updateData } from "./modules/updateData.js";
import { checkDataDelete, deleteData } from "./modules/deleteData.js";
import { saveData } from "./modules/saveData.js";
import { addData } from "./modules/addData.js";

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

let classroomsDataLocalStorageData = saveData(classrooms, "classrooms");
localStorage.setItem("checkAddDuplicateData", "false");

showData(classroomsDataLocalStorageData);

updateData(classroomsDataLocalStorageData);

addData(classroomsDataLocalStorageData);

var btnAll = document.querySelector(".select-all-btn");
var checkboxs = document.querySelectorAll(".form-check-input");
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
  let delData = checkDataDelete(classroomsData);

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
    let newClassroom = deleteData(classroomsData);
    localStorage.setItem("classrooms", JSON.stringify(newClassroom));
    modalDel.style.display = "none";
  };
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

