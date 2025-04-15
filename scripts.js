/* 
 I dealt with arrays, objects and a set.
 For explanations, please check out the README.md file in the root of this repository.
 I'll be on W3Schools's JavaScript section looking for other methods after this project is completed!
 There are too many hard-coded elements which are okay in a proof-of-concept, but I'm aware of them.
 I'm also aware of the DRYness of this code, and I'm making fixes.
*/

function buildPlayerEntry(player) {
  const playerEntry = document.createElement('div');
  playerEntry.className = 'player-entry';

  const playerLeftSection = document.createElement('div');
  playerLeftSection.className = 'player-left';

  const infoIcon = document.createElement('span');
  infoIcon.className = 'info-button';
  infoIcon.textContent = 'ℹ️';

  infoIcon.addEventListener('click', (event) => {
    event.stopPropagation(); 
    showPlayerProfile(player);
  });

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
const selectedPlayerSet = new Set();

fetch('player_dataset.json')
  .then(response => response.json())
  .then(data => {
    console.log("JSON Player Data Loaded Successfully!");

    allPlayers = data;
    renderByPosition(allPlayers);
  })
  .catch(error => {
    console.error("Error loading JSON:", error);
  });


  const positionGroups = {
    'Goalkeepers': ['GK'],
    'Defenders': ['CB', 'LB', 'RB'],
    'Midfielders': ['CDM', 'CM', 'CAM', 'LM', 'RM'],
    'Attackers': ['ST', 'LW', 'RW', 'CF', 'REF']
  };

  // Map the clubs to their full names. As mentioned later, hardcoding the teams in the HTML was a mistake.
  const clubMapping = {
    'RM': 'Real Madrid',
    'RM W': 'Real Madrid W',
    'ARS': 'Arsenal',
    'ARS W': 'Arsenal W'
  };

  // Map gender options to lowercase (to match player.gender field).  Hardcoded.
  const genderMapping = {
    'Male': 'male',
    'Female': 'female'
  };

  // Map dropdown codes to grouped EA positions.  Hardcoded.
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

document.getElementById('playerFilterDropdown').addEventListener('change', (e) => {
  const selected = e.target.value;
  console.log(`Dropdown selection: ${selected}`);

  if (selected === 'all') {
    renderByPosition(allPlayers);
    return;
  }

  // Hardcoding the teams was a TIME-BASED decision
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
    handlePositionSlotInteraction(slot);
  });
  
  slot.addEventListener('touchstart', (e) => {
    e.preventDefault();

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

    handlePositionSlotInteraction(slot);
  });
});

function handlePositionSlotInteraction(slot){
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
}

document.getElementById('closePlayerListModal').addEventListener('click', () => {
  document.getElementById('playerListModalPopup').classList.add('hidden');
  selectedPositionSlot = null;
});

document.getElementById('playerListModalPopup').addEventListener('click', (event) => {
  const content = document.querySelector('#playerListModalPopup .modal-content');
  if (!content.contains(event.target)) {
    document.getElementById('playerListModalPopup').classList.add('hidden');
    selectedPositionSlot = null;
  }
});

document.getElementById('closePlayerProfileModal').addEventListener('click', () => {
  document.getElementById('playerInformationModal').classList.add('hidden');
});

document.getElementById('playerInformationModal').addEventListener('click', (event) => {
  const content = document.querySelector('.player-profile-content');
  if (!content.contains(event.target)) {
    document.getElementById('playerInformationModal').classList.add('hidden');
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

function showPlayerProfile(player) {
  const modal = document.getElementById('playerInformationModal');
  const detailsContainer = document.getElementById('playerProfileDetails');

  detailsContainer.innerHTML = '';

  const img = document.createElement('img');
  img.src = `player-images/${player.player_image}`;
  img.alt = player.name;

  const name = document.createElement('h1');
  name.textContent = player.name;

  const club = document.createElement('p');
  club.textContent = `Club: ${player.club}`;

  const position = document.createElement('p');
  position.textContent = `Position: ${player.position}`;

  const rating = document.createElement('p');
  rating.textContent = `EA Rating: ${player.rating}`;

  const age = document.createElement('p');
  age.textContent = `Age: ${player.age}`;

  const nationality = document.createElement('p');
  nationality.textContent = `Nationality: ${player.nationality}`;

  const credit = document.createElement('p');
  credit.className = 'player-credit';
  credit.textContent = player.image_credit;
  
  detailsContainer.appendChild(img);
  detailsContainer.appendChild(name);
  detailsContainer.appendChild(club);
  detailsContainer.appendChild(position);
  detailsContainer.appendChild(rating);
  detailsContainer.appendChild(age);
  detailsContainer.appendChild(nationality);
  detailsContainer.appendChild(credit);

  modal.classList.remove('hidden');
}

const evaluateTeamBtn = document.getElementById('evaluateTeamBtn');

// Remove magic numbers: https://medium.com/coding-beauty/avoid-magic-numbers-dcb7fff5784b
evaluateTeamBtn.addEventListener('click', () => {
  const fullTeamSize = 6;
  if(selectedPlayerSet.size < fullTeamSize) {
    alert(`Please select ${fullTeamSize} players!`);
    return;
  }
  let totalRating = 0;

  selectedPlayerSet.forEach(playerName => {
    const findPlayerObject = allPlayers.find(p => p.name === playerName);
    totalRating += findPlayerObject.rating;
  });
  const decimalPlaces = 1;
  const averageRating = (totalRating / fullTeamSize).toFixed(decimalPlaces);
  const bottomTierMaximum = 86;
  const midTierMaximum = 88;
  if (averageRating < bottomTierMaximum) {
    alert(` Your squad has potential! Average Rating: ${averageRating}`);
    return;
  }else if (averageRating < midTierMaximum) {
    alert(`⭐️ That's a nice squad you've put together! Average Rating: ${averageRating}`);
    return;
  }
  alert(`🏆 Wow! That team is stacked! Average Rating: ${averageRating}`);
});

evaluateTeamBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  evaluateTeamBtn.click();
});