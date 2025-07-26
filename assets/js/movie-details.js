/**
 * Movie Details JavaScript
 */

'use strict';

/**
 * Movie data
 */
const movieDatabase = {
  'doctor-strange': {
    title: 'Doctor Strange in the Multiverse of Madness',
    subtitle: 'New Episodes',
    poster: './assets/images/doctor-strange-in-the-multiverse-of-madness.jpg',
    background: './assets/images/Strange.jpg',
    rating: 'PG-13',
    quality: '4K',
    genres: ['Action', 'Adventure', 'Fantasy'],
    year: '2022',
    duration: '126 min',
    storyline: 'Dr. Stephen Strange casts a forbidden spell that opens the doorway to the multiverse, including alternate versions of himself, whose threat to humanity is too great for the combined forces of Strange, Wong, and Wanda Maximoff.',
    imdbRating: '7.3'
  },
  'northman': {
    title: 'The Northman',
    subtitle: 'Epic Viking Saga',
    poster: './assets/images/The Northman.jpg',
    background: './assets/images/northman.jpg',
    rating: 'R',
    quality: '4K',
    genres: ['Action', 'Adventure', 'Drama'],
    year: '2022',
    duration: '137 min',
    storyline: 'From visionary director Robert Eggers comes The Northman, an action-filled epic that follows a young Viking prince on his quest to avenge his father\'s murder.',
    imdbRating: '7.0'
  },
  'memory': {
    title: 'Memory',
    subtitle: 'Action Thriller',
    poster: './assets/images/memory1.jpg',
    background: './assets/images/memory.jpg',
    rating: 'R',
    quality: 'HD',
    genres: ['Action', 'Crime', 'Thriller'],
    year: '2022',
    duration: '114 min',
    storyline: 'An assassin-for-hire finds that he\'s the target of a hit, which prompts him to take on his client to clear his name.',
    imdbRating: '5.3'
  },
  'talent': {
    title: 'The Unbearable Weight of Massive Talent',
    subtitle: 'Comedy Adventure',
    poster: './assets/images/talent.jpg',
    background: './assets/images/tt.jpg',
    rating: 'R',
    quality: 'HD',
    genres: ['Action', 'Comedy', 'Crime'],
    year: '2022',
    duration: '107 min',
    storyline: 'Moviestar Nick Cage is channeling his iconic characters as he\'s caught between a superfan and a CIA agent.',
    imdbRating: '6.1'
  }
};

/**
 * Get movie ID from URL parameters
 */
function getMovieIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('movie');
}

/**
 * Load movie details
 */
function loadMovieDetails() {
  const movieId = getMovieIdFromUrl();
  const movie = movieDatabase[movieId];
  
  if (!movie) {
    // Redirect to home if movie not found
    window.location.href = './index.html';
    return;
  }
  
  // Update page title
  document.title = `${movie.title} - FilmLane`;
  
  // Update movie detail section background
  const movieDetailSection = document.querySelector('.movie-detail');
  movieDetailSection.style.backgroundImage = `url('${movie.background}')`;
  
  // Update movie poster
  const moviePoster = document.getElementById('movie-poster');
  moviePoster.src = movie.poster;
  moviePoster.alt = movie.title;
  
  // Update movie subtitle
  const movieSubtitle = document.getElementById('movie-subtitle');
  movieSubtitle.textContent = movie.subtitle;
  
  // Update movie title
  const movieTitle = document.getElementById('movie-title');
  movieTitle.innerHTML = `<strong>${movie.title}</strong>`;
  
  // Update movie rating
  const movieRating = document.getElementById('movie-rating');
  movieRating.textContent = movie.rating;
  
  // Update movie quality
  const movieQuality = document.getElementById('movie-quality');
  movieQuality.textContent = movie.quality;
  
  // Update movie genres
  const movieGenres = document.getElementById('movie-genres');
  movieGenres.innerHTML = movie.genres.map(genre => 
    `<a href="#" onclick="searchByGenre('${genre}')">${genre}</a>`
  ).join(', ');
  
  // Update movie year
  const movieYear = document.getElementById('movie-year');
  movieYear.textContent = movie.year;
  
  // Update movie duration
  const movieDuration = document.getElementById('movie-duration');
  movieDuration.textContent = movie.duration;
  
  // Update movie storyline
  const movieStoryline = document.getElementById('movie-storyline');
  movieStoryline.textContent = movie.storyline;
  
  // Add fade-in animation
  setTimeout(() => {
    document.querySelector('.movie-detail-content').classList.add('fade-in');
  }, 100);
}

