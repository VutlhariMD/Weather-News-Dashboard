import { WEATHER_API, NEWS_API } from "../api.js";
import https from "https";
import promptSync from "prompt-sync";

const prompt = promptSync();

// Get input from the user
const cityname = prompt(
    "Please enter the city to search and click enter to get the current weather: ",
);


//Fetches the city coordinates
function promiseGetCoordinates(cityName: string): Promise<any> {
    console.log("Fetching city coordinates...");

    const city = cityName.trim();

    if (!city) {
        return Promise.reject(
            new Error("You did not add the name of the city you want to search."),
        );
    }
   //Url for getting the coordinates of the city name the user entered 
    const get_coordinates_url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    return new Promise((resolve, reject) => {
        https
            .get(get_coordinates_url, (response) => {
                let cityData = "";

                response.on("data", (chunk) => {
                    cityData += chunk;
                });

                response.on("end", () => {
                    try {
                        const parsedData = JSON.parse(cityData);

                      // We want the first part of the data
                        resolve(parsedData.results[0]);
                    } catch (err) {
                        reject(err);
                    }
                });
            })
            .on("error", reject);
    });
}

function promiseFetchWeather(latitude: number, longitude: number): Promise<any> {
    console.log("Fetching the weather data...");

    return new Promise((resolve, reject) => {
        https
            .get(WEATHER_API, (response) => {
                let weatherData = "";

                response.on("data", (chunk) => {
                    weatherData += chunk;
                });

                response.on("end", () => {
                    try {
                        const parsedData = JSON.parse(weatherData);
                        resolve(parsedData);
                    } catch (err) {
                        reject(err);
                    }
                });
            })
            .on("error", reject);
    });
}

function promiseFetchNews(): Promise<any> {
    console.log("Fetching the news data...");

    return new Promise((resolve, reject) => {
        https
            .get(NEWS_API, (response) => {
                let newsData = "";

                response.on("data", (chunk) => {
                    newsData += chunk;
                });

                response.on("end", () => {
                    try {
                        const parsedData = JSON.parse(newsData);
                        resolve(parsedData);
                    } catch (err) {
                        reject(err);
                    }
                });
            })
            .on("error", reject);
    });
}
//Declare functions at the top and then come and call them

// Chaining the promises get coordinates for the entered city, then fetch weather for them
console.log("********************************************************************\n PROMISE.CHAINING  OUTPUT \n"+
    "********************************************************************")
promiseGetCoordinates(cityname)
    .then((coordinates) => promiseFetchWeather(coordinates.latitude, coordinates.longitude))
    .then((weatherData) => {
        console.log("Weather data received(PromiseChaining) :");
       console.log(
                "\n\n===================\n WEATHER DATA:" +
                    "\n==================",
            );
            console.log(
                "Temperature : ",
                weatherData.current.temperature_2m,
                "°C",
            );
            console.log(
                "Wind Speed:",
                weatherData.current.wind_speed_10m,
                "km/h",
            );
    })
    .catch((error) => {
        console.error("Failed to fetch weather:", error.message);
    });

promiseFetchNews()
    .then((newsData) => {
        console.log("News data received(PromiseChaining): ");
          console.log(
        "\n\n===========\n NEWS :  " +
            "\n=======",
    );
    const post1 = newsData.posts[0];
    console.log(`Title : ${post1.title}`);
    console.log(`Title : ${post1.body}`);

    console.log(" ");
    const post2 = newsData.posts[1];

    console.log(`Title : ${post2.title}`);
    console.log(`Title : ${post2.body} \n`);
    })
    .catch((error) => {
        console.error("Failed to fetch news:", error.message);
    });

/***************************************************************
// Both weather (for the entered city) and news together
****************************************************************/
console.log("********************************************************************\n PROMISE.ALL  OUTPUT \n"+
    "********************************************************************")

promiseGetCoordinates(cityname)
    .then((coords) =>
        Promise.all([promiseFetchWeather(coords.latitude, coords.longitude), promiseFetchNews()]),
    )
    .then(([weatherData, newsData]) => {
        console.log("Both requests completed!!!!!");

          console.log(
                "\n\n===================\n WEATHER DATA:" +
                    "\n==================",
            );
            console.log(
                "Temperature : ",
                weatherData.current.temperature_2m,
                "°C",
            );
            console.log(
                "Wind Speed:",
                weatherData.current.wind_speed_10m,
                "km/h",
            );

        console.log("News:");
         console.log(
        "\n\n===========\n NEWS :  " +
            "\n==========",
    );
    const post1 = newsData.posts[0];
    console.log(`Title : ${post1.title}`);
    console.log(`Title : ${post1.body}`);

    console.log(" ");
    const post2 = newsData.posts[1];

    console.log(`Title : ${post2.title}`);
    console.log(`Title : ${post2.body} \n`);
    })
    .catch((error) => {
        console.error("Something went wrong:", error.message);
    });
/**********************************************************************
// Race: whichever finishes first between news and coordinates+weather
***********************************************************************/
 

console.log("********************************************************************\n PROMISE.RACE  OUTPUT \n"+
    "********************************************************************")

Promise.race([
    promiseFetchNews(),
    promiseGetCoordinates(cityname).then((coords) =>
        promiseFetchWeather(coords.latitude, coords.longitude),
    ),
])
    .then((result) => {
        console.log("The fastest request finished: ");
        console.log(result);
    })
    .catch((error) => {
        console.error("Request failed :", error.message);
    });


    