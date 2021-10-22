export function showData(listObjects) {
  if (!listObjects.length) return; // check if listObject is empty
  var keyObject = Object.keys(listObjects[0]); 
  var table = document.querySelector("tbody");
  listObjects.forEach(function (object) {
    // Create new row
    var newRow = document.createElement("tr");
    newRow.setAttribute("class-id", object[keyObject[0]]);

    // Create new column base object
    handleShowData(object,keyObject, newRow);

    // Add column checkbox
    handleShowCheckbox(newRow)
    // Add column button edit
    handleShowBtnEdit(newRow);

    table.appendChild(newRow);
  });
}

// Add data into table
export function handleShowData(object,keyObject, newRow){
  keyObject.forEach(function (key) {
    var newCell = document.createElement("th");
    newCell.setAttribute("scope", "col");
    var value = document.createTextNode(object[key]);
    newCell.appendChild(value);

    newRow.appendChild(newCell);
  });
}
// Add chekcbox into table
function handleShowCheckbox(newRow){
  var cellCheckbox = document.createElement("th");
  cellCheckbox.setAttribute("scope", "col");
  var checkbox = document.createElement("INPUT");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("form-check-input");

  cellCheckbox.appendChild(checkbox);

  newRow.appendChild(cellCheckbox);
}
// Add edit button into table
function handleShowBtnEdit(newRow){
  var cellBtnEdit = document.createElement("th");
    cellBtnEdit.setAttribute("scope", "col");
    var btnEdit = document.createElement("button");
    var newBtnText = document.createTextNode("Edit");
    btnEdit.appendChild(newBtnText);
    btnEdit.classList.add("edit-btn");

    cellBtnEdit.appendChild(btnEdit);
    
    newRow.appendChild(cellBtnEdit);
}
