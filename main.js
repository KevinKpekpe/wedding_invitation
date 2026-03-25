/* ══════════════════════════════════════════════
   MARIAGE COUTUMIER — RENATO & HAMIDA IBRAHIM
   main.js — Interactions & Animations
══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Références DOM ─────────────────────── */
  const curtainScreen = document.getElementById('curtain-screen');
  const cLeft         = document.getElementById('cLeft');
  const cRight        = document.getElementById('cRight');
  const cCenter       = document.getElementById('cCenter');
  const openBtn       = document.getElementById('openBtn');
  const mainPage      = document.getElementById('mainPage');
  const musicBtn      = document.getElementById('musicBtn');
  const musicLabel    = document.getElementById('musicLabel');
  const tableNum      = document.getElementById('tableNumber');
  const heroBg        = document.querySelector('.hero-bg');
  const particles     = document.getElementById('particles');

  /* ─── Particules flottantes sur le rideau ── */
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'ptcl';
    p.style.setProperty('--d',  `${3.5 + Math.random() * 5}s`);
    p.style.setProperty('--dl', `${Math.random() * 7}s`);
    p.style.left   = `${Math.random() * 100}%`;
    p.style.width  = p.style.height = `${3 + Math.random() * 7}px`;
    p.style.opacity = String(0.2 + Math.random() * 0.5);
    particles.appendChild(p);
  }

  /* ─── Ouverture du rideau ────────────────── */
  function openCurtain() {
    openBtn.disabled = true;

    // Fade out centre
    cCenter.style.transition = 'opacity .4s ease';
    cCenter.style.opacity    = '0';
    cCenter.style.pointerEvents = 'none';

    setTimeout(() => {
      curtainScreen.classList.add('open');     // slide panels apart

      // Lancer la musique après geste utilisateur
      startMusic();

      setTimeout(() => {
        curtainScreen.classList.add('hidden');
        mainPage.classList.add('visible');
        heroBg.classList.add('active');        // Ken Burns
        musicBtn.classList.add('visible');
        initScrollObserver();                  // démarrer les animations scroll

      }, 1900);

    }, 420);
  }

  openBtn.addEventListener('click', openCurtain);

  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !curtainScreen.classList.contains('hidden')) {
      e.preventDefault();
      openCurtain();
    }
  });

  /* ─── Audio local — Ed Sheeran "Perfect" ── */
  const bgAudio = document.getElementById('bgAudio');
  let isMuted   = false;

  if (bgAudio) {
    bgAudio.volume = 0.6;
  }

  function startMusic() {
    if (!bgAudio) return;
    bgAudio.play().catch(() => {
      // Autoplay bloqué par le navigateur — l'utilisateur peut cliquer sur le bouton
    });
  }

  /* ─── Bouton music ───────────────────────── */
  musicBtn.addEventListener('click', () => {
    if (!bgAudio) return;
    isMuted = !isMuted;
    if (isMuted) {
      bgAudio.pause();
      musicLabel.textContent = '✕ Musique en pause';
      musicBtn.style.opacity = '.55';
    } else {
      bgAudio.play();
      musicLabel.textContent = '♪ Perfect — Ed Sheeran';
      musicBtn.style.opacity = '1';
    }
  });

  /* ─── Scroll observer — fade in ─────────── */
  function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in-view');
          observer.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-el').forEach(el => observer.observe(el));
  }

  /* ─── (Fonction d'édition de table supprimée par précaution de sécurité) ─── */

  /* ─── Parallax léger sur la photo hero ───── */
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      // Parallax subtle (pas trop agressif)
      heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
    }, { passive: true });
  }

  /* ─── Impression ─────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      window.print();
    }
  });

});
