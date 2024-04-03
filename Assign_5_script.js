let table = document.getElementById("grid-table");
let currentRow = 0;
let currentCol = 0;
let currentColor = "red";
let defaultColor = "white";

const submitButton = document.querySelector("#submit-button");

submitButton.addEventListener("click", event =>{
    let addRow = Number(document.querySelector("#addRowT").value);
    let addCol = Number(document.querySelector("#addColT").value);
    let remRow = Number(document.querySelector("#remRowT").value);
    let remCol = Number(document.querySelector("#remColT").value);

    //check for invalid inputs: addRow
    if(addRow < 0){
        alert("Invalid Input! negative value not allowed!")
    }else if(addRow !== 0 || addRow !== ''){
        addNewRows(addRow);    
    }
    //check for invalid inputs: addCol
    if(addCol < 0){
        alert("Invalid Input! negative value not allowed!")
    }else if(addCol !== 0 || addCol !== ''){
        addNewColumns(addCol);    
    }
    //check for invalid inputs: remRow
    if(remRow < 0 || remRow >= currentRow){
        alert("Invalid Input! exceeds the amount of rows to be deleted!")
    }else if(remRow !== 0){    
        removeRows(remRow);
    }
    //check for invalid inputs: remRow
    if(remCol < 0 || remCol >= currentCol){
        alert("Invalid Input! exceeds the amount of columns to be deleted!")
    }else if(remCol !== 0){    
        removeColumns(remCol);
    }


    document.querySelector("#dimension").innerText = currentRow + "X" + currentCol;
    document.getElementById("addRowT").value = '';
    document.getElementById("addColT").value = '';
    document.getElementById("remRowT").value = '';
    document.getElementById("remColT").value = '';
});

//Adds new rows in the table
function addNewRows(numRow){
    for(let i = currentRow; i < currentRow + numRow; i++){
        const newRow = table.insertRow(i);
        newRow.setAttribute("id", "row"+ (i+1).toString());
        for(let j = 0; j < currentCol; j ++){          
            //add new cell   
            let newCell = newRow.insertCell(j);             
            newCell.style.backgroundColor = defaultColor;           
            changeCellColor(newCell);
            clickAndHoldColorChange(newCell); 
        }

    }
    console.log(table)
    //update number of rows
    currentRow += numRow;
}

//Adds new columns in the table
function addNewColumns(numCol){
    for(let i = 0; i < currentRow; i++){
        let row = document.getElementById("row"+ (i+1).toString());
        for(let j = currentCol; j < currentCol + numCol; j++){     
            //add new cell       
            let newCell = row.insertCell(j);                 
            newCell.style.backgroundColor = defaultColor;           
            changeCellColor(newCell);    
            clickAndHoldColorChange(newCell);      
        }
    }

    //update number of columns
    currentCol += numCol;
}


//Removes rows from the table
function removeRows(numRow){    
    for(let i = currentRow - 1; i > currentRow - numRow - 1; i--){         
        table.deleteRow(i);
    }
    currentRow -= numRow;
}


//Removes columns from the table
function removeColumns(numCol){
    for(let i = 0; i < currentRow; i++){
        let row = document.getElementById("row"+ (i+1).toString());
        for(let j = currentCol - 1; j >= currentCol - numCol; j--){            
            row.deleteCell(j);    
        }
    }

    //update number of columns
    currentCol -= numCol;
}

let dropDownMenu = document.querySelector("#color-dropdowns");
//Dropdown menu listener
dropDownMenu.addEventListener("click", event =>{
    currentColor = dropDownMenu.value;
});

//Change cell color on click
function changeCellColor(currentCell){
    currentCell.addEventListener("click", event =>{
        currentCell.style.backgroundColor = currentColor;
    });
}

const buttonColorUncolored = document.querySelector("#colorUncolored");
//Change color of all uncolored cells
buttonColorUncolored.addEventListener("click", event =>{

    for(let i = 0; i < currentRow; i++){
        
        let row = document.getElementById("row"+ (i+1).toString());
        for(let j = 0; j < currentCol; j ++){            
            if(row.cells[j].style.backgroundColor == defaultColor){
                row.cells[j].style.backgroundColor = currentColor;
            }
        }    

    }

});


const buttonColorAll = document.querySelector("#colorAll");
const buttonClearAll = document.querySelector("#clearAll");


//Change color of all cells
buttonColorAll.addEventListener("click", event =>{

    for(let i = 0; i < currentRow; i++){
        
        let row = document.getElementById("row"+(i+1).toString());
        for(let j = 0; j < currentCol; j ++){            
            row.cells[j].style.backgroundColor = currentColor;
        }        
        
    }
});


//Return color of all cells to default color
buttonClearAll.addEventListener("click", event =>{

    for(let i = 0; i < currentRow; i++){
        
        let row = document.getElementById("row"+(i+1).toString());
        for(let j = 0; j < currentCol; j ++){            
            row.cells[j].style.backgroundColor = defaultColor;
        }     

    }
  
});



let clickAndHold = false;
//Change color of multiple cells on mouse clicked and hold
function clickAndHoldColorChange(currentCell){
    
    currentCell.addEventListener("mousedown", event =>{        
        clickAndHold = true; 
        currentCell.style.backgroundColor = currentColor;
    });

    currentCell.addEventListener("mouseup", event =>{       
        clickAndHold = false;                
    });

    
    currentCell.addEventListener("mouseover", event =>{         
        if(clickAndHold){
            currentCell.style.backgroundColor = currentColor;
        }        
    });    
}
const notInGrid = document.getElementsByTagName("html")[0];
notInGrid.addEventListener("mouseup", event =>{       
    clickAndHold = false;
});





