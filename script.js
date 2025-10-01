// JavaScript for Taubyte Landing Page

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize animations
  initializeAnimations();

  // Initialize button hover effects
  initializeButtonEffects();

  // Initialize smooth scrolling
  initializeSmoothScrolling();

  // Initialize gradient animation
  initializeGradientAnimation();

  // Initialize background video
  initializeBackgroundVideo();
});

// Initialize fade-in animations with staggered delays
function initializeAnimations() {
  const elements = document.querySelectorAll(".animate-fade-in");
  elements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
  });
}

// Initialize button hover effects
function initializeButtonEffects() {
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
      this.style.transition = "transform 0.3s ease";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });
}

// Initialize smooth scrolling for navigation links
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Initialize gradient animation controls
function initializeGradientAnimation() {
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    // Add pause on hover functionality
    heroBg.addEventListener("mouseenter", function () {
      this.style.animationPlayState = "paused";
    });

    heroBg.addEventListener("mouseleave", function () {
      this.style.animationPlayState = "running";
    });
  }
}

// Initialize background video
function initializeBackgroundVideo() {
  const video = document.querySelector(".video-bg");
  if (video) {
    // Handle video loading
    video.addEventListener("loadstart", function () {
      console.log("Video loading started");
    });

    video.addEventListener("canplay", function () {
      console.log("Video can play");
      video.style.opacity = "1";
    });

    video.addEventListener("error", function () {
      console.log("Video failed to load, using fallback");
      // Show fallback content
      const fallback = document.querySelector(".video-fallback");
      if (fallback) {
        fallback.style.display = "flex";
      }
    });

    // Ensure video is muted and autoplays
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;

    // Try to play the video
    video.play().catch(function (error) {
      console.log("Autoplay prevented:", error);
      // Show fallback if autoplay is prevented
      const fallback = document.querySelector(".video-fallback");
      if (fallback) {
        fallback.style.display = "flex";
      }
    });
  }
}

// Utility function to add loading animation
function addLoadingAnimation() {
  const loader = document.createElement("div");
  loader.className = "loading-spinner";
  loader.innerHTML = `
    <div class="spinner"></div>
    <p>Loading Taubyte...</p>
  `;

  // Add spinner styles
  const style = document.createElement("style");
  style.textContent = `
    .loading-spinner {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    
    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid #f3f3f3;
      border-top: 5px solid #007A3D;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(loader);

  // Remove loader after page loads
  window.addEventListener("load", function () {
    setTimeout(() => {
      loader.remove();
    }, 1000);
  });
}

// Initialize loading animation if needed
// addLoadingAnimation();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add scroll-based animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(section);
  });
}

// Initialize scroll animations
initializeScrollAnimations();

// Add keyboard navigation support
document.addEventListener("keydown", function (e) {
  // Add keyboard shortcuts for better accessibility
  if (e.key === "Enter" && e.target.tagName === "BUTTON") {
    e.target.click();
  }
});

// Add error handling for failed animations
window.addEventListener("error", function (e) {
  console.warn("Animation error:", e.message);
  // Fallback: remove animation classes if they cause issues
  document.querySelectorAll(".animate-fade-in").forEach((el) => {
    el.style.animation = "none";
  });
});
