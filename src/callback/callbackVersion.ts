import {WEATHER_API} from '../api.js'
import {NEWS_API } from '../api.js'
import https from 'https'


function fetchWeatherData(latitute: number,longitude: number ) {

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



