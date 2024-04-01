# RabbitMQ + 2 apis + Docker

Simulating communication between two apis, using rabbitMQ and database persistence

## Table of Contents

- [Overview](#-overview)
- [Technologies Used](#️-technologies-used)
- [Installation](#-installation)
- [Usage](#-usage)
- [License](#-license)
- [Contact](#-contact)

## 🚀 Overview

The project has two apis, main and payment.
Payment is the consumer of the queue, while main triggers a message after inserting a post into the system, causing payment to register in the database with the information coming from main.

## 🛠️ Technologies Used

- [NodeJS](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [SQLite](https://www.sqlite.org/)
- [Docker](https://www.docker.com/)
- [RabbitMQ](https://www.rabbitmq.com/)

## 📦 Installation

Make sure you have dokcer installed on your computer:

https://www.docker.com/

## 🚀 Usage

  <ul>
       <li>
        Open the terminal or command prompt.
        </li>
        <li> To clone the project via HTTPS, run this command: <p><code>git clone https://github.com/w-araujo/rabbitmq-apis-ts.git</code></p></li>
        <li> Navigate to the project directory using the <code>cd</code> (change directory) command. </li>
        <li> fill in the environment variables in the <code>.env</code> file at the root of the project </li>
        <li> Run the command in the terminal at the root of the <code>docker-compose up</code> project to initialize the container </li>
 </ul>

## 📝 License

This project is under the MIT license. See the file LICENCE for more details.

## 📧 Contact

<div style="display: flex">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wesley-araujo-a99198201/)

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/w-araujo)

</div>
