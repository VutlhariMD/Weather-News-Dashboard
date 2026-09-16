import {WEATHER_API} from '../api.js'
import {NEWS_API } from '../api.js'
import https from 'https'


const  fetchLocation =()=>{
   navigator.geolocation.getCurrentPosition ((position) => {

      const  latitude=position.coords.latitude;
      const longitude =position.coords.longitude;
      console.log(latitude,longitude);
   },
   (error)  =>{
    console.log(error.message);
   })}



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




