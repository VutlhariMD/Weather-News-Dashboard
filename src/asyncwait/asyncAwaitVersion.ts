import { WEATHER_API } from "../api.js";
import { NEWS_API } from "../api.js";
import https from "https";
//Allows the program to be able to ask the user for the input from the terminal
import promptSync from "prompt-sync";

const prompt = promptSync();

const cityname = prompt(
    "Please enter the city to search and click enter to get the current weather: ",
);
 
//An Async function
//Return the coordinates of the city entered so that we use them to get the weather data
const getCityCoordinates = async (cityName: string) => {
    const city = cityName.trim();

    if (!city) {
        throw new Error("Please enter a city name.");
    }

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    
    
    //Create a promise: will  get the data now but it will finish later
    const data = await new Promise<any>((resolve, reject) => {
        https.get(url, (res) => {
                let data = "";
                res.on("data", (chunk) => {
                    data += chunk;
                });

                res.on("end", () => {
                    try {
                        const parsedData = JSON.parse(data);
                        resolve(parsedData);
                    } catch (error) {
                        reject(error);
                    }
                });
            })
            //handle Https errors
            .on("error", (error) => {
                reject(error);
            });
    });

    if (!data.results || data.results.length === 0) {
        throw new Error(`No location found for "${city}".`);
    }

    const latitude = data.results[0].latitude;
    const longitude = data.results[0].longitude;
    const locationName = data.results[0].name;
    const country = data.results[0].country;
    

    //Return the data needed to request for the weather 
    return {
        latitude,
        longitude,
        locationName,
        country,
    };
};

const fetchWeatherData = async (latitude: number, longitude: number) => {
    //Get the weather current weather for the coordinates substituded in the url
    const url = `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const data = await new Promise<any>((resolve, reject) => {
       
            https.get(url, (res) => {
                let data = "";
                res.on("data", (chunk) => {
                    data += chunk;
                });

                res.on("end", () => {
                    try {
                        const parsedData = JSON.parse(data);
                        resolve(parsedData);
                    } catch (error) {
                        reject(error);
                    }
                });
            })
            //handle https errors
            .on("error", (error) => {
                reject(error);
            });
    });

    return data;
};

const fetchNews = async () => {
    const data = await new Promise<any>((resolve, reject) => {
        https
            .get(NEWS_API, (res) => {
                let data = "";

                res.on("data", (chunk) => {
                    data += chunk;
                });

                res.on("end", () => {
                    try {
                        const parsedData = JSON.parse(data);
                        resolve(parsedData);
                    } catch (error) {
                        reject(error);
                    }
                });
            })
            .on("error", (error) => {
                reject(error);
            });
    });

    return data;
};

const functionCalls = async () => {
    try {
        //Call the function , call with an await
        const location = await getCityCoordinates(cityname);

        console.log("\n================================");
        console.log("Location Information");
        console.log("================================");

        console.log("City:", location.locationName);
        console.log("Country:", location.country);
        console.log("Latitude:", location.latitude);
        console.log("Longitude:", location.longitude);

        const weatherData = await fetchWeatherData(
            location.latitude,
            location.longitude,
        );

        console.log("\n================================");
        console.log("Weather Information");
        console.log("================================");

        console.log(
            "Temperature:",
            weatherData.current_weather.temperature,
            "°C",
        );

        console.log(
            "Wind Speed:",
            weatherData.current_weather.windspeed,
            "km/h",
        );

        const newsData = await fetchNews();

        console.log("\n================================");
        console.log("News");
        console.log("================================");

        console.log(newsData.posts[0]);
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
};
functionCalls();