/**
 * Search by genre (placeholder function)
 */
function searchByGenre(genre) {
  // This would typically filter movies by genre
  console.log(`Searching for ${genre} movies...`);
  // For now, redirect to home page
  window.location.href = `./index.html#upcoming`;
}

/**
 * Share functionality
 */
function initializeShareButton() {
  const shareBtn = document.querySelector('.share');
  
  if (shareBtn) {
    shareBtn.addEventListener('click', function() {
      const movieId = getMovieIdFromUrl();
      const movie = movieDatabase[movieId];
      
      if (navigator.share) {
        // Use native Web Share API if available
        navigator.share({
          title: movie.title,
          text: movie.storyline,
          url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
      } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
          showNotification('Movie link copied to clipboard!', 'success');
        }).catch(() => {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = window.location.href;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          showNotification('Movie link copied to clipboard!', 'success');
        });
      }
    });
  }
}

/**
 * Play button functionality
 */
function initializePlayButton() {
  const playBtn = document.querySelector('.play-btn');
  const watchNowBtn = document.querySelector('.btn-primary');
  
  const playMovie = function() {
    const movieId = getMovieIdFromUrl();
    const movie = movieDatabase[movieId];
    
    // This would typically open a video player
    showNotification(`Playing ${movie.title}...`, 'info');
    
    // Simulate video player opening
    setTimeout(() => {
      console.log('Video player would open here');
    }, 1000);
  };
  
  if (playBtn) {
    playBtn.addEventListener('click', playMovie);
  }
  
  if (watchNowBtn) {
    watchNowBtn.addEventListener('click', playMovie);
  }
}

/**
 * Download button functionality
 */
function initializeDownloadButton() {
  const downloadBtn = document.querySelector('.download-btn');
  
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const movieId = getMovieIdFromUrl();
      const movie = movieDatabase[movieId];
      
      // Simulate download process
      showNotification(`Starting download of ${movie.title}...`, 'info');
      
      // This would typically start a download or redirect to download page
      setTimeout(() => {
        showNotification('Download started! Check your downloads folder.', 'success');
      }, 2000);
    });
  }
}

/**
 * Add related movies section
 */
function addRelatedMovies() {
  const movieId = getMovieIdFromUrl();
  const currentMovie = movieDatabase[movieId];
  
  if (!currentMovie) return;
  
  // Get related movies (exclude current movie)
  const relatedMovies = Object.entries(movieDatabase)
    .filter(([id, movie]) => id !== movieId)
    .slice(0, 3); // Show only 3 related movies
  
  // Create related movies section
  const relatedSection = document.createElement('section');
  relatedSection.className = 'related-movies section';
  relatedSection.innerHTML = `
    <div class="container">
      <h2 class="h2 section-title">You May Also Like</h2>
      <ul class="movies-list">
        ${relatedMovies.map(([id, movie]) => `
          <li>
            <div class="movie-card">
              <a href="./movie-details.html?movie=${id}">
                <figure class="card-banner">
                  <img src="${movie.poster}" alt="${movie.title}">
                </figure>
              </a>
              <div class="title-wrapper">
                <a href="./movie-details.html?movie=${id}">
                  <h3 class="card-title">${movie.title}</h3>
                </a>
                <time datetime="${movie.year}">${movie.year}</time>
              </div>
              <div class="card-meta">
                <div class="badge badge-outline">${movie.quality}</div>
                <div class="duration">
                  <ion-icon name="time-outline"></ion-icon>
                  <time>${movie.duration}</time>
                </div>
                <div class="rating">
                  <ion-icon name="star"></ion-icon>
                  <data>${movie.imdbRating}</data>
                </div>
              </div>
            </div>
          </li>
        `).join('')}
      </ul>
    </div>
  `;
  
  // Insert before footer
  const footer = document.querySelector('.footer');
  footer.parentNode.insertBefore(relatedSection, footer);
}

/**
 * Notification system (reuse from main.js)
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add notification styles if not already present
  if (!document.querySelector('#notification-styles')) {
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
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

/**
 * Initialize movie details page
 */
document.addEventListener('DOMContentLoaded', function() {
  loadMovieDetails();
  initializeShareButton();
  initializePlayButton();
  initializeDownloadButton();
  addRelatedMovies();
  
  console.log('Movie details page initialized successfully!');
});