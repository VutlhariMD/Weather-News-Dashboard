# Async Weather   & News Dashboard 

## Project Overview 

The **Async weather and New Dashboard** is an application built with Node.js and Typescript that demostrates how 
asynchronous programming works in Java Script and Node.js

The application fetches :
* Weather information from the **Open-meteo API**
* News from the **News Api**

The project demonstrates 3 ways of handlings asynchronous operation:
* Callbacks
* Promises
* Async/await

It also demonstrate how the Node.js **event loop** allows asynchronous operations to run without blocking the main thread.


## Technologies used :
* Node.js
* Tyepscript
* Open Meteo API
* DummyJSON API

## 📁 Project Structure



## How to run the project.

* Clone the project

  -> git clone <url>

* Install dependecies

  -> npm i
* Run the project
  NB : We have different files, run them using different commands
  run the below commands on the terminal

  1. Command for the Callback file
     
     npx tsx src/callback/callbackVersion.ts
  3. Command for the Promise file
  4. 
     npx tsx .\src\promise\promiseVersion.ts
     
  6. Command for the Async file
    > npx tsx .\src\asyncwait\asyncAwaitVersion.ts        
     





```text
async-weather-news/
│
├── src/
│   ├── callbackVersion.ts
│   ├── promiseVersion.ts
│   ├── asyncAwaitVersion.ts
│   └── server.ts
    └── api.ts
│
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

