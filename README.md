# 🚀 End-to-End Realtime Chat Application

A full-stack realtime chat application built with the MERN stack (MongoDB, Express, React, Node.js), featuring user authentication, theme customization, and real-time messaging capabilities.

![Chat App Demo](https://via.placeholder.com/800x400.png?text=Chat+App+Demo+Preview) *Replace with actual screenshot*

## 🌟 Features

- 🔒 **JWT Authentication** with secure HTTP-only cookies
- 💬 **Realtime messaging** using Socket.io
- 🎨 **Theme Customization** (light/dark mode + custom themes)
- 📱 **Responsive Design** for all screen sizes
- 🔄 **State Management** with Zustand
- 🛠 **Modern UI** built with Tailwind CSS and DaisyUI
- 📦 **File Upload** capability
- 👤 **User Online/Offline** status
- ✉️ **Message Read Receipts**
- 🧩 **Modular Code Structure**

## 🛠 Tech Stack

**Frontend:**
- React.js
- Zustand (State Management)
- Tailwind CSS + DaisyUI (Styling)
- Socket.io Client (Realtime Communication)
- Axios (HTTP Client)
- React Icons

**Backend:**
- Node.js + Express.js
- MongoDB (Database)
- Mongoose (ODM)
- Socket.io (Realtime Server)
- JWT (Authentication)
- Bcrypt (Password Hashing)
- Cookie-parser (Cookie Management)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance
- Git

### Installation

1. **Clone the repository**
   ```bash
   
   git clone https://github.com/your-username/End-to-End-Realtime-Chat-Application.git
   cd End-to-End-Realtime-Chat-Application
2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   cp .env.example .env  # Create environment file

3. **Frontend Setup**
  ```bash
  cd ../Frontend
  npm install
  cp .env.example .env  # Create environment file
  ```
### Configuration
1. **Backend.env**
  ```bash
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=30d
COOKIE_DOMAIN=localhost
SOCKET_CORS_ORIGIN=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
2. **Frontend .env**
   ```bash
    REACT_APP_API_URL=http://localhost:8000/api/v1
    REACT_APP_SOCKET_URL=http://localhost:8000
   ```
### Running the Application
1. **Start Backend Server**
   ```bash
   cd Backend/src
   npm run dev
   ```
2. **Start Frontend Server**
  ```bash
  cd Frontend
  npm run dev
  ```
 
### 📄 License
This is entirely open-source and your contributions are most welcomed!


