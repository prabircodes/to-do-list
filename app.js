//Selectors;
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

//Event Listener
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)

//Functions

function addTodo(event) {
  event.preventDefault()
  //Todo Div
  const todoDiv = document.createElement("div")
  todoDiv.classList.add("todo")

  //Todo Li
  const newTodo = document.createElement("li")
  newTodo.innerText = todoInput.value
  newTodo.classList.add("todo-item")
  todoDiv.appendChild(newTodo)
  //add to localstorage
  saveLocalTodos(todoInput.value)

  //Checkmark button
  const completedButton = document.createElement("button")
  completedButton.innerHTML = '<i class="fas fa-check"> </i>'
  completedButton.classList.add("complete-btn")
  todoDiv.appendChild(completedButton)
  //Check trash button
  const trashdButton = document.createElement("button")
  trashdButton.innerHTML = '<i class="fas fa-trash"> </i>'
  trashdButton.classList.add("trash-btn")
  todoDiv.appendChild(trashdButton)

  //append to list
  todoList.appendChild(todoDiv)
  //clear to do input value
  todoInput.value = ""
}

function deleteCheck(e) {
  const item = e.target
  //delete to do
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement

    //animation
    todo.classList.add("fall")
    removeLocalTodos(todo)
    todo.addEventListener(transitioned, function () {
      todo.remove()
    })
  }
  //check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement
    todo.classList.toggle("completed")
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex"
        break
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex"
        } else {
          todo.style.display = "none"
        }
        break
      case "uncomplted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex"
        } else {
          todo.style.display = "none"
        }
        break
    }
  })
}

function saveLocalTodos(todo) {
  // check ---anything already there?
  let todos
  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  todos.push(todo)
  localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
  // check ---anything already there?
  let todos
  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  todos.forEach(function (todo) {
    //Todo Div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    //Todo Li
    const newTodo = document.createElement("li")
    newTodo.innerText = todo
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)

    //Checkmark button
    const completedButton = document.createElement("button")
    completedButton.innerHTML = '<i class="fas fa-check"> </i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)
    //Check trash button
    const trashdButton = document.createElement("button")
    trashdButton.innerHTML = '<i class="fas fa-trash"> </i>'
    trashdButton.classList.add("trash-btn")
    todoDiv.appendChild(trashdButton)

    //append to list
    todoList.appendChild(todoDiv)
  })
}

function removeLocalTodos(todo) {
  // check ---anything already there?
  let todos
  if (localStorage.getItem("todos") === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}
