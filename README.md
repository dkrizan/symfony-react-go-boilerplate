# GraphQL API with authorization in Symfony

*Web application boilerplate using Symfony, React and Go technologies*

## Table of Contents

- [Prerequisites](#prerequisites)
- [Packages and dependencies](#packages-and-dependencies)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

List the prerequisites that users need to have installed on their system before using your project. For example:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

### Packages and dependencies

- **API**
  - Symfony 6
  - GraphQL (overblog/graphql-bundle)
  - JWT (lexik/jwt-authentication-bundle)
  - Doctrine
- **App**
  - React 18
  - Apollo Client
  - React Router
  - React Hook Form
  - Tailwind CSS
- **Go API (will be added later)**
  - Go 1.17
  - Gorm

## Getting Started

### Installation
1. Clone the repository
```bash
git clone https://github.com/dkrizan/symfony-react-go-boilerplate.git
```
2. Change to the project directory:
```bash
cd symfony-react-go-boilerplate
```
3. Create a copy of `.env.template` file and name it `.env`.
4. Fill in the required envs in the `.env` file and modify to match your environment.
5. Build and run the Docker containers:
```bash
docker-compose up
```

### Usage

App is running on `http://boilerplate.localhost`. You can change the domain in the `.env` file. The routes are:

| Route                       | Description                       |
|-----------------------------|-----------------------------------|
| `boilerplate.localhost`     | Home page (currently not working) |
| `app.boilerplate.localhost` | App                               |
| `api.boilerplate.localhost` | API                               |
| `go.boilerplate.localhost`  | Go API (in a future)              |

## Features

List and of the key features of your web application. Will be updated as the project progresses.
  - User authentication (login, signup, password reset)
  - Dashboard with a list of projects (create, delete)
  - Project page (just project name and description for now)
  - Profile page (change name, password)

## Contributing

I welcome contributions from the community to help improve and expand this project. If you'd like to contribute, please follow these guidelines:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name for your feature or bug fix.
3. Make your changes and commit them with clear, concise messages.
4. Push your changes to your branch on your fork.
5. Submit a pull request (PR) to the `main` branch of this repository.
6. Please provide a detailed description of your changes in the PR, and be ready to address any feedback.

I appreciate your contributions, whether it's bug fixes, new features, improvements, or documentation enhancements.

## License
This project is licensed under the MIT License.