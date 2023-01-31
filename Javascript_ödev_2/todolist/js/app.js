const TASK = document.querySelector('#task');
let ulEl = document.querySelector('#list');
const toastEl = document.querySelector('#liveToast');
const toastBody = document.querySelector('.toast-body');
const toastImg = document.querySelector('#toast-img');
let collapseBtn = `<button id="clsBtn"  type="button" class="close" 
data-dismiss="alert" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>`
let taskList = !localStorage.getItem('tasks') ?  [] : (localStorage.getItem('tasks').split(','));
console.log(taskList)
console.log(taskList.length)
//get the list of tasks in local storage
if(taskList.length>0){
    for (let i=0; i < taskList.length; i++) {
        if(checkForText(taskList[i])){
            TASK.value = taskList[i];
            const liDOM = document.createElement('li');
            liDOM.innerHTML = `${TASK.value} ${collapseBtn}`;
            liDOM.classList.add('list-group-item','d-flex', 
            'justify-content-between', 'align-items-center');
            liDOM.setAttribute('data-text',TASK.value);
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
function newElement (){
    console.log(TASK.value);
    console.log("running");
    const liDOM = document.createElement('li');
    if (TASK.value.length > 0){
        if(checkForText(TASK.value)){
            //toast
            toastBody.innerHTML = `<p class= "text-danger">
            Eklemek istediğiniz görev listede mevcut!!</p>`
            toastImg.innerHTML = `<img id="toastImg" style="width: 5px;" 
            src="img/exclamation-solid.svg" class="rounded mr-2" alt="">`
            //Showing and Hiding Toast automatically -JQuery
            $(document).ready(function(){
            $('#liveToast').toast('show');
            });
            TASK.value= '';
        }else{
            liDOM.innerHTML = `${TASK.value} ${collapseBtn}`;
            liDOM.classList.add('list-group-item','d-flex', 
            'justify-content-between', 'align-items-center');
            liDOM.setAttribute('data-text',TASK.value);
            ulEl.append(liDOM);
            taskList.push(TASK.value.trim());
            localStorage.setItem('tasks',(taskList));
            //************************************ */

            //toast
            toastBody.innerHTML = `<p class= "text-success">Görev listeye eklendi.</p>`;
            toastImg.innerHTML = `<img id="toastImg" style="width: 15px;" 
            src="img/check-solid.svg" class="rounded mr-2" alt="">`
            //Showing and Hiding Toast automatically -JQuery
            $(document).ready(function(){
                $('#liveToast').toast('show');
            });

            TASK.value= '';
        }
    }else if (TASK.value.length <1 ){
        // toast
        toastBody.innerHTML = `<p class= "text-danger">Listeye boş ekleme yapamazsınız!!</p>`
        toastImg.innerHTML = `<img id="toastImg" style="width: 5px;" 
        src="img/exclamation-solid.svg" class="rounded mr-2" alt="">`
        //Showing and Hiding Toast automatically -JQuery
        $(document).ready(function(){
            $('#liveToast').toast('show');
        });
        // toastEl.classList.replace('hide', 'show');
        // await sleep (7000);
        // toastEl.classList.replace( 'show', 'hide');
        
    }

}
