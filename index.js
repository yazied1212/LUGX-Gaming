const trendingGames = [
  {
    img: "images/trending-01.jpg",
    genre: "Action / RPG",
    title: "Assassin's Creed",
  },
  {
    img: "images/trending-02.jpg",
    genre: "Open World",
    title: "Cyberpunk 2077",
  },
  { img: "images/trending-03.jpg", genre: "Adventure", title: "God of War" },
  { img: "images/trending-04.jpg", genre: "Dark Fantasy", title: "Elden Ring" },
];

const mostPlayedGames = [
  { img: "images/top-game-01.jpg", genre: "Action", title: "Assassin's Creed" },
  {
    img: "images/top-game-02.jpg",
    genre: "Open World",
    title: "Cyberpunk 2077",
  },
  { img: "images/top-game-03.jpg", genre: "Adventure", title: "God of War" },
  { img: "images/top-game-04.jpg", genre: "Fantasy", title: "Elden Ring" },
  { img: "images/top-game-05.jpg", genre: "Shooter", title: "Halo Infinite" },
  { img: "images/top-game-06.jpg", genre: "RPG", title: "The Witcher 3" },
];

const categories = [
  { genre: "Action", img: "images/categories-01.jpg" },
  { genre: "RPG", img: "images/categories-02.jpg" },
  { genre: "Adventure", img: "images/categories-03.jpg" },
  { genre: "Shooter", img: "images/categories-04.jpg" },
  { genre: "Strategy", img: "images/categories-05.jpg" },
];

/* ================================================================
   2. HELPER FUNCTIONS
   ================================================================ */

// Function: create a DOM element with class name
function createElement(tag, className) {
  let el = document.createElement(tag);
  if (className) el.className = className;
  return el;
}

// Function: set the current year in footer elements
function setFooterYear() {
  let year = new Date().getFullYear();
  // for loop to update all footer year spans
  let yearSpans = document.querySelectorAll("#footerYear");
  for (let i = 0; i < yearSpans.length; i++) {
    yearSpans[i].textContent = String(year); // Type Conversion: Number → String
  }
}

/* ================================================================
   3. RENDER TRENDING CARDS (for loop + DOM)
   ================================================================ */

function renderTrendingCards() {
  let container = document.getElementById("trendingCard");
  if (!container) return; // guard (&&-style short-circuit)

  // for loop
  for (let i = 0; i < trendingGames.length; i++) {
    let game = trendingGames[i];

    // نعمل div جديد ونحط فيه الـ HTML مرة واحدة
    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML =
      '<img src="' +
      game.img +
      '" alt="' +
      game.title +
      '">' +
      '<div class="cardInfo">' +
      '<div class="cardName">' +
      "<p>" +
      game.genre +
      "</p>" +
      "<h3>" +
      game.title +
      "</h3>" +
      "</div>" +
      '<a href="#" class="icon">' +
      '<img src="images/online-shopping.png" alt="Buy ' +
      game.title +
      '">' +
      "</a>" +
      "</div>";

    container.appendChild(card);
  }
}

/* ================================================================
   4. RENDER MOST-PLAYED CARDS (while loop + DOM)
   ================================================================ */

function renderMostPlayedCards() {
  let container = document.getElementById("mostCards");
  if (!container) return;

  let i = 0;
  // while loop
  while (i < mostPlayedGames.length) {
    let game = mostPlayedGames[i];

    // break: skip index 99 (never triggers here, demonstrates break)
    if (i === 99) break;

    // continue: skip any game whose title is empty (defensive)
    if (!game.title) {
      i++;
      continue;
    }

    // Ternary (?) – is this a premium game?
    let isPremium = i < 2 ? true : false;

    // نعمل الكارد بـ innerHTML مرة واحدة
    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML =
      '<div class="cardImg">' +
      '<img src="' +
      game.img +
      '" alt="' +
      game.title +
      '">' +
      "</div>" +
      '<div class="cardInfo">' +
      '<p class="genre">' +
      game.genre +
      "</p>" +
      '<h3 class="cardName">' +
      game.title +
      "</h3>" +
      '<button class="btn">Explore</button>' +
      "</div>";

    // Logical operator &&: add premium class only if needed
    isPremium && card.classList.add("premiumCard");

    // Arrow function on the Explore button
    card.querySelector(".btn").addEventListener("click", () => {
      alert("🎮 Exploring: " + game.title + "\nGenre: " + game.genre);
    });

    container.appendChild(card);
    i++;
  }
}

/* ================================================================
   5. RENDER CATEGORY CARDS (do…while loop + DOM)
   ================================================================ */

