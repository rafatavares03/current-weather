const key = config.MY_API_KEY;

document.querySelector('#searchForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  let search = document.querySelector('#search').value;
  if (search !== '') {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(search)}&appid=${key}&units=metric&lang=pt_br`;
    let results = await fetch(url);
    let json = await results.json();

    if (json.cod === 200) {
      ShowResults({
        name: json.name,
        country: json.sys.country,
        feels_like: json.main.feels_like,
        humidity: json.main.humidity,
        pressure: json.main.pressure,
        temp: json.main.temp,
        temp_max: json.main.temp_max,
        temp_min: json.main.temp_min,
        weather: json.weather[0].description,
        wind_deg: json.wind.deg,
        wind_speed: json.wind.speed
      })
    } else {
      ShowWarning(`Não foi possível localizar "${search}".`);
    }
  } else {
    ShowWarning('Não é possível realizar essa pesquisa, tente novamente.')
  }
});

function ShowResults(results) {
  console.log(results);
}

function ShowWarning(message) {
  const warning = document.querySelector('.warning');
  warning.innerHTML = message;
}