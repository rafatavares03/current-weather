const key = MY_API_KEY;

document.querySelector('#searchForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  let search = document.querySelector('#search').value;
  if (search !== '') {
    ClearInfo();
    ShowWarning('Carregando...', 'block');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(search)}&appid=${key}&units=metric&lang=pt_br`;
    let results = await fetch(url);
    let json = await results.json();

    if (json.cod === 200) {
      ShowResults({
        country: json.sys.country,
        feels_like: json.main.feels_like,
        humidity: json.main.humidity,
        name: json.name,
        pressure: json.main.pressure,
        temp: json.main.temp,
        temp_max: json.main.temp_max,
        temp_min: json.main.temp_min,
        weather: json.weather[0].description,
        icon: json.weather[0].icon,
        wind_deg: json.wind.deg,
        wind_speed: json.wind.speed,
      });
    } else {
      ClearInfo();
      ShowWarning(`Não foi possível localizar "${search}".`, 'block');
    }
  } else {
    ClearInfo();
    ShowWarning('Não é possível realizar essa pesquisa, tente novamente.', 'block');
  }
});

function ShowResults(results) {
  document.querySelector('.city').innerHTML = `${results.name}, ${results.country}`;
  document.querySelector('.status h1').innerHTML = results.weather;
  document.querySelector('.status img').setAttribute('src', `http://openweathermap.org/img/wn/${results.icon}@2x.png`);
  document.querySelector('.temp h1').innerHTML = `${Math.trunc(results.temp)}ºC`;
  document.querySelector('.feels-like').innerHTML = `Sensação: ${Math.trunc(results.feels_like)}ºC`;
  document.querySelector('.min-max').innerHTML = `MIN: ${Math.trunc(results.temp_min)}ºC | MAX: ${Math.trunc(results.temp_max)}ºC`;
  document.querySelector('.humidity').innerHTML = `Umidade: ${results.humidity}%`;
  document.querySelector('.pressure').innerHTML= `Pressão: ${results.pressure}hPa`;
  document.querySelector('.wind-speed').innerHTML = `Velocidade: ${results.wind_speed}m/s`;
  document.querySelector('.wind-deg').innerHTML = `Ângulo: ${results.wind_deg}º`;
  
  ClearInfo();

  document.querySelector('.results').style.visibility = 'visible';
}

function ClearInfo() {
  ShowWarning('', 'none');
  document.querySelector('.results').style.visibility = 'hidden';
}

function ShowWarning(message, display) {
  const warning = document.querySelector('.warning');
  warning.style.display = display;
  warning.innerHTML = message;
}