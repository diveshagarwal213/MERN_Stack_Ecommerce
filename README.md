# MERN_Stack_Ecommerce (wip)
A E-commerce project based on  MERN Stack (wip)
[View Demo](https://peaceful-coast-33341.herokuapp.com) at Heroku.
Use admin@gmail.com pass-01234 to login as admin refresh the page to see changes.

![city cake](https://diveshagarwal213.github.io/my_portfolio/images/city1.PNG)

#### _**IMPORTANT NOTE**_ - 
This project does not have a ENV setup. Setup the env file based on the environments below.
- local development: create a env file (make sure to name it .env) in the root folder, which exports your db.uri connection. now name the environement variable "DB_URI" and then place your db.uri example "DB_URI=db.uri".This file will be ignored by git so your db credentials will be kept safe when the app is deployed.
- production: you must specifiy your db uri in heorku. Set the uri in heroku as specified in [this](https://devcenter.heroku.com/articles/config-vars) resource. Make sure you name the environement variable "DB_URI".

#### _**DO Same For Other Environement Variables**_ -

- JWT_KEY=(64 bytes)
- NODE_ENV=development

## Getting Started
This repository aims to assist you on a e-commerce MERN stack application. To get started make a copy of this template repo for your project teams.

Since this project will hold both the client application and the server application there will be node modules in two different places. First run `npm install` from the root. After this you will run `npm install` from the client.

#### _**devdependencies**_ -

- Nodemon
- Concurrently

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run client`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


### `npm run server`

Runs just the server in development mode at http://localhost:5000.<br>

