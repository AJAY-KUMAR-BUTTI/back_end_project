let inputEle = document.getElementById('add-task');
let taskItems = document.getElementById('task-items');
let submitBtn = document.getElementById('add-btn');

submitBtn.addEventListener('click', () => {

    let newTask = inputEle.value;
    
    let newLiEle = document.createElement('li');
    newLiEle.innerText = newTask;
    taskItems.append(newLiEle);
    
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'x';
    newLiEle.append(deleteBtn);

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    newLiEle.prepend(checkBox);
    checkBox.addEventListener('change', taskCompleted);
    deleteBtn.addEventListener('click', taskDeleted);
    inputEle.value = '';

    function taskDeleted(event) {
        newLiEle.remove();
    }
    function taskCompleted(event) {
        console.log(event);
        newLiEle.classList.toggle('completed');
    }
})

