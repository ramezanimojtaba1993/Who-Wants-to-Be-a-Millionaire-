# "Who Wants to Be a Millionaire?" Game

## Overview

This is a test task for an Angular developer to create a game similar to "Who Wants to Be a Millionaire?" Players will be asked 5 questions selected from the backend, with no question being repeated during a single game. Each question may have more than one correct answer, and the player's score will depend on their ability to answer questions correctly. This game has the following features:

- Each question is assigned a certain number of points based on its complexity, with point values ranging from 5 to 20.
- The player's score is determined by the number of points they earn by answering questions correctly.
- Points are divided among the correct answers for each question.
- If a player selects an incorrect answer, it negates one correct answer they have chosen.
- The correct answer(s) will be displayed to the player before moving on to the next question.
- At the end of the game, the player's score will be displayed.

To play the game, players must first create an account with a unique email and password. Only authorized users will be able to access the game.

## Requirements

- Node.js (version >= 19.0)
- npm (version >= 9.0)
- Angular (version 16.0.0)
- Backend: You can use JSON-server, Firebase, or any third-party provider of your preference as the backend for this game.
- test: install playwright and install supported browsers with this command:
- > npx playwright install
  
## Getting Started
To get started with this project, follow these steps:

1. Clone the repository to your local machine:
> git clone https://github.com/ramezanimojtaba1993/ngMilionaire.git 
2. Navigate to the project directory
> cd who-wants-to-be-a-millionaire
3. Install the required dependencies:
> npm install
4. Start the development server:
> ng serve
5. Start json server for mock data on another terminal:
> npm run server

The app will be available at `http://localhost:4200/`

## App Structure
Here is the structure of the app, which serves as generally accepted guidelines and patterns for building scalable apps.


```
.
├── e2e-playwright                # all test files for UI test with playwright
│   ├── login.spec.ts  
│   ├── login-and-answer-question-correctly.spec.ts
│   ├── redirect-login.spec.ts  
│   ├── select-atLeast-one-answer.spec.ts 
│   └── register.spec.ts           
├── src                           # App source code
│   ├── app                       
│   │   ├── components           
│   │   ├── models             
│   │   ├── services           
│   │   └── pages            
│   ├── assets                    # Express server static path and Webpack bundles output
│   ├── favicon.ico               # App favicon
│   ├── index.html          
│   ├── main.ts                    
│   └── style.scss                
└── playwright.config.ts          # playwright configurations
```

# Support
If you have any questions or need assistance, please reach out to me at `ramezanimojtaba1993@gmail.com`
