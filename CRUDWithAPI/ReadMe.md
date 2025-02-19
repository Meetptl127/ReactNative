Here’s a component-based explanation of both the Home and CreateUserScreen components. This approach breaks down each component into its core parts and explains how they work together.

1. Home Component
   Purpose
   The Home component is the main screen that displays a list of users fetched from an API. It supports:

Fetching users with pagination.

Editing and deleting users.

Navigating to the CreateUserScreen to add or edit users.

Component Breakdown
State Management:

users: Stores the list of users fetched from the API.

loading: Tracks whether the initial data fetch is in progress.

page: Manages the current page number for pagination.

loadingMore: Tracks whether additional data is being fetched.

Functions:

fetchUsers:

Fetches users from the API with pagination.

Appends new users to the existing list.

Updates the page state for the next fetch.

handleNavigate:

Navigates to the CreateUserScreen for adding or editing a user.

Passes the selected user (if editing) and the setUsers function to update the list.

handleDelete:

Displays a confirmation alert before deleting a user.

Sends a DELETE request to the API and removes the user from the local state.

UI Components:

FlatList:

Displays the list of users.

Each user item includes an avatar, name, username, and edit/delete buttons.

Implements infinite scrolling using onEndReached and onEndReachedThreshold.

Floating Add Button:

A circular button at the bottom-right corner to navigate to the CreateUserScreen for adding a new user.

Lifecycle:

useEffect:

Fetches the initial list of users when the component mounts.

Workflow
Initial Render:

Fetches the first page of users and displays them in a list.

Pagination:

Fetches more users when the user scrolls to the bottom of the list.

Edit/Delete:

Users can edit or delete a user by clicking the respective buttons.

Add User:

The floating button navigates to the CreateUserScreen for adding a new user.

2. CreateUserScreen Component
   Purpose
   The CreateUserScreen component is used to:

Create a new user.

Edit an existing user.

Component Breakdown
State Management:

name: Stores the user's name (prefilled if editing).

username: Stores the username (prefilled if editing).

avatar: Stores the user's avatar URL (random if creating a new user).

loading: Tracks whether the form is being submitted.

Route Parameters:

user: The user object passed from the Home screen (if editing).

setUsers: The setUsers function passed from the Home screen to update the user list.

Functions:

handleSubmit:

Validates the form inputs.

If editing, sends a PUT request to update the user and updates the local state.

If creating, generates a new user object and adds it to the local state.

Navigates back to the Home screen after submission.

UI Components:

Avatar Image:

Displays the user's avatar (random if creating a new user).

TextInput Fields:

Two input fields for name and username.

Submit Button:

Changes text dynamically based on whether the user is being edited or created.

Loading Spinner:

Shown when the form is being submitted.

Workflow
Editing a User:

The existing user's data is prefilled in the form.

On submission, the user's data is updated in the local state and the API (if applicable).

The user is navigated back to the Home screen.

Creating a User:

The user fills in the name and username fields.

On submission, a new user object is created and added to the local state.

The user is navigated back to the Home screen.

Interaction Between Components
Navigation:

The Home component navigates to the CreateUserScreen using the handleNavigate function.

The CreateUserScreen navigates back to the Home component after submission.

Data Flow:

The Home component passes the setUsers function to the CreateUserScreen to update the user list.

The CreateUserScreen updates the local state in the Home component after creating or editing a user.

State Management:

Both components rely on local state to manage data.

The Home component manages the list of users, while the CreateUserScreen manages the form inputs.

Component-Based Summary
Component Purpose Key Features
Home Displays a list of users with pagination, edit, delete, and add functionality. - Fetches users with pagination.

- Supports editing and deleting users.
- Navigates to CreateUserScreen.
  CreateUserScreen Handles creating and editing users. - Prefills form for editing.
- Generates random avatar for new users.
- Updates local state in Home.
  Visual Workflow
  Home Screen:

Displays a list of users.

User clicks "Edit" → Navigates to CreateUserScreen with user data.

User clicks "Delete" → Deletes the user after confirmation.

User clicks "Add" → Navigates to CreateUserScreen for adding a new user.

CreateUserScreen:

User fills in the form (or edits existing data).

User clicks "Submit" → Updates local state in Home and navigates back.

This component-based explanation provides a clear understanding of how the Home and CreateUserScreen components work individually and interact with each other.
