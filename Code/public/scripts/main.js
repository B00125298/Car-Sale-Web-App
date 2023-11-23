// Wait for the HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Fetch car data from the server
    fetch('/api/cars')
        .then(response => response.json())
        .then(cars => {
            // Get the container element for displaying cars
            const carList = document.getElementById('car-list');
            
            // Iterate through the array of cars and create a card for each
            cars.forEach(car => {
                const carCard = document.createElement('div');
                carCard.classList.add('car-card');
                carCard.innerHTML = `
                    <h3>${car.make} ${car.model}</h3>
                    <p>Year: ${car.year}</p>
                    <p>Price: $${car.price}</p>
                `;
                // Append the card to the container
                carList.appendChild(carCard);
            });
        })
        .catch(error => console.error('Error fetching car data:', error));
});
