// helpers/buildPlayerCard.js
export function buildPlayerEntry(player) {
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
    club.className = 'player-meta';
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
  