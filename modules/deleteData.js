export function deleteData(listObject){
    // Delete-modal handle
    let checkboxs = document.querySelectorAll("input[type = checkbox]")
    if (checkboxs){
        checkboxs.forEach(function(checkbox){
            if (checkbox.checked == true){
                let delRow = checkbox.closest("tr")
                let rowID = delRow.getAttribute("class-id")
                let delClass = listObject.find(function(object){
                    return object.idClass == rowID
                })
                listObject.splice(listObject.indexOf(delClass),1)
                delRow.remove()
            }     
        })
        return listObject
    }
}
export function checkDataDelete(listObject){
    let checkboxs = document.querySelectorAll("input[type = checkbox]")
    if (checkboxs){
        let delData = []
        checkboxs.forEach(function(checkbox){
            if (checkbox.checked == true){
                let delRow = checkbox.closest("tr")
                let rowID = delRow.getAttribute("class-id")
                let delClass = listObject.find(function(object){
                    return object.idClass == rowID
                })
                delData.push(delClass)

            }     
        })
        return delData;
    }
}