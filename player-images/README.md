# README.md

## 👋 Welcome to Bobby Bogan's Page

This document outlines my personal journey and technical implementation for an important project. It serves both as a reference for reviewers and a learning journal for myself.

---

## ✅ Step 1: Cloning the Repository

**Repo URL:** [https://github.com/correctURL](https://github.com/correctURL)

```bash
# In VS Code Terminal or external terminal
git clone the repo
cd into-your-directory
```

---

## 🔧 Step 2: Setting Up the Environment

### Using Five Server (Preferred for this Project)

1. Open the project folder in **VS Code**.
2. Install the **Five Server** extension:
   - Go to Extensions (Ctrl+Shift+X)
   - Search for `Five Server`
   - Click **Install**
3. Right-click `index.html` → `Open with Five Server`

### Why Five Server?

- Faster reloads.
- Multi-device testing (e.g., view on phone + laptop).
- Built-in browser DevTools overlay.

---

## 🧠 Step 3: Planning the Project

> _"Plan before you code"_ — Advice I'm taking to heart!

- Revisited my earlier web dev studies:
  - [My ColtSteelePractice HTML/CSS/JS archive](https://rabogan.github.io/ColtSteelePractice/index.html)

- Project Theme: **Co-Ed Dream Team – Fantasy Squad Builder**
  - 6-a-side format: 1 GKP, 2 DEF, 1 MID, 2 ATT
  - Inspired by Premier League Fantasy UI and built with responsive mobile design in mind

- Dataset Source:
  - **EA Sports FC 25: Ratings and Stats** by [Davis Nyagami on Kaggle](https://www.kaggle.com/datasets/nyagami/ea-sports-fc-25-database-ratings-and-stats?resource=download)
  - Top 20 men and 10 women from Real Madrid (M/W) and Arsenal (M/W)
  - JSON + CSV versions maintained
  - Images sourced from Wikimedia Commons and stored in `/player-images/`
  - Attribution saved in `images/credits.txt`

---

## 🛠️ Step 4: Building the Project (Work in Progress)

### Key Milestones Reached

✅ Player cards designed and tested  
✅ Pitch layout created using Flexbox  
✅ Mobile responsiveness implemented  
✅ All player data loaded from JSON  
✅ Info (`ℹ️`) buttons open a player modal  
✅ Modal includes player image, stats, and attribution  
✅ Clicking outside the modal or pressing "X" closes it  
✅ Modal now uses smooth fade-in/fade-out transitions  
✅ Team circle indicators (red/white/gray) added with styling  
✅ Player list adjusted for mobile and desktop width balance  
✅ Finalized player layout for pitch + sidebar  
✅ Removed unnecessary placeholders and debug test output

---

### Data Structure

Each player object in `player_dataset.json` includes:

- `name`
- `position`
- `rating`
- `age`
- `nationality`
- `club`
- `gender`
- `player_image`
- `image_credit`

---

### Layout

- Main layout includes:
  - Pitch panel (green background) with 6 slot areas
  - Player list panel with dropdown filters and player entries
  - Responsive behavior on phones: player list stacks below pitch

- Player entries:
  - ℹ️ info button to trigger modal
  - Colored team circle and name
  - Compact rating display

---

### Interactivity

- Fully functional modal:
  - Displays player image, club, position, rating, nationality, age, and image credit
  - Close on "X" or clicking outside
  - Supports both mouse and touch devices

- Player list populated from `player_dataset.json`
- Team colors shown via circle icons

---

## 📓 Notes & Learnings

- Reviewed DOM creation and manipulation with JavaScript
- Improved styling and layout consistency across screen sizes
- Converted large dataset into filtered, readable JSON
- Image credits handled responsibly (Wikimedia-compatible)
- Practiced progressive enhancement with JS + CSS
- Modular build kept clean for CI/CD push visibility

---

## 🗺️ To Do (Updated)

- [x] Create and add favicon (soccer ball themed)
- [x] Credit Kaggle dataset in README
- [x] Include ARIA labels + accessibility hints
- [x] Store and organize local player images in `player-images/`
- [x] Replace PNG image use with `.jpg` convention
- [x] Confirm naming consistency across all data formats
- [x] Convert final dataset from CSV → JSON
- [x] Implement full player modal
- [x] Optimize pitch and player panel layout for all devices
- [ ] Filter logic (club, gender, position)
- [ ] Sorting by rating and/or age
- [ ] Search bar logic (case-insensitive match on name)
- [ ] Player selection and assignment to pitch
- [ ] Add drag/drop or "Select" functionality to slots

---

### 🧑‍💻 Author

**Bobby Bogan**