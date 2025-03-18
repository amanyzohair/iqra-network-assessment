# IqraNetworkAssessment

This project is an Angular@18.2.3 application that demonstrates the creation of a dynamic form using reactive forms. The form is built dynamically based on a JSON configuration fetched from a service

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)
5. [Running Tests](#running-tests)

---

## Features

- **Dynamic Form Creation**:

  - The form is built dynamically based on a JSON configuration.
  - Supports various field types (text, email, phone, etc.).
  - Handles nested form groups and arrays.

- **Validation**:

  - Built-in validators (required, email, pattern, etc.).
  - Custom async validator for email uniqueness.

- **Responsive UI**:

  - Built with **Tailwind CSS** for a modern and responsive design.

- **Unit Tests**:
  - Comprehensive unit tests for components and services.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **Angular CLI** (v18 or higher)
- **Git** (optional, for cloning the repository)

---

## Installation

1. **Clone the repository** (if applicable):

   ```bash
   git clone https://github.com/amanyzohair/iqra-network-assessment.git
   cd iqra-network-assessment
   ```

### Install dependencies:

    `npm install`

---

## Running the Application

1. **Start the development server :**
   `ng serve`

2. **Open the application :**

   - Navigate to http://localhost:4200 in your browser.

3. **Interact with the form :**
   - Fill out the form and submit it to see the success message.

## Running Tests

    Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
