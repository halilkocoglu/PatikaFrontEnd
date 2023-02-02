var TASK = document.querySelector('#task');
let ulEl = document.querySelector('#list');
const toastEl = document.querySelector('#liveToast');
const toastBody = document.querySelector('.toast-body');
const toastImg = document.querySelector('#toast-img');
let collapseBtn = `<button data-delete="cls" class= "Btn rounded small border-secondary" 
type="button" class="close" data-dismiss="alert" aria-label="Close">
<span class=" font-weight-bold" aria-hidden="true">&times;</span>
</button>`
let taskList = !localStorage.getItem('tasks') ?  [] : (localStorage.getItem('tasks').split(','));
console.log(taskList)
// console.log(taskList.length)

//get the list of tasks in local storage
if(taskList.length>0){
    let i = 0;
    for (; i < taskList.length; i++) {
        if(checkForText(taskList[i])){
            TASK.value = taskList[i].toLowerCase();
            const liDOM = document.createElement('li');
            liDOM.innerHTML = `<img data-img="checkImg" style="width: 15px" 
            src="img/check-solid.svg" class="rounded  d-none" alt="">
            <p class="text-center text-capitalize">${TASK.value}</p> ${collapseBtn}
            `;
            liDOM.classList.add('list-group-item','d-flex', 
            'justify-content-between', 'align-items-center');
            liDOM.setAttribute('data-text',TASK.value);
            liDOM.setAttribute('data-type', 'task');
            ulEl.append(liDOM);
            TASK.value = '';
        }
    }
}
//check for 'text' is in the list?
function checkForText(text) {
    let found = false;
    if(taskList.includes(text.toLowerCase())) {
            found = true;
        }                
        return found;       
}
//Add new Task
async function newElement (){
    const liDOM = document.createElement('li');
    if (TASK.value.length > 0){     //if value length is greater than zero
        if(checkForText(TASK.value)){   //if value is already in the list
            //toast
            toastBody.innerHTML = `<p class= "text-danger">
            Eklemek istediğiniz görev listede mevcut!!</p>`
            toastImg.innerHTML = `<img data-img="toastImg" style="width: 5px;" 
            src="img/exclamation-solid.svg" class="rounded mr-2" alt="">`
            //Showing and Hiding Toast automatically -JQuery
            $(document).ready(function(){
            $('#liveToast').toast('show');
            });
            TASK.value= '';
        }else{          //if value is not in the list, add it to the list
            liDOM.innerHTML = `<img data-img="checkImg" style="width: 15px;" 
            src="img/check-solid.svg" class="rounded d-none " alt="">
            <p class="text-center text-capitalize">${TASK.value}</p> ${collapseBtn}
            `;
            liDOM.classList.add('list-group-item','d-flex', 
            'justify-content-between', 'align-items-center');
            liDOM.setAttribute('data-text',TASK.value);
            ulEl.append(liDOM);
            taskList.push(TASK.value.trim().toLowerCase());
            localStorage.setItem('tasks',(taskList));
            //************************************ */
            //toast
            toastBody.innerHTML = `<p class= "text-success">Task added to list.</p>`;
            toastImg.innerHTML = `<img data-img="toastImg" style="width: 15px;" 
            src="img/check-solid.svg" class="rounded mr-2" alt="">`
            //Showing and Hiding Toast automatically -JQuery
            $(document).ready(function(){
                $('#liveToast').toast('show');
            });
            TASK.value= '';
            //working like sleep function
            await new Promise(done => setTimeout(() => done(), 3000));
            //reload page for close button - addEventListener(deleteTask)
            location.reload();
        }
    }else if (TASK.value.length <1 ){   // if value length is smaller than one
        // toast
        
        toastBody.innerHTML = `<p class= "text-danger">Listeye boş ekleme yapamazsınız!!</p>`
        toastImg.innerHTML = `<img data-img="toastImg" style="width: 5px;" 
        src="img/exclamation-solid.svg" class="rounded mr-2" alt="">`
        //Showing and Hiding Toast automatically -JQuery
        $(document).ready(function(){
            $('#liveToast').toast('show');
        });
        // toastEl.classList.replace('hide', 'show');
        // await sleep (4000);
        // toastEl.classList.replace( 'show', 'hide');
        
    }
}


//Delete Task
if(taskList.length > 0 ){
    let clsBtn = document.querySelectorAll(`[data-delete="cls"]`)
    let i = 0;
    for(; i < clsBtn.length; i++){
        clsBtn[i].addEventListener('click', deleteTask)
    }
    function deleteTask(){
        let txt = this.parentElement.querySelector('p')
        taskList.splice(taskList.indexOf(txt.innerText),1);
        this.parentElement.remove();
        localStorage.setItem('tasks',taskList);

        }    
}


//Check-approve tasks
if(taskList.length > 0 ){
    let liItem = document.querySelectorAll(`[data-type="task"]`)
    let i = 0;
    for(; i < liItem.length; i++){
        liItem[i].addEventListener('click', approveTask);
    }
    function approveTask(){
        this.style.backgroundColor = '#9DF1DF';
        this.querySelector('p').style.textDecoration = 'line-through';
        this.querySelector('[data-img="checkImg"]').classList.remove("d-none");
        localStorage.setItem('tasks',taskList);
        }    
}
