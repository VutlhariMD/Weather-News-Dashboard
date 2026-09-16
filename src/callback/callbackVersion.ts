import {WEATHER_API} from '../api.js'
import {NEWS_API } from '../api.js'
import https from 'https'


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





















































































































































































