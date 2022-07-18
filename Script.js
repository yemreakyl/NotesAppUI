const saveButton=document.querySelector('#saveBtn');
const titleİnput=document.querySelector('#title');
const descriptionİnput=document.querySelector('#description');
const notesContainer=document.querySelector("#Notes");

//Yeni not ekleme işlemi için kullanacağım method
function addNote(title,description){
    const body={
        title: title,
        description:description,
        isVisible: true
    };
    fetch('https://localhost:7284/api/Notes',{
    method:'POST',
    body:JSON.stringify(body),
    headers:{
        "content-type":"application/json"
    }
})
.then(data=>data.json())
.then(response=>console.log(response));
};


//notları ekrana yazdırmak amacıyla yazdığım method bu methodu bir aşağıdaki veri tabanından notları çeken methodun içerisinde kullanacağım

function displayNotes(notes){
    let allnotes='';
    notes.forEach(note => {
        const noteElement = `
                            <div class="Note">
                            <h3>${note.title}</h3> 
                            <p>${note.description}</p>
                            </div>
                          `;
        allnotes += noteElement;
        
    });
    notesContainer.innerHTML=allnotes
    };
//Veri tabanından notlarımı çekip ekrana yazdırıyorum
function getNotes(){
    fetch('https://localhost:7284/api/Notes')
    .then(data=>data.json())
    .then(notes=>displayNotes(notes));
};
getNotes();

//Save butonuna event ekliyorum
saveButton.addEventListener('click',function(){
    AddNote(titleİnput.value,descriptionİnput.value);
    });

