import { parseEnv } from "util";
import { WEATHER_API } from "../api.js";
import { NEWS_API } from "../api.js";

import https from "https";

//Import and initialize
import promptSync from "prompt-sync";
const prompt = promptSync();
//Get input from the user
const cityname = prompt("Please enter the city to search and click enter to get the current weather:");

const getCityCoordinates = (
    cityName: string,
    callback: (error: Error | null, data?: any) => void,
) => {
    //Using the Https modules to get the city coordinates.
    const city = cityName.trim();
    if (!city) {
        callback(
            new Error("You did not add the name of the city you want to search."),
        );
        return;
    }
    // Url used to get the Coordinated of the city entered
    const get_coordinates_url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

    https.get(get_coordinates_url, (res) => {
        let cityData = "";

        res.on("data", (chunk) => {
            cityData += chunk;
        });
        //The end indicates that the data has been received and we parse the data.
        res.on("end", () => {
            try {
                const data = JSON.parse(cityData);
                callback(null, data.results[0]);
                return;
            } catch (error) {
                callback(error as Error);
            }
        });
    });
};

const fetchWeatherData = (
    latitude: number,
    longitude: number,
    callback: (error: Error | null, data?: any) => void,
) => {
    //Url to return the weather for the specified url
    const url = `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    https.get(WEATHER_API, (res) => {
        let weatherData = "";
        res.on("data", (chunk) => {
            weatherData += chunk;
        });
        //The end means "The response has now arrived"
        res.on("end", () => {
            try {
                const parsedData = JSON.parse(weatherData);
                console.log(parsedData);
                callback(null, parsedData);
            } catch (error) {
                callback(error as Error);
            }
            //Handles the HTTP error incase it fails to fetch the weather
        }).on("error", (error) => {
            callback(error);
        });
    });
};
const fetchNews = (callback: (error: Error | null, data?: any) => void) => {
    https
        .get(NEWS_API, (res) => {
            let newsData = "";
            res.on("data", (chunk) => {
                newsData += chunk;
            });

            res.on("end", () => {
                try {
                    const parsedData = JSON.parse(newsData);
                    console.log(parsedData);
                    callback(null, parsedData);
                } catch (error) {
                    callback(error as Error);
                }
            });
        })
        .on("error", (error) => {
            callback(error);
        });
};

//Call the method
getCityCoordinates(cityname, (error, result) => {
    if (error) {
        console.error(error.message);

        return;
    }

    console.log(result.latitude, result.longitude);
    

    //This function is called inside another function because I want to use longitude and the latitude we got to find the weather 
    fetchWeatherData(
        result.latitude,
        result.longitude,
        (error, weatherData) => {
            if (error) {
                console.error("Error getting weather:", error.message);
                return;
            }

            console.log("==============================================\n Weather Data: ");
            console.log(weatherData);
        },
    );
});

fetchNews((error, newsData) => {
    if (error) {
        console.error("Error getting News", error.message);
        return;
       
    }
    console.log("==============================================\n News :  ");
     console.log(newsData);
});
