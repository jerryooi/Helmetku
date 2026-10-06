// ==========================================================================
// 136App - Interactions & Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // 2. Toast Notification Helper
  const toast = document.getElementById('app-toast');
  const toastText = document.getElementById('toast-text');
  let toastTimer = null;

  window.showToast = function(message, icon = 'bi-check-circle-fill text-success') {
    if (!toast) return;
    toastText.innerHTML = `<i class="bi ${icon} me-1"></i> ${message}`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  };

  // 3. Modal Controllers
  const qrModal = document.getElementById('qr-modal');
  const checkinModal = document.getElementById('checkin-modal');
  const vipModal = document.getElementById('vip-modal');

  window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('show');
  };

  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('show');
  };

  // Close modals on backdrop click
  document.querySelectorAll('.custom-modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('show');
      }
    });
  });

  // 4. Share Card Functionality
  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const shareData = {
        title: '136App Member Card',
        text: 'Jason Tan (Demo001) - 136App VIP Member Card 2025-0136-8021-6800',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          showToast('Card shared successfully!');
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyCardLink();
          }
        }
      } else {
        copyCardLink();
      }
    });
  }

  function copyCardLink() {
    navigator.clipboard.writeText('136App Card: Demo001 (2025-0136-8021-6800)').then(() => {
      showToast('Member Card ID copied to clipboard!', 'bi-clipboard-check text-warning');
    }).catch(() => {
      showToast('Card ID: 2025-0136-8021-6800');
    });
  }

  // 5. Daily Check-in Interaction
  const checkinAction = document.getElementById('action-checkin');
  let hasCheckedIn = false;
  if (checkinAction) {
    checkinAction.addEventListener('click', () => {
      if (!hasCheckedIn) {
        hasCheckedIn = true;
        openModal('checkin-modal');
      } else {
        showToast('You have already checked in today!', 'bi-info-circle text-info');
      }
    });
  }

  // 6. Navigation Tabs Switching
  const navTabs = document.querySelectorAll('.nav-tab-item');
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabName = tab.dataset.tab;
      if (tabName !== 'home') {
        showToast(`Navigated to ${tabName.toUpperCase()} (Module coming soon)`, 'bi-arrow-right-circle text-primary');
      }
    });
  });

  // Center FAB Click
  const centerFab = document.getElementById('center-fab');
  if (centerFab) {
    centerFab.addEventListener('click', () => {
      showToast('136 Quick Hub Activated!', 'bi-stars text-warning');
    });
  }

  // Notification Bell
  const bellBtn = document.getElementById('bell-btn');
  if (bellBtn) {
    bellBtn.addEventListener('click', () => {
      showToast('No new notifications right now.', 'bi-bell-fill text-warning');
    });
  }
});
