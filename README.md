# PC Builder App 🖥️ (Work in Progress)

## 🚧 Project Status
This project is currently under development. Some features may be incomplete or unstable.

Note: English version of the application is planned for future releases, as current (Polish) was from my old university project.

## 📝 Description
PC Builder is a web application that allows users to create and manage computer builds.

## 🛠️ Technologies
- Frontend: React, React Router
- Backend: Python, Flask
- Database: SQLite
- Authorization: JWT

## ✨ Key Features
- Authentication system
- User roles (Admin/User)
- Computer build management
- Admin panel

### Requirements
- Node.js
- Python 3.8+
- pip
  
## 🚀 Installation
- First we need to install flask and flask-cors using pip: ``pip install flask, flask-cors``
- Then, build node modules using ``npm i``


### Setup
1. Clone the repository and install dependencies:
```bash
git clone https://github.com/skrapi2011/pc-builder-app.git
cd pc-builder-app
```

2. Configure .env files (copy from .env.example, default should be https://localhost:5000)

3. Run the application:
```bash
# Terminal 1 (backend)
python src/api.py

# Terminal 2 (frontend)
npm start
```

The application will be available at `http://localhost:3000`

## 👥 Roles
- Administrator: Component management, admin panel
- User: Creating and managing builds

## ✍️ Author
Michał Wiśniewski

---
⚠️ **Note**: Project under development
