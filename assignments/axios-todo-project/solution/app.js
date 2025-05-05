const BASE_URL = 'https://api.vschool.io/marcus/todo';

console.log(
    'Warning: Direct API calls may be blocked by CORS. If you see a CORS error, use a proxy like https://cors-anywhere.herokuapp.com/ or run through a local server (e.g., live-server).'
);

// Utility functions
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.getElementById('toast-container').appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function setLoading(isLoading) {
    const overlay = document.getElementById('loading-overlay');
    const submitBtn = document.getElementById('submit-btn');

    if (isLoading) {
        overlay.classList.remove('hidden');
        submitBtn.disabled = true;
    } else {
        overlay.classList.add('hidden');
        submitBtn.disabled = false;
    }
}

function validateImageUrl(url) {
    if (!url) return true;
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

function createTodoElement(todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-item');
    todoDiv.dataset.id = todo._id;
    if (todo.completed) {
        todoDiv.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () =>
        toggleComplete(todo._id, checkbox.checked)
    );

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('todo-content');
    contentDiv.innerHTML = `<strong>${todo.title}</strong> ($${
        todo.price || 0
    })<br>${todo.description || ''}`;

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('todo-actions');
    actionsDiv.appendChild(checkbox);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.setAttribute('aria-label', 'Delete todo');
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this todo?')) {
            todoDiv.classList.add('fade-out');
            todoDiv.addEventListener('animationend', () =>
                deleteTodo(todo._id)
            );
        }
    });
    actionsDiv.appendChild(deleteBtn);

    if (todo.imgUrl) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        const img = document.createElement('img');
        img.src = todo.imgUrl;
        img.alt = `Image for ${todo.title}`;
        img.classList.add('todo-image');
        imageContainer.appendChild(img);
        todoDiv.appendChild(imageContainer);
    }
    todoDiv.appendChild(contentDiv);
    todoDiv.appendChild(actionsDiv);

    return todoDiv;
}

async function getTodos() {
    setLoading(true);
    try {
        const response = await axios.get(BASE_URL);
        const todos = response.data;
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
        todos
            .sort((a, b) => a.completed - b.completed)
            .forEach((todo) => {
                const todoElement = createTodoElement(todo);
                todoList.appendChild(todoElement);
            });
    } catch (error) {
        console.error(
            'Error fetching todos:',
            error.message,
            error.response?.data
        );
        showToast('Failed to load todos. Please try again later.', 'error');
    } finally {
        setLoading(false);
    }
}

async function addTodo(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const price = parseFloat(document.getElementById('price').value) || 0;
    const description = document.getElementById('description').value.trim();
    const imgUrl = document.getElementById('imgUrl').value.trim();

    // Validate image URL
    if (imgUrl && !(await validateImageUrl(imgUrl))) {
        showToast(
            'Invalid image URL. Please check the URL and try again.',
            'error'
        );
        return;
    }

    const newTodo = {
        title,
        price,
        description,
        imgUrl,
        completed: false
    };

    setLoading(true);
    try {
        const response = await axios.post(BASE_URL, newTodo);
        showToast('Todo added successfully!', 'success');
        getTodos();
        document.getElementById('todo-form').reset();
    } catch (error) {
        console.error(
            'Error adding todo:',
            error.message,
            error.response?.data
        );
        showToast('Failed to add todo. Please try again.', 'error');
    } finally {
        setLoading(false);
    }
}

async function toggleComplete(id, completed) {
    setLoading(true);
    try {
        await axios.put(`${BASE_URL}/${id}`, { completed });
        showToast(
            `Todo marked as ${completed ? 'completed' : 'incomplete'}!`,
            'success'
        );
        getTodos();
    } catch (error) {
        console.error(
            'Error updating todo:',
            error.message,
            error.response?.data
        );
        showToast('Failed to update todo. Please try again.', 'error');
    } finally {
        setLoading(false);
    }
}

async function deleteTodo(id) {
    setLoading(true);
    try {
        await axios.delete(`${BASE_URL}/${id}`);
        showToast('Todo deleted successfully!', 'success');
        getTodos();
    } catch (error) {
        console.error(
            'Error deleting todo:',
            error.message,
            error.response?.data
        );
        showToast('Failed to delete todo. Please try again.', 'error');
    } finally {
        setLoading(false);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    getTodos();

    // Add diagnostic logging for form panel with error handling
    setTimeout(() => {
        try {
            const formPanel = document.querySelector('.form-panel');
            if (!formPanel) {
                console.error('Form panel not found in DOM');
                return;
            }

            const formContent = formPanel.querySelector('form');
            const formFooter = formPanel.querySelector('.form-footer');

            console.log('Form Panel Dimensions:', {
                panelHeight: formPanel.offsetHeight,
                panelScrollHeight: formPanel.scrollHeight,
                panelClientHeight: formPanel.clientHeight,
                contentHeight: formContent?.offsetHeight || 'N/A',
                footerHeight: formFooter?.offsetHeight || 'N/A',
                panelPadding: window.getComputedStyle(formPanel).padding,
                panelOverflow: window.getComputedStyle(formPanel).overflow,
                panelDisplay: window.getComputedStyle(formPanel).display,
                panelFlexDirection:
                    window.getComputedStyle(formPanel).flexDirection,
                panelJustifyContent:
                    window.getComputedStyle(formPanel).justifyContent
            });

            // Log when scrolling occurs
            formPanel.addEventListener('scroll', () => {
                console.log('Scroll Position:', {
                    scrollTop: formPanel.scrollTop,
                    scrollHeight: formPanel.scrollHeight,
                    clientHeight: formPanel.clientHeight
                });
            });
        } catch (error) {
            console.error('Error in diagnostic logging:', error);
        }
    }, 100);
});

document.getElementById('todo-form').addEventListener('submit', addTodo);

// Form validation
document.getElementById('price').addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    if (value < 0) {
        e.target.value = 0;
    }
});
