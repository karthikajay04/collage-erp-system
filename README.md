# Student ERP System (CSProConnect)

## Overview
**CSProConnect** is a comprehensive Enterprise Resource Planning (ERP) system tailored for educational institutions. It provides a seamless platform for managing student data, faculty information, academic records, attendance, and more. The system is divided into three distinct portals: **Admin**, **Faculty**, and **Student**, ensuring a secure and organized workflow for all users.



## Features

### 🎓 Student Portal
- **Dashboard:** Overview of pending tasks and announcements.
- **Marks:** View internal and external marks for various subjects.
- **Attendance:** Check attendance records and percentage.
- **Timetable:** View weekly class schedules.
- **Materials:** Download study materials uploaded by faculty.
- **Profile:** View personal and academic details.

### 👩‍🏫 Faculty Portal
- **Dashboard:** Quick access to assigned classes and subjects.
- **Attendance Management:** Mark and view student attendance.
- **Marks Management:** Upload and update student marks.
- **Study Materials:** Upload notes and resources for students.
- **Student Details:** View comprehensive details of students in their classes.
- **Timetable:** View teaching schedule.

### 🛠 Admin Portal
- **Manage Faculty:** Add, edit, and view faculty members.
- **Manage Students:** Add, edit, and view student profiles.
- **Manage Subjects:** Create and assign subjects to departments/semesters.
- **Notices:** Post announcements for students and faculty.
- **Admin Profile:** Manage admin account settings.

## Technology Stack

### Frontend
- **Framework:** React.js
- **State Management:** Redux
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Icons:** React Icons

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ORM:** Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **CORS:** Cross-Origin Resource Sharing

### Tools & Services
- **Firebase:** For file storage (images, documents).
- **Mailgun:** For sending emails (optional integration).
- **jsPDF & AutoTable:** For generating PDF reports.
- **XLSX:** For Excel file handling.

## Project Structure
```
erp-main/
├── backend/                # Node.js/Express Backend
│   ├── Database/           # Database connection logic
│   ├── models/             # Mongoose schemas (User, Student, Faculty, etc.)
│   ├── routes/             # API routes
│   ├── index.js            # Server entry point
│   └── package.json        # Backend dependencies
│
└── frontend/               # React Frontend
    ├── public/             # Static assets
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── Screens/        # Page components (Admin, Faculty, Student)
    │   ├── redux/          # Redux actions and reducers
    │   ├── firebase/       # Firebase configuration
    │   ├── App.js          # Main application component
    │   └── baseUrl.js      # API base URL configuration
    └── package.json        # Frontend dependencies
```

## Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (installed locally or a cloud instance like MongoDB Atlas)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/karthikajay04/collage-erp-system.git

```

### 2. Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Environment Variables:**
    Create a `.env` file in the `backend` directory and add your configurations:
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/csproconnect  # Or your MongoDB Atlas URI
    ```
4.  Start the backend server:
    ```bash
    npm start
    ```
    The server should be running on `http://localhost:5000`.

### 3. Frontend Setup
1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Configuration:**
    *   **Firebase:** Open `src/firebase/config.js` and update the `firebaseConfig` object with your own Firebase project credentials.
        ```javascript
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
            // ... other config
        };
        ```
    *   **Mailgun (Optional):** Open `src/mailgun_api.js` and add your API key if you intend to use email features.
    *   **API URL:** Check `src/baseUrl.js`. It defaults to `http://localhost:5000/api`. If your backend runs on a different port, update it here.
4.  Start the frontend application:
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`.

## Usage
1.  Ensure both Backend and Frontend servers are running.
2.  Navigate to `http://localhost:3000`.
3.  Log in using your credentials.
    *   **Admin Login:**
        *   Default Login ID: `1234`
        *   Default Password: `root`
    *   **Faculty Login:** Select 'Faculty' and enter faculty credentials (created by Admin).
    *   **Student Login:** Select 'Student' and enter student credentials (created by Admin).

## License
This project is licensed under the ISC License.
