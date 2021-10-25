//show data
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
    handleShowBtnEdit(newRow);

    table.appendChild(newRow);
  });
}

export function handleShowData(object, keyObject, newRow) {
  keyObject.forEach(function (key) {
    var newCell = document.createElement("th");
    newCell.setAttribute("scope", "col");
    var value = document.createTextNode(object[key]);
    newCell.appendChild(value);

    newRow.appendChild(newCell);
  });
}

function handleShowCheckbox(newRow) {
  var cellCheckbox = document.createElement("th");
  cellCheckbox.setAttribute("scope", "col");
  var checkbox = document.createElement("INPUT");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("form-check-input");

  cellCheckbox.appendChild(checkbox);

  newRow.appendChild(cellCheckbox);
}
function handleShowBtnEdit(newRow) {
  var cellBtnEdit = document.createElement("th");
  cellBtnEdit.setAttribute("scope", "col");
  var btnEdit = document.createElement("button");
  var newBtnText = document.createTextNode("Edit");
  btnEdit.appendChild(newBtnText);
  btnEdit.classList.add("edit-btn");

  cellBtnEdit.appendChild(btnEdit);

  newRow.appendChild(cellBtnEdit);
}


// Mock data for students
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
      idClass: 1,
    },
  ];
////////////////////////////////////////
var queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
console.log(urlParams.get('class'));
const idClass = urlParams.get('class')

//show data for students
const studentsData = students.filter(function(student){
  console.log(student.idClass == idClass); 
  return student.idClass == idClass
})
console.log(studentsData)
showData(studentsData)

////////////////////////////////////////





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