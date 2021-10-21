var classrooms = [
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
var students = [
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
import { showData } from "./modules/readData.js";
import { updateData } from "./modules/updateData.js";
var table = document.querySelector("#table");
document.querySelector("body").onload = showData(classrooms);
document.querySelector("#btn-add").addEventListener("click", (e) => {
  updateData(classrooms);

  e.preventDefault();
});
document.querySelector;
