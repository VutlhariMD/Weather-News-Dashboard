import { parseEnv } from 'util'
import {WEATHER_API} from '../api.js'
import {NEWS_API } from '../api.js'
import { GEO_URL } from '../api.js'
import https from 'https'


//Import and initialize
import promptSync from 'prompt-sync'
const prompt = promptSync();
//Get input from the user
const cityname = prompt('Please enter the city to search :')

const getCityCoordinates =(cityName : string, callback:(error : Error | null, data?:any) => void) =>{  
   //Using the Https modules to get the city coordinates.
   const city = cityName.trim();
   if(!city){
    callback(new Error("You did not add the name of the city you want to add."));
    return;
   }
const get_coordinates_url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

https.get(get_coordinates_url, (res)=>{

    let cityData='';

    res.on('data',(chunk) => {
        cityData += chunk;
    })
    //The end indicates that the data has been received and we parse the data.
    res.on('end', ()=>{
        try{
           const  data= JSON.parse(cityData);
           callback(null, data.results[0]);
           return;


        }catch(error){
            callback(error as Error)
        }
    })
})

}
//Call the method
getCityCoordinates(cityname, (error, result) => {
    if (error) {
        console.error(error.message);
    
        return;
    }

    console.log(result.latitude, result.longitude);
});









/*
const fetchWeatherData =(latitude: number,longitude: number ,
    callback :(error: Error | null, data?: any) =>void
) =>{

     https.get(WEATHER_API, (res)=> {
        let  weatherData = '';
        res.on('data', 
            (chunk)=> { weatherData += chunk})
            //The end means "The response has now arrived"
            res.on('end', ()=>{
                try{
                const parsedData =JSON.parse(weatherData);
                console.log(parsedData)
                callback(null,parsedData)
                }catch(error){
                    callback(error as Error)
                }
            //Handles the HTTP error incase it fails to fetch the weather 
            }).on("error", (error)=> {
                callback(error)
            })
     })
}
const fetchNews =(callback: ( error: Error | null, data?: any)=> void)  =>{  

     https.get(NEWS_API, (res)=> {
        let  newsData = '';
        res.on('data', 
            (chunk)=> { newsData += chunk}
        );
            
        res.on('end', ()=>{
                try{
                    const parsedData =JSON.parse(newsData );
                    console.log(parsedData)
                    callback( null, parsedData)


                }catch(error){
                    callback(error as Error)
                }
            })
     }).on("error",(error)=>{callback(error)})

}
fetchWeatherData(-23.9, 30.3, (error, weatherData) => {

    if (error) {
        console.error("Error getting weather:", error.message);
        return;
    }

    console.log("This is the weather");
    console.log(weatherData);

});

fetchNews((error, newsData)=> {
    if(error){
        console.error("Error getting News", error.message)
        console.log(newsData);
    }

}) 
*/




















































































































































































