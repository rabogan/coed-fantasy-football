// I studied some of the Colt Steele course on Udemy...but prefer React!
// https://rabogan.github.io/ColtSteelePractice/javascriptSection/javascriptDOMIntro.html

// Better resources (suggested by AI):
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
// https://javascript.info/custom-elements
// For dropdown menus, https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown

import { buildPlayerEntry } from './helpers/buildPlayerEntry.js';

let allPlayers = [];

fetch('player_dataset.json')
  .then(response => response.json())
  .then(data => {
    console.log("JSON Player Data Loaded Successfully!");

    allPlayers = data;
    renderByPosition(allPlayers); // Show players listed by position
  })
  .catch(error => {
    console.error("Error loading JSON:", error);
  });

  // Groups the EA positions into everyday English
  const positionGroups = {
    'Goalkeepers': ['GK'],
    'Defenders': ['CB', 'LB', 'RB'],
    'Midfielders': ['CDM', 'CM', 'CAM', 'LM', 'RM'],
    'Attackers': ['ST', 'LW', 'RW', 'CF']
  };

  // Map the clubs to their full names.  Updated: needs quotes around blankspaces
  const clubMapping = {
    'RM': 'Real Madrid',
    'RM W': 'Real Madrid W',
    'ARS': 'Arsenal',
    'ARS W': 'Arsenal W'
  };

  // Map gender options to lowercase (to match player.gender field)
  const genderMapping = {
    'Male': 'male',
    'Female': 'female'
  };

  // Map dropdown codes to grouped EA positions
  const positionGroupMapping = {
    'GKP': ['GK'],
    'DEF': ['CB', 'LB', 'RB'],
    'MID': ['CDM', 'CM', 'CAM', 'LM', 'RM'],
    'ATT': ['ST', 'LW', 'RW', 'CF']
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

  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
document.getElementById('playerFilterDropdown').addEventListener('change', (e) => {
  const selected = e.target.value;
  console.log(`Dropdown selection: ${selected}`);

  // Generated by Copilot, and was essential to fixing an issue
  if (selected === 'all') {
    renderByPosition(allPlayers); // Reset to default view
    return;
  }

  // Team filtering based on clubMapping keys.  Is a switch statement better?
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
  if (selected in clubMapping) {
    const matchingTeam = clubMapping[selected];
    const filtered = allPlayers.filter(p => p.club === matchingTeam);
    renderFlatList(filtered);
  }

  if (selected in genderMapping) {
    const targetGender = genderMapping[selected];
    const filtered = allPlayers.filter(p => p.gender === targetGender);
    renderFlatList(filtered);
    return;
  }

  if (selected in positionGroupMapping) {
    const positions = positionGroupMapping[selected];
    const filtered = allPlayers.filter(p => positions.includes(p.position));
    renderFlatList(filtered);
    return;
  }
});

// Utility function: Builds a list of players (no headers)
function renderFlatList(players) {
  const playerListContainer = document.getElementById('playerList');
  playerListContainer.innerHTML = '';

  players.forEach(player => {
    const entry = buildPlayerEntry(player);
    playerListContainer.appendChild(entry);
  });
}