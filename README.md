## ⚛️ Shadow Chat – Frontend (React)

A modern and secure chat interface built using **React**, providing seamless user interaction with a focus on **privacy and encryption**.

---

### ✨ Core Functionality

- 🔐 **Login / Register** using **Firebase Authentication**
- 💬 **Send and receive encrypted messages** securely
- 🖼️ **Hide messages inside images** using **steganography**, then **upload to Firebase Storage**
- 📦 **Communicate with a FastAPI backend** to fetch and push chat data

---

### 🚀 Features

- 🔑 **Authentication** with Firebase  
  Handles **secure user signup and login**, backed by Firebase's real-time authentication system.

- 📤 **Encrypted Message Upload via Image Steganography**  
  Messages are **encoded into image files** before being sent, ensuring privacy even in transit.

- 🗂️ **Firebase Storage Integration**  
  Encrypted image files are stored in the **Firebase Storage bucket** with proper metadata.

- 🌐 **Routing** with React Router  
  Seamless **navigation between pages** using **SPA (Single Page Application)** behavior.

- 🌙 **Dark Mode Support**  
  A sleek, **user-friendly dark UI**, easy on the eyes and responsive on all screens.

- 🧠 **Global State Management via Context API**  
  All **authentication and messaging states** are managed centrally using **React's Context API**.

- 🔗 **FastAPI Backend Communication**  
  The frontend securely **interacts with the FastAPI backend** for storing, retrieving, and managing messages.

---

📁 **Tech Stack**  
- React  
- Firebase Auth  
- Firebase Storage  
- React Router  
- Context API  
- Axios (for API calls)
  
----

📁 **Folder Stucture** 
<img width="316" height="848" alt="Screenshot 2025-07-21 173402" src="https://github.com/user-attachments/assets/f21b4393-6ff3-4bab-b09b-849062fb7621" />

### 🚀 Setup Instructions
- **1. Clone the Frontend Repo**
  git clone https://github.com/RupeshBhulode/Shadow_Chat_React.git
cd Shadow_Chat_React

- **2. Install Dependencies**
npm install

- **3. Environment Variables**
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_BACKEND_URL=http://localhost:8000

- **4. Run the App**     
npm start



