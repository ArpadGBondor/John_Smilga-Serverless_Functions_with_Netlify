// it takes few minutes

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const alert = document.querySelector('.alert');
const result = document.querySelector('.result');

// Show/Hide alert message
// alert.style.display = 'block'
// alert.style.display = 'none'

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const city = input.value;
  alert.style.display = 'none';
  result.innerHTML = '';
  try {
    const { data } = await axios.get(`/api/5-weather`, { params: { city: city } });
    showData(data);
  } catch (error) {
    alert.style.display = 'block';
    if (error.response && error.response.status && error.response.status === 404) {
      alert.innerText = 'City not found.';
    } else if (error.response && error.response.status && error.response.status === 500) {
      alert.innerText = 'Server error.';
    } else {
      alert.innerText = 'Unknown error.';
    }
  }
});

function showData() {
  const {
    name,
    clouds: { all: cloud_percent },
    main: { temp, feels_like: temp_feels_like, temp_min, temp_max, pressure },
    sys: { country },
    weather,
    wind: { speed: wind_speed },
  } = data;
  const { description, icon } = weather[0];

  result.innerHTML = `
  <div class="result-content">
      <div>
          <h3>${name}, ${country} <img src="http://openweathermap.org/images/flags/${country.toLowerCase()}.png"> <br />(${temp}°C)</h3>
          <p>The weather is currently ${description}.</p>
          <p>The temperature is between ${temp_min}°C and ${temp_max}°C, and feels like ${temp_feels_like}°C.</p>
          <p>Wind: ${wind_speed} m/s, Clouds: ${cloud_percent}%, Pressure: ${pressure} hpa</p>
      </div>
      <img src = "http://openweathermap.org/img/wn/${icon}@2x.png">
  </div>    
  `;
}
