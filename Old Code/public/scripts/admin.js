document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/admin/data') // Adjust the API endpoint to fetch admin data
        .then(response => response.json())
        .then(adminData => {
            const bannedUsersList = document.getElementById('bannedUsersList');
            const buyersList = document.getElementById('buyersList');
            const sellersList = document.getElementById('sellersList');

            // Display banned users
            displayUsers(adminData.bannedUsers, bannedUsersList);

            // Display buyers
            displayUsers(adminData.buyers, buyersList);

            // Display sellers
            displayUsers(adminData.sellers, sellersList);
        })
        .catch(error => console.error('Error fetching admin data:', error));
});

// Function to display a list of users
function displayUsers(users, userListElement) {
    const userItems = users.map(user => `<li>${user.name}</li>`).join('');
    userListElement.innerHTML = userItems;
}
