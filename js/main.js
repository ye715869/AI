/* ============================================================
   个人主页 - 交互逻辑
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initTypingEffect();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initProjectCards();
  initStatsCounter();
  initActiveNavLink();
  initCurrentYear();
});

// ============================================================
// 实时时钟
// ============================================================
function initClock() {
  const clockEl = document.getElementById('clock');

  function updateClock() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockEl.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// ============================================================
// 打字机效果
// ============================================================
function initTypingEffect() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = [
    '你好，我是',
    'Hello, I am',
    'こんにちは、',
    'Bonjour, je suis',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isWaiting = false;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    // 控制速度
    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      // 打完一个词，等待后开始删除
      if (!isWaiting) {
        isWaiting = true;
        speed = 2000;
      } else {
        isDeleting = true;
        isWaiting = false;
        speed = 400;
      }
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 300;
    }

    setTimeout(type, speed);
  }

  // 初始延迟
  setTimeout(type, 800);
}

// ============================================================
// 导航栏滚动效果
// ============================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  function onScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 初始检查
}

// ============================================================
// 移动端菜单
// ============================================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // 点击链接后关闭菜单
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // 点击页面其他区域关闭菜单
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });
}

// ============================================================
// 滚动入场动画 (IntersectionObserver)
// ============================================================
function initScrollReveal() {
  // 给需要动画的元素添加 reveal 类
  const revealTargets = document.querySelectorAll(
    '.section-title, .about-text, .about-visual, .skill-category, .project-card, .contact-item, .contact-intro'
  );

  revealTargets.forEach(el => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // 技能卡片和项目卡片依次延迟出现
          if (entry.target.classList.contains('skill-category')) {
            const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.1}s`;
          }
          if (entry.target.classList.contains('project-card')) {
            const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.1}s`;
          }
          if (entry.target.classList.contains('contact-item')) {
            const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.08}s`;
          }
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealTargets.forEach(el => observer.observe(el));
}

// ============================================================
// 项目卡片展开/折叠
// ============================================================
function initProjectCards() {
  const expandButtons = document.querySelectorAll('.card-expand');

  expandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project-card');
      const details = card.querySelector('.card-details');

      btn.classList.toggle('active');
      details.classList.toggle('open');

      // 更新按钮文字
      const textSpan = btn.querySelector('.expand-text');
      if (details.classList.contains('open')) {
        textSpan.textContent = '收起详情';
      } else {
        textSpan.textContent = '展开详情';
      }
    });
  });
}

// ============================================================
// 统计数字滚动动画
// ============================================================
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const duration = 1500; // ms
          const startTime = performance.now();

          function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // easeOutCubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            el.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              el.textContent = target + '+'; // 完成后加 + 号
            }
          }

          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(el => observer.observe(el));
}

// ============================================================
// 导航栏当前激活链接高亮
// ============================================================
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-50px 0px -50% 0px',
    }
  );

  sections.forEach(section => observer.observe(section));
}

// ============================================================
// 页脚年份
// ============================================================
function initCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
