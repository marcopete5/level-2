// index.js

// Fetches Pokémon data from the API
function getPokemonData() {
    axios
        .get('https://api.vschool.io/pokemon')
        .then((response) => displayPokemonNames(response.data)) // Pass response data to display function
        .catch((error) => console.log('Error fetching Pokémon data:', error)); // Log errors
}

// Displays Pokémon names in the DOM
function displayPokemonNames(data) {
    const pokemonList = document.getElementById('pokemon-list'); // Get container div
    pokemonList.innerHTML = ''; // Clear any existing content
    // Access the nested Pokémon array
    const pokemonArray = data.objects[0].pokemon;
    // Loop through each Pokémon object
    for (let i = 0; i < pokemonArray.length; i++) {
        const p = document.createElement('p'); // Create a p element for each name
        p.textContent = pokemonArray[i].name; // Set text to Pokémon name
        pokemonList.appendChild(p); // Append p to container
    }
}

// Call the function to fetch and display data when the page loads
getPokemonData();
