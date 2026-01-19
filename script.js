document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskModal = document.getElementById('task-modal');
    const taskForm = document.getElementById('task-form');
    const cancelBtn = document.getElementById('cancel-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const taskColumns = document.querySelectorAll('.task-column');
    const taskTitleInput = document.getElementById('task-title');
    const suggestionsContainer = document.getElementById('suggestions-container');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const toastContainer = document.getElementById('toast-container');

    // --- State & Data ---
    let tasks = JSON.parse(localStorage.getItem('kanbanTasks')) || [];
    let currentTheme = localStorage.getItem('theme') || 'light';
    let selectedSuggestionIndex = -1;
    let filteredTasks = [...tasks];

    const taskSuggestions = [
        "Review pull request", "Update documentation", "Fix bug in auth", "Implement new feature",
        "Write unit tests", "Optimize database query", "Deploy to staging", "Refactor legacy code",
        "Design new mockup", "Team meeting", "Code review", "Client call", "Plan sprint",
        "Update dependencies", "Research new technology"
    ];

    // --- ENHANCEMENT: Toast Notification System ---
    const showNotification = (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icon = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';
        toast.innerHTML = `<span class="material-icons-outlined">${icon}</span><span>${message}</span>`;
        toastContainer.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // --- Initialization ---
    const init = () => {
        console.log("App initializing...");
        applyTheme(currentTheme);
        setupEventListeners();
        renderTasks();
        console.log("App initialized.");
    };

    // --- Event Listeners Setup ---
    const setupEventListeners = () => {
        addTaskBtn.addEventListener('click', openModal);
        cancelBtn.addEventListener('click', closeModal);
        taskForm.addEventListener('submit', handleFormSubmit);
        themeToggle.addEventListener('click', toggleTheme);
        searchInput.addEventListener('input', handleSearch);
        
        // ENHANCEMENT: Click outside modal to close
        taskModal.addEventListener('click', (e) => {
            if (e.target === taskModal) {
                closeModal();
            }
        });

        taskTitleInput.addEventListener('input', handleInputChange);
        taskTitleInput.addEventListener('focus', () => handleInputChange());
        taskTitleInput.addEventListener('keydown', handleKeyNavigation);
        taskTitleInput.addEventListener('blur', () => setTimeout(hideSuggestions, 150));

        taskColumns.forEach(column => {
            column.addEventListener('dragover', handleDragOver);
            column.addEventListener('drop', handleDrop);
            column.addEventListener('dragleave', handleDragLeave);
        });
    };

    // --- Suggestion Logic ---
    const handleInputChange = () => { /* ... (no changes) ... */ };
    const showSuggestions = (suggestions) => { /* ... (no changes) ... */ };
    const hideSuggestions = () => { /* ... (no changes) ... */ };
    const handleKeyNavigation = (e) => { /* ... (no changes) ... */ };
    const updateSuggestionSelection = (items) => { /* ... (no changes) ... */ };
    
    // --- Search Logic ---
    const handleSearch = () => { /* ... (no changes) ... */ };
    
    // --- Theme Management ---
    const applyTheme = (theme) => { /* ... (no changes) ... */ };
    const toggleTheme = () => { /* ... (no changes) ... */ };

    // --- Modal Management ---
    const openModal = () => {
        taskModal.classList.remove('hidden');
        taskTitleInput.focus();
    };
    const closeModal = () => {
        taskModal.classList.add('hidden');
        taskForm.reset(); // Clear all form fields
        hideSuggestions(); // Hide any open suggestions
    };

    // --- Task Management ---
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted.");
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const priority = document.getElementById('task-priority').value;
        const dueDate = document.getElementById('task-date').value;
        const newTask = { id: Date.now(), title, description, priority, dueDate, status: 'todo' };
        
        tasks.push(newTask);
        saveTasks();
        handleSearch(); // Re-apply search filter
        closeModal();
        showNotification(`Task "${title}" added successfully!`, 'success'); // ENHANCEMENT
    };

    const deleteTask = (id) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;
        if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
            handleSearch();
            showNotification(`Task "${task.title}" deleted.`, 'error'); // ENHANCEMENT
        }
    };
    
    const saveTasks = () => {
        console.log("Saving tasks to localStorage:", tasks);
        localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
    };
    
    // --- Rendering ---
    const renderTasks = () => {
        console.log("Rendering tasks...");
        taskColumns.forEach(column => {
            const emptyState = column.querySelector('.empty-state');
            column.innerHTML = '';
            if(emptyState) column.appendChild(emptyState);
        });

        filteredTasks.forEach(task => {
            const taskEl = createTaskElement(task);
            const column = document.querySelector(`[data-status="${task.status}"]`);
            if (column) { column.appendChild(taskEl); }
        });
        updateTaskCounts();
        console.log("Tasks rendered.");
    };
    
    const createTaskElement = (task) => { /* ... (no changes) ... */ };
    
    const updateTaskCounts = () => { /* ... (no changes) ... */ };

    // --- Drag and Drop Logic ---
    let draggedElement = null;
    function handleDragStart(e) { /* ... (no changes) ... */ }
    function handleDragEnd(e) { /* ... (no changes) ... */ }
    function handleDragOver(e) { /* ... (no changes) ... */ }
    function handleDragLeave(e) { /* ... (no changes) ... */ }
    function handleDrop(e) {
        e.preventDefault(); const column = e.currentTarget; column.classList.remove('drag-over');
        const newStatus = column.dataset.status; const taskId = parseInt(draggedElement.dataset.taskId, 10);
        const task = tasks.find(t => t.id === taskId);
        if (task && task.status !== newStatus) {
            task.status = newStatus;
            saveTasks();
            handleSearch();
            showNotification(`Task moved to ${newStatus.replace('-', ' ')}.`, 'info'); // ENHANCEMENT
        }
    }
    
    
    // --- Global Functions ---
    window.deleteTask = deleteTask;
    window.toggleDescription = (id) => { /* ... (no changes) ... */ };

    init();
});
// NOTE: I have omitted the unchanged functions for brevity. 
// Please copy the functions from the previous script.js for: handleInputChange, showSuggestions, hideSuggestions, etc.
// Or, for simplicity, replace your entire script.js with this code and then re-copy the missing functions from the previous version into their correct places.
// The most important changes are in handleFormSubmit, deleteTask, handleDrop, and the new showNotification function.
