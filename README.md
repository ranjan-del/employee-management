#Employee Management System

This is an Angular-based Employee Management System that allows users to add, view, edit, and delete employees using Angular, Angular Material, and Firebase Firestore for database management.

📌 Features

1.Add Employee: Open a dialog to enter employee details.
2.View Employees: Display employees in a material table.
3.Edit Employee: Modify existing employee details.
4.Delete Employee: Remove employees from the system.
5.Auto-incrementing Employee ID.
6.Firestore Integration for real-time updates.

🛠️ Prerequisites:

Ensure you have the following installed before running the project:
Node.js (v14 or later)
Angular CLI (v13 or later)
Firebase Account

To check if you have these installed, run:
node -v
npm -v
ng version

If Angular CLI is not installed, install it using:
npm install -g @angular/cli

🚀 Installation and Setup

1️⃣ Clone the Repository
git clone https://github.com/ranjan-del/employee-management.git
cd employee-management

2️⃣ Install Dependencies
npm install

3️⃣ Configure Firebase
Go to Firebase Console.
Create a new project.
Enable Cloud Firestore under the Database section
Get the Firebase configuration details
Open src/environments/environment.ts and update it with your Firebase credentials:

export const environment = {
  production: false,
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};

🏃‍♂️ Running the Project
1️⃣ Start the Development Server
ng serve --open

This will open http://localhost:4200/ in your browser.
You should see the Employee Management System homepage.

🚀 Deploying the Project
1️⃣ Install Firebase CLI
npm install -g firebase-tools

2️⃣ Login to Firebase
firebase login

3️⃣ Initialize Firebase Hosting
firebase init

Select Hosting and choose the Firebase project you created earlier.
Set dist/employee-management as the public directory.

4️⃣ Deploy to Firebase
ng build --prod
firebase deploy

This will generate a hosting URL like:

https://employee-management.web.app/

You can now share this link to access your deployed project.

📧 Contact & Support
For any issues, feel free to open an issue in the GitHub repository or contact me at ranjang140503@gmail.com
Happy Coding! 🚀
