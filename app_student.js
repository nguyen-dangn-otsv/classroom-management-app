const btnsCancelModal = document.querySelectorAll(".btn--cancel-modal");
const btnsCloseModal = document.querySelectorAll(".btn--close-modal");
const btnSelectAll = document.querySelector(".select-all-btn");


const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
const idClass = urlParams.get('class')
const studentData = JSON.parse(localStorage.getItem("students")).filter(function(student){return student.idClass == idClass})
showData(studentData)


// Show data

function showData(listObjects) {
  if (!listObjects.length) return;
  const keyObject = Object.keys(listObjects[0]);
  const table = document.querySelector("tbody");
  listObjects.forEach(function (object) {
    const newRow = document.createElement("tr");
    newRow.setAttribute("student-id", object[keyObject[0]]);

    handleShowData(object, keyObject, newRow);

    handleShowCheckbox(newRow);

    handleShowBtnEdit(newRow, object[keyObject[0]]);
    table.appendChild(newRow);
  });
}

function handleShowData(object, keyObject, newRow) {
  for (let i = 0 ; i < keyObject.length - 1; i++) {
    const newCell = document.createElement("th");
    newCell.setAttribute("scope", "col");
    const value = document.createTextNode(object[keyObject[i]]);
    newCell.appendChild(value);

    newRow.appendChild(newCell);
  }
}

function handleShowCheckbox(newRow) {
  const cellCheckbox = document.createElement("th");
  cellCheckbox.setAttribute("scope", "col");
  const checkbox = document.createElement("INPUT");
  checkbox.setAttribute("type", "checkbox");
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


//handle select all 
btnSelectAll.addEventListener("click", selectAll);
function selectAll() {
  const checkBoxs = document.querySelectorAll(".form-check-input");

  this.textContent === "Select All"
    ? (this.textContent = "Cancel All")
    : (this.textContent = "Select All");

  checkBoxs.forEach((checkbox) => {
    if (this.textContent === "Cancel All") checkbox.checked = true;
    else checkbox.checked = false;
  });
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

