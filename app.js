function onReady() {
  let toDos = [];
  let id = 0;
  const ADD_TODO_FORM = document.getElementById('addToDoForm');
  let savedToDos = localStorage.getItem('toDoList');

  if(savedToDos){
    toDos = JSON.parse(savedToDos);
  }

  function createNewToDo(){
    const NEW_TODO_TEXT = document.getElementById('newToDoText');
    if (!NEW_TODO_TEXT.value) { return; }
    toDos.push({
      title: NEW_TODO_TEXT.value,
      complete: false,
      id: id
    });

      localStorage.setItem('toDoList', JSON.stringify(toDos));

    id++;

    NEW_TODO_TEXT.value = '';
    renderTheUI();
  }

  function renderTheUI(){
    const TODO_LIST = document.getElementById('toDoList');
    TODO_LIST.textContent = '';
    toDos.forEach(function(toDo, i) {
      const NEW_LI = document.createElement('li');
      NEW_LI.setAttribute('data-todo-id',i)
      const CHECKBOX = document.createElement('input');
      CHECKBOX.type = "checkbox";
      CHECKBOX.checked = toDo.complete;
      CHECKBOX.addEventListener('change', event => {
        if(CHECKBOX.checked){
          toDo.complete = true;
        } else {
          toDo.complete = false;
        }

        let toDoId = event.target.closest('li').getAttribute('data-todo-id');

        let newToDos = JSON.parse(localStorage.getItem('toDoList'));

        newToDos[toDoId].complete = toDo.complete;
        localStorage.setItem('toDoList', JSON.stringify(newToDos));


      })

      const DELETE_BTN = document.createElement('button');
      DELETE_BTN.textContent = "delete";

      DELETE_BTN.addEventListener('click', event => {
        toDos = toDos.filter(function(item) {
          return item.id !== toDo.id;
        })

        renderTheUI();
      });

      NEW_LI.textContent = toDo.title;
      TODO_LIST.appendChild(NEW_LI);
      NEW_LI.appendChild(CHECKBOX);
      NEW_LI.appendChild(DELETE_BTN);
    })
  }
  ADD_TODO_FORM.addEventListener('submit', event => {
    event.preventDefault();
    createNewToDo();

  });

  renderTheUI();

}

window.onload = function() {
  onReady();
};