function renderCategoryCards() {
  let container = document.getElementById("categoryCards");
  if (!container) return;

  let j = 0;
  // do…while loop
  do {
    let cat = categories[j];
    let card = createElement("div", "card");

    let genreDiv = createElement("div", "genre");
    genreDiv.textContent = cat.genre;

    let imgDiv = createElement("div", "cardImg");
    let img = createElement("img");
    img.src = cat.img;
    img.alt = cat.genre;

    imgDiv.appendChild(img);
    card.appendChild(genreDiv);
    card.appendChild(imgDiv);
    container.appendChild(card);

    j++;
  } while (j < categories.length);
}

/* ================================================================
   6. SEARCH FUNCTIONALITY (Type Conversion + Conditions + DOM)
   ================================================================ */

function initSearch() {
  let searchInput = document.getElementById("searchInput");
  let searchBtn = document.getElementById("searchBtn");
  let searchResult = document.getElementById("searchResult");

  if (!searchBtn || !searchInput || !searchResult) return;

  // Arrow function as event handler
  searchBtn.addEventListener("click", () => {
    let query = searchInput.value; // raw string from DOM

    // Type Conversion: String → Boolean (truthy check)
    let hasQuery = Boolean(query.trim());

    // Condition with logical operator !
    if (!hasQuery) {
      searchResult.style.color = "#ff6b6b";
      searchResult.textContent = "⚠️ Please type a game name first!";
      return;
    }

    // Comparisons + logical operator ||
    let queryLower = query.toLowerCase();
    let found = false;
    let foundGame = null;

    // for loop to search through all game lists
    let allGames = trendingGames.concat(mostPlayedGames);
    for (let k = 0; k < allGames.length; k++) {
      let gameName = allGames[k].title.toLowerCase();

      // Comparison using includes
      if (gameName.includes(queryLower)) {
        found = true;
        foundGame = allGames[k];
        break; // break – no need to keep searching
      }
    }

    // Ternary operator (non-traditional use of ?)
    searchResult.style.color = found ? "#4cff91" : "#ff6b6b";
    searchResult.textContent = found
      ? "✅ Found: " + foundGame.title + " (" + foundGame.genre + ")"
      : '❌ "' + query + '" not found. Try another game!';

    // Clear input after search
    searchInput.value = "";
  });

  // Allow pressing Enter to search
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") searchBtn.click();
  });
}

/* ================================================================
   7. VISIT COUNTER (localStorage + Type Conversion)
   ================================================================ */

function updateVisitCounter() {
  let visitMsg = document.getElementById("visitMsg");
  if (!visitMsg) return;

  // Type Conversion: String (localStorage) → Number
  let rawCount = localStorage.getItem("lugxVisits") || "0";
  let visitCount = Number(rawCount) + 1;

  // Save back as String
  localStorage.setItem("lugxVisits", String(visitCount));

  // Ternary + Comparison
  let label =
    visitCount === 1
      ? "🎮 Welcome! This is your first visit to LUGX Gaming."
      : "🎮 Welcome back! You have visited " + visitCount + " times.";

  visitMsg.textContent = label;
}

/* ================================================================
   8. HAMBURGER MENU TOGGLE (DOM + Conditions + Logical Operator)
   ================================================================ */

function initHamburgerMenu() {
  let toggleBtn = document.getElementById("menuToggle");
  let navLinks = document.getElementById("headerLinks");

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", function () {
    // Logical operator !: flip the open state
    let isOpen = navLinks.classList.contains("open");
    isOpen ? navLinks.classList.remove("open") : navLinks.classList.add("open");
  });
}

/* ================================================================
   9. SIGN-IN MODAL (DOM + Conditions + Loops + Type Conversion)
   ================================================================ */

// Hardcoded users – in a real project this would be from a server
let validUsers = [
  { username: "admin", password: "1234" },
  { username: "gamer", password: "lugx" },
  { username: "player", password: "play" },
];

function initSignInModal() {
  let signInBtns = document.querySelectorAll("#signInBtn");
  let overlay = document.getElementById("modalOverlay");
  let closeBtn = document.getElementById("modalClose");
  let submitBtn = document.getElementById("modalSubmit");
  let modalMsg = document.getElementById("modalMsg");

  if (!overlay) return;

  // for loop over all sign-in buttons (header might repeat on mobile)
  for (let s = 0; s < signInBtns.length; s++) {
    signInBtns[s].addEventListener("click", function () {
      overlay.classList.add("active");
    });
  }

  // Close on overlay background click
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) overlay.classList.remove("active");
  });

  closeBtn &&
    closeBtn.addEventListener("click", function () {
      overlay.classList.remove("active");
    });

  // Login submit
  submitBtn &&
    submitBtn.addEventListener("click", function () {
      let username = document.getElementById("modalUsername").value.trim();
      let password = document.getElementById("modalPassword").value;

      // Type Conversion: Boolean – check if fields are filled
      let isValid = Boolean(username) && Boolean(password);

      if (!isValid) {
        modalMsg.style.color = "#ff6b6b";
        modalMsg.textContent = "⚠️ Please fill in both fields.";
        return;
      }

      let loggedIn = false;
      // for loop to check credentials
      for (let u = 0; u < validUsers.length; u++) {
        // Comparison ===
        if (
          validUsers[u].username === username &&
          validUsers[u].password === password
        ) {
          loggedIn = true;
          break;
        }
      }

      // Condition + ternary
      if (loggedIn) {
        modalMsg.style.color = "#4cff91";
        modalMsg.textContent = "✅ Welcome, " + username + "! Redirecting…";
        // Close modal after 1.5s
        setTimeout(function () {
          overlay.classList.remove("active");
          modalMsg.textContent = "";
        }, 1500);
      } else {
        modalMsg.style.color = "#ff6b6b";
        // Non-traditional ?: used to build message
        modalMsg.textContent = !username
          ? "⚠️ Username is required."
          : "❌ Wrong username or password.";
      }
    });
}

