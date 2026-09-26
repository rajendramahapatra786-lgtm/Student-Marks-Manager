# 🎓 Student Marks Manager

A modern, responsive **Student Marks Manager** built with **HTML, CSS, and Vanilla JavaScript**.  
The application allows users to enter student details, manage subjects and marks dynamically, calculate results, analyze performance, and share or print the generated result.

> **Project type:** Frontend Web Application  
> **Primary technologies:** HTML5 • CSS3 • JavaScript (ES6+)  
> **Storage:** Browser LocalStorage  
> **Status:** Completed / Portfolio Project

---

## ✨ Overview

Student Marks Manager is designed to make student-result calculation simple, interactive, and visually engaging.

Instead of using a basic form and plain text output, the project provides a dashboard-style experience with:

- Dynamic subject management
- Automatic marks and percentage calculation
- Grade and performance evaluation
- Subject-wise performance analysis
- PASS / FAIL status
- Animated result generation
- Text-to-speech result announcement
- LocalStorage-based form persistence
- Responsive design for desktop, tablet, and mobile
- Print-friendly result output

---

## 🚀 Features

### 👨‍🎓 Student Information

- Student name input
- Roll number input
- Number of subjects
- Dynamic subject creation
- Subject name and marks fields
- Maximum **15 subjects**
- At least **1 subject** is required

### 📚 Subject Management

- Add subjects dynamically
- Remove individual subjects
- Automatically synchronize subject count
- Subject data is maintained in JavaScript state
- Existing form data can be restored from LocalStorage

### 🧮 Result Calculation

The application automatically calculates:

- Total marks
- Percentage
- Highest marks
- Lowest marks
- Grade
- Overall PASS / FAIL status
- Performance remark
- Subject-wise performance

The percentage is calculated from the average marks across all entered subjects.

### 🏆 Grade & Performance System

The application uses percentage-based grading together with an overall pass condition.

| Percentage | Grade | Performance |
|---:|:---:|:---|
| 90% – 100% | A+ | Outstanding Performance |
| 80% – 89% | A | Excellent Work |
| 70% – 79% | B+ | Very Good |
| 60% – 69% | B | Good |
| 50% – 59% | C | Satisfactory |
| 35% – 49% | D | Passed |
| Below 35% | F | Needs Improvement |

> **Note:** The final PASS/FAIL status also considers the marks obtained in individual subjects.

### 📊 Performance Dashboard

The generated result includes:

- Student profile
- Result status
- Total marks
- Percentage
- Grade
- Performance overview
- Subject performance cards
- Highest and lowest marks
- Visual progress indicators

### ⏳ Result Loading Animation

When the result is generated, the project displays a multi-step loading experience such as:

1. Reading student information
2. Checking subject marks
3. Calculating total marks
4. Calculating percentage
5. Generating grade
6. Preparing the result dashboard
7. Completing the result

This creates a smoother dashboard-style user experience.

### 🔊 Text-to-Speech

The project uses the browser's **Web Speech API** to announce the generated result.

The speech can include:

- Student name
- Percentage
- Grade
- PASS / FAIL status
- Performance remark

The application also supports enabling/disabling result speech.

### 💾 LocalStorage

Student form data is stored in the browser using:

```text
localStorage
```

The storage module provides functions for:

- Saving data
- Loading saved data
- Clearing saved data
- Checking whether saved data exists

No external database is required.

### 📱 Responsive Design

The interface adapts to:

- 🖥️ Desktop
- 💻 Laptop
- 📱 Mobile
- 📲 Tablet

The result dashboard changes from a side-by-side layout to a stacked layout on smaller screens.

### 🖨️ Print / Save Result

The **Download / Print Result** action uses the browser's print functionality:

```javascript
window.print();
```

From the browser print dialog, the user can print the result or choose **Save as PDF**.

### 📤 Share Result

The project uses the browser's **Web Share API** when available.

If native sharing is unavailable, the application falls back to copying the result text to the clipboard.

---

## 🛠️ Technologies Used

### Frontend

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**

### UI & Styling

- CSS Grid
- CSS Flexbox
- CSS Variables
- CSS Animations
- Glassmorphism
- Responsive Media Queries
- Google Fonts — Poppins
- Font Awesome icons

### Browser APIs

- LocalStorage API
- Web Speech API
- Web Share API
- Clipboard API
- ResizeObserver
- Browser Print API

### Development

- VS Code
- Git
- GitHub

---

## 📁 Project Structure

```text
Student-Marks-Manager/
│
├── index.html
├── code.py
│
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── form.css
│   │   ├── result.css
│   │   ├── loader.css
│   │   ├── animation.css
│   │   └── responsive.css
│   │
│   ├── js/
│   │   ├── app.js
│   │   ├── form.js
│   │   ├── result.js
│   │   ├── loader.js
│   │   ├── animation.js
│   │   ├── speech.js
│   │   └── storage.js
│   │
│   └── images/
│       ├── avatar.png
│       ├── logo.png
│       └── trophy.png
│
└── README.md
```

---

