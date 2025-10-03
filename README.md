# 🚀 User Management App

A simple **React User Management Application** 
The app demonstrates **components, state management, routing, forms, and data fetching** in React.

---

## ✨ Features

- 📋 **List Users**  
  Fetches data from [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users)  
  Displays users in a styled Material UI table.

- 🔍 **Search Users**  
  Client-side search by **name** or **email**.

- 📄 **User Details Page**  
  Clicking a user navigates to details page.  
  Shows **address, phone, website** with nice UI.

- ➕ **Add New User (Local only)**  
  Form with validation (name & valid email required).  
  Newly added user appears at the **top of the list**.

- ✏️ **Edit User** *(bonus with Redux)*  
  Update existing user’s details in state.

- ❌ **Delete User** *(bonus with Redux)*  
  Remove user from list instantly.

- ↕️ **Sorting**  
  Sort users alphabetically by name.

---

## 🛠️ Tech Stack

- ⚛️ React (functional components + hooks)
- 🗂️ Redux Toolkit (state management for users)
- 🌐 React Router v6 (routing)
- 🎨 Material UI (UI components & responsiveness)
- 💾 LocalStorage (store new users)

---

## 📦 Installation & Usage

Clone the repository:

```bash
git clone https://github.com/Alisa-Shala/user-management-app.git
cd user-management-app
Install dependencies:


npm install
Run development server:


npm start
Open http://localhost:3000 in your browser.

Build for production:

npm run build
