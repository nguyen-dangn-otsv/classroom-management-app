export function showData(listObjects) {
  var keys = Object.keys(listObjects[0]);

  listObjects.forEach(function (object) {
    var newRow = document.createElement("tr");
    keys.forEach(function (key) {
      var newCell = document.createElement("td");
      var value = document.createTextNode(object[key]);
      newCell.appendChild(value);
      newRow.appendChild(newCell);
    });
    var newBtnEdit = document.createElement("button");
    newBtnEdit.classList.add('btn-edit');
    var newBtnText = document.createTextNode("Edit");
    newBtnEdit.appendChild(newBtnText);
    newRow.appendChild(newBtnEdit);
    table.appendChild(newRow);
  });
}
