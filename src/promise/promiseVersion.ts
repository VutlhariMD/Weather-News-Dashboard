import { rejects } from 'assert';
import {WEATHER_API} from '../api.js'
import {NEWS_API } from '../api.js'
import https from 'https'
import { PassThrough } from 'stream';

function promiseFetchWeather(): Promise<any> {
     console.log("fetching the  weather data....");

     return new Promise((resolve,reject)=>{
         

           https.get(WEATHER_API, (response) => {

              let weatherData = '';

              response.on('data' , (chunk)=> {
                weatherData+=  chunk;
              });
              response.on('end',() => {

                try{
                const parsedData= JSON.parse(weatherData);
                resolve(parsedData);
                }catch(err){
                    reject(err);
                }
              });
           }).on('error', reject)
     })};





































/*
function fetchWeatherData( ) {

     https.get(WEATHER_API, (res)=> {
        let  weatherData = '';
        res.on('data', 
            (chunk)=> { weatherData += chunk})

            res.on('end', ()=>{
                const parsedData =JSON.parse(weatherData);
                console.log(parsedData)
            })
     })



}
function fetchNews() {

     https.get(NEWS_API, (res)=> {
        let  newsData = '';
        res.on('data', 
            (chunk)=> { newsData += chunk})

            res.on('end', ()=>{
                const parsedData =JSON.parse(newsData );
                console.log(parsedData)
            })
     })


}
fetchWeatherData(-23.0476, 30.7167);
*/


