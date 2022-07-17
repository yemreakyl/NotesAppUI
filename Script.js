const saveButton=document.querySelector('#saveBtn');
const titleİnput=document.querySelector('#title');
const descriptionİnput=document.querySelector('#description');



function AddNote(Title,Description){

    const body={
        title: Title,
        description:Description,
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

saveButton.addEventListener('click',function(){
AddNote(titleİnput.value,descriptionİnput.value);
});