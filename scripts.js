// I studied some of the Colt Steele course on Udemy...but prefer React!
// https://rabogan.github.io/ColtSteelePractice/javascriptSection/javascriptDOMIntro.html

// Fetching my JSON data
fetch('player_dataset.json')
  .then(response => response.json())
  .then(data => {
    console.log("JSON Player Data Loaded Successfully!");
    const player = data[0]; // Mbappe is the first player in the dataset
    console.log(player); // Log the player object to the console
  })
  .catch(error => {
    console.error("Error loading JSON:", error);
  });

