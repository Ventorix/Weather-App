import dom from './dom';
import api from './API';

const handlers = (() => {
  const header = document.querySelector('.header-wrapper');
  const searchInput = document.querySelector('#searchInput');

  async function load(input = 'Berlin', units = 'metric') {
    const weatherData = await api.getLocData(input, units);
    dom.renderApp(weatherData);
  }

  function clickHandler() {
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
        units = 'metric';
        load(input, units);
      } else if (e.target.classList.contains('header-settings__imperial')) {
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
