/**
 * Main JavaScript for FilmLane Website
 */

'use strict';

/**
 * Navbar toggle functionality
 */
const navbar = document.querySelector('[data-navbar]');
const navbarLinks = document.querySelectorAll('[data-nav-link]');
const menuOpenBtn = document.querySelector('[data-menu-open-btn]');
const menuCloseBtn = document.querySelector('[data-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const navElemArr = [menuOpenBtn, menuCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener('click', function () {
      navbar.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.classList.toggle('nav-active');
    });
  }
};

navToggleEvent(navElemArr);

/**
 * Close navbar when clicking on any navbar link
 */
for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener('click', function () {
    navbar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('nav-active');
  });
}

/**
 * Header scroll event
 */
const header = document.querySelector('[data-header]');

window.addEventListener('scroll', function () {
  if (window.scrollY >= 10) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
});

/**
 * Go to top functionality
 */
const goTopBtn = document.querySelector('[data-go-top]');

window.addEventListener('scroll', function () {
  if (window.scrollY >= 500) {
    goTopBtn.classList.add('active');
  } else {
    goTopBtn.classList.remove('active');
  }
});

/**
 * Movie filter functionality
 */
const filterBtns = document.querySelectorAll('[data-filter]');
const movieCards = document.querySelectorAll('[data-category]');

const filterMovies = function (selectedCategory) {
  for (let i = 0; i < movieCards.length; i++) {
    const movieCategory = movieCards[i].getAttribute('data-category');
    
    if (selectedCategory === 'all' || movieCategory === selectedCategory) {
      movieCards[i].parentElement.style.display = 'block';
      movieCards[i].parentElement.classList.add('fade-in');
    } else {
      movieCards[i].parentElement.style.display = 'none';
      movieCards[i].parentElement.classList.remove('fade-in');
    }
  }
};

// Add event listeners to filter buttons
for (let i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener('click', function () {
    const selectedCategory = this.getAttribute('data-filter');
    
    // Remove active class from all buttons
    for (let j = 0; j < filterBtns.length; j++) {
      filterBtns[j].classList.remove('active');
    }
    
    // Add active class to clicked button
    this.classList.add('active');
    
    // Filter movies
    filterMovies(selectedCategory);
  });
}

/**
 * Search functionality
 */
const searchBtn = document.querySelector('.search-btn');
const searchOverlay = document.createElement('div');
const searchContainer = document.createElement('div');
const searchInput = document.createElement('input');
const searchResults = document.createElement('div');
const closeSearchBtn = document.createElement('button');

// Create search overlay
searchOverlay.className = 'search-overlay';
searchContainer.className = 'search-container';
searchInput.className = 'search-input';
searchInput.type = 'text';
searchInput.placeholder = 'Search movies, TV shows...';
searchResults.className = 'search-results';
closeSearchBtn.className = 'search-close-btn';
closeSearchBtn.innerHTML = '<ion-icon name="close-outline"></ion-icon>';

searchContainer.appendChild(closeSearchBtn);
searchContainer.appendChild(searchInput);
searchContainer.appendChild(searchResults);
searchOverlay.appendChild(searchContainer);
document.body.appendChild(searchOverlay);

// Search overlay styles
const searchStyles = `
  .search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .search-overlay.active {
    opacity: 1;
    visibility: visible;
  }
  
  .search-container {
    background: var(--gunmetal-2);
    padding: 2rem;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    position: relative;
  }
  
  .search-close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: var(--white);
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  .search-close-btn:hover {
    color: var(--citrine);
  }
  
  .search-input {
    width: 100%;
    padding: 1rem;
    background: var(--eerie-black);
    border: 2px solid var(--gunmetal-1);
    border-radius: 8px;
    color: var(--white);
    font-size: 1rem;
    margin-bottom: 1rem;
    transition: border-color 0.3s ease;
  }
  
  .search-input:focus {
    outline: none;
    border-color: var(--citrine);
  }
  
  .search-results {
    max-height: 300px;
    overflow-y: auto;
  }
  
  .search-result-item {
    padding: 0.75rem;
    border-bottom: 1px solid var(--gunmetal-1);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .search-result-item:hover {
    background: var(--gunmetal-1);
  }
  
  .search-result-item:last-child {
    border-bottom: none;
  }
`;

// Add search styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = searchStyles;
document.head.appendChild(styleSheet);

// Search functionality
searchBtn.addEventListener('click', function () {
  searchOverlay.classList.add('active');
  searchInput.focus();
});

closeSearchBtn.addEventListener('click', function () {
  searchOverlay.classList.remove('active');
  searchInput.value = '';
  searchResults.innerHTML = '';
});

searchOverlay.addEventListener('click', function (e) {
  if (e.target === searchOverlay) {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
  }
});

// Simple search implementation
const movieData = [
  { title: 'Doctor Strange in the Multiverse of Madness', url: './movie-details.html?movie=doctor-strange' },
  { title: 'The Northman', url: './movie-details.html?movie=northman' },
  { title: 'Memory', url: './movie-details.html?movie=memory' },
  { title: 'The Unbearable Weight of Massive Talent', url: './movie-details.html?movie=talent' }
];

searchInput.addEventListener('input', function () {
  const query = this.value.toLowerCase().trim();
  searchResults.innerHTML = '';
  
  if (query.length > 0) {
    const filteredMovies = movieData.filter(movie => 
      movie.title.toLowerCase().includes(query)
    );
    
    if (filteredMovies.length > 0) {
      filteredMovies.forEach(movie => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.textContent = movie.title;
        resultItem.addEventListener('click', function () {
          window.location.href = movie.url;
        });
        searchResults.appendChild(resultItem);
      });
    } else {
      const noResults = document.createElement('div');
      noResults.className = 'search-result-item';
      noResults.textContent = 'No results found';
      noResults.style.color = 'var(--gray-x)';
      searchResults.appendChild(noResults);
    }
  }
});

/**
 * Smooth scrolling for anchor links
 */
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

/**
 * Lazy loading for images
 */
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('loading');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => {
  imageObserver.observe(img);
});

/**
 * Form validation for CTA section
 */
const ctaForm = document.querySelector('.cta-form');
const emailField = document.querySelector('.email-field');

if (ctaForm) {
  ctaForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const email = emailField.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      showNotification('Please enter your email address', 'error');
      return;
    }
    
    if (!emailRegex.test(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Simulate form submission
    showNotification('Thank you for subscribing!', 'success');
    emailField.value = '';
  });
}

/**
 * Notification system
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add notification styles
  const notificationStyles = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 1001;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    }
    
    .notification-success {
      background: #10b981;
    }
    
    .notification-error {
      background: #ef4444;
    }
    
    .notification-info {
      background: #3b82f6;
    }
    
    .notification.show {
      transform: translateX(0);
    }
  `;
  
  if (!document.querySelector('#notification-styles')) {
    const notificationStyleSheet = document.createElement('style');
    notificationStyleSheet.id = 'notification-styles';
    notificationStyleSheet.textContent = notificationStyles;
    document.head.appendChild(notificationStyleSheet);
  }
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

/**
 * Initialize everything when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function () {
  // Add fade-in animation to elements
  const animatedElements = document.querySelectorAll('.movie-card, .service-card');
  
  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, {
    threshold: 0.1
  });
  
  animatedElements.forEach(el => {
    elementObserver.observe(el);
  });
  
  // Set first filter button as active by default
  const firstFilterBtn = document.querySelector('[data-filter="all"]');
  if (firstFilterBtn) {
    firstFilterBtn.classList.add('active');
  }
  
  console.log('FilmLane website initialized successfully!');
});