## 🧩 JavaScript Architecture

The JavaScript code is separated into focused modules.

| File | Responsibility |
|---|---|
| `app.js` | Application initialization and global behavior |
| `form.js` | Student form and dynamic subject management |
| `result.js` | Result calculation and result dashboard updates |
| `loader.js` | Result-generation loading animation |
| `animation.js` | Form/result transition animations |
| `speech.js` | Text-to-speech functionality |
| `storage.js` | LocalStorage operations |

This separation keeps the project easier to maintain and extend.

---

## 🔄 Application Flow

```text
Start Application
       │
       ▼
Enter Student Information
       │
       ▼
Add / Remove Subjects
       │
       ▼
Enter Subject Marks
       │
       ▼
Validate Input
       │
       ▼
Generate Result
       │
       ▼
Loading Animation
       │
       ▼
Calculate Total & Percentage
       │
       ▼
Generate Grade & Status
       │
       ▼
Display Result Dashboard
       │
       ├──────────────► 🔊 Announce Result
       │
       ├──────────────► 📤 Share Result
       │
       └──────────────► 🖨️ Print / Save as PDF
```

---

## 🧠 Core Result Logic

The result engine follows this general process:

```javascript
totalMarks = sum(allSubjectMarks)

percentage = totalMarks / numberOfSubjects

pass = everySubjectMark >= passingMark

grade = calculateGrade(percentage, pass)
```

The application also tracks the highest and lowest subject marks for the performance dashboard.

---

## 🐍 Python Version

The project also contains `code.py`, which demonstrates the original console-based Python version of the student marks manager.

The Python version demonstrates:

- Functions
- User input
- Lists
- Loops
- Arithmetic calculations
- Conditional statements
- Grade calculation
- Console output

Example:

```python
def calculate_grade(avg):
    if avg >= 90:
        return "A"
    elif avg >= 75:
        return "B"
    elif avg >= 60:
        return "C"
    elif avg >= 40:
        return "D"
    else:
        return "Fail"
```

The web application extends the basic console idea into a complete interactive frontend project.

---

## ▶️ How to Run

### Option 1 — Open Directly

1. Download or clone the repository.
2. Open the project folder.
3. Open:

```text
index.html
```

in a modern browser.

### Option 2 — VS Code Live Server

If you use VS Code:

1. Open the project folder.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

The application will open in your browser.

---

## 🌐 External Resources

The project currently loads some frontend resources through external CDNs:

- Google Fonts — Poppins
- Font Awesome

An internet connection may therefore be required for those external resources to load correctly when running the project directly.

---

## 🔐 Privacy

This is a frontend-only application.

Student form data is stored locally in the user's browser using LocalStorage. The project does not require a backend server or external database for its core functionality.

> Do not enter sensitive personal information into a demo/portfolio application unless you understand how browser storage works.

---

## 🎯 Learning Objectives

This project demonstrates practical knowledge of:

- HTML semantic structure
- CSS layouts
- Responsive web design
- DOM manipulation
- JavaScript functions
- Arrays and objects
- Event handling
- Form validation
- Dynamic UI rendering
- LocalStorage
- Browser APIs
- Modular JavaScript
- CSS animations
- Responsive dashboard design
- Basic result-processing logic

---

## 🔮 Future Improvements

Possible future enhancements include:

- [ ] Backend integration with Django
- [ ] Database storage
- [ ] Student login system
- [ ] Admin dashboard
- [ ] Multiple student records
- [ ] Search and filter students
- [ ] Edit existing results
- [ ] Delete student records
- [ ] Export results as generated PDF files
- [ ] Excel/CSV export
- [ ] Result history
- [ ] Attendance management
- [ ] Subject-wise analytics
- [ ] Class-level performance analytics
- [ ] Secure authentication
- [ ] Online deployment

---

## 🧪 Browser Compatibility

The project is intended for modern browsers that support:

- ES6 JavaScript
- LocalStorage
- Web Speech API
- Web Share API
- Clipboard API
- ResizeObserver

Some browser-dependent features, especially speech and native sharing, may behave differently depending on the browser and device.

---

## 📸 Project Highlights

### Student Input

Clean form interface for entering student details and dynamically managing subjects.

### Result Dashboard

A dashboard-style result section presents marks, percentage, grade, status, and performance information.

### Responsive Experience

The layout adapts to different screen sizes without requiring a separate mobile application.

---

## 💡 Why This Project?

The Student Marks Manager started as a simple marks-calculation concept and was developed into a more complete frontend application.

It combines **JavaScript logic + DOM manipulation + browser APIs + responsive UI design** into one practical project.

This makes it useful as a portfolio project for demonstrating frontend development fundamentals.

---

## 👨‍💻 Author

**Rajendra Mahapatra**

B.Tech — Computer Science & Engineering

### Skills Demonstrated

`HTML` `CSS` `JavaScript` `Python` `Git` `GitHub` `Bootstrap`

---

## ⭐ Support

If you find this project useful or are using it as a learning reference, consider giving the repository a ⭐ on GitHub.



