# To-Do List Web Application

## Project Overview

This **To-Do List Web Application** is a fully responsive and interactive task management tool built using **HTML5**, **CSS3**, **Bootstrap**, and **JavaScript**. The app enables users to easily add, edit, mark complete, and delete tasks. It features seamless data persistence using **localStorage**, ensuring tasks are saved across browser sessions. With a modern UI and intuitive task management experience, this app is designed to enhance productivity and help users stay organized.

---

## Features

### 1. **Add New Tasks**
- **Input Box:** Users can type in tasks in a text input field.
- **Task Submission:** Tasks can be added by clicking the "Add" button or pressing the "Enter" key.
- **Task Notifications:** After a task is added, the app displays a notification confirming successful addition.

### 2. **Task Management**
- **Mark as Complete:** Users can click a checkbox icon next to the task to mark it as completed. The task text will appear with a strikethrough to indicate completion.
- **Edit Tasks:** Each task has an edit button, which opens a modal allowing users to update the task's text.
- **Delete Tasks:** Tasks can be removed by clicking the delete icon. A fade-out animation is triggered before the task is removed from the list.

### 3. **Local Storage Integration**
- **Data Persistence:** All tasks are automatically stored in the browser's localStorage. This means tasks remain available even after the page is refreshed or the browser is closed and reopened.
- **Task Sync:** When the page is loaded, tasks from localStorage are automatically loaded into the task list.

### 4. **Responsive Design**
- The app is fully responsive, adapting its layout based on screen size, ensuring usability across desktop, tablet, and mobile devices.

### 5. **User Feedback (Toast Notifications)**
- Each action—whether adding, updating, or deleting a task—triggers a toast notification that appears in the bottom right corner of the screen to confirm the action.

---

## Project Structure

The project consists of three primary files:
1. **index.html**  
   This file contains the core HTML structure of the app. It includes:
   - A container for the application.
   - An input field for entering tasks.
   - Buttons for task submission.
   - A div that holds all the tasks dynamically created via JavaScript.
   - Links to external CSS and JavaScript files for styling and functionality.

2. **style.css**  
   This file handles the styling of the application, ensuring a modern and clean interface. Key styles include:
   - **Main Color Scheme:** The app uses a primary color (`--main-color`) for buttons and borders, and an alternative color (`--alt-color`) for backgrounds.
   - **Responsive Design:** Media queries adjust the layout for different screen sizes, ensuring a smooth user experience across devices.
   - **Transitions and Animations:** Smooth transitions are applied to task deletions, and toast notifications animate into view.

3. **main.js**  
   This file contains the core logic of the application. It manages:
   - **Task Handling:** Functions for adding, deleting, and editing tasks.
   - **LocalStorage Management:** Functions for saving tasks to localStorage and loading them upon page load.
   - **Event Listeners:** Listeners for user actions such as clicking the "Add" button, pressing "Enter," editing tasks, and deleting them.
   - **Task Status Toggle:** A feature that allows users to mark tasks as complete or incomplete.
   - **Toast Notifications:** A function that shows notifications when a task is added, edited, or deleted.

---

## How It Works: User Interaction

1. **Adding a Task:**
   - The user types a task into the input field and either clicks the "Add" button or presses the "Enter" key. 
   - The task appears in the task list and is automatically saved to localStorage.
   - A toast notification confirms that the task was successfully added.

2. **Marking a Task as Complete:**
   - The user clicks the checkbox icon next to a task to mark it as complete. The text of the task is crossed out to indicate that it's finished.
   - Clicking the checkbox again toggles the task back to incomplete.

3. **Editing a Task:**
   - The user clicks the "edit" icon (pen icon), which opens a modal with an input field pre-filled with the current task text.
   - After updating the text, the user clicks "Update," and the task text is updated on the page as well as in localStorage. A toast notification confirms the update.

4. **Deleting a Task:**
   - The user clicks the trash icon to delete a task. The task fades out before being removed from the task list and localStorage.
   - A toast notification confirms the task's deletion.

5. **Persistent Data:**
   - The tasks persist even after the user closes or refreshes the page. The tasks are automatically loaded from localStorage upon opening the app again.

---

## Technologies Used
- **HTML5**: Provides the structure and layout of the application.
- **CSS3**: Offers the visual styling and responsive design, ensuring the app is visually appealing across different devices.
- **Bootstrap 5**: Adds responsive design elements and built-in components like modals.
- **JavaScript (ES6)**: Powers the interactivity, including task management, localStorage handling, and user notifications.
- **Font Awesome**: Used for icons within the app, such as the checkbox, edit, and delete icons.