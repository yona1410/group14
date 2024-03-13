// Define an asynchronous function to retrieve addresses from the DOM
async function getAddresses() {
    // Select all elements with the class 'location-name'
    const locationElements = document.querySelectorAll('.location-name');
    let addresses = []; // Initialize an array to hold the addresses
    locationElements.forEach(element => {
        // For each location element, find the <p> tag within it
        const pElement = element.querySelector('p');
        // Get the text content of the <p> tag, trimming whitespace
        const addressText = pElement.textContent.trim();
        console.log(addressText) // Log the address text for debugging
        addresses.push(addressText); // Add the address text to the addresses array
    });
    return addresses; // Return the array of addresses
}

// Define an asynchronous function to request latitude and longitude for a given address
async function requestAddressLatLong(address) {
    try {
        // Make a fetch request to the OpenStreetMap API with the address
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`, {
            headers: {
                'User-Agent': 'YourAppName/1.0' // Set a user-agent header
            }
        });
        const data = await response.json(); // Parse the JSON response
        if (data.length > 0) {
            // If data is found, return the latitude and longitude of the first result
            return { lat: data[0].lat, lon: data[0].lon };
        } else {
            console.log("Address not found"); // Log a message if no data is found
            return null;
        }
    } catch (error) {
        console.error("Error fetching data:", error); // Log any errors that occur during the fetch
        return null;
    }
}

// Function to display a location on a map given latitude, longitude, and address
function showLocationOnMap(lat, lon, address) {
    L.marker([lat, lon]).addTo(map) // Add a marker to the map at the given coordinates
      .bindPopup(address) // Bind a popup with the address
      .openPopup(); // Automatically open the popup
}

// Initialize a Leaflet map
var map = L.map('map').setView([32.0853, 34.7818], 13); // Set the initial view of the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors' // Set the tile layer source and attribution
}).addTo(map);

// Immediately-invoked function expression (IIFE) to run the code
(async () => {
    const addresses = await getAddresses(); // Retrieve addresses from the DOM
    for (const address of addresses) {
        const result = await requestAddressLatLong(address); // Request lat/lon for each address
        if (result) {
            showLocationOnMap(result.lat, result.lon, address); // Show the location on the map if result is found
        }
    }
})();


function bookNow(apartmentId, startDate, endDate) {
        fetch(`/book_now/${apartmentId}/${startDate}/${endDate}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // You can send additional data in the request body if needed
            // body: JSON.stringify({}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle success response if needed
            console.log(data);
            if (data.success) {
            window.location.href = '/profile/' + data.user_id;
        }
            // Redirect or show a success message
        })
        .catch(error => {
            // Handle error
            console.error('There was a problem with your fetch operation:', error);
            // Redirect or show an error message
        });
    }

document.querySelectorAll('.booking-btn').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        var apartmentId = button.getAttribute('data-apartment-id');
        var startDate = button.getAttribute('data-start-date');
        var endDate = button.getAttribute('data-end-date');
        bookNow(apartmentId, startDate, endDate);
    });
});
