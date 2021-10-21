export function updateData(listObjects) {
  let id = document.querySelector("#id").value;
  console.log(id);
  let nameClass = document.querySelector("#classname").value;
  listObjects.map((obj) => {
    console.log(obj);
    if (obj.idClass == id) {
      console.log(id);
      obj.nameClass = nameClass;
    }
  });
  console.log(listObjects);
}