/* ================================================================
   10. CONTACT FORM VALIDATION (contactUs.html)
        Conditions, Type Conversions, Loops, DOM
   ================================================================ */

function initContactForm() {
  let sendBtn = document.getElementById("sendBtn");
  let formFeedback = document.getElementById("formFeedback");

  if (!sendBtn) return;

  sendBtn.addEventListener("click", function () {
    let name = document.getElementById("contactName").value.trim();
    let email = document.getElementById("contactEmail").value.trim();
    let ageRaw = document.getElementById("contactAge").value;
    let msg = document.getElementById("contactMsg").value.trim();

    // Type Conversion: String → Number
    let age = Number(ageRaw);

    // Build array of validation rules to loop through
    let errors = [];

    // Condition with logical operator !
    if (!name) errors.push("Name is required.");
    if (!email || !email.includes("@"))
      errors.push("A valid email is required.");

    // Comparison + Type Conversion Boolean
    if (!Boolean(ageRaw) || age < 5 || age > 120)
      errors.push("Please enter a valid age (5–120).");
    if (!msg) errors.push("Message cannot be empty.");

    if (errors.length > 0) {
      formFeedback.style.color = "#ff6b6b";

      // while loop to build error string
      let errorText = "";
      let ei = 0;
      while (ei < errors.length) {
        errorText += "⚠️ " + errors[ei];
        // continue equivalent: append separator only if not last
        if (ei < errors.length - 1) errorText += "  |  ";
        ei++;
      }
      formFeedback.textContent = errorText;
      return;
    }

    // All good – show success using ternary
    let isAdult = age >= 18;
    let ageNote = isAdult
      ? "You are an adult gamer 🎮"
      : "Young gamer detected 🕹️";

    formFeedback.style.color = "#4cff91";
    formFeedback.textContent =
      "✅ Message sent, " +
      name +
      "! " +
      ageNote +
      " We'll reply to " +
      email +
      " soon.";

    // Reset fields using for loop
    let fields = ["contactName", "contactEmail", "contactAge", "contactMsg"];
    for (let fi = 0; fi < fields.length; fi++) {
      let el = document.getElementById(fields[fi]);
      if (el) el.value = "";
    }
  });
}

/* ================================================================
   11. "VIEW ALL" BUTTONS – confirm dialog (Interactive Functions)
   ================================================================ */

function initViewAllButtons() {
  let trendingAllBtn = document.getElementById("viewAllTrending");
  let mostAllBtn = document.getElementById("viewAllMost");

  // Arrow function assigned to letiable
  let handleViewAll = (section) => {
    // confirm() – interactive function
    let confirmed = confirm("Do you want to see all " + section + " games?");
    // Logical operator &&
    confirmed &&
      alert("🚀 Loading all " + section + " games… (Feature coming soon!)");
  };

  trendingAllBtn &&
    trendingAllBtn.addEventListener("click", () => handleViewAll("Trending"));
  mostAllBtn &&
    mostAllBtn.addEventListener("click", () => handleViewAll("Most Played"));
}

/* ================================================================
   12. SCROLL ANIMATION – IntersectionObserver (bonus polish)
   ================================================================ */

function initScrollReveal() {
  let cards = document.querySelectorAll(".card");

  // for loop over NodeList
  for (let ci = 0; ci < cards.length; ci++) {
    cards[ci].style.opacity = "0";
    cards[ci].style.transform = "translateY(30px)";
    cards[ci].style.transition = "opacity 0.5s ease, transform 0.5s ease";
  }

  let observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  // while loop to observe
  let oi = 0;
  while (oi < cards.length) {
    observer.observe(cards[oi]);
    oi++;
  }
}

/* ================================================================
   13. MAIN INIT — runs after DOM is fully loaded
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {
  // Set footer year
  setFooterYear();

  // Render dynamic card sections
  renderTrendingCards();
  renderMostPlayedCards();
  renderCategoryCards();

  // Init interactive features
  initSearch();
  updateVisitCounter();
  initHamburgerMenu();
  initSignInModal();
  initContactForm();
  initViewAllButtons();

  // Scroll reveal after cards are rendered
  initScrollReveal();
});
