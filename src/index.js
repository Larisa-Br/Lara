// task => string(html)
const renderTask = ({ id, text, done }) => `<li data-done="${done}" data-id="${id}">${text}</li>`;
// tasks => string(html) 11/12
const renderCounter = (tasks) =>
  `
    <div class="counter">
      ${tasks.filter((task) => task.done).length}/${tasks.length}
    </div>
  `;

const getTaskById = (tasks, id) => tasks.find((task) => task.id === id);

const addTask = (render, appState, newTaskText) => {
  const { tasks, nextId: id } = appState;
  tasks.push({ id, text: newTaskText, done: false });
  appState.nextId += 1;

  render();
  return id;
};

const toggleDoneTask = (render, { tasks }, id) => {
  const task = getTaskById(tasks, id);
  task.done = !task.done;
  render();
};

const changeTask = (render, { tasks }, id, taskText) => {
  const task = getTaskById(tasks, id);
  task.text = taskText;
  render();
};

const removeTask = (render, { tasks }, id) => {
  const index = tasks.findIndex((task) => task.id === id);
  tasks.splice(index, 1);
  render();
};

//const changeTaskFilter

const appState = {
  nextId: 0,
  tasksFilter: 'all',
  tasks: [
    {
      id: -1,
      text: "Убрать снег",
      done: false
    },
    {
      id: -2,
      text: "Растопить печь",
      done: false
    }
  ]
};

const render = () => {
  const { tasks } = appState;
  const root = document.getElementById("root");
  const name = "Mark";
  const hello = `<h1>Hi, ${name}!</h1>`;

  const renderedTasks = tasks.map(renderTask).join("");
  root.innerHTML = `
    <div>
      ${hello}
      div class ="input">
      <input id="task-input" >
      <button id="add-btn" >Add</button>
      </div>
      <div class="filterCounter">

      ${renderCounter(tasks)}
      <select name="task-filter">
      <option value ="all selected">All"></option>
      <option value ="todo">Todo</option>
      <option value ="done">Done></option>
      </div>
      <ul>
        ${renderedTasks}
      </ul>
    </div>
  `;

  const tasksElement = root.querySelector("ul")
  const tasksElements = Array.from(tasksElement.children)
  tasksElements.forEach((el) => {
    el.addEventListener('click', (event) => {
      event.stopPropagation()
      toggleDoneTask(render, appState, Number(el.dataset.id));
      console.log(`clicked ${el.dataset.id}`)
    })
  })

  
  const input = document.getElementById("task-input")
  const button = document.getElementById("add-btn")
  button.addEventListener("click", () => {
    const newTaskText = input.value.trim()
    input.value =""
    if(newTaskText.length !==0) {

    addTask(render, appState, newTaskText)
    }
  })
    const filterSelector =root.querySelector('select[name="task-filter"]')
    filterSelector.addEventListener("change", (event) => {
      changeTasksFilter(render, appStateevent.target.value);
    }

};

//first render
render();

/*const getRandomElement = (arr) => 
  arr[Math.floor(Math.random() * arr.length)];

const colors = ['lightgreen', 'lightblue', 'pink', 'yellow', 'silver', 'FloralWhite']
root.addEventListener('click', () => {
  const color = getRandomElement(colors)
  root.style = `background-color: ${color};`
})
*/


// mutations
// debugger;
/*
const id = addTask(render, appState, "Задача");
toggleDoneTask(render, appState, -1);
changeTask(render, appState, id, "Новый текст");
removeTask(render, appState, id);
*/
