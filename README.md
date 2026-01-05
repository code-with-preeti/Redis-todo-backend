# 📝 Redis To-Do Backend

**Redis To-Do Backend** is a lightweight and efficient backend application built with **Node.js** and **Redis**. It allows fast in-memory storage of tasks, supporting CRUD operations (Create, Read, Update, Delete) for task management. Ideal for demonstrating backend skills in interviews or as a foundation for full-stack applications.

---

## 💻 Project Overview

This project focuses purely on **backend development** and leverages **Redis** for high-performance in-memory data storage. The application includes:

- Task management APIs
- Redis connection setup
- Optional worker scripts for asynchronous processing or testing

---

## 🔧 Tech Stack

- **Node.js** — JavaScript runtime for building backend services  
- **Redis** — In-memory data store for fast, lightweight task handling  
- **npm** — Dependency management  
- **JavaScript** — Core programming language  

---

## ⚡ Features

- ✅ Add, update, delete, and list tasks  
- ✅ Tasks stored in Redis for high-speed access  
- ✅ Lightweight and easy to deploy  
- ✅ Clean code structure for easy extension  
- ✅ Demonstrates core backend concepts and Redis integration  

---

After starting the backend, you can interact with tasks via API or directly via Redis commands. Example tasks:

# Add a task
SET task:1 "Learn Redis"

# Retrieve a task
GET task:1

# Delete a task
DEL task:1
