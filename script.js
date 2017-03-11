var owmApiKey = ''
var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?'
var html = document.querySelector('html')
var clock = document.querySelector('.clock')
var date = document.querySelector('.date')
var weather = document.querySelector('.weather')

moment.locale('en-gb')

init()

function init () {
  updateBackground()
  setInterval(updateBackground, 86400000) // 24 hrs
  updateDisplay()
  setInterval(updateDisplay, 3000) // 3 sec
  updateWeather()
  setInterval(updateWeather, 1800000) // 30 min
}

function updateDisplay () {
  clock.innerHTML = moment().format('h:mm')
  date.innerHTML = moment().format('dddd') + ', ' + moment().format('LL')
}

function updateBackground () {
  fetch('https://www.reddit.com/r/EarthPorn/.json')
    .then(r => r.json())
    .then(function (data) {
      var random = Math.floor(Math.random()*10)
      var imgUrl = data.data.children[random].data.preview.images[0].source.url
      var darken = 'linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) )'
      var bgImg = 'url("' + imgUrl + '")'
      document.body.style.backgroundImage = darken + ', ' + bgImg
    })
    .catch(e => console.log(e))
}

function updateWeather () {
  fetch(baseUrl + 'id=2207616&appid=' + owmApiKey)
    .then(r => r.json())
    .then(function (data) {
      console.log(data)
      weather.innerHTML = Math.round(data.main.temp - 273.15) + ' Celsius'
    })
    .catch(function (e) { console.log(e) })
}
