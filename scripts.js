// I studied some of the Colt Steele course on Udemy...but prefer React!
// https://rabogan.github.io/ColtSteelePractice/javascriptSection/javascriptDOMIntro.html

function buildPlayerEntry(player) {
  const playerEntry = document.createElement('div');
  playerEntry.className = 'player-entry';

  const playerLeftSection = document.createElement('div');
  playerLeftSection.className = 'player-left';

  const infoIcon = document.createElement('span');
  infoIcon.className = 'info-button';
  infoIcon.textContent = 'ℹ️';

  const playerName = document.createElement('strong');
  playerName.className = 'player-name';
  playerName.textContent = player.name;

  playerLeftSection.appendChild(infoIcon);
  playerLeftSection.appendChild(playerName);

  const playerRightSection = document.createElement('div');
  playerRightSection.className = 'player-right';

  const club = document.createElement('span');
  club.className = 'player-club';
  club.textContent = player.club;

  const rating = document.createElement('span');
  rating.className = 'player-rating';
  rating.textContent = player.rating;

  playerRightSection.appendChild(club);
  playerRightSection.appendChild(rating);

  playerEntry.appendChild(playerLeftSection);
  playerEntry.appendChild(playerRightSection);

  return playerEntry;
}

let allPlayers = [];
let selectedPositionSlot = null;
const selectedPlayerSet = new Set(); // Tracks players already selected!  O(1) lookup/deletion

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

  function permanentLabelEnabled(code) {
    switch (code) {
      case 'GKP': return 'Goalkeeper';
      case 'DEF': return 'Defender';
      case 'MID': return 'Midfielder';
      case 'ATT': return 'Forward';
      default: return 'Position';
    }
  }  

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
  // Reviewing this code, hardcoding the club names was a mistake.  With more time, I would 
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

// Uses the helper function to build the player entry
function renderFlatList(players) {
  const playerListContainer = document.getElementById('playerList');
  playerListContainer.innerHTML = '';

  players.forEach(player => {
    const entry = buildPlayerEntry(player);
    playerListContainer.appendChild(entry);
  });
}

document.querySelectorAll('.position-slot').forEach(slot => {
  slot.addEventListener('click', () => {
    // Older technique that allows easier removal from the set.
    // Logic duplicated in the Evaluate button added in this push.
    if (slot.classList.contains('filled')) {
      const playerAlreadySelected = slot.textContent.trim();
  
      const confirmRemove = confirm(`Do you want to remove ${playerAlreadySelected} from this position?`);
      if (confirmRemove && playerAlreadySelected) {
        selectedPlayerSet.delete(playerAlreadySelected);
        checkForSixPlayersToDisplayButtons();
        const positionCode = slot.getAttribute('player-position');
        slot.innerHTML = permanentLabelEnabled(positionCode);
        slot.classList.remove('filled');
      }
  
      return;
    }

    selectedPositionSlot = slot;
  
    const popup = document.getElementById('playerListModalPopup');
    const content = document.getElementById('playerListPopupContent');
    const playerList = document.getElementById('playerList');
  
    content.innerHTML = playerList.innerHTML;
    popup.classList.remove('hidden');
  
    const modalPlayers = content.querySelectorAll('.player-entry');
    modalPlayers.forEach(entry => {
      entry.addEventListener('click', () => {
        const playerName = entry.querySelector('.player-name')?.textContent;
  
        if (!playerName || selectedPlayerSet.has(playerName)) {
          alert(`${playerName} is already on your team!`);
          return;
        }
  
        const filledDiv = document.createElement('div');
        filledDiv.className = 'slot-filled';
  
        const nameSpan = document.createElement('span');
        nameSpan.textContent = playerName;
        filledDiv.appendChild(nameSpan);
  
        selectedPositionSlot.innerHTML = '';
        selectedPositionSlot.appendChild(filledDiv);
        selectedPositionSlot.classList.add('filled');
        selectedPlayerSet.add(playerName);
        checkForSixPlayersToDisplayButtons();
        console.log(`Number in team: ${selectedPlayerSet.size}`);
        console.log(`Selected player added to team: ${playerName}`);
        selectedPositionSlot = null;
        popup.classList.add('hidden');
      });
    });
  });
  
  slot.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent click after tap

    if (slot.classList.contains('filled')) {
      const playerAlreadySelected = slot.textContent.trim();

      const confirmRemove = confirm(`Do you want to remove ${playerAlreadySelected} from this position?`);
      if (confirmRemove && playerAlreadySelected) {
        selectedPlayerSet.delete(playerAlreadySelected);
        checkForSixPlayersToDisplayButtons();
        const positionCode = slot.getAttribute('player-position');
        slot.innerHTML = permanentLabelEnabled(positionCode);
        slot.classList.remove('filled');
      }
    return; // Exit early so modal doesn't open
    }

    selectedPositionSlot = slot;
  
    const popup = document.getElementById('playerListModalPopup');
    const content = document.getElementById('playerListPopupContent');
    const playerList = document.getElementById('playerList');
  
    content.innerHTML = playerList.innerHTML;
    popup.classList.remove('hidden');
  
    const modalPlayers = content.querySelectorAll('.player-entry');
    modalPlayers.forEach(entry => {
      entry.addEventListener('click', () => {
        const playerName = entry.querySelector('.player-name')?.textContent;
  
        if (!playerName || selectedPlayerSet.has(playerName)) {
          alert(`${playerName} is already on your team!`);
          return;
        }
  
        const filledDiv = document.createElement('div');
        filledDiv.className = 'slot-filled';
  
        const nameSpan = document.createElement('span');
        nameSpan.textContent = playerName;
        filledDiv.appendChild(nameSpan);
  
        selectedPositionSlot.innerHTML = '';
        selectedPositionSlot.appendChild(filledDiv);
        selectedPositionSlot.classList.add('filled');
  
        selectedPlayerSet.add(playerName);
        checkForSixPlayersToDisplayButtons();
        console.log(`Number in team: ${selectedPlayerSet.size}`);
        selectedPositionSlot = null;
        popup.classList.add('hidden');
      });
    });
  });
});

// https://www.w3schools.com/w3css/w3css_modal.asp
document.getElementById('closePlayerListModal').addEventListener('click', () => {
  document.getElementById('playerListModalPopup').classList.add('hidden');
  selectedPositionSlot = null; //When modal closes without selecting a player
});

// Close the modal when clicking outside of it
document.getElementById('playerListModalPopup').addEventListener('click', (event) => {
  const content = document.querySelector('#playerListModalPopup .modal-content');
  if (!content.contains(event.target)) {
    document.getElementById('playerListModalPopup').classList.add('hidden');
    selectedPositionSlot = null; //When modal closes without selecting a player
  }
});

const pitchControls = document.getElementById('pitchControls');
const clearTeamBtn = document.getElementById('clearTeamBtn');

function checkForSixPlayersToDisplayButtons() {
  if (selectedPlayerSet.size === 6) {
    pitchControls.classList.remove('hidden');
  } else {
    pitchControls.classList.add('hidden');
  }
}

// See line 228 (DRY)
clearTeamBtn.addEventListener('click', () => {    
  const confirmFullRemove = confirm("Clear your team?");
  if(confirmFullRemove){
    document.querySelectorAll('.position-slot').forEach(slot => {
      slot.innerHTML = permanentLabelEnabled(slot.getAttribute('player-position'));
      slot.classList.remove('filled');
    });
    pitchControls.classList.add('hidden');

    selectedPlayerSet.clear();
    checkForSixPlayersToDisplayButtons();
  }
});

clearTeamBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  clearTeamBtn.click();
});


const evaluateTeamBtn = document.getElementById('evaluateTeamBtn');

// Rough implementation for now!
evaluateTeamBtn.addEventListener('click', () => {
  if(selectedPlayerSet.size < 6) {
    alert("Please select 6 players!");
    return;
  }
  let totalRating = 0;

  selectedPlayerSet.forEach(playerName => {
    const findPlayerObject = allPlayers.find(p => p.name === playerName);
    totalRating += findPlayerObject.rating;
  });

  const averageRating = (totalRating / 6).toFixed(1);
  alert(`⭐️ That's a nice squad you've put together! Average Rating: ${averageRating}`);
});

evaluateTeamBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  evaluateTeamBtn.click();
});
