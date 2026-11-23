# 🚗 AutoCare: Interactive Vehicle Service & Maintenance Management System

> A multi-page web application that lets vehicle owners discover services, book appointments and get roadside support, while service center staff manage requests from an admin panel.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/status-prototype-orange)

**Course:** CSC 3215, Web Technologies | **Semester:** Fall 2026-27 | **Section:** Y | **Group:** 09
**University:** American International University-Bangladesh (AIUB)

---

## 📌 Overview

Booking a vehicle service the traditional way means long waits, scheduling conflicts and no record of past services. **AutoCare** puts the whole maintenance lifecycle on one platform: register, log in, browse services, book a slot and track the request, while the service center manages everything from a single dashboard.

**Target users:** vehicle owners (cars, SUVs, pickups, motorcycles) and service center staff in Bangladesh.

---

## ✨ Features

### 👤 Module 1: User Onboarding & Registration
- Registration form: full name, email, date of birth, phone, password, vehicle model and vehicle category
- Terms & conditions agreement before account creation
- Registered users list (admin view)

### 🔐 Module 2: Customer Authentication & Support
- Login with empty-field, email-format and password-length validation
- Login blocked after 3 wrong attempts until the password is reset
- **Forgot password workflow:** OTP verification popup (3 attempts, resend option), then a reset form with password rules (6+ characters, letter and number, must differ from the old password)
- **Emergency roadside support:** validated form (name, Bangladeshi mobile number, request type, issue), live character counter, request-type hints and an auto-generated ticket number
- Instant feedback messages in the sticky header, with no page reloads
- Redirects to the service page after a successful login

### 🛠️ Module 3: Service Catalog & Appointment Booking
- Service catalog with prices by vehicle type (motorcycle, sedan, SUV, pickup)
- Search and category filter (Maintenance, Cleaning, Inspection, Repair)
- Appointment booking form with date and time slots and a booking summary popup

### 📊 Module 4: Admin Operations Panel
- Summary cards: total bookings, pending requests, completed services
- Booking management table with status badges (Pending, Approved, Completed, Rejected)
- Approve, reject and complete actions, with search and status filter

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (flexbox, grid, sticky/fixed positioning, attribute selectors, hover states) |
| Behavior | Vanilla JavaScript (DOM manipulation, events, form validation) |

No frameworks, libraries or build tools are used.

---

## 📁 Project Structure

```
Web_Tech_Project/
├── registration.html    # Module 1: registration page
├── users.html           # Module 1: registered users list
├── style.css            # Module 1: styles
├── reg.js               # Module 1: scripts
├── login.html           # Module 2: login, forgot password, support
├── loginstyle.css       # Module 2: styles
├── login.js             # Module 2: validation, OTP flow, support form
├── service.html         # Module 3: service catalog and booking
├── module3.css          # Module 3: styles
├── script.js            # Module 3: scripts
├── admin.html           # Module 4: admin dashboard
└── adminstyle.css       # Module 4: styles
```

---

## 🚀 Getting Started

No installation is needed.

```bash
# 1. Clone the repository
git clone https://github.com/sysabit-08/Web_Tech_Project.git

# 2. Open the folder
cd Web_Tech_Project

# 3. Open registration.html in any modern browser
```

### User flow

```
registration.html ⇄ login.html ──(successful login)──▶ service.html
```

### 🔑 Demo accounts (for testing the login)

| Email | Password |
|---|---|
| rahim@gmail.com | Rahim@123 |
| karim@gmail.com | Karim@123 |
| tanvir@gmail.com | Tanvir@123 |
| nusrat@gmail.com | Nusrat@123 |

> **OTP demo mode:** no real email is sent, so the OTP is shown inside the verification popup.

---

## ⚠️ Prototype Limitations

- This is a front-end prototype with **no backend or database**. Users and passwords are stored in JavaScript variables, so changes reset when the page reloads.
- Passwords in the code are for demonstration only. A real system would verify them on a server.

---

## 👥 Team (Group 09, Section Y)

| Module | Member | Student ID |
|---|---|---|
| 1. Registration | MD Samin Yeasir Sabit | 24-58708-2 |
| 2. Login & Support | MD Mazharul Islam Talha | 24-58691-2 |
| 3. Service Booking | Lubaba Subaita | 24-58741-2 |
| 4. Admin Panel | Sheikh Siam | 24-55999-1 |

---

## 🌿 Git Workflow

- Each member develops on a separate branch (`module_1`, `module2`, and so on).
- Finished work is merged into `main`.

---

## 📄 License

Created for academic purposes as part of the Web Technologies course at AIUB.
