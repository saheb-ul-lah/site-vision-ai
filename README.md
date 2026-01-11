
# 🔮 Site Vision AI

> **Autonomous Web Reconnaissance & Structural Data Extraction**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Stack](https://img.shields.io/badge/stack-MERN-green)
![AI](https://img.shields.io/badge/AI-Llama%204%20Vision-purple)

**Site Vision AI** is a futuristic full-stack application that utilizes headless browser technology and Multimodal AI (Llama 4 Vision via Groq) to visually analyze websites. It takes a URL, captures a full-page screenshot, and extracts structured business intelligence (Business Name, FAQ, Contacts, About Section) into a clean JSON format.

---

## 📸 Screenshots

### 1. The Terminal Interface (Analyzing)
*Real-time simulation of the extraction process with a cyberpunk aesthetic.*

![Analyzing Scene](./screenshots/Screenshot_1.png)

### 2. The Result Dashboard
*Glassmorphism UI displaying extracted business data, FAQs, and contact info.*

![Result Scene](./screenshots/Screenshot_2.png)

---

## 🚀 Features

*   **🕷️ Full-Page Screenshotting:** Uses Puppeteer to capture high-res screenshots of any URL (even below the fold).
*   **🧠 AI Vision Analysis:** Leverages **Groq's Llama 4 Vision** model to "read" the website image like a human.
*   **📂 Structured JSON Extraction:** Converts visual website data into usable code:
    *   Business Identity
    *   About/Mission Statement
    *   Contact Details (Email, Phone, Address)
    *   FAQ Extraction
*   **✨ Cyberpunk UI:** A fully responsive, pure CSS frontend featuring glassmorphism, neon glows, and terminal-style animations.
*   **💾 MongoDB Integration:** Saves analysis history for future reference.

---

## 🛠️ Tech Stack

### **Frontend**
*   **React + Vite:** Fast, modern UI library.
*   **Pure CSS:** Custom variables, animations, and responsive grid layout (No Tailwind).
*   **Lucide React:** Modern vector icons.

### **Backend**
*   **Node.js & Express:** Robust API server.
*   **Puppeteer:** Headless Chrome for screenshot generation.
*   **Groq SDK:** Ultra-fast AI inference using Llama 4.
*   **MongoDB & Mongoose:** Database for storing extraction results.

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/saheb-ul-lah/site-vision-ai.git
cd site-vision-ai
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies.

```bash
cd backend
npm install
```

**Create a `.env` file** in the `backend` folder:
```ini

PORT=5000
MONGO_URI=mongodb://localhost:27017/site-vision-ai

# Get your free key at https://console.groq.com/keys
GROQ_API_KEY=gsk_your_actual_key_here
```

Start the Backend:
```bash
npm run dev
```
*(You should see "Server running on port 5000" and "MongoDB Connected")*

### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies.

```bash
cd ../frontend
npm install
```

Start the Frontend:
```bash
npm run dev
```

---

## 📂 Project Structure

```
site-vision-ai/
├── backend/
│   ├── services/       
│   ├── controllers/    
│   ├── models/         
│   ├── routes/        
│   ├── temp/           
│   └── index.js       
│
└── frontend/
    ├── src/
    │   ├── App.jsx     
    │   ├── App.css     
    │   └── main.jsx    
    └── index.html      
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## 👨‍💻 How to Clone & Run

If you want to send instructions to a friend or a recruiter on how to run your code on their PC, send them these exact steps:

**Prerequisites:**
*   Make sure you have **Node.js** installed.
*   Make sure you have **MongoDB** installed (or use a cloud Mongo URI).

**Steps:**

1.  **Open your terminal** (Command Prompt, PowerShell, or Mac Terminal).
2.  **Run this command:**
    ```bash
    git clone https://github.com/saheb-ul-lah/site-vision-ai.git
    ```
3.  **Go into the folder:**
    ```bash
    cd site-vision-ai
    ```
4.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    ```
    *   *Create a file named `.env` inside the backend folder and paste your Groq API Key there (see README).*
    *   Run it: `npm run dev`
5.  **Setup Frontend :**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
6.  **Enjoy:** Open the link shown in the terminal (usually `http://localhost:5173`).