const saveButton=document.querySelector('#saveBtn');
const titleİnput=document.querySelector('#title');
const descriptionİnput=document.querySelector('#description');
const notesContainer=document.querySelector("#Notes");
const deleteButton=document.querySelector("#deleteBtn");
//Yeni not ekleme formunu temizleme
function clearForm(){
    titleİnput.value='';
    descriptionİnput.value='';
    deleteButton.classList.add("hidden");
}

//aşağı kısımdaki 3 method display notes içerisindeki event ile tetiklenip tıklanan not bilgilerini sol taraftaki bölüme getiriyor ayrıca var olan bir note seçildiğinde delete butonunu aktif ediyor
function displayNoteInForm(note){
titleİnput.value=note.title;
descriptionİnput.value=note.description;
deleteButton.classList.remove("hidden");
deleteButton.setAttribute('data-id',note.id);
};
function populateForm(id){
   getNotByİd(id);  
};

function getNotByİd(id){

    fetch(`https://localhost:7284/api/Notes/${id}`).then(data=>data.json()).then(response=>displayNoteInForm(response));
};



//Yeni not ekleme işlemi için kullanacağım method ardından clearform() ve getnotes() methodlarımı çağırıyorum
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
.then(response=>{clearForm();
getNotes();
});
};


//notları ekrana yazdırmak amacıyla yazdığım method bu methodu bir aşağıdaki veri tabanından notları çeken methodun içerisinde kullanacağım

function displayNotes(notes){
    let allnotes='';
    notes.forEach(note => {
        const noteElement = `
                            <div class="Note" data-id="${note.id}">
                            <h3>${note.title}</h3> 
                            <p>${note.description}</p>
                            </div>
                          `;
        allnotes += noteElement;
        
    });
    notesContainer.innerHTML=allnotes
    document.querySelectorAll(".Note").forEach(note=>{
        note.addEventListener("click",function(){
           populateForm(note.dataset.id)
        });
    });
    };
    
//Veri tabanından notlarımı çekip ekrana yazdırıyorum
function getNotes(){
    fetch('https://localhost:7284/api/Notes')
    .then(data=>data.json())
    .then(notes=>displayNotes(notes));
};
getNotes();

//Silme işlemleri için
function deleteNotById(id){
    fetch(`https://localhost:7284/api/Notes/${id}`,{
        method:'DELETE',
        headers:{
            "content-type":"application/json"
        }
        })
        .then(response=>{
            clearForm();
            getNotes();
        })
        ;
   
}
//Save butonuna event ekliyorum
saveButton.addEventListener('click',function(){
    addNote(titleİnput.value,descriptionİnput.value);
    });

 //Delete butonuna event ekliyorum   
deleteButton.addEventListener('click',function(){
const id=deleteButton.dataset.id;
deleteNotById(id);
});
