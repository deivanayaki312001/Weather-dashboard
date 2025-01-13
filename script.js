const date = new Date();
const array2 = [];
const array3 = [];
let array4 = [];
let lat = 0;
let lng = 0;
let accuracy = 0;
const array5 = [];
const labels = [];
const dtArray = [];
const popArray = [];
let popArrayChart = [];
let humArrayChart = [];
let tempArray = [];
const pop1 = [];
const pop2 = [];
const pop3 = [];
const pop4 = [];
const pop5 = [];
const hum1 = [];
const hum2 = [];
const hum3 = [];
const hum4 = [];
const hum5 = [];
let checkVar = 0;
let pop1temp = 0;
let pop2temp = 0;
let pop3temp = 0;
let pop4temp = 0;
let pop5temp = 0;
let hum1temp = 0;
let hum2temp = 0;
let hum3temp = 0;
let hum4temp = 0;
let hum5temp = 0;
//var ctx, ctx1, ctx2, ctx3;
var gauge;
var uvgauge;
let myChart;
let myChart1;
let myChart2;
let mychart3;
let isFarenheitClicked = false;
let isCelsiusClicked = false;
let marker, circle, zoomed = false;
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var first = days[date.getDay()];
var second = date.getDate();
var third = months[date.getMonth()];
var fourth = date.getFullYear();
let mapVar = 0;
const weatherAnimations = {
    "clear sky": './animations/clearsunny.json',

    // Clouds
    "few clouds": './animations/clouds.json',
    "scattered clouds": './animations/clouds.json',
    "broken clouds": './animations/clouds.json',
    "overcast clouds": './animations/clouds.json',

    // Rain
    "light rain": './animations/rain.json',
    "moderate rain": './animations/rain.json',
    "heavy intensity rain": './animations/rain.json',
    "very heavy rain": './animations/rain.json',
    "extreme rain": './animations/rain.json',
    "freezing rain": './animations/rain.json',

    // Drizzle
    "light intensity drizzle": './animations/rain.json',
    "drizzle": './animations/rain.json',
    "heavy intensity drizzle": './animations/rain.json',
    "light intensity drizzle rain": './animations/rain.json',
    "drizzle rain": './animations/rain.json',
    "heavy intensity drizzle rain": './animations/rain.json',
    "shower rain and drizzle": './animations/rain.json',
    "heavy shower rain and drizzle": './animations/rain.json',
    "shower drizzle": './animations/rain.json',

    // Thunderstorm
    "thunderstorm": './animations/thunderstorm.json',
    "thunderstorm with light rain": './animations/thunderstorm.json',
    "thunderstorm with rain": './animations/thunderstorm.json',
    "thunderstorm with heavy rain": './animations/thunderstorm.json',
    "light thunderstorm": './animations/thunderstorm.json',
    "heavy thunderstorm": './animations/thunderstorm.json',
    "ragged thunderstorm": './animations/thunderstorm.json',
    "thunderstorm with light drizzle": './animations/thunderstorm.json',
    "thunderstorm with drizzle": './animations/thunderstorm.json',
    "thunderstorm with heavy drizzle": './animations/thunderstorm.json',

    // Snow
    "light snow": './animations/snow.json',
    "snow": './animations/snow.json',
    "heavy snow": './animations/snow.json',
    "sleet": './animations/snow.json',
    "light shower sleet": './animations/snow.json',
    "shower sleet": './animations/snow.json',
    "light rain and snow": './animations/snow.json',
    "rain and snow": './animations/snow.json',
    "light shower snow": './animations/snow.json',
    "shower snow": './animations/snow.json',
    "heavy shower snow": './animations/snow.json',

    // Atmosphere
    "mist": './animations/mist.json',
    "smoke": './animations/smoke.json',
    "haze": './animations/mist.json',
    "sand/ dust whirls": './animations/smoke.json',
    "fog": './animations/mist.json',
    "sand": './animations/smoke.json',
    "dust": './animations/smoke.json',
    "volcanic ash": './animations/volcano.json',
    "squalls": './animations/squall.json',
    "tornado": './animations/tornado.json'
};
document.getElementById('date').textContent = first + ', ' + second + ' ' + third + ', ' + fourth
    //function userLocation(){
if (navigator.geolocation) {
    // Get the user's current position
    navigator.geolocation.getCurrentPosition(function(position) {
        let latitude1 = position.coords.latitude;
        let longitude1 = position.coords.longitude;
        let apiKey = '899f514f4f066b56eaef23a3f17ef7a4';
        let apiKey1 = '1132df79cd9c38b9dfe9e7c80d48fe73';
        let mapContainer = document.querySelector('.name-later-1');
        let map = L.map(mapContainer);
        userLocation(latitude1, longitude1);
        document.getElementById('search-button').addEventListener('click', searchLocation);
        async function searchLocation() {
            mapVar++;
            checkVar = 1;
            array4 = [];
            popArrayChart = [];
            humArrayChart = [];
            let city = document.getElementById('input-search').value;
            //console.log(array4, popArrayChart, humArrayChart);
            let apiKey = '899f514f4f066b56eaef23a3f17ef7a4';
            let apiKey1 = '1132df79cd9c38b9dfe9e7c80d48fe73';
            // document.getElementById('farenheit').className = 'unselected-unit';
            // document.getElementById('celsius').className = 'selected-unit';
            console.log(city);
            console.log(apiKey);
            let response1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            let data1 = await response1.json();

            //console.log(data);
            let latitude2 = data1.coord.lat;
            let longitude2 = data1.coord.lon;
            let mapContainer = '';
            //let removeIcons1=document.querySelectorAll('#dynamic-icon');
            document.getElementById('dynamic-icon').innerHTML = '';
            //document.getElementById('aqi').remove();
            let removing = document.querySelectorAll('.toBeRemoved');
            for (let i = 0; i < removing.length; i++) {
                removing[i].remove();
            }
            let removeIcons = document.querySelectorAll('.city-dynamic-icons');
            for (let i = 0; i < removeIcons.length; i++) { // Use removeIcons.length to iterate through all matching elements
                removeIcons[i].remove(); // Call the remove method with parentheses
                //removeIcons1[i].remove();
            }
            //function destroyAllCharts(ctxs) {
            //    ctxs.forEach(ctx => {
            //        if (ctx.chartInstance) {
            //            ctx.chartInstance.destroy();
            //            ctx.chartInstance = null; // Clear the reference to prevent memory leaks
            //        }
            //    });
            //}
            // Pass an array of all contexts
            //destroyAllCharts([ctx, ctx1, ctx2, ctx3]);
            userLocation(latitude2, longitude2);
            //mychart.data.datasets[0].data = array4
            //mychart.update();
            //mychart1.data.datasets[0].data = popArrayChart;
            //mychart1.update();
            //mychart2.data.datasets[0].data = humArrayChart;
            //mychart2.update();
            //charts(ctx4,ctx5,ctx6,ctx7);
            //console.log(array4);

            hourlyData(latitude2, longitude2, apiKey);
            //myChart.data.labels = newLabels;

            //airPollution(latitude2, longitude2, apiKey);
            let response2 = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude2}&lon=${longitude2}&appid=${apiKey}`)
            let data2 = await response2.json();

            let response5 = await fetch(`https://api.weatherstack.com/current?access_key=${apiKey1}&query=${latitude2},${longitude2}`)
            let data5 = await response5.json();

            console.log(data2.list[0].main.aqi)
            gauge.refresh(data2.list[0].main.aqi);
            uvgauge.refresh(data5.current.uv_index);

            //chanceOfRain(latitude, longitude, apiKey1);
            //uvIndex(latitude2, longitude2, apiKey1);

        }
        async function userLocation(latitude, longitude) {
            // Initializes map
            if (mapVar == 0) {
                map.setView([latitude, longitude], 10);
                // Sets initial coordinates and zoom level
                L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                    maxZoom: 19,
                    // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
                    subdomains: 'abcd',
                }).addTo(map);
            }
            // Sets map data source and associates with map

            navigator.geolocation.watchPosition(success, error);

            function success(pos) {
                console.log('checkVar:' + checkVar)
                if (checkVar == 0) {
                    lat = pos.coords.latitude;
                    lng = pos.coords.longitude;
                    accuracy = pos.coords.accuracy;
                } else if (checkVar == 1) {
                    lat = latitude;
                    lng = longitude;
                    accuracy = 100;
                }
                requestAnimationFrame(() => {
                        if (marker) {
                            map.removeLayer(marker);
                            map.removeLayer(circle);
                        }
                        // Removes any existing marker and circule (new ones about to be set)
                        marker = L.marker([lat, lng]).addTo(map);
                        circle = L.circle([lat, lng], {
                            radius: accuracy
                        }).addTo(map);
                        // Adds marker to the map and a circle for accuracy

                        map.fitBounds(circle.getBounds());

                        // Set zoom to boundaries of accuracy circle
                        map.setView([lat, lng], 10);
                        map.invalidateSize();
                    })
                    // Set map focus to current user position
            }

            function error(err) {

                if (err.code === 1) {
                    alert("Please allow geolocation access");
                } else {
                    alert("Cannot get current location");
                }

            }
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

            function getTemperatureImage(temp) {
                if (temp < 15) {
                    return 'images/cold.png'; // Cold
                } else if (temp >= 15 && temp <= 25) {
                    return 'images/mild.png'; // Mild
                } else if (temp > 25 && temp <= 35) {
                    return 'images/warm.png'; // Warm
                } else {
                    return 'images/hot.png'; // Hot
                }
            }
            let apiKey = '899f514f4f066b56eaef23a3f17ef7a4';
            let apiKey1 = '1132df79cd9c38b9dfe9e7c80d48fe73';
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`; // Metric units for Celsius
            await fetch(url)
                .then(response3 => response3.json())
                .then(data => {
                    console.log(data);
                    document.getElementById('city').textContent = data.name;
                    document.getElementById('country').textContent = `${data.weather[0].description}`;
                    document.getElementById('temp-des').textContent = `${data.weather[0].description}`;
                    document.getElementById('temperature').textContent = Math.round(data.main.temp * 10) / 10 + '°C';
                    document.getElementById('temperature-round').textContent = Math.round(data.main.temp * 10) / 10 + '°C';
                    document.getElementById('humidity').textContent = data.main.humidity + '%';
                    document.getElementById('windspeed').textContent = data.wind.speed + " " + 'm/s';
                    const imageContainer = document.getElementById('dynamic-icon');

                    // Function to determine image path based on temperature
                    function getTemperatureImage(temp) {
                        if (temp < 15) {
                            return 'images/cold.png'; // Cold
                        } else if (temp >= 15 && temp <= 25) {
                            return 'images/mild.png'; // Mild
                        } else if (temp > 25 && temp <= 35) {
                            return 'images/warm.png'; // Warm
                        } else {
                            return 'images/hot.png'; // Hot
                        }
                    }

                    // Dynamically add the image
                    const imagePath = getTemperatureImage(data.main.temp);
                    const imgElement = document.createElement('img');
                    imgElement.src = imagePath;
                    imgElement.alt = 'Temperature condition';
                    imageContainer.appendChild(imgElement);

                    function loadAnimation(weatherDescription) {
                        const container = document.querySelector('.dyn-icon');
                        container.innerHTML = ''; // Clear any existing animation

                        const animationPath = weatherAnimations[weatherDescription] || './animations/default.json';

                        lottie.loadAnimation({
                            container: container, // HTML element for the animation
                            renderer: 'svg', // Render type (svg, canvas, html)
                            loop: true, // Should the animation loop
                            autoplay: true, // Start animation automatically
                            path: animationPath // Path to the local JSON animation
                        });
                    }
                    const currentWeather = `${data.weather[0].description}`; // Replace this with dynamic weather data
                    loadAnimation(currentWeather);
                    // document.getElementById('dynamic-icon').className = getTemperatureIcon(data.main.temp);
                    const date1 = new Date(data.sys.sunrise * 1000);
                    const hours1 = date1.getHours();
                    const minutes1 = date1.getMinutes();
                    const seconds1 = date1.getSeconds();
                    const date2 = new Date(data.sys.sunset * 1000);
                    const hours2 = date2.getHours();
                    const minutes2 = date2.getMinutes();
                    const seconds2 = date2.getSeconds();
                    document.getElementById('sunrise').textContent = `${hours1}:${minutes1} Am`;
                    document.getElementById('sunset').textContent = `${hours2 - 12}:${minutes2} Pm`;
                });

            function generateNearbyCoordinates(lat, lon, radiusInKm = 5) {
                const earthRadius = 6371; // Earth's radius in km

                const randomCoordinates = [];
                for (let i = 0; i < 5; i++) {
                    // Generate a random distance within the radius
                    const distance = Math.random() * radiusInKm;

                    // Convert distance to angular distance
                    const angularDistance = distance / earthRadius;

                    // Randomize bearing in radians
                    const bearing = Math.random() * 2 * Math.PI;

                    // Calculate new latitude
                    const newLat = Math.asin(
                        Math.sin((lat * Math.PI) / 180) * Math.cos(angularDistance) +
                        Math.cos((lat * Math.PI) / 180) * Math.sin(angularDistance) * Math.cos(bearing)
                    );

                    // Calculate new longitude
                    const newLon =
                        (lon * Math.PI) / 180 +
                        Math.atan2(
                            Math.sin(bearing) * Math.sin(angularDistance) * Math.cos((lat * Math.PI) / 180),
                            Math.cos(angularDistance) -
                            Math.sin((lat * Math.PI) / 180) * Math.sin(newLat)
                        );

                    // Convert back to degrees
                    randomCoordinates.push({
                        lat: (newLat * 180) / Math.PI,
                        lon: ((newLon * 180) / Math.PI + 540) % 360 - 180, // Normalize to [-180, 180]
                    });
                }

                return randomCoordinates;
            }

            // Example usage
            //const originLat = 37.7749; // San Francisco latitude
            //const originLon = -122.4194; // San Francisco longitude
            const nearbyCoordinates = generateNearbyCoordinates(latitude, longitude, 200); // Radius: 10 km

            console.log('Nearby Coordinates:', nearbyCoordinates);


            //const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

            nearbyCoordinates.forEach((city, index) => {
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data); // Process the weather data for each city
                        let cityContainer = document.getElementById(`city${index + 1}`);
                        let tempContainer = document.getElementById(`city-temp-${index + 1}`);
                        let desContainer = document.getElementById(`city-des-${index + 1}`);
                        if (cityContainer) {
                            cityContainer.textContent = `${data.name}`;
                            tempContainer.textContent = `${data.main.temp}°C`;
                            desContainer.textContent = `${data.weather[0].description}`;
                            // Function to determine image path based on temperature
                            const imageContainer1 = document.querySelector(`.dynamic-pop-city-icon-${index}`)

                            // width: 30px;height: 30px; position: relative;top:10%;order: 1;
                            // Dynamically add the image
                            let imagePath1 = getTemperatureImage(data.main.temp);
                            let imgElement1 = document.createElement('img');
                            imgElement1.src = imagePath1;
                            imgElement1.style.order = '1';
                            imgElement1.className = "city-dynamic-icons";
                            imgElement1.alt = 'Temperature condition';
                            imageContainer1.appendChild(imgElement1);
                        } else {
                            console.warn(`Element with id city${index + 1} not found.`);
                        }
                    })
                    .catch(error => console.error('Error fetching data:', error));
            });
        }
        hourlyData(latitude1, longitude1, apiKey);
        airPollution(latitude1, longitude1, apiKey);
        uvIndex(latitude1, longitude1, apiKey1);

        //chanceOfRain(latitude, longitude, apiKey1);
        //uvIndex(latitude, longitude, apiKey1);
        // You can use this data to display the location or make further API calls (e.g., to OpenWeatherMap)

    }, function(error) {
        console.error("Error getting location: ", error);
    });
    const obj = {};
    const obj1 = {};
    const array1 = [];

    async function hourlyData(param1, param2, param3) {
        try {
            const url1 = `https://api.openweathermap.org/data/2.5/forecast?lat=${param1}&lon=${param2}&appid=${param3}&units=metric`;
            let response = await fetch(url1);
            let data = await response.json();

            console.log(data);
            if (Array.isArray(data.list)) { // Check if list is an array
                for (let i = 0; i < data.list.length; i++) {
                    const startDate = data.list[0].dt_txt;
                    const item = data.list[i];
                    // Ensure all required fields exist
                    if (item && item.dt_txt && item.main && item.main.temp !== undefined) {
                        obj[item.dt_txt] = item.main.temp;
                        console.log(item.main.temp);
                        if (item.dt_txt.split(' ')[1].split(":")[0] == '15') {
                            obj1[item.dt_txt] = item.main.temp_max;
                        } // Map timestamp to temperature
                        array1.push(item.dt_txt);
                        dtArray.push(item.dt);
                        popArray.push(item.pop);
                        if (new Date(item.dt_txt).getDate() == new Date(startDate).getDate()) {
                            pop1.push(item.pop)
                            pop1temp = pop1.reduce((acc, curr) => acc = acc + curr, 0)
                            pop1temp = pop1temp / pop1.length;
                            console.log(pop1temp)
                        } else if (new Date(item.dt_txt).getDate() == new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1)).getDate()) {
                            pop2.push(item.pop);
                            pop2temp = pop2.reduce((acc, curr) => acc = acc + curr, 0)
                            pop2temp = pop2temp / pop2.length;
                        } else if (new Date(item.dt_txt).getDate() == new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 2)).getDate()) {
                            pop3.push(item.pop);
                            pop3temp = pop3.reduce((acc, curr) => acc = acc + curr, 0)
                            pop3temp = pop3temp / pop3.length;
                        } else if (new Date(item.dt_txt).getDate() == new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 3)).getDate()) {
                            pop4.push(item.pop);
                            pop4temp = pop4.reduce((acc, curr) => acc = acc + curr, 0)
                            pop4temp = pop4temp / pop4.length;
                        } else if (new Date(item.dt_txt).getDate() == new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 4)).getDate()) {
                            pop5.push(item.pop);
                            //console.log('pop5 ' + pop5);
                            pop5temp = pop5.reduce((acc, curr) => acc = acc + curr, 0)
                            pop5temp = pop5temp / pop5.length;
                        }
                        if (new Date(item.dt_txt).getDate() == new Date(startDate).getDate()) {
                            hum1.push(item.main.humidity)
                            hum1temp = hum1.reduce((acc, curr) => acc = acc + curr, 0)
                            hum1temp = hum1temp / pop1.length;
                        } else if (new Date(item.dt_txt).getDate() == new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1)).getDate()) {
                            hum2.push(item.main.humidity);
                            hum2temp = hum2.reduce((acc, curr) => acc = acc + curr, 0)
                            hum2temp = hum2temp / hum2.length;
                        } else if (new Date(item.dt_txt).getDate() == new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 2)).getDate()) {
                            hum3.push(item.main.humidity);
                            hum3temp = hum3.reduce((acc, curr) => acc = acc + curr, 0)
                            hum3temp = hum3temp / hum3.length;
                        } else if (new Date(item.dt_txt).getDate() == new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 3)).getDate()) {
                            hum4.push(item.main.humidity);
                            hum4temp = hum4.reduce((acc, curr) => acc = acc + curr, 0)
                            hum4temp = hum4temp / hum4.length;
                        } else if (new Date(item.dt_txt).getDate() == new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 4)).getDate()) {
                            hum5.push(item.main.humidity);
                            //humonsole.log('pop5 ' + pop5);
                            hum5temp = hum5.reduce((acc, curr) => acc = acc + curr, 0)
                            hum5temp = hum5temp / hum5.length;
                        }
                    } else {
                        console.warn(`Skipping item at index ${i}: Missing data`, item);
                    }
                }
            }

            function celsiusToFahrenheit(celsius) {
                return (celsius * 9 / 5) + 32;
            }
            document.getElementById('farenheit').addEventListener("click", () => {
                if (!isFarenheitClicked) {
                    isFarenheitClicked = true;
                    document.getElementById('farenheit').style.paddingRight = '10px';
                    document.getElementById('farenheit').style.paddingLeft = '12px';
                    document.getElementById('celsius').className = 'unselected-unit';
                    document.getElementById('farenheit').className = 'selected-unit';
                    document.getElementById('temperature-round').textContent = celsiusToFahrenheit(parseFloat(document.getElementById('temperature-round').textContent)).toFixed(1) + '°F';
                    document.querySelectorAll('.temp').forEach(tempElement => {
                        let temp = celsiusToFahrenheit(parseFloat(tempElement.textContent)); // Logs the text content of each element with the class 'hourly-temp'
                        tempElement.textContent = temp.toFixed(1) + '°F';
                    });
                    document.querySelectorAll('.city-temps').forEach(tempElement => {
                        let temp = celsiusToFahrenheit(parseFloat(tempElement.textContent)); // Logs the text content of each element with the class 'hourly-temp'
                        tempElement.textContent = temp.toFixed(1) + '°F';
                    });
                    myChart.options.plugins.tooltip.callbacks.label = (context) => {
                        let celsius = context.raw; // Keep original data in Celsius
                        let fahrenheit = (celsius * 9 / 5) + 32;
                        return `${fahrenheit.toFixed(1)}°F`; // Convert to Fahrenheit
                    };

                    // Update data labels formatter to display in Fahrenheit
                    myChart.options.plugins.datalabels.formatter = (value) => {
                        const fahrenheit = (value * 9 / 5) + 32;
                        return `${fahrenheit.toFixed(1)}°F`; // Convert to Fahrenheit
                    };

                    // Update the chart
                    myChart.update();
                    isCelsiusClicked = false;
                }

            });

            function fahrenheitToCelsius(fahrenheit) {
                return (fahrenheit - 32) * 5 / 9;
            }

            document.getElementById('celsius').addEventListener("click", () => {
                if (!isCelsiusClicked) {
                    isCelsiusClicked = true;
                    document.getElementById('celsius').style.paddingRight = '10px';
                    document.getElementById('celsius').style.paddingLeft = '12px';
                    document.getElementById('farenheit').className = 'unselected-unit';
                    document.getElementById('celsius').className = 'selected-unit';
                    document.getElementById('temperature-round').textContent = fahrenheitToCelsius(parseFloat(document.getElementById('temperature-round').textContent)).toFixed(1) + '°C';
                    document.querySelectorAll('.temp').forEach(tempElement => {
                        let temp = fahrenheitToCelsius(parseFloat(tempElement.textContent)); // Converts Fahrenheit to Celsius
                        tempElement.textContent = temp.toFixed(1) + '°C';
                    });
                    document.querySelectorAll('.city-temps').forEach(tempElement => {
                        let temp = fahrenheitToCelsius(parseFloat(tempElement.textContent)); // Converts Fahrenheit to Celsius
                        tempElement.textContent = temp.toFixed(1) + '°C';
                    });
                    myChart.options.plugins.tooltip.callbacks.label = (context) => {
                        let fahrenheit = context.raw; // Keep original data in Fahrenheit
                        let celsius = (fahrenheit - 32) * 5 / 9;
                        return `${celsius.toFixed(1)}°C`; // Convert to Celsius
                    };

                    // Update data labels formatter to display in Celsius
                    myChart.options.plugins.datalabels.formatter = (value) => {
                        const celsius = (value - 32) * 5 / 9;
                        return `${celsius.toFixed(1)}°C`; // Convert to Celsius
                    };

                    // Update the chart
                    myChart.update();
                    isFarenheitClicked = false;
                }
            });

            //popArrayChart = [...[pop1temp], ...[pop2temp], ...[pop3temp], ...[pop4temp], ...[pop5temp]];
            console.log(pop1temp, pop2temp, pop3temp, pop4temp, pop5temp);
            popArrayChart = [pop1temp, pop2temp, pop3temp, pop4temp, pop5temp];
            humArrayChart = [hum1temp, hum2temp, hum3temp, hum4temp, hum5temp];
            //console.log(array4);
            console.log(popArrayChart);
            console.log(humArrayChart);
            console.log(dtArray);
            console.log(popArray);
            const labels = Object.keys(obj1);
            console.log(obj1);
            const array2 = Object.keys(obj);
            const array3 = Object.values(obj);
            const array4 = Object.values(obj1);
            console.log(array4);
            for (let d = 0; d < labels.length; d++) {
                console.log(labels[d]);
                let day = new Date(labels[d]).getDate();
                let month = new Date(labels[d]).toLocaleDateString('default', {
                    month: 'short'
                })
                array5[d] = `${day} ${month}`;
            }
            console.log(array5);

            console.log(array4);

            let timeArray = [];
            for (let g = 0; g < array2.length; g++) {
                timeArray[g] = array2[g].split(' ')[1].split(":")[0];
            }
            console.log(array2);
            console.log(array3);
            console.log(timeArray);
            document.getElementById('cor').textContent = `${(nearestDt(new Date().getHours(), timeArray, popArray) * 100).toFixed(1)}%`;
            console.log(nearestDt(Math.floor(Date.now() / 1000), dtArray, popArray));

            function nearestDt(param4, param5, param6) {
                let nearest = param5[0];
                let minDifference = Math.abs(param4 - nearest);
                let popNow = 0;
                for (let i = 0; i < param5.length; i++) {
                    const difference = Math.abs(param4 - param5[i]);
                    if (difference < minDifference) {
                        nearest = param5[i];
                        minDifference = difference;
                        popNow = param6[i];
                    }
                }
                console.log(param4);
                console.log(nearest);
                return popNow;
            }
            let tempDisplays = document.querySelectorAll('.temp');
            let timeDisplays = document.querySelectorAll('.time');
            let imageDisplays = document.querySelectorAll('.hourly-temp');
            //for(let i=0;i<=imageDisplays.length;i++){
            //   Array.from(imageDisplays.children)[2].remove(); 
            //}
            //let imageDisplaysChildren = Array.from(imageDisplays.children);
            //if (imageDisplaysChildren[2]) {
            //  console.log(imageDisplaysChildren[2])
            // imageDisplaysChildren[2].remove();
            //}
            function getTemperatureImage(temp) {
                if (temp < 15) {
                    return 'images/cold.png'; // Cold
                } else if (temp >= 15 && temp <= 25) {
                    return 'images/mild.png'; // Mild
                } else if (temp > 25 && temp <= 35) {
                    return 'images/warm.png'; // Warm
                } else {
                    return 'images/hot.png'; // Hot
                }
            }
            for (let k = 0; k < tempDisplays.length; k++) {
                if (k < array2.length && k < array3.length) {
                    tempDisplays[k].id = array2[k];
                    tempDisplays[k].textContent = array3[k] + "°C";
                    let imageContainer2 = imageDisplays[k];
                    let imagePath2 = getTemperatureImage(array3[k]);

                    let imgElement2 = document.createElement('img');
                    imgElement2.className = 'toBeRemoved'
                    imgElement2.src = imagePath2;
                    imgElement2.style.order = 2;
                    imgElement2.style.height = '22px';
                    imgElement2.style.width = '22px';
                    imgElement2.alt = 'Temperature condition';
                    imageContainer2.appendChild(imgElement2);
                    if (timeArray[k] == '00') {
                        timeDisplays[k].textContent = "12 Am";
                    } else if (timeArray[k] == '12') {
                        timeDisplays[k].textContent = "12 Pm";
                    } else if (timeArray[k] < 12) {
                        timeDisplays[k].textContent = timeArray[k].replace(/^0+/, '') + "Am"
                    } else {
                        timeDisplays[k].textContent = (timeArray[k] - 12) + "Pm"
                    }
                }
            }

            function destroyAllCharts(ctxs) {
                ctxs.forEach(ctx => {
                    if (ctx.chartInstance) {
                        ctx.chartInstance.destroy();
                        ctx.chartInstance = null; // Clear the reference to prevent memory leaks
                    }
                });
            }
            // Pass an array of all contexts
            //destroyAllCharts([ctx, ctx1, ctx2, ctx3]);

            const ctx1 = document.querySelector('.temp-graph-container').getContext('2d');
            const ctx2 = document.querySelector('.rain-graph-container').getContext('2d');
            const ctx3 = document.querySelector('.humidity-graph-container').getContext('2d');
            const ctx = document.querySelector('.humidity-graph-container').getContext('2d');

            if (myChart) {
                myChart.destroy();
            }
            if (myChart1) {
                myChart1.destroy();
            }
            //if (myChart2) {
            //    myChart2.destroy();
            //}
            //if (myChart3) {
            //    myChart3.destroy();
            //}
            //document.querySelector('.temp-graph-container').remove();
            //document.querySelector('.rain-graph-container').remove();
            document.querySelector('.temp-graph-container').style.display = 'block';
            document.getElementById('humidity-graph-button').style.padding = '0px';
            document.getElementById('humidity-graph-button').style.color = '#fff';
            document.getElementById('humidity-graph-button').style.backgroundColor = '#2E2E38';
            document.getElementById('rain-graph-button').style.padding = '0px';
            document.getElementById('rain-graph-button').style.color = '#fff';
            document.getElementById('rain-graph-button').style.backgroundColor = '#2E2E38';
            document.querySelector('.humidity-graph-container').style.display = 'none';
            document.querySelector('.rain-graph-container').style.display = 'none';
            document.querySelector('.temp-graph-container').style.display = 'block';
            document.getElementById('temp-graph-button').style.backgroundColor = '#2E2E38';
            //document.getElementById('temp-graph-button').style.padding = '0px';
            document.getElementById('temp-graph-button').style.color = '#000';
            document.getElementById('temp-graph-button').style.backgroundColor = '#68dde5';
            document.getElementById('temp-graph-button').style.borderRadius = '10px';
            document.getElementById('temp-graph-button').style.padding = '5px';
            document.getElementById('temp-graph-button').style.color = 'black';
            document.getElementById('temp-graph-button').style.paddingLeft = '10px';
            document.getElementById('temp-graph-button').style.paddingRight = '10px';
            myChart = new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: array5,
                    datasets: [{
                        //label: 'Temperature',
                        data: array4,
                        tension: 0.4,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        pointBorderWidth: 2, // Border width of the points
                        pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Point fill color
                        pointBorderColor: 'rgba(255, 255, 255, 1)', // Border color for points
                        pointRadius: 8, // Increase the size of the points
                        pointHoverRadius: 10, // Hover effect size
                        pointStyle: 'circle', // Ensures circular points
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: { // Customize X-axis (you wanted no Y-axis)
                            ticks: {
                                color: '#ffffff', // White text for better visibility
                            },
                            grid: {
                                display: false,
                                color: 'rgba(75, 192, 192, 1)', // Remove grid lines
                            }
                        },
                        y: {
                            display: false,
                        }

                    },
                    plugins: {
                        legend: {
                            color: '#2E2E38',
                            labels: {
                                color: '#ffffff' // White legend text
                            }
                        },
                        datalabels: {
                            anchor: 'center', // Positioning of the labels
                            align: 'top', // Position the labels at the top of the points
                            color: '#ffffff', // Color of the data labels
                            font: {
                                size: 10,
                                weight: 300, // Make the text bold
                            },
                            formatter: function(value) {
                                return value + '°C'; // Display unit (°C) with the value
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });
            document.getElementById('rain-graph-button').addEventListener("click", function() {
                document.querySelector('.temp-graph-container').style.display = 'none';
                document.querySelector('.humidity-graph-container').style.display = 'none';
                document.querySelector('.rain-graph-container').style.display = 'none';
                //document.querySelector('.temp-graph-container').remove();
                // document.querySelector('.humidity-graph-container').remove();
                document.querySelector('.temp-graph-container').style.display = 'none';
                document.querySelector('.humidity-graph-container').style.display = 'none';
                document.querySelector('.rain-graph-container').style.display = 'block';
                document.getElementById('temp-graph-button').style.backgroundColor = '#2E2E38';
                //document.getElementById('temp-graph-button').style.backgroundColor = '#2E2E38';
                document.getElementById('humidity-graph-button').style.backgroundColor = '#2E2E38';
                document.getElementById('temp-graph-button').style.padding = '0px';
                document.getElementById('temp-graph-button').style.color = '#fff';
                document.getElementById('humidity-graph-button').style.padding = '0px';
                document.getElementById('humidity-graph-button').style.color = '#fff';
                document.getElementById('rain-graph-button').style.backgroundColor = '#68dde5';
                document.getElementById('rain-graph-button').style.borderRadius = '10px';
                document.getElementById('rain-graph-button').style.padding = '5px';
                document.getElementById('rain-graph-button').style.color = 'black';
                document.getElementById('rain-graph-button').style.paddingLeft = '10px';
                document.getElementById('rain-graph-button').style.paddingRight = '10px';

                //document.getElementById('')
                myChart1 = new Chart(ctx2, {
                    type: 'line',
                    data: {
                        labels: array5,
                        datasets: [{
                            label: '',
                            data: popArrayChart,
                            tension: 0.4,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            pointBorderWidth: 2, // Border width of the points
                            pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Point fill color
                            pointBorderColor: 'rgba(255, 255, 255, 1)', // Border color for points
                            pointRadius: 8, // Increase the size of the points
                            pointHoverRadius: 10, // Hover effect size
                            pointStyle: 'circle', // Ensures circular points
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: { // Customize X-axis (you wanted no Y-axis)
                                ticks: {
                                    color: '#ffffff', // White text for better visibility
                                },
                                grid: {
                                    display: false,
                                    color: 'rgba(75, 192, 192, 1)', // Remove grid lines
                                }
                            },
                            y: {
                                display: false,
                            }

                        },
                        plugins: {
                            legend: {

                                labels: {
                                    color: '#ffffff' // White legend text
                                }
                            },
                            datalabels: {
                                anchor: 'center', // Positioning of the labels
                                align: 'top', // Position the labels at the top of the points
                                color: '#ffffff', // Color of the data labels
                                font: {
                                    size: 12,
                                    weight: 300, // Make the text bold
                                },
                                formatter: function(value) {
                                    return Math.round((value * 100) * 100) / 100 + '%'; // Display unit (°C) with the value
                                }
                            }
                        }
                    },
                    plugins: [ChartDataLabels]
                });
            });
            console.log(myChart1);
            document.getElementById('humidity-graph-button').addEventListener("click", function() {
                // myChart.destroy();
                document.querySelector('.temp-graph-container').style.display = 'none';
                document.querySelector('.rain-graph-container').style.display = 'none';
                //document.querySelector('.temp-graph-container').remove();
                //document.querySelector('.rain-graph-container').remove();
                document.querySelector('.temp-graph-container').style.display = 'none';
                document.querySelector('.humidity-graph-container').style.display = 'none'
                document.getElementById('temp-graph-button').style.padding = '0px';
                document.getElementById('temp-graph-button').style.color = '#fff';
                document.getElementById('temp-graph-button').style.backgroundColor = '#2E2E38';
                document.getElementById('rain-graph-button').style.padding = '0px';
                document.getElementById('rain-graph-button').style.color = '#fff';
                document.getElementById('rain-graph-button').style.backgroundColor = '#2E2E38';

                document.querySelector('.humidity-graph-container').style.display = 'block';
                document.getElementById('humidity-graph-button').style.backgroundColor = '#2E2E38';
                //document.getElementById('temp-graph-button').style.padding = '0px';
                document.getElementById('temp-graph-button').style.color = '#fff';
                document.getElementById('humidity-graph-button').style.backgroundColor = '#68dde5';
                document.getElementById('humidity-graph-button').style.borderRadius = '10px';
                document.getElementById('humidity-graph-button').style.padding = '5px';
                document.getElementById('humidity-graph-button').style.color = 'black';
                document.getElementById('humidity-graph-button').style.paddingLeft = '10px';
                document.getElementById('humidity-graph-button').style.paddingRight = '10px';

                myChart2 = new Chart(ctx3, {
                    type: 'line',
                    data: {
                        labels: array5,
                        datasets: [{
                            label: '',
                            data: humArrayChart,
                            tension: 0.4,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            pointBorderWidth: 2, // Border width of the points
                            pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Point fill color
                            pointBorderColor: 'rgba(255, 255, 255, 1)', // Border color for points
                            pointRadius: 8, // Increase the size of the points
                            pointHoverRadius: 10, // Hover effect size
                            pointStyle: 'circle', // Ensures circular points
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: { // Customize X-axis (you wanted no Y-axis)
                                ticks: {
                                    color: '#ffffff', // White text for better visibility
                                },
                                grid: {
                                    display: false,
                                    color: 'rgba(75, 192, 192, 1)', // Remove grid lines
                                }
                            },
                            y: {
                                display: false,
                            }
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    color: '#ffffff' // White legend text
                                }
                            },
                            datalabels: {
                                anchor: 'center', // Positioning of the labels
                                align: 'top', // Position the labels at the top of the points
                                color: '#ffffff', // Color of the data labels
                                font: {
                                    size: 12,
                                    weight: 300, // Make the text bold
                                },
                                formatter: function(value) {
                                    return Math.round((value) * 100) / 100 + '%'; // Display unit (°C) with the value
                                }
                            }
                        }
                    },
                    plugins: [ChartDataLabels]
                });
            });
            document.getElementById('temp-graph-button').addEventListener("click", function() {
                //document.querySelector('.temp-graph-container').remove();
                //document.querySelector('.rain-graph-container').remove();
                document.querySelector('.temp-graph-container').style.display = 'block';
                document.getElementById('humidity-graph-button').style.padding = '0px';
                document.getElementById('humidity-graph-button').style.color = '#fff';
                document.getElementById('humidity-graph-button').style.backgroundColor = '#2E2E38';
                document.getElementById('rain-graph-button').style.padding = '0px';
                document.getElementById('rain-graph-button').style.color = '#fff';
                document.getElementById('rain-graph-button').style.backgroundColor = '#2E2E38';
                document.querySelector('.humidity-graph-container').style.display = 'none';
                document.querySelector('.rain-graph-container').style.display = 'none';
                document.querySelector('.temp-graph-container').style.display = 'block';
                document.getElementById('temp-graph-button').style.backgroundColor = '#2E2E38';
                //document.getElementById('temp-graph-button').style.padding = '0px';
                document.getElementById('temp-graph-button').style.color = '#000';
                document.getElementById('temp-graph-button').style.backgroundColor = '#68dde5';
                document.getElementById('temp-graph-button').style.borderRadius = '10px';
                document.getElementById('temp-graph-button').style.padding = '5px';
                document.getElementById('temp-graph-button').style.color = 'black';
                document.getElementById('temp-graph-button').style.paddingLeft = '10px';
                document.getElementById('temp-graph-button').style.paddingRight = '10px';

                //document.getElementById('')
                myChart3 = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: array5,
                        datasets: [{
                            label: '',
                            data: array4,
                            tension: 0.4,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            pointBorderWidth: 2, // Border width of the points
                            pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Point fill color
                            pointBorderColor: 'rgba(255, 255, 255, 1)', // Border color for points
                            pointRadius: 8, // Increase the size of the points
                            pointHoverRadius: 10, // Hover effect size
                            pointStyle: 'circle', // Ensures circular points
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: { // Customize X-axis (you wanted no Y-axis)
                                ticks: {
                                    color: '#ffffff', // White text for better visibility
                                },
                                grid: {
                                    display: false,
                                    color: 'rgba(75, 192, 192, 1)', // Remove grid lines
                                }
                            },
                            y: {
                                display: false,
                            }

                        },
                        plugins: {
                            legend: {

                                labels: {
                                    color: '#ffffff' // White legend text
                                }
                            },
                            datalabels: {
                                anchor: 'center', // Positioning of the labels
                                align: 'top', // Position the labels at the top of the points
                                color: '#ffffff', // Color of the data labels
                                font: {
                                    size: 12,
                                    weight: 300, // Make the text bold
                                },
                                formatter: function(value) {
                                    return value + "°C"; // Display unit (°C) with the value
                                }
                            }
                        }
                    },
                    plugins: [ChartDataLabels]
                });

            })

            //if (checkVar == 1) {
            console.log(myChart, myChart1, myChart2)
            console.log("HIIIIIII");
            // if (myChart && myChart1 && myChart2) {
            console.log(myChart.data.datasets[0].data);
            console.log(array4);
            console.log(popArrayChart);
            console.log(humArrayChart);
            console.log("HIIIIIIIHello");
            // myChart.data.datasets[0].data = array4;
            // myChart1.data.datasets[0].data = popArrayChart;
            // myChart2.data.datasets[0].data = humArrayChart;
            // console.log(myChart.data.datasets[0].data)
            // myChart.update();
            // myChart1.update();
            // myChart2.update();
            // console.log(myChart.data.datasets[0].data);
            //}
            // checkVar = 0;
            //}
            //}

            //}
        } catch (error) {
            console.error("error in hourly data")
        }
    };

    function airPollution(param1, param2, param3) {
        fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${param1}&lon=${param2}&appid=${param3}`)
            .then(response => response.json())
            .then(data => {
                //data.list[0].main.aqi
                console.log(data);
                gauge = new JustGage({
                    id: "aqi", // The ID of the container
                    value: data.list[0].main.aqi,
                    //color:white,  // The current value
                    min: 0, // Minimum value
                    max: 300, // Maximum value
                    title: "Air Quality Index", // Title of the gauge
                    label: "AQI", // Label under the value
                    levelColors: ["#5D940A", "#B6FF49", "#F6E659", "EF7F00", "EF3800", "9B00EF"], // Colors for different ranges
                    gaugeLevels: [{
                            from: 0,
                            to: 50,
                            color: "#5D940A"
                        }, // Green for 0-100
                        {
                            from: 51,
                            to: 100,
                            color: "#B6FF49"
                        }, // Yellow for 100-200
                        {
                            from: 101,
                            to: 150,
                            color: "#F6E659"
                        }, {
                            from: 151,
                            to: 200,
                            color: "#EF7F00"
                        }, {
                            from: 201,
                            to: 300,
                            color: "#EF3800"
                        }, {
                            from: 301,
                            to: 400,
                            color: "#9B00EF"
                        } // Red for 200-300
                    ],
                    startAnimationTime: 1, // Animation duration
                    startAnimationType: "bounce", // Animation type
                    valueFontColor: "#fff"
                });
                if (data.list[0].main.aqi >= 0 && data.list[0].main.aqi <= 50) {
                    document.getElementById('aqi-des').textContent = 'Safe';
                } else if (data.list[0].main.aqi > 50 && data.list[0].main.aqi <= 100) {
                    document.getElementById('aqi-des').textContent = 'Moderate';
                } else if (data.list[0].main.aqi > 100 && data.list[0].main.aqi <= 150) {
                    document.getElementById('aqi-des').textContent = 'Unhealthy for Sensitive Groups';
                } else if (data.list[0].main.aqi > 150 && data.list[0].main.aqi <= 200) {
                    document.getElementById('aqi-des').textContent = 'Unhealthy';
                } else if (data.list[0].main.aqi > 200 && data.list[0].main.aqi <= 300) {
                    document.getElementById('aqi-des').textContent = 'Health alert:Very Unhealthy';
                } else if (data.list[0].main.aqi > 300) {
                    document.getElementById('aqi-des').textContent = 'Hazourdous:Health warning!';
                }
            })
            .catch(error => {
                console.error("error at air pollution api");
            })
    }

    function chanceOfRain(param1, param2, param3) {
        fetch('https://api.weatherstack.com/current?access_key=80c01bc1b597b58f7d158aadffd093d5&query=11.0168,76.9558')
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error("error in fetching chance of rain");
            })
    }

    /* function uvIndex(param1, param2, param3) {
         fetch('https://api.weatherstack.com/current?access_key=e00692440b320b5f384a1d8828cee8d1&query=11.0168,76.9558')
             .then(response => response.json())
             .then(data => {
                 // Get the UV index value
                 console.log(data);
                 const currentValue = data.current.uv_index; // Adjust this to test different values
                 console.log(currentValue);

                 // Define UV index ranges
                 const ranges = [{
                     range: [0, 2],
                     color: "#5D940A",
                     label: "Safe"
                 }, {
                     range: [3, 5],
                     color: "#B6FF49",
                     label: "Moderate"
                 }, {
                     range: [6, 7],
                     color: "#F6E659",
                     label: "Unhealthy"
                 }, {
                     range: [8, 10],
                     color: "#EF7F00",
                     label: "Very Unhealthy"
                 }, {
                     range: [11, 13],
                     color: "#EF3800",
                     label: "Hazardous"
                 }, ];

                 // Function to get the range details based on the UV value
                 function getRangeDetails(value) {
                     for (let range of ranges) {
                         if (value >= range.range[0] && value <= range.range[1]) {
                             return range;
                         }
                     }
                     return {
                         color: "gray",
                         label: "Unknown"
                     };
                 }

                 const currentRange = getRangeDetails(currentValue);

                 // Data for the doughnut chart
                 const chartData = {
                     //labels: ["Filled", "Empty"],
                     datasets: [{
                         data: [currentValue, 13 - currentValue], // Current value and remaining space
                         backgroundColor: [currentRange.color, "#ddd"], // Dynamic color and gray for the rest
                         borderWidth: 0, // No border
                     }, ],
                 };

                 // Config for the chart with subtle animation
                 const config = {
                     type: "doughnut",
                     data: chartData,
                     options: {
                         rotation: -90, // Start angle
                         circumference: 180, // Half-circle
                         cutout: "80%", // Make it look like a gauge
                         plugins: {
                             tooltip: {
                                 enabled: false
                             }, // Disable tooltip
                         },
                         animation: {
                             duration: 800, // Subtle animation duration in milliseconds
                             easing: "easeOutQuad", // Smooth easing effect
                         },
                     },
                 };

                 // Render the chart
                 const ctx4 = document.getElementById("uv").getContext("2d");
                 new Chart(ctx4, config);

                 document.getElementById('uv').textContent = `UVi:${currentValue}`;
                 if (data.current.uv_index >= 0 && data.current.uv_index <= 2) {
                     document.getElementById('uv-des').textContent = 'Safe';
                 } else if (data.current.uv_index >= 3 && data.current.uv_index <= 5) {
                     document.getElementById('uv-des').textContent = 'Moderate';
                 } else if (data.current.uv_index >= 6 && data.current.uv_index <= 7) {
                     document.getElementById('uv-des').textContent = 'Unhealthy for Sensitive Groups';
                 } else if (data.current.uv_index >= 8 && data.current.uv_index <= 10) {
                     document.getElementById('uv-des').textContent = 'Unhealthy';
                 } else if (data.current.uv_index >= 11) {
                     document.getElementById('uv-des').textContent = 'Hazourdous:Health warning!';
                 }

             })

         .catch(error => {
             console.error("error in fetching chance of rain");
         })
     }*/
    function uvIndex(param1, param2, param3) {
        fetch(`https://api.weatherstack.com/current?access_key=${param3}&query=${param1},${param2}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const currentValue = data.current.uv_index;
                uvgauge = new JustGage({
                    id: "uv",
                    value: currentValue,
                    min: 0,
                    max: 13,
                    title: "UV Index",
                    label: "UV",
                    levelColors: ["#5D940A", "#B6FF49", "#F6E659", "#EF7F00", "#EF3800"],
                    customSectors: [{
                        color: "#5D940A",
                        lo: 0,
                        hi: 2
                    }, {
                        color: "#B6FF49",
                        lo: 3,
                        hi: 5
                    }, {
                        color: "#F6E659",
                        lo: 6,
                        hi: 7
                    }, {
                        color: "#EF7F00",
                        lo: 8,
                        hi: 10
                    }, {
                        color: "#EF3800",
                        lo: 11,
                        hi: 13
                    }],
                    startAnimationTime: 1000,
                    startAnimationType: "bounce",
                    valueFontColor: "#fff"
                });

                let uvDescription = '';
                if (currentValue >= 0 && currentValue <= 2) {
                    uvDescription = 'Safe';
                } else if (currentValue >= 3 && currentValue <= 5) {
                    uvDescription = 'Moderate';
                } else if (currentValue >= 6 && currentValue <= 7) {
                    uvDescription = 'Unhealthy for Sensitive Groups';
                } else if (currentValue >= 8 && currentValue <= 10) {
                    uvDescription = 'Unhealthy';
                } else if (currentValue >= 11) {
                    uvDescription = 'Hazardous: Health warning!';
                }

                document.getElementById('uv-des').textContent = uvDescription;
            })
            .catch(error => {
                console.error("Error in fetching UV index:", error);
            });
    }
} else {
    console.log("Geolocation is not supported by this browser.");
}

//YYYY-MM-DDTHH:MM:SSZ