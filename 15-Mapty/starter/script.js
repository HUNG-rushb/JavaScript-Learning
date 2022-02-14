'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      //   console.log(position);

      const latitude = position.coords;
      const longitude = position.coords;

      // console.log(latitude, longitude);

      // const coords = [latitude, longitude];

      // HTML id map
      map = L.map('map').setView([latitude, longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Clicks on map
      map.on('click', mapE => {
        mapEvent = mapE;
        form.classList.remove('hidden');

        inputDistance.focus();
      });
    },
    () => {
      alert('Error!');
    }
  );
}

form.addEventListener('submit', e => {
  e.preventDefault();

  // Clear input
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      '';

  // Display marker
  const { lat, lng } = event.latlng;

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        className: 'running-popup',
      })
    )
    .setPopUpContent('Workout')
    .openPopup();
});

inputType.addEventListener('change', e => {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
