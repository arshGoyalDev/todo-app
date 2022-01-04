// -------------------- theme btn ------------------- //
const themeBtn = document.querySelector(".theme-btn");
themeBtn.addEventListener("click", () => {
  if (themeBtn.classList.contains("light")) {
    document.body.setAttribute("data-theme", "dark");

    themeBtn.classList.remove("light");
    themeBtn.classList.add("dark");

    localStorage.setItem("theme", "dark");
  } else if (themeBtn.classList.contains("dark")) {
    document.body.setAttribute("data-theme", "light");

    themeBtn.classList.remove("dark");
    themeBtn.classList.add("light");

    localStorage.setItem("theme", "light");
  }
});

// -------------------------- border radius ----------------------- //

function borderRadius() {
  if (document.querySelector(".task") == undefined) {
    document.querySelector(".for-mobile").style.cssText = "border-radius: 5px;";
    document.querySelector(".task-sort-btn-container").style.cssText =
      "border-radius: 5px;";
  } else {
    document.querySelector(".for-mobile").style.cssText =
      "border-radius: 0 0 5px 5px;";
    document.querySelector(".task-sort-btn-container").style.cssText =
      "border-radius: 0 0 5px 5px;";
  }
}
borderRadius();

// ----------------------- adding tasks ----------------------- //
const todoInput = document.getElementById("todo-input");
const addButton = document.querySelector(".add-btn");

todoInput.addEventListener("keyup", setLocalStorage);

addButton.addEventListener("click", () => {
  if (todoInput.value != "") {
    addTask(todoInput.value);
    todoInput.value = "";
  }
});
todoInput.addEventListener("keypress", (event) => {
  if (event.charCode == "13" && todoInput.value != "") {
    addTask(todoInput.value);
    todoInput.value = "";
  }
});

function addTask(text) {
  let task = document.createElement("li");
  task.classList.add("task");

  task.innerHTML = `
  <label class="label">
  <input type="checkbox" name="checkbox" class="task-input">
  <span>${text}</span>
  </label>
  <button class="delete-btn"></button>
  `;

  document.querySelector(".todo-tasks-container").append(task);
  updateItemsCount();
  borderRadius();
  filterTasks();
  setLocalStorage();
}

// ------------------------- tasks count --------------------- //
let itemsCount = 0;
const itemsNumber = document.querySelectorAll(".no-of-items span");

function updateItemsCount() {
  for (let x of itemsNumber) {
    x.innerText =
      document.querySelectorAll(".task").length -
      document.querySelectorAll(".completed").length;
  }
}

// ------------------- removing tasks --------------------- //

// clear one task
const todoContainer = document.querySelector(".todo-tasks");

todoContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    removeItems(event.target.parentElement);
  }

  if (event.target.classList.contains("task-input")) {
    event.target.parentElement.parentElement.classList.toggle("completed");
    updateItemsCount();
    setLocalStorage();
  }

  filterTasks();
  borderRadius();
});

function removeItems(item) {
  item.remove();
  updateItemsCount();
  setLocalStorage();
}

// clear all completed tasks
const clearBtn = document.querySelectorAll(".clear-completed-btn");

clearBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let completedTasks = document.querySelectorAll(".completed");

    if (
      completedTasks.length > 0 &&
      confirm(
        `You are about to delete ${completedTasks.length} task. Are you sure?`
      )
    ) {
      for (let x of completedTasks) {
        x.remove();
        updateItemsCount();
      }
    } else if (completedTasks.length <= 0) {
      alert("There are no completed tasks");
    }

    setLocalStorage();
  });
});

// --------------------------- filters --------------------------- //
const filters = document.querySelectorAll(".filters label input");

filters.forEach((filter) => {
  filter.addEventListener("input", filterTasks);
});

function filterTasks() {
  const allTasksFilter = document.getElementById("all");
  const completedTasksFilter = document.getElementById("completed");
  const activeTasksFilter = document.getElementById("active");
  let tasks = document.querySelectorAll(".task");
  let completedTasks = document.querySelectorAll(".completed");

  if (allTasksFilter.checked) {
    for (let x of tasks) {
      x.classList.remove("hidden");
    }
  } else if (activeTasksFilter.checked) {
    for (let x of tasks) {
      x.classList.remove("hidden");
    }
    for (let x of completedTasks) {
      x.classList.add("hidden");
    }
  } else if (completedTasksFilter.checked) {
    for (let x of tasks) {
      x.classList.add("hidden");
    }
    for (let x of completedTasks) {
      x.classList.remove("hidden");
    }
  }
}

// ---------------------------- drag and drop --------------------------- //

Sortable.create(sortableList);

// ---------------------------- local storage --------------------------- //

function setLocalStorage() {
  localStorage.setItem(
    "todoS",
    document.querySelector(".todo-tasks-container").innerHTML
  );
  localStorage.setItem("inputValue", todoInput.value);
}

function getLocalStorage() {
  if (localStorage.getItem("theme") == "light") {
    themeBtn.classList.remove("dark");
    themeBtn.classList.add("light");
    document.body.setAttribute("data-theme", localStorage.getItem("theme"));
  }

  document.querySelector(".todo-tasks-container").innerHTML =
    localStorage.getItem("todoS");
  document.querySelectorAll(".completed .label input").forEach((checkbox) => {
    checkbox.setAttribute("completed", "true");
  });

  todoInput.value = localStorage.getItem("inputValue");
}

getLocalStorage();
