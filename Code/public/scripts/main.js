// Wait for the HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Function to open the login modal
    function openModal() {
        const modal = document.getElementById('loginModal');
        modal.style.display = 'block';
    }

    // Function to close the login modal
    function closeModal() {
        const modal = document.getElementById('loginModal');
        modal.style.display = 'none';
    }

    // Function to redirect to the login page
    function redirectToLogin() {
        // You can implement the actual redirection logic here
        alert('Redirecting to the login page');
    }

    // Function to redirect to the signup page
    function redirectToSignup() {
        // You can implement the actual redirection logic here
        alert('Redirecting to the signup page');
    }

    // Function to skip login
    function skipLogin() {
        closeModal();
    }

    // Function to handle the request for viewing a car
    function requestViewing(car) {
        const formContainer = document.createElement('div');
        formContainer.classList.add('form-container');

        const viewingForm = document.createElement('form');
        viewingForm.innerHTML = `
            <label for="viewingDate">Preferred Viewing Date:</label>
            <input type="date" id="viewingDate" name="viewingDate" required>

            <label for="message">Message to Seller:</label>
            <textarea id="message" name="message" placeholder="Enter a message to the seller..." required></textarea>

            <button type="submit">Submit Request</button>
        `;

        viewingForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const date = document.getElementById('viewingDate').value;
            const message = document.getElementById('message').value.trim();

            if (date && message) {
                alert(`Thank you for your request! Your viewing request for ${car.make} ${car.model} on ${date} has been submitted with the following message:\n${message}`);
                // Close the form
                document.body.removeChild(formContainer);
            } else {
                alert('Please provide both a date and a message to submit the request.');
            }
        });

        formContainer.appendChild(viewingForm);
        document.body.appendChild(formContainer);
    }

    // Function to filter cars based on the search input and selected year
    function filterCars(searchTerm, selectedYear) {
        return cars.filter(car => {
            const isMatchingYear = selectedYear ? car.year.toString() === selectedYear : true;

            return (
                isMatchingYear &&
                (car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.model.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        });
    }

    // Function to display the list of cars
    function displayCars(cars) {
        const carList = document.getElementById('car-list');
        carList.innerHTML = '';

        cars.forEach(car => {
            const carCard = document.createElement('div');
            carCard.classList.add('car-card');
            carCard.innerHTML = `
                <h3>${car.make} ${car.model}</h3>
                <p>Year: ${car.year}</p>
                <p>Price: $${car.price}</p>
                <button class="request-viewing-button" data-car-id="${car.id}">Request Viewing</button>
            `;
            // Append the card to the container
            carList.appendChild(carCard);

            // Set up event listener for the 'Request Viewing' button
            carCard.querySelector('.request-viewing-button').addEventListener('click', function () {
                const carId = this.getAttribute('data-car-id');
                const selectedCar = cars.find(car => car.id === carId);
                requestViewing(selectedCar);
            });
        });
    }

    // Function to populate year filter options
    function populateYearFilterOptions() {
        const yearFilter = document.getElementById('yearFilter');
        const uniqueYears = [...new Set(cars.map(car => car.year))];

        // Add an option for all years
        const allYearsOption = document.createElement('option');
        allYearsOption.value = '';
        allYearsOption.textContent = 'All Years';
        yearFilter.appendChild(allYearsOption);

        // Add options for each unique year
        uniqueYears.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        });
    }

    // Open the login modal when the page is loaded
    openModal();

    // Fetch car data from the server
    fetch('/api/cars')
        .then(response => response.json())
        .then(carsData => {
            // Store cars data globally for later use
            window.cars = carsData;

            // Get the container element for displaying cars
            const carList = document.getElementById('car-list');

            // Initial display of all cars
            displayCars(carsData);

            // Call the function to populate year filter options
            populateYearFilterOptions();

            // Event listener for the search input
            document.getElementById('searchInput').addEventListener('input', updateDisplayedCars);

            // Event listener for the 'Skip for Now' button
            document.getElementById('skipForNowButton').addEventListener('click', skipLogin);

            // Event listener for the 'x' button
            document.getElementById('closeButton').addEventListener('click', closeModal);

            // Event listener for the year filter
            document.getElementById('yearFilter').addEventListener('change', updateDisplayedCars);
        })
        .catch(error => console.error('Error fetching car data:', error));

    // Function to update the displayed cars based on the search input and selected year
    function updateDisplayedCars() {
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput.value.trim();

        const selectedYear = document.getElementById('yearFilter').value;

        const filteredCars = filterCars(searchTerm, selectedYear);

        displayCars(filteredCars);
    }
});
