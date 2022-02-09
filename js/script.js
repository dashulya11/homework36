"use strict";

const DB_NAME = "saved_data";
let countTasks;

document.querySelector("#todoForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = e.target.querySelectorAll("input, textarea");

  const obj = {
    completed: false,
  };

  for (const input of inputs) {
    if (!input.value.length) {
        return alert("No way you can add this shit !")
      }
    obj[input.name] = input.value;
  }

  saveData(obj);
    renderItem(obj);
    countTasks = document.querySelectorAll(".taskWrapper");

  e.target.reset();
});

document.body.addEventListener("click", (e) => {
  if (
    (e.target.type === "checkbox" && e.target.closest(".taskWrapper")) ||
    e.target.name === "delTask"
  ) {
    const data = JSON.parse(localStorage[DB_NAME]);

    for (let i = 0; i < countTasks.length; i++) {
      if (countTasks[i] === e.target.closest(".taskWrapper")) {
        if (e.target.name === "delTask") {
          data.splice(data.length - 1 - i, 1);
        
          localStorage.setItem(DB_NAME, JSON.stringify(data));

          document.querySelector("#todoItems").innerHTML = "";
          data.forEach((item) => renderItem(item));

          countTasks = document.querySelectorAll(".taskWrapper");
        } else {
            data[data.length - 1 - i].completed = data[data.length - 1 - i]
            .completed
            ? false
            : true;
        }
      }
    }
    localStorage.setItem(DB_NAME, JSON.stringify(data));
  }
});

function saveData(todoItem) {
  if (localStorage[DB_NAME]) {
    const data = JSON.parse(localStorage[DB_NAME]);
    data.push(todoItem);
    localStorage.setItem(DB_NAME, JSON.stringify(data));
    return data;
  }

  const data = [todoItem];
  localStorage.setItem(DB_NAME, JSON.stringify(data));
  return data;
}

function deleteAll() {
  const btnClear = document.getElementById('button-clear');
  
  btnClear.addEventListener('click', (e) => {
    e.preventDefault();
      document.querySelector("#todoItems").innerHTML = "";
      localStorage.setItem(DB_NAME, JSON.stringify([]));
    console.log('clear');
  })
}
deleteAll();
function clearInputs() {

  const clearBtn = document.getElementById('clear-input');
  clearBtn.addEventListener('submit', (e) => {
    // e.preventDefault();
    console.log('ok clear');
    // e.target.reset();
  })
  
}
clearInputs();

window.addEventListener("load", () => {
  if (!localStorage[DB_NAME]) return;
    const data = JSON.parse(localStorage[DB_NAME]);
    data.forEach((item) => renderItem(item));
  countTasks = document.querySelectorAll(".taskWrapper");
});

function renderItem(todoItem) {
  const template = createTemplate(
    todoItem.title,
    todoItem.description,
    todoItem.completed
  );
  document.querySelector("#todoItems").prepend(template);
}

function createTemplate(
  titleText = "",
  descriptionText = "",
  completedFlag = false
) {
  const mainWrp = document.createElement("div");
  mainWrp.className = "col-4";

  const wrp = document.createElement("div");
  wrp.className = "taskWrapper";
  mainWrp.append(wrp);

  wrp.innerHTML += ` <div class="col-sm-2 offset-md-10">
            <a href="#" class="btn btn-sm btn-danger ml-5" name = "delTask">Delete Item</a>
        </div>
        `;

  const title = document.createElement("div");
  title.innerHTML = titleText;
  title.className = "taskHeading text-break";
  wrp.append(title);

  const description = document.createElement("div");
  description.innerHTML = descriptionText;
  description.className = "taskDescription text-break";
  wrp.append(description);

  const label = document.createElement("label");
  const input = document.createElement("input");

  input.setAttribute("type", "checkbox");
  if (completedFlag) {
    input.setAttribute("checked", "checked");
  }

  label.append(input);
  label.innerHTML += " completed";

  wrp.append(label);

  return mainWrp;
} 