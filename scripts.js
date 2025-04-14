// I studied some of the Colt Steele course on Udemy...but prefer React!
// https://rabogan.github.io/ColtSteelePractice/javascriptSection/javascriptDOMIntro.html

// Better resources (suggested by AI):
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
// https://javascript.info/custom-elements

import { buildPlayerEntry } from './helpers/buildPlayerEntry.js';

fetch('player_dataset.json')
  .then(response => response.json())
  .then(data => {
    console.log("JSON Player Data Loaded Successfully!");
    renderAllPlayers(data); // Render all players
  })
  .catch(error => {
    console.error("Error loading JSON:", error);
  });

  // List all players in the sortable list
  function renderAllPlayers(allPlayers) {
    const playerDiv = document.getElementById('playerList');
    playerDiv.innerHTML = ''; // Clear existing content
  
    allPlayers.forEach(player => {
      const playerCard = buildPlayerEntry(player); // Using the helper function
      playerDiv.appendChild(playerCard);
    });
  }