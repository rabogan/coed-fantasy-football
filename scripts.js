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
    renderByPosition(data); // Show players listed by position
  })
  .catch(error => {
    console.error("Error loading JSON:", error);
  });

  // Groups the EA positions into everyday English
  const positionGroups = {
    Goalkeepers: ['GK'],
    Defenders: ['CB', 'LB', 'RB'],
    Midfielders: ['CDM', 'CM', 'CAM', 'LM', 'RM'],
    Attackers: ['ST', 'LW', 'RW', 'CF']
  };  

  // Function to build and render player entries by position
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
  function renderByPosition(allPlayers) {
    const playerListContainer = document.getElementById('playerList');
    playerListContainer.innerHTML = '';

    for (const [positionGroupName, positionsInGroup] of Object.entries(positionGroups)) {
      const playersInThisGroup = allPlayers.filter(player =>
        positionsInGroup.includes(player.position)
      );

    const groupHeader = document.createElement('h3');
    groupHeader.textContent = positionGroupName;
    groupHeader.className = 'group-header';
    playerListContainer.appendChild(groupHeader);

    playersInThisGroup.forEach(player => {
      const playerCard = buildPlayerEntry(player);
      playerListContainer.appendChild(playerCard);
    });
    }
  }