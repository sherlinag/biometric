# Devices Gateway Authentication for Ordinal Campus

This project enables **biometric devices** (e.g., Hikvision) to connect via a **Gateway Authentication System** and sync with the **Ordinal Campus ERP** to mark **staff attendance** automatically and securely.

## 🚀 Purpose

The goal of this system is to:

- Authenticate gateway access and server connectivity.
- Configure device settings and network parameters.
- Collect and push biometric attendance data to Ordinal Campus ERP.
- Offer a modern, responsive frontend for configuration and monitoring.

## 🧑‍💻 Technologies Used

| Layer         | Technology          |
|---------------|---------------------|
| Frontend      | React + Vite        |
| Styling       | Tailwind CSS        |
| Icons         | React Icons         |
| Alerts        | SweetAlert2         |
| Backend       | Node.js + Express   |
| Database      | SQLite              |

## 📁 Project Structure

/client # Frontend code (React, Vite)
├── components # Reusable UI components
├── pages # Home, Login, Gateway, Server auth screens
├── assets # Static assets (images, icons)
└── main.jsx

/server # Backend (Express, SQLite)
├── routes # API endpoints for login, attendance, etc.
├── db # SQLite DB setup and helpers
└── index.js


## ⚙️ Features

- 🔐 **Server Authentication** – Verifies domain and auth key.
- 🌐 **Gateway Authentication** – Secure access with username and password.
- ⚙️ **Settings Configuration** – Set sync intervals, IPs, and reset PINs.
- 📡 **Device Connectivity** – Biometric devices connect through gateway.
- 📊 **Attendance Sync** – Biometric events are pushed to Ordinal Campus ERP.

## 🧪 Local Development Setup

### Prerequisites

- Node.js ≥ 18
- SQLite installed (or use the included DB file)