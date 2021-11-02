// task => string(html)
const renderTask = ({ text, done }) => `<li data-done="${done}">${text}</li>`;
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

const appState = {
  nextId: 0,
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
      ${renderCounter(tasks)}
      <ul>
        ${renderedTasks}
      </ul>
    </div>
  `;
};

//first render
render();

// mutations
// debugger;
const id = addTask(render, appState, "Задача");
toggleDoneTask(render, appState, -1);
changeTask(render, appState, id, "Новый текст");
removeTask(render, appState, id);
