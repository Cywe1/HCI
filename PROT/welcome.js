// Load user data on page load
window.addEventListener('load', function() {
  loadUserData();
  setupEventListeners();
  
  // Check if user is authenticated
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    // Redirect to login if not authenticated
    window.location.href = 'tester.html';
  }
});

// Load and display user data
function loadUserData() {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) return;
  
  try {
    const user = JSON.parse(currentUser);
    
    // Get user's initials
    const firstName = user.firstName || 'D';
    const lastName = user.lastName || 'U';
    const initials = (firstName[0] + lastName[0]).toUpperCase();
    
    // Update page with user data
    document.getElementById('userName').textContent = firstName;
    document.getElementById('userInitial').textContent = initials;
    document.getElementById('avatarInitial').textContent = initials;
    document.getElementById('profileName').textContent = firstName + ' ' + lastName;
    document.getElementById('profileEmail').textContent = user.email;
    
    // Set member since date
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    document.getElementById('memberSince').textContent = dateString;
    
    // Set last login
    document.getElementById('lastLogin').textContent = 'Just now';
  } catch (err) {
    console.error('Error loading user data:', err);
  }
}

// Setup event listeners
function setupEventListeners() {
  const profileBtn = document.getElementById('profileBtn');
  const profileMenu = document.getElementById('profileMenu');
  
  // Toggle profile menu
  profileBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    profileMenu.classList.toggle('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.navbar-actions') && !e.target.closest('.profile-menu')) {
      profileMenu.classList.remove('active');
    }
  });
  
  // Update active nav link on scroll
  window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// Logout function
function logout() {
  // Clear user session
  localStorage.removeItem('currentUser');
  
  // Show toast notification
  showToast('You have been logged out');
  
  // Redirect to login page
  setTimeout(() => {
    window.location.href = 'tester.html';
  }, 800);
}

// Edit profile function
function editProfile() {
  showToast('Profile editing feature coming soon!');
}

// Handle quick action buttons
function handleAction(action) {
  const messages = {
    'post-item': 'Ready to share an item? Click the button to post.',
    'claim-item': 'Marked successfully! Please visit a drop-off point to claim your item.',
    'navigate': 'Opening directions to drop-off point...',
    'settings': 'Settings coming soon!',
    'help': 'Help & Support center coming soon!'
  };
  
  showToast(messages[action] || 'Feature coming soon!');
}

// Show toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Filter by category
function filterByCategory(category) {
  const categorySelect = document.getElementById('itemType');
  if (categorySelect) {
    categorySelect.value = category;
    applyFilters();
    document.querySelector('.lost-found-section').scrollIntoView({ behavior: 'smooth' });
  }
}

// Apply filters
function applyFilters() {
  showToast('Filters applied! Showing filtered results.');
}

// Reset filters
function resetFilters() {
  document.getElementById('itemType').value = '';
  document.getElementById('itemStatus').value = '';
  document.getElementById('searchLocation').value = '';
  showToast('Filters reset');
}

// Navigation link click handler
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
