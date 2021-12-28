const key = config.MY_API_KEY;

document.querySelector('#searchForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  let search = document.querySelector('#search').value;
  if (search !== '') {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(search)}&appid=${key}&units=metric&lang=pt_br`;
    let results = await fetch(url);
    let json = await results.json();
    console.log(json);
  }
});