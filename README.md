# To-Do List Application

## Overview

This **To-Do List Application** allows users to manage their tasks with a simple and easy-to-use interface. The project uses **HTML**, **CSS**, and **JavaScript** along with **Bootstrap** and **Font Awesome** for design elements. The app stores tasks in the browser's `localStorage` so that tasks remain persistent between sessions. 

## Features

### 1. Add New Tasks
- Users can enter a new task in the input field and click the **Add** button or press **Enter** to add it to the task list.
- Tasks are displayed in the order they are added and can be customized with priorities or categories (future enhancement).

### 2. Task Completion
- Users can click on the check icon next to each task to mark it as completed. 
- Completed tasks are displayed with a strikethrough effect and updated icons.

### 3. Edit Tasks
- Each task has an **Edit** button that opens a modal, allowing users to update the task’s content. 
- Tasks are updated in real-time, and the task list is refreshed immediately.

### 4. Delete Tasks
- Users can delete tasks by clicking on the **Delete** icon. 
- A smooth fade-out animation occurs when deleting a task for a better user experience.
- Users are notified with a live message when a task is deleted.

### 5. Notifications
- The application shows live notifications at the bottom of the screen whenever a task is added, updated, or deleted. 
- Notifications automatically disappear after a short duration.

### 6. Persisting Data
- Tasks are saved in `localStorage`, which ensures that they remain even after closing the browser or refreshing the page.

### 7. Responsive Design
- The application uses responsive design techniques to work on various screen sizes, from desktop to mobile.

### 8. Animations
- Transitions are added when tasks are created or deleted, providing a fade-in/fade-out effect for better user interaction.

## Project Structure

The project consists of three main files:

1. **index.html**: The main HTML file that contains the structure of the app.
    - Includes Bootstrap, Font Awesome, and custom CSS/JS files.
    - Contains the input field, task display section, and notification area.

2. **style.css**: The custom CSS file that defines the look and feel of the application.
    - Defines colors, typography, layouts, and transitions.
    - Includes responsive breakpoints for different screen sizes.
    - Animates tasks and notifications using keyframes.

3. **main.js**: The JavaScript file that handles the app’s functionality.
    - Manages task addition, editing, and deletion.
    - Stores tasks in `localStorage` and retrieves them on page load.
    - Handles event listeners and DOM manipulation for dynamic task management.
    - Implements transition effects for task actions (add, edit, delete).

## How to Run the Project

1. Download or clone the repository to your local machine.
2. Open the **index.html** file in any modern web browser.
3. The application is ready to use without any additional configuration or installations.

## Future Enhancements

- **Task Priorities**: Add support for setting task priority (low, medium, high) with color-coding.
- **Due Dates & Reminders**: Assign due dates to tasks and notify users as deadlines approach.
- **Drag-and-Drop**: Allow users to reorder tasks using drag-and-drop.
- **Search and Filters**: Add a search feature to find tasks quickly, and filters to show completed, pending, or high-priority tasks.
- **Sync Across Devices**: Use a backend or cloud service like Firebase to sync tasks across multiple devices.

## Technologies Used

- **HTML5**: Structure of the app.
- **CSS3**: Custom styling and animations, with responsiveness for different screen sizes.
- **JavaScript (ES6)**: Manages the app's core functionality and task interactions.
- **Bootstrap**: Provides layout and responsive design.
- **Font Awesome**: Used for task icons (add, edit, delete, check).
- **localStorage**: Stores tasks locally in the browser to ensure persistence between sessions.