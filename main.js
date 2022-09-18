const apikey = '339bc8d9901a9cca134fdce44438c615'

const main = document.querySelector(".main")
const form = document.querySelector(".search")
const search__box = document.querySelector(".search__box")
const icon = document.querySelector(".icon")
const body = document.querySelector(".body")

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

// console.log('London');

async function getLocation(city) {
    const res = await fetch(url(city))
    const resData = await res.json()

    // console.log(resData);
    getWeather(resData)
}

// getLocation("London")

function KtoC(k) {
    return Math.floor(k - 273.15)
}

function getWeather(data) {
    console.log(data);
    const temp = KtoC(data.main.temp)
    const tempMin = KtoC(data.main.temp_min)
    const tempMax = KtoC(data.main.temp_max)

    const weather = document.createElement('div')
    weather.classList.add('weather')

    weather.innerHTML = `
    <h3 class="city">Weather in ${data.name}</h3>
    <h1 class="temp">${temp}<span class="celc">°C</span></h1>
    <p class="max-min-temp">min:${tempMin}°C / max:${tempMax}°C</p>
    <div class="description">
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" class="icon">
        <p class="info">${data.weather[0].description}</p>
    </div>
    <p class="humidity">Humidity: ${data.main.humidity}%</p>
    <p class="wind">wind speed: ${data.wind.speed} km/h</p>
    `

    main.innerHTML = ""
    main.append(weather)
    if(data.weather[0].description == 'clear sky') {
        body.style.background = "url(img/clearSky.jpg) no-repeat center center / cover fixed"
    } else if (data.weather[0].description == 'few clouds') {
        body.style.background = "url(img/fewClouds.webp) no-repeat center center / cover fixed"
    } else if (data.weather[0].description == 'scattered clouds') {
        body.style.background = "url(img/scattered-clouds.jpg) no-repeat center center / cover fixed"
    } else if (data.weather[0].description == 'broken clouds' || data.weather[0].description == 'overcast clouds' || data.weather[0].main == 'Squalls') {
        body.style.background = "url(img/brokenClouds.jpg) no-repeat center center / cover fixed"
    } else if (data.weather[0].main == 'Rain' || data.weather[0].main == 'Drizzle') {
        body.style.background = "url(img/rain.jpg) no-repeat center center / cover fixed"
    } else if (data.weather[0].main == 'Thunderstorm') {
        body.style.background = "url(img/thundershtorm.jpg) no-repeat center center / cover fixed"
    } else if (data.weather[0].main == 'Snow') {
        body.style.background = "url(img/snow.webp) no-repeat center center / cover fixed"
    } else if (data.weather[0].main == 'Mist' || data.weather[0].main == 'Smoke' || data.weather[0].main == 'Haze' || data.weather[0].main == 'Fog') {
        body.style.background = "url(img/mist.jpg) no-repeat center center / cover fixed"
    } else if (data.weather[0].main == 'Sand' || data.weather[0].main == 'Dust') {
        body.style.background = "url(img/sand.png) no-repeat center center / cover fixed"
    } else if (data.weather[0].main == 'Ash') {
        body.style.background = "url(img/volcan.jpg) no-repeat center center / cover fixed"
    } else if (data.weather[0].main == 'Tornado') {
        body.style.background = "url(img/tornado.jpg) no-repeat center center / cover fixed"
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const cityName = search__box.value

    if (cityName) {
        getLocation(cityName)
    }

})