# Salud Total – Health Management System

🇬🇧 English version  
🇪🇸 Spanish version below

## Description
Salud Total is a **healthcare management system** designed to manage patients, medical professionals, and appointment scheduling in an integrated way.

The system was developed to simulate a real-world healthcare environment, covering backend development, database design, frontend web application, and desktop application integration.

It consists of:
- A **Web API and web application** built with **ASP.NET Core**
- A **desktop application** developed with **Electron**
- A **relational database** using **MySQL**

---

## Main Features
- Patient management
- Medical professionals and specialties management
- Appointment scheduling
- Appointment status control (pending, attended, canceled)
- User authentication
- Desktop application consuming the REST API

---

## Project Architecture

Salud-Total/
├── Controllers/ # ASP.NET Core API
├── Data/ # Database context and data access
├── Models/ # Domain entities
├── Services/ # Business logic
├── Views/ # Web application (ASP.NET MVC)
├── wwwroot/ # Static resources
├── desktop/ # Desktop application (Electron)
│ ├── css/
│ ├── js/
│ ├── *.html
│ ├── main.js
│ ├── preload.js
│ └── package.json
├── SaludTotalWeb.sln
└── README.md


---

## Tech Stack

### Backend / Web
- ASP.NET Core
- Entity Framework Core
- MySQL
- MVC architecture
- REST API

### Desktop Application
- Electron
- JavaScript
- HTML / CSS
- REST API consumption

### Tools
- Git & GitHub
- Node.js
- Environment variables (`.env`)

---

## Security
- Configuration managed via `.env` and `appsettings`
- Sensitive credentials excluded using `.gitignore`
- Clear separation between configuration and source code

---

## Role & Responsibilities
This project was developed **individually**.

I was responsible for:
- System analysis and design
- Backend and API development
- Database design and management
- Web application development
- Desktop application development (Electron)
- Integration between all system components
- Code organization and project structure

This project helped reinforce full-stack development concepts, architecture patterns, and best practices in a professional-like environment.

---

## Project Status
✅ Functional  
✅ Completed  
✅ Organized codebase  
✅ Ready for future extensions or production adaptation  

---





# 🏥 Salud Total – Sistema de Gestión

Sistema de gestión para un centro de salud, desarrollado como **proyecto académico**, orientado a la administración integral de pacientes, turnos médicos y profesionales.

El sistema está compuesto por:
- Una **API / Web** desarrollada en **ASP.NET Core**
- Una **aplicación de escritorio** desarrollada con **Electron**
- Una base de datos relacional **MySQL**

---

## 📌 Funcionalidades principales

- Gestión de pacientes
- Gestión de profesionales y especialidades
- Administración de turnos médicos
- Control de estados de turnos (pendiente, atendido, cancelado)
- Autenticación de usuarios
- Consumo de API desde la aplicación de escritorio

---

## 🧱 Arquitectura del proyecto


Salud-Total/
├── Controladores/ # API (ASP.NET Core)
├── Datos/ # Contexto y acceso a datos
├── Modelos/ # Entidades del dominio
├── Servicios/ # Lógica de negocio
├── Vistas/ # Web (ASP.NET MVC)
├── wwwroot/ # Recursos estáticos
├── escritorio/ # Aplicación de escritorio (Electron)
│ ├── css/
│ ├── js/
│ ├── *.html
│ ├── main.js
│ ├── preload.js
│ └── package.json
├── SaludTotalWeb.sln
└── README.md

---

## ⚙️ Tecnologías utilizadas

### Backend / Web
- ASP.NET Core
- Entity Framework Core
- MySQL
- Arquitectura MVC
- API REST

### Escritorio
- Electron
- JavaScript
- HTML / CSS
- Consumo de API REST

### Otras herramientas
- Git & GitHub
- Node.js
- Variables de entorno (`.env`)

---

## 🔐 Seguridad

- Uso de archivos `.env` y `appsettings` para configuración
- Exclusión de credenciales sensibles mediante `.gitignore`
- Separación entre configuración y código fuente

## 👤 Desarrollo y rol

Proyecto desarrollado de forma **individual** como parte de la formación académica.

Fui responsable de:
- Análisis y diseño del sistema
- Desarrollo de la API y lógica backend
- Diseño y gestión de la base de datos
- Desarrollo de la aplicación web
- Desarrollo de la aplicación de escritorio (Electron)
- Integración entre los distintos componentes del sistema
- Organización del código y estructura del proyecto

Este proyecto permitió aplicar conceptos de arquitectura, buenas prácticas y desarrollo full stack en un entorno similar a uno profesional.

## 📌 Estado del proyecto

✅ Proyecto académico finalizado  
✅ Funcional  
✅ Código organizado  
✅ Preparado para ampliaciones futuras  

---

## 👤 Autor

**Leonel Fernández**  
Técnico Universitario en Programación – UTN 
