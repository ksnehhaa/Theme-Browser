HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# 🌐 Theme Browser

**Theme Browser** is a full-stack MERN platform where developers, designers, and creators can upload, explore, and showcase a variety of creative projects — from websites and animations to logos, UI/UX designs, and graphic work. Designed for collaboration and inspiration.

---

## 🔥 Features

- 🔐 **User Authentication** – Secure login/signup using JWT
- 📤 **Project Uploads** – Upload files or share project/demo/source links
- 🧠 **Smart Categories** – Website, Animation, Logo, UI/UX, Text Effects, Graphic Design
- ☁️ **Cloud Storage** – Cloudinary-powered media handling
- 🧑‍💻 **Personal Dashboard** – View, manage and update your own uploads
- 🌍 **Public Galleries** – Browse community uploads by category
- 🔎 **Search Functionality** – Quickly find projects by title
- 📱 **Responsive UI** – Built with Tailwind CSS for modern UX

---

## 🛠️ Tech Stack

**Frontend:** React.js, Tailwind CSS, Axios  
**Backend:** Node.js, Express.js, MongoDB  
**Storage:** Cloudinary  
**Auth:** JWT (JSON Web Token)

---

## 🚀 How To Use

### 1. Clone the Repository
Open your terminal and run:

Bash:
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

###2. Configure Environment Variables (.env)
Since sensitive information like database URLs and secrets are not uploaded to GitHub, you need to create your own environment file:
Navigate to the server (backend) folder.
Create a file named .env.
Copy and paste the following template into the file and fill in your actual values:

Plaintext:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_random_secret_string

Note: If you don't have a MongoDB string, you can get a free one at MongoDB Atlas.

###3. Install Dependencies & Run Locally
You need to start both the backend and the frontend.
For the Backend:

Bash:
cd server
npm install
npm start

For the Frontend:

Bash:
cd client
npm install
npm run dev

###4. Browse the Website
Once both servers are running, open your browser to http://localhost:5173 (or the URL shown in your terminal).
You should see the landing page of the application.

###5. Create an Account

Click on the Signup button.
Register with a username, email, and password.
Note: The password is securely hashed using Argon2 before being saved to the database.

###6. Explore & Upload

Login: Use your new credentials to access your dashboard.
Explore: Browse through the available features.
Upload: Start uploading your content (ensure the backend is connected to see your data persist!).

```bash
git clone https://github.com/your-username/theme-browser.git
cd theme-browser

2. Install Dependencies
bash
Copy
Edit

# Frontend
cd client
npm install
npm run dev
bash

# Backend
cd ../server
npm install
npm run dev

3. Setup Environment Variables
Create a .env file inside the /server directory with the following:
env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
🌐 Live Demo
🔗 View Live

🤝 Contributing
Want to enhance this project? Contributions are welcome!
Fork the repo → create a new branch → make changes → submit a pull request.

Let’s grow this platform together and help creators shine.

📬 Connect With Me
Created by Kumari Sneha
Collaboration & Contribution
We believe in open-source collaboration. If you're passionate about creativity, full-stack development, or improving user experience, you’re welcome to contribute!

🧠 Ideas You Can Add:
⭐ Like/Favorite system

💬 Comments & feedback on projects

📊 Project analytics (views, likes, trends)

🧪 Auto testing for responsiveness/performance

🌐 Internationalization (i18n)

Fork the repo → Create a feature branch → Make changes → Submit a pull request
We'll review your contribution and give you credit in the changelog.

Theme Browser — Discover. Upload. Inspire.
483f2a3a03f449120fb0f1abf8e63dfeaf4ff8dd
