# ⚽️ Co-Ed Fantasy Football Selector

This is my personal submission for the **Snap Engineering Academy Stage 2 - Data Catalog Project**, themed around real-world football matchups and inspired by Premier League Fantasy UI design.

The project uses structured player data, HTML/CSS for design, and **vanilla JavaScript** for all interactivity — in full accordance with SEA guidelines.

---

## 🏁 Project Setup Steps

### ✅ Step 1: Repository Creation
- GitHub Repo: [rabogan/coed-fantasy-football](https://github.com/rabogan/coed-fantasy-football)
- Created from the SEA Stage 2 template using the "Use this template" button.

### ✅ Step 2: Local Environment
```bash
# Clone locally and enter the folder
git clone https://github.com/rabogan/coed-fantasy-football.git
cd coed-fantasy-football
```

### ✅ Step 3: First Browser Test
- Opened the folder in VS Code.
- Launched `index.html` in the browser.
- Confirmed initial rendering and layout from starter files.

### ✅ Step 4: Deployment
- Deployed live using **GitHub Pages**.
- 🔗 Live Site: [https://rabogan.github.io/coed-fantasy-football](https://rabogan.github.io/coed-fantasy-football)

---

## 🎨 Theme: Co-Ed Dream Team – Fantasy Football Selector
- Based on **Real Madrid** and **Arsenal** (Men & Women squads).
- Launching during a week when the real-life teams (men and women) are playing each other in the **UEFA Champions League**.
- Inspired by fantasy football games, with a 6-a-side **co-ed twist**.
- Layout includes a visual football pitch and sortable player catalog.
![Fantasy Football Website](images/fantasy-football-website.png)

---

## 🗂️ Data & Assets

### 📦 Data Structure
Player data lives in `player_dataset.json`, structured as an array of objects. Each player includes:
- `name`, `rating`, `position`, `age`, `club`, `nationality`, `gender`, `player_image`, and `image_credit`

### 🖼 Images
- Player images from **Wikimedia Commons**, saved to `player-images/`
- Citations and licenses listed in `images/credits.txt`

### 🔗 Sources
- **Favicon** from: [Soccer icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/soccer)
- **Dataset**: [EA Sports FC 25: Ratings and Stats](https://www.kaggle.com/datasets/nyagami/ea-sports-fc-25-database-ratings-and-stats?resource=download)
  - Top 20 male and top 10 female players from each club.
  - Gender labels and image references were added manually.

### 📎 Footer Credit
```html
<footer>
  <p>Built using open data from David Nyagami's EA Sports FC 25 <a href="https://www.kaggle.com/datasets/nyagami/ea-sports-fc-25-database-ratings-and-stats?resource=download">Kaggle dataset</a> and credited images from Wikimedia Commons</p>
  <p><a href="https://www.flaticon.com/free-icons/soccer" target="_blank" rel="noopener noreferrer">Soccer icons by Freepik – Flaticon</a></p>
  <p style="font-size: 0.8rem; color: #bbb;">This project coincides with Arsenal and Real Madrid (Men & Women) meeting in the UEFA Champions League — and reflects Snap's mission of creative, data-driven storytelling.</p>
</footer>
```

---

## 🧩 Feature Roadmap (MVP Goals)
1. **HTML/CSS Layout**
   - Custom formation layout (2-1-2) over a football pitch.
   - Sidebar for the player list (filterable/sortable).

2. **Rendering**
   - Display player cards using `player_dataset.json`.
   - Implement modal-style detail view.

3. **Filtering & Sorting**
   - Filter players by club, gender, and position.
   - Sort by rating or alphabetical order.

4. **Player Selection Logic**
   - Select up to 6 players.
   - Cards color-coded by club.

---

## 🌟 Future Enhancements
- **Form Uploads for Local Clubs** (expansion idea)
- **Change Formations**
- **Drag-and-Drop Positioning**
- **Expanded Dataset with More Teams & Legends**
- **Dark Mode and Alternate Formations**
- **Save & Share Team (as JSON/image)**

---

## 📸 Milestone Progress
### Milestone 1: Initial Layout Complete
![Update 1 Screenshot](images/update-1.png)
- Pitch view, club dropdown, and CSS theme are now in place.
- Structural transformation from LA TV Shows template to football-centric UI.

---

## 📄 License
See the [LICENSE](LICENSE) file for licensing details.

---

## 📓 Personal Notes
This README is updated regularly to track decisions, progress, and ideas.

