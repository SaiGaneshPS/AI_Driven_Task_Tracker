# Project Title: Intelligent Task Management System

## Overview

This project is an Intelligent Task Management System that leverages Natural Language Understanding (NLU) to manage user tasks efficiently. The system consists of three main components: a backend NLU processing unit using RASA, a MySQL database hosted on AWS, and a frontend built with React and Node.js.

## Features

- **Natural Language Understanding (NLU):** The system uses RASA to process user input and identify intents and entities.

  - **Intents:**
    - `schedule_task`
    - `cancel_task`
    - `inquire_status`
  - For example: "I need to [schedule](intent) a [meeting](task_name) on [Monday](date) at [10 AM](time)" will identify the intent as `schedule_task`.
    More intents will be added in future updates.

- **User Authentication:** Secure user authentication with JWT tokens.
- **Task Management:** Users can schedule, cancel, and inquire about the status of their tasks.
- **Database:** MySQL database on AWS with two tables:
  - User Information Table: Stores username, password, name, and email.
  - User Task Table: Stores user tasks and related entities, with a foreign key linking to user ID.

## Technologies Used

- **Backend:**

  - [RASA](https://rasa.com/docs/) for NLU processing.
  - Node.js and Express for server-side operations.
  - MySQL on AWS for the database.
  - Docker for containerization.

- **Frontend:**

  - React for building the user interface.
  - CSS for styling components.
  - (Will be containerized in future updates)

- **Utilities:**
  - JSON Web Tokens (JWT) for secure user authentication.
  - Docker for containerization.
  - GitHub Actions for CI/CD.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Docker
- MySQL database
- AWS account
