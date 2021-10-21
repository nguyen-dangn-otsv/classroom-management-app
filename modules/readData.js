export function showData(listObjects) {
  var keyObject = Object.keys(listObjects[0]);
  var table = document.querySelector("tbody");
  listObjects.forEach(function (object) {
    // Create new row
    var newRow = document.createElement("tr");
    newRow.setAttribute("class-id", object.idClass);
    // Create new column base object
    keyObject.forEach(function (key) {
      var newCell = document.createElement("th");
      newCell.setAttribute("scope", "col");
      var value = document.createTextNode(object[key]);
      newCell.appendChild(value);

      newRow.appendChild(newCell);
    });
    // Add column checkbox
    var cellCheckbox = document.createElement("th");
    cellCheckbox.setAttribute("scope", "col");
    var checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("form-check-input");

    cellCheckbox.appendChild(checkbox);
    // Add column button edit
    var cellBtnEdit = document.createElement("th");
    cellBtnEdit.setAttribute("scope", "col");
    var btnEdit = document.createElement("button");
    var newBtnText = document.createTextNode("Edit");
    btnEdit.appendChild(newBtnText);
    btnEdit.classList.add("edit-btn");

    cellBtnEdit.appendChild(btnEdit);

    newRow.appendChild(cellCheckbox);
    newRow.appendChild(cellBtnEdit);

    table.appendChild(newRow);
  });
}
