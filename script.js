document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = tasks.map((task, index) => `
            <li data-index="${index}" class="${task.completed ? 'complete' : ''}">
                <label>
                    <input type="checkbox" ${task.completed ? 'checked' : ''}>
                    ${task.text}
                </label>
                <button class="deleteBtn">Delete</button>
            </li>
        `).join('');
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = Array.from(taskList.children).map((li) => ({
            text: li.querySelector('label').textContent.trim(),
            completed: li.querySelector('input[type="checkbox"]').checked,
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add new task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push({ text: taskText, completed: false });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            loadTasks();
        }
    });

    // Handle task list actions
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('deleteBtn')) {
            const index = e.target.parentElement.dataset.index;
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            loadTasks();
        } else if (e.target.type === 'checkbox') {
            const index = e.target.parentElement.parentElement.dataset.index;
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks[index].completed = e.target.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            loadTasks();
        }
    });

    // Initial load
    loadTasks();
});
