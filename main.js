const inputNote = document.querySelector("#inputNote");
const inputNoteTitle = document.querySelector("#inputNoteTitle");
const addBtn = document.querySelector("#addBtn");

// result
const resultContainer = document.querySelector("#resultContainer");


const getLocalStorageData = function(){

    resultContainer.innerHTML = null;

    // convert localstorage to string
    const getLocalStorage = JSON.parse(JSON.stringify(localStorage))
    
    for(const key in getLocalStorage){
        console.log(`${key} : ${getLocalStorage[key]}`)
    
        // each row container
        const div = document.createElement("div");
        div.classList.add("d-flex", "align-items-center","justify-content-between", "fs-4", "pt-4");
    
        // child div
        const divChild = document.createElement("div");
        divChild.classList.add("text-start")
    
        // title
        const title = document.createElement("p")
        title.classList.add("fw-bold")
        title.textContent = key;
    
        // note value
        const noteValue = document.createElement("p")
        noteValue.textContent = getLocalStorage[key];
    
        // delete button
        const btn = document.createElement("button");
        btn.textContent = "Delete"
        btn.value = key
        btn.setAttribute("id", "deleteBtn")

        divChild.append(title)
        divChild.append(noteValue)
    
        div.append(divChild)
        div.append(btn)
    
        resultContainer.append(div)
    
    }

    readAllDeleteBtn()

}

getLocalStorageData()

addBtn.addEventListener("click",function(){

    if(inputNote.value && inputNoteTitle.value){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your note has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        localStorage.setItem(inputNoteTitle.value , inputNote.value)

        getLocalStorageData()

        inputNote.value = null
        inputNoteTitle.value = null

    }else{
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Please fill up all fields',
            showConfirmButton: false,
            timer: 1500
        })
    }
    
})

function readAllDeleteBtn(){

    const deleteBtn = document.querySelectorAll("#deleteBtn")
    
    deleteBtn.forEach(btn=>{
    
        btn.addEventListener("click",function(){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
    
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
    
                  localStorage.removeItem(this.value)
      
                  getLocalStorageData()

                  
                  
                }
                
            })
        })
    })
}




