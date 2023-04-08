const notesContainer = document.getElementById("app");                                 //used to create text area automatically by using js with reference to the HTML element i.e <div id="app>
const addNoteButton=document.querySelector(".add-note");                              //button to add a new note (+)

getNotes().forEach((note)=>{
    const noteElement=createNoteElement(note.id,note.content)
    notesContainer.insertBefore(noteElement,addNoteButton);

});

addNoteButton.addEventListener("click",()=>addNote());






function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes")||"[]");            //used to get every notes that are stored or saved   inside the local storage // empty array indicates we can enter number of characters by using key value form;
}

function saveNotes(notes){
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));           //used to store or save the  notes to  local storage and the "getNotes" function uses it to get the notes that are stored on the local storage//here  we setting that key value pair to the "stickynotes-notes"//the json stringfy the javascript array of notes and stringify the notes and save it to the local storage ;


}


function  createNoteElement(id,content){                                    //used to create new text area representing a single sticky note
   const element = document.createElement("textarea");                     //the above things that are present on the first line of the code are already existing the textarea whereas in this we are yet to be created or appended to the DOM;
   element.classList.add("note");                                         //this is used to import all the css properties
   element.value=content;                                                //this is the content that is present inside of the single sticky notes area
   element.placeholder="";                                              //when nothing is present inside the box this is used 


   element.addEventListener("change",()=>{
        updateNote(id,element.value);                                // the element.value contains most recently updated text area contents;


   });

   element.addEventListener("dblclick",()=>{
        const doDelete = confirm("ARE YOU SURE YOU  WANT TO DELETE THIS NOTE?");


        if(doDelete)
        {
          deleteNote(id,element);
        }

   });

   return element;


}

function addNote(){                                            // this function will fetch all the notes that is present inside of the local storage that is in array format and add the element to that array and save the notes to the local storage using "SaveNotes" function(fetch+add+save)
    const notes =getNotes();
    const noteObject={
        id:Math.floor(Math.random()*10000),
        content:""
    };

    const noteElement=createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement,addNoteButton);

    existingNotes.push(noteObject);
    saveNotes(existingNotes);

}

function updateNote(id , newContent){
   const notes=getNotes(id );
    const targetNote=notes.filter(note => note.id === id)[0];

    targetNote.content=newContent;
    saveNotes(notes);


}

function deleteNote(id, element){
    const notes=getNotes().filter(note => note.id != id);
    saveNotes(notes);
    notesContainer.removeChild(element);

}
