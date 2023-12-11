// car-details.js
document.addEventListener('DOMContentLoaded', function () {
    const carDetailsSection = document.getElementById('car-details');
    const messageForm = document.getElementById('sendMessageForm');

    // Extract car details from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');
    const selectedCar = cars.find(car => car.id === carId);

    // Display car details
    if (selectedCar) {
        const carCard = document.createElement('div');
        carCard.classList.add('car-card');
        carCard.innerHTML = `
            <h3>${selectedCar.make} ${selectedCar.model}</h3>
            <p>Year: ${selectedCar.year}</p>
            <p>Price: $${selectedCar.price}</p>
        `;
        carDetailsSection.appendChild(carCard);

        // Event listener for the message form
        messageForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const message = document.getElementById('message').value.trim();
            if (message) {
                alert(`Your message for ${selectedCar.make} ${selectedCar.model} has been sent to the seller:\n${message}`);
            } else {
                alert('Please enter a message before sending.');
            }
        });
    } else {
        // Handle case where the car is not found
        alert('Car not found.');
    }
});
