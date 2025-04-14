// I studied some of the Colt Steele course on Udemy...but prefer React!
// https://rabogan.github.io/ColtSteelePractice/javascriptSection/javascriptDOMIntro.html

// Better resources (suggested by AI):
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
// https://javascript.info/custom-elements

// Fetching my JSON data
fetch('player_dataset.json')
  .then(response => response.json())
  .then(data => {
    console.log("JSON Player Data Loaded Successfully!");
    const allPlayers = data;
    renderPlayer(allPlayers); // Call the function to render the player data
  })
  .catch(error => {
    console.error("Error loading JSON:", error);
  });

  // This can handle every player entry (rather than player card, which will come next)
  function renderPlayer(allPlayers) {
    const playerDiv = document.getElementById('playerList');
    playerDiv.innerHTML = '';

    allPlayers.forEach(player => {
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
  
    playerDiv.appendChild(playerEntry);
  });
}
  