document.addEventListener('DOMContentLoaded', function () {
    // Fetch car data from the server and display it on the page
    fetch('/api/cars')
      .then(response => response.json())
      .then(data => {
        const carListContainer = document.getElementById('carList');
        data.forEach(car => {
          const carElement = document.createElement('div');
          carElement.innerHTML = `<h2>${car.make} ${car.model}</h2><p>${car.year}</p><p>${car.price}</p>`;
          carListContainer.appendChild(carElement);
        });
      })
      .catch(error => console.error('Error fetching car data:', error));
  });
  