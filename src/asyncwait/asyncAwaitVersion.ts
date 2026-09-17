import { WEATHER_API } from "../api.js";
import { NEWS_API } from "../api.js";
import https from "https";

// Import and initialize
import promptSync from "prompt-sync";
const prompt = promptSync();

// Get input from the user
const cityname = prompt(
    "Please enter the city to search and click enter to get the current weather:",
);

// Generic helper: wraps https.get in a Promise
const httpGetJson = (url: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        https
            .get(url, (res) => {
                let rawData = "";

                res.on("data", (chunk) => {
                    rawData += chunk;
                });

                res.on("end", () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        resolve(parsedData);
                    } catch (error) {
                        reject(error as Error);
                    }
                });
            })
            .on("error", (error) => {
                reject(error);
            });
    });
};

const getCityCoordinates = async (cityName: string): Promise<any> => {
    const city = cityName.trim();

    if (!city) {
        throw new Error("You did not add the name of the city you want to search.");
    }

    // NOTE: GEO_URL in api.js is not a valid geocoding URL, so it's built
    // directly here instead of using that constant.
    const get_coordinates_url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const data = await httpGetJson(get_coordinates_url);

    if (!data.results || data.results.length === 0) {
        throw new Error(`No location found for "${city}"`);
    }

    return data.results[0];
};

const fetchWeatherData = async (latitude: number, longitude: number): Promise<any> => {
    // WEATHER_API already has its own query string (with hardcoded lat/long
    // and current=...), so override just latitude/longitude rather than
    // appending a second "?"
    const url = new URL(WEATHER_API);
    url.searchParams.set("latitude", String(latitude));
    url.searchParams.set("longitude", String(longitude));

    return httpGetJson(url.toString());
};

const fetchNews = async (): Promise<any> => {
    return httpGetJson(NEWS_API);
};

// Main flow
const main = async () => {
    try {
        const result = await getCityCoordinates(cityname);
        console.log(result.latitude, result.longitude);

        const weatherData = await fetchWeatherData(result.latitude, result.longitude);
        console.log("==============================================\n Weather Data: ");
        console.log(weatherData);
    } catch (error) {
        console.error("Error getting weather:", (error as Error).message);
    }

    try {
        const newsData = await fetchNews();
        console.log("==============================================\n News: ");
        console.log(newsData);
    } catch (error) {
        console.error("Error getting News:", (error as Error).message);
    }
};

main();