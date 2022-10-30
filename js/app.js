console.log("running this js file");
//if user adds notes add to localstorage
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myobj = {
        title: addTitle.value,
        text: addTxt.value
    } //created to store both title and text in object form

    notesObj.push(myobj); //pushing myobj value to notesobj
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = ""; // delete after saving notes in local storage
    addTitle.value = ""; //delete after saving title in local storage
    //console.log(notesObj)
    showNotes();
})
//function to show elements from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="notecard card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete</button>
        </div>
    </div> `;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = "Nothing to show, Add your notes"
    }
}

//function o delete a note
function deleteNote(index) {
    //console.log('I am deleting', index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj)); // updating local storage
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();  //data stored here what users are searching
    //console.log("Input event fired", inputVal);
    let noteCards = document.getElementsByClassName('notecard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        //console.log(cardTxt);
    })

})
