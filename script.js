/* =========================
   LIVE TIME DISPLAY
   ========================= */

function updateLiveTime() {
  // Get current UTC time
  const now = new Date();
  
  // Define time zones (GMT offsets in hours)
  const timeZones = {
    la: -8,        // Los Angeles (PST = GMT-8, PDT = GMT-7)
    nairobi: 3,    // Nairobi (EAT = GMT+3)
    delhi: 5.5     // Delhi (IST = GMT+5:30)
  };
  
  // Calculate local time for each city
  Object.entries(timeZones).forEach(([city, offset]) => {
    // Create a new date offset by the GMT difference
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const localTime = new Date(utcTime + (offset * 3600000));
    
    // Format time as HH:MM
    const hours = String(localTime.getHours()).padStart(2, '0');
    const minutes = String(localTime.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    // Update the corresponding element
    const element = document.getElementById(city);
    if (element) {
      element.textContent = timeString;
    }
  });
}

// Update time immediately when page loads
updateLiveTime();

// Update time every second
setInterval(updateLiveTime, 1000);

/* =========================
   SCROLLING HEADLINES TICKER
   ========================= */

const headlines = [
  "Global water access initiatives expand in Sub-Saharan Africa",
  "UNICEF reports 771M children lack safe drinking water",
  "New water purification technology reduces contaminants by 99%",
  "WHO: Clean water access improves health outcomes globally",
  "Community water projects empower rural women leaders",
  "Groundwater depletion accelerates in agricultural regions",
  "International conference tackles water scarcity solutions",
  "Solar-powered water systems transform communities worldwide"
];

function initScrollingTicker() {
  const tickerContent = document.getElementById('ticker-content');
  if (!tickerContent) return;

  // Clear existing content
  tickerContent.innerHTML = '';

  // Create headline items - repeat for seamless scrolling
  const displayHeadlines = [...headlines, ...headlines];
  displayHeadlines.forEach(headline => {
    const item = document.createElement('span');
    item.className = 'ticker-item';
    item.textContent = headline;
    tickerContent.appendChild(item);
  });

  // Reset animation when it ends for seamless loop
  tickerContent.addEventListener('animationend', () => {
    tickerContent.style.animation = 'none';
    setTimeout(() => {
      tickerContent.style.animation = 'scroll-left 60s linear infinite';
    }, 10);
  });
}

/* =========================
   LIVE CONTEXT BUTTONS
   ========================= */

const contextLinks = [
  {
    text: "Water crises updates - UNHCR",
    url: "https://www.unhcr.org"
  },
  {
    text: "Freshwater conservation - Greenpeace",
    url: "https://www.greenpeace.org"
  },
  {
    text: "Water & sanitation news - WHO",
    url: "https://www.who.int"
  },
  {
    text: "Global water initiatives - UNICEF",
    url: "https://www.unicef.org"
  }
];

function initContextButtons() {
  const contextContainer = document.getElementById('context-buttons');
  if (!contextContainer) return;

  // Clear existing content
  contextContainer.innerHTML = '';

  // Add buttons for each context link
  contextLinks.forEach(link => {
    const button = document.createElement('button');
    button.className = 'frutiger-aero-button';
    button.textContent = link.text;
    button.addEventListener('click', () => {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    });
    contextContainer.appendChild(button);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initScrollingTicker();
  initContextButtons();
});
