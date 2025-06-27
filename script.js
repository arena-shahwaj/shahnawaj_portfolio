 // Mobile Navigation
      const hamburger = document.querySelector(".hamburger");
      const navLinks = document.querySelector(".nav-links");
      const navItems = document.querySelectorAll(".nav-links li");

      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
      });

      navItems.forEach((item) => {
        item.addEventListener("click", () => {
          navLinks.classList.remove("active");
          hamburger.classList.remove("active");
        });
      });

      // Header Scroll Effect
      let isScrolling;
      window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        header.classList.toggle("scrolled", window.scrollY > 0);

        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(() => {
          // Back to top button
          const backToTop = document.getElementById("back-to-top");
          if (window.scrollY > 300) {
            backToTop.classList.add("active");
          } else {
            backToTop.classList.remove("active");
          }
        }, 100);
      });

      // Back to top functionality
      document.getElementById("back-to-top").addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      // Portfolio Filter
      const filterBtns = document.querySelectorAll(".filter-btn");
      const portfolioItems = document.querySelectorAll(".portfolio-item");

      filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          // Remove active class from all buttons
          filterBtns.forEach((btn) => btn.classList.remove("active"));
          // Add active class to clicked button
          btn.classList.add("active");

          const filter = btn.getAttribute("data-filter");

          portfolioItems.forEach((item) => {
            if (
              filter === "all" ||
              item.getAttribute("data-category") === filter
            ) {
              item.style.display = "block";
            } else {
              item.style.display = "none";
            }
          });
        });
      });

      // Video Controls
      const video = document.getElementById("showreel-video");
      const playBtn = document.getElementById("play-btn");
      const muteBtn = document.getElementById("mute-btn");
      const fullscreenBtn = document.getElementById("fullscreen-btn");
      const progressBar = document.querySelector(".progress");

      if (video) {
        playBtn.addEventListener("click", () => {
          if (video.paused) {
            video.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
          } else {
            video.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
          }
        });

        muteBtn.addEventListener("click", () => {
          if (video.muted) {
            video.muted = false;
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
          } else {
            video.muted = true;
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
          }
        });

        fullscreenBtn.addEventListener("click", () => {
          if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
          } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
          }
        });

        video.addEventListener("timeupdate", () => {
          const progress = (video.currentTime / video.duration) * 100;
          progressBar.style.width = `${progress}%`;
        });
      }

      // Theme Toggle
      const themeToggle = document.getElementById("theme-toggle-nav");
      const body = document.body;

      themeToggle.addEventListener("click", () => {
        body.classList.toggle("light-theme");

        if (body.classList.contains("light-theme")) {
          themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
          localStorage.setItem("theme", "light");
        } else {
          themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
          localStorage.setItem("theme", "dark");
        }
      });

      // Check for saved theme preference
      if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-theme");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }

      // Form Submission
      const form = document.getElementById("form");

      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          alert("Thank you for your message! I will get back to you soon.");
          form.reset();
        });
      }

      // Smooth Scrolling for Anchor Links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth",
            });
          }
        });
      });

      // Lazy Loading Animation
      const animateOnScroll = () => {
        const sections = document.querySelectorAll("section");
        const portfolioItems = document.querySelectorAll(".portfolio-item");

        sections.forEach((section) => {
          const sectionTop = section.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;

          if (sectionTop < windowHeight - 100) {
            section.classList.add("visible");
          }
        });

        portfolioItems.forEach((item, index) => {
          const itemTop = item.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;

          if (itemTop < windowHeight - 100) {
            setTimeout(() => {
              item.classList.add("visible");
            }, index * 100);
          }
        });
      };

      // Run once on load
      animateOnScroll();

      // Run on scroll
      window.addEventListener("scroll", animateOnScroll);

      // Hero image animation
      const heroSection = document.getElementById("home");
      const heroImage = document.querySelector(".hero-image");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              heroSection.classList.add("visible");
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(heroSection);
