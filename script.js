let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let visibleCount = 0;

  tasks.forEach((task, index) => {
    const isCompleted = task.completed;

    // Filter logic
    if (
      (currentFilter === "completed" && !isCompleted) ||
      (currentFilter === "pending" && isCompleted)
    ) return;

    visibleCount++;

    const li = document.createElement("li");
    li.className = "task" + (isCompleted ? " completed" : "");
    li.innerHTML = `
      <div class="left">
        <button onclick="toggleTask(${index})">
          ${isCompleted ? "✔" : ""}
        </button>
        <span><strong>${visibleCount}.</strong> ${task.text}</span>
      </div>
      <div class="right">
        <span class="time">${task.time}</span>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });

  document.querySelectorAll(".filter-buttons button").forEach(btn =>
    btn.classList.remove("active")
  );
  document.getElementById(`filter-${currentFilter}`).classList.add("active");
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  const time = new Date().toLocaleTimeString();
  tasks.push({ text, completed: false, time });
  input.value = "";
  saveAndRender();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

// Apply saved theme on load
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Initial render
renderTasks();
