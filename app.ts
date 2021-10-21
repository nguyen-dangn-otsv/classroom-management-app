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

let table = document.querySelector("#table");
let keys = Object.keys(classrooms[0]);

classrooms.forEach((room) => {
  let newRow = document.createElement("tr");
  keys.forEach((key) => {
    let newCell = document.createElement("td");
    let value = document.createTextNode(room[key]);
  });
});
