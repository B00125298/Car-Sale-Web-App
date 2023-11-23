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

    // Open the login modal when the page is loaded
    openModal();

    // Fetch car data from the server
    fetch('/api/cars')
        .then(response => response.json())
        .then(cars => {
            // Get the container element for displaying cars
            const carList = document.getElementById('car-list');

            // Function to filter cars based on the search input
            function filterCars(searchTerm) {
                return cars.filter(car => {
                    // Check if the make or model contains the search term (case-insensitive)
                    return (
                        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        car.model.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                });
            }

            // Function to update the displayed cars based on the search input
            function updateDisplayedCars() {
                const searchInput = document.getElementById('searchInput');
                const searchTerm = searchInput.value.trim();

                // Clear the current list of cars
                carList.innerHTML = '';

                // Filter cars based on the search term
                const filteredCars = filterCars(searchTerm);

                // Display the filtered cars
                filteredCars.forEach(car => {
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
            }

            // Initial display of all cars
            updateDisplayedCars();

            // Event listener for the search input
            document.getElementById('searchInput').addEventListener('input', updateDisplayedCars);

            // Event listener for the 'Skip for Now' button
            document.getElementById('skipForNowButton').addEventListener('click', skipLogin);

            // Event listener for the 'x' button
            document.getElementById('closeButton').addEventListener('click', closeModal);
        })
        .catch(error => console.error('Error fetching car data:', error));
});
