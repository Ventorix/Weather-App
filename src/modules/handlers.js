import dom from './dom';
import api from './API';

const handlers = (() => {
  const header = document.querySelector('.header');
  const searchInput = document.querySelector('#searchInput');

  function interval(func, temp) {
    setInterval(() => {
      func();
      console.log('tic');
    }, temp);
  }

  async function load(input = 'Berlin', units = 'metric') {
    dom.loading('loading');
    const weatherData = await api.getLocData(input, units);
    dom.renderApp(weatherData);
    dom.loading('finished');
  }

  function clickHandler() {
    const metricButton = document.querySelector('.header-settings__metric');
    const imperialButton = document.querySelector('.header-settings__imperial');

    let input;
    let units;
    header.addEventListener('click', async (e) => {
      if (
        e.target.classList.contains('submit') ||
        e.target.parentElement.classList.contains('submit')
      ) {
        e.preventDefault();
        input = searchInput.value;
        load(input, units);
      } else if (e.target.classList.contains('header-settings__metric')) {
        if (metricButton.classList.contains('active')) {
          return;
        }
        units = 'metric';
        load(input, units);
      } else if (e.target.classList.contains('header-settings__imperial')) {
        if (imperialButton.classList.contains('active')) {
          return;
        }
        units = 'imperial';
        load(input, units);
      }
    });
  }

  return {
    clickHandler,
    load,
  };
})();

export default handlers;
