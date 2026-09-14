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

