import { format } from 'date-fns';

const dom = (() => {
  const mainContainer = document.querySelector('.main-wrapper');

  function formatTime(data, units) {
    let formattedTime;
    let formattedSunriseTime;
    let formattedSunsetTime;
    let formattedWeekDay;
    if (units === 'imperial') {
      formattedTime = format(data, 'EEEE d MMMM yyyy | h:mm aa');
      formattedSunriseTime = format(data, 'hh:mm aa');
      formattedSunsetTime = format(data, 'hh:mm aa');
      formattedWeekDay = format(data, 'EEEE');
      return {
        formattedTime,
        formattedSunriseTime,
        formattedSunsetTime,
        formattedWeekDay,
      };
    }
    formattedTime = format(data, 'EEEE d MMMM yyyy | H:mm');
    formattedSunriseTime = format(data, 'HH:mm');
    formattedSunsetTime = format(data, 'HH:mm');
    formattedWeekDay = format(data, 'EEEE');
    return {
      formattedTime,
      formattedSunriseTime,
      formattedSunsetTime,
      formattedWeekDay,
    };
  }

  function getWind(windSpeed, units) {
    const roundedSpeed = Math.round(windSpeed);
    let windDesc;
    let speed = windSpeed;
    if (units === 'imperial') {
      speed *= 0.44704;
    }
    if (windSpeed < 0.5) {
      windDesc = 'Calm';
    } else if (speed < 1.6) {
      windDesc = 'Light air';
    } else if (speed < 3.4) {
      windDesc = 'Light breeze';
    } else if (speed < 5.6) {
      windDesc = 'Gentle breeze';
    } else if (speed < 8) {
      windDesc = 'Moderate breeze';
    } else if (speed < 10.8) {
      windDesc = 'Fresh breeze';
    } else if (speed < 13.9) {
      windDesc = 'Strong breeze';
    } else if (speed < 17.2) {
      windDesc = 'High wind';
    } else if (speed < 20.8) {
      windDesc = 'Gale';
    } else if (speed < 24.5) {
      windDesc = 'Strong gale';
    } else if (speed < 28.5) {
      windDesc = 'Storm';
    } else if (speed < 32.7) {
      windDesc = 'Violent storm';
    } else if (speed >= 32.7) {
      windDesc = 'Hurricane';
    }
    return { windDesc, roundedSpeed };
  }

  function renderForecast(city, country, current, units) {
    const dataLocation = document.querySelector('#geoLocation');
    const dataTime = document.querySelector('#timeLocation');

    dataLocation.textContent = `${city}, ${country}`;
    dataTime.textContent = formatTime(current.time, units).formattedTime;
  }

  function renderApp(data) {
    console.log(data);
    const error = document.querySelector('.error');

    if (data.cod) {
      error.className = 'error';
      mainContainer.className = 'main-wrapper hide';
      error.textContent = data.message.charAt(0).toUpperCase() + data.message.slice(1);
    } else {
      error.className = 'error hide';
      mainContainer.className = 'main-wrapper';

      const { city, country, current, daily, units } = data;

      renderForecast(city, country, current, units);
    }
  }

  return {
    renderApp,
  };
})();

export default dom;
