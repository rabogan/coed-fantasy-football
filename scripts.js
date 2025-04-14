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
    //renderAllPlayers(data); // Render all players
    renderOnlyGoalkeepers(data); // Render only goalkeepers
  })
  .catch(error => {
    console.error("Error loading JSON:", error);
  });

  function renderOnlyGoalkeepers(allPlayers) {
    const playerDiv = document.getElementById('playerList');
    playerDiv.innerHTML = '';
  
    const allGoalies = allPlayers.filter(player => player.position === 'GK');
  
    const goalkeeperHeading = document.createElement('h3');
    goalkeeperHeading.textContent = 'Goalkeepers';
    playerDiv.appendChild(goalkeeperHeading);
  
    allGoalies.forEach(player => {
      const entry = buildPlayerEntry(player);
      playerDiv.appendChild(entry);
    });
  }
  
  // List all players in the sortable list
  function renderAllPlayers(allPlayers) {
    const playerDiv = document.getElementById('playerList');
    playerDiv.innerHTML = ''; // Clear existing content
  
    allPlayers.forEach(player => {
      const playerCard = buildPlayerEntry(player); // Using the helper function
      playerDiv.appendChild(playerCard);
    });
  }