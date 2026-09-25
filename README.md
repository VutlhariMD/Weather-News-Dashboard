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


### Technologies used :
* Node.js
* Tyepscript
* Open Meteo API
* DummyJSON API





### How to run the project.

* Clone the project
  -> git clone https://github.com/VutlhariMD/Weather-News-Dashboard.git

* Install dependecies
  -> npm i
  
* Run the project
  
  NB : We have different files, run them using different commands
  run the below commands on the terminal

  1. Command for the Callback file
     
     npm run callback
     <img width="1812" height="784" alt="image" src="https://github.com/user-attachments/assets/2fec00c3-ae0a-4434-80ca-65d10a3ad8a1" />





     
  3. Command for the Promise file
  
      npm run promise
     
  6. Command for the Async file

      npm run async
     <img width="961" height="397" alt="image" src="https://github.com/user-attachments/assets/cc9215ab-878e-4f97-8b58-99920df79fd5" />
     






### 📁 Project Structure
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

