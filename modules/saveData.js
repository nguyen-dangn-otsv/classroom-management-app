export function saveData(listObject, keyName){
    let classroomsData; 
    if (localStorage.getItem(keyName) == null){
    localStorage.setItem(keyName, JSON.stringify(listObject))
    classroomsData = listObject
    }
    else{
    classroomsData = JSON.parse(localStorage.getItem(keyName))
    }
    return classroomsData
}