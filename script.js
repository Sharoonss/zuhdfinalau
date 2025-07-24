document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Floating images animation
    const floatingImages = document.querySelectorAll('.floating-img');
    
    floatingImages.forEach((img, index) => {
        // Add slight floating animation with different delays
        img.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
    });
});
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const sideMenu = document.querySelector('.side-menu');
const overlay = document.querySelector('.overlay');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    sideMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : '';
});

overlay.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

const container = document.getElementById('partnerContainer');
    const cards = container.innerHTML;
    container.innerHTML = cards + cards;

    function setScrollSpeed(speed) {
      container.style.animationDuration = speed + 's';
    }

// Add floating animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(0px);
        }
    }
`;
document.head.appendChild(style);

 // Simple navigation functionality
 const gridItems = document.querySelectorAll('.grid-item');
 const leftArrow = document.querySelector('.left-arrow');
 const rightArrow = document.querySelector('.right-arrow');
 let currentIndex = 0;
 
 leftArrow.addEventListener('click', () => {
     if (currentIndex > 0) {
         currentIndex--;
         scrollToItem(currentIndex);
     }
 });
 
 rightArrow.addEventListener('click', () => {
     if (currentIndex < gridItems.length - 1) {
         currentIndex++;
         scrollToItem(currentIndex);
     }
 });
 
 function scrollToItem(index) {
     gridItems[index].scrollIntoView({
         behavior: 'smooth',
         block: 'nearest'
     });
 }
 
 // Like functionality
 const hearts = document.querySelectorAll('.heart-icon');
 hearts.forEach(heart => {
     heart.addEventListener('click', (e) => {
         e.stopPropagation();
         const likesElement = heart.nextElementSibling;
         let likes = parseInt(likesElement.textContent);
         
         if (heart.classList.contains('liked')) {
             heart.classList.remove('liked');
             heart.textContent = '❤️';
             likes--;
         } else {
             heart.classList.add('liked');
             heart.textContent = '❤️';
             likes++;
         }
         
         likesElement.textContent = likes;
     });
 });




 

// JavaScript for implementing the slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add the updated CSS to the page
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
    
    // Get elements
    const slider = document.getElementById('remindersSlider');
    const items = document.querySelectorAll('.reminder-item');
    
    // Add video icons to all items that don't have them
    items.forEach(item => {
        if (!item.querySelector('.reminder-video-icon')) {
            const videoIcon = document.createElement('div');
            videoIcon.className = 'reminder-video-icon';
            item.querySelector('.reminder-img').appendChild(videoIcon);
        }
    });
    
    // Clone all items and append them to create a seamless loop
    items.forEach(item => {
        const clone = item.cloneNode(true);
        slider.appendChild(clone);
    });
    
    // Pause animation on hover
    slider.addEventListener('mouseenter', () => {
        slider.style.animationPlayState = 'paused';
    });
    
    slider.addEventListener('mouseleave', () => {
        slider.style.animationPlayState = 'running';
    });
    
    // Update dots based on visible slides
    const dots = document.querySelectorAll('.reminder-dot');
    const updateActiveDot = () => {
        // Calculate which slide set is most visible
        const containerRect = slider.parentElement.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        
        let closestItem = null;
        let minDistance = Infinity;
        
        items.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.left + rect.width / 2;
            const distance = Math.abs(containerCenter - itemCenter);
            
            if (distance < minDistance) {
                minDistance = distance;
                closestItem = index % dots.length;
            }
        });
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === closestItem);
        });
    };
    
    // Update dots periodically
    setInterval(updateActiveDot, 1000);
    
    // Click on dots to jump to that section
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Reset animation
            slider.style.animation = 'none';
            
            // Calculate position to show the desired section
            const itemWidth = items[0].offsetWidth + 20; // 20px for gap
            const offset = -index * itemWidth * 2; // 2 items per view
            
            slider.style.transform = `translateX(${offset}px)`;
            
            // Update active dot
            dots.forEach((d, i) => {
                d.classList.toggle('active', i === index);
            });
            
            // Resume animation after a short delay
            setTimeout(() => {
                slider.style.animation = 'slideRightToLeft 30s linear infinite';
                slider.style.transform = '';
            }, 2000);
        });
    });
});


/* =================================================================== */
/*  ISLAMIC WEBSITE - CLEANED JAVASCRIPT FILE                          */
/*  Navigation and return back code removed                            */
/* =================================================================== */

// Import GSAP or declare it before using
const gsap = window.gsap // Assuming GSAP is loaded globally

/* =================================================================== */
/*  SAFETY HELPERS & UTILITIES                                         */
/* =================================================================== */
function $id(id) {
  return document.getElementById(id)
}
function $(sel, base = document) {
  return base ? base.querySelector(sel) : null
}
function $all(sel, base = document) {
  return base ? Array.from(base.querySelectorAll(sel)) : []
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.textContent = message
  notification.className = `notification notification-${type}`
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "var(--deep-green, #0f3d2e)"};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideInRight 0.3s ease-out;
        font-family: inherit;
        font-size: 14px;
        line-height: 1.4;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-out"
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove()
      }
    }, 300)
  }, 3000)
}

/* =================================================================== */
/*  SEARCH DATA                                                         */
/* =================================================================== */
const searchData = [
  {
    category: "Lectures",
    items: [
      {
        title: "The Beauty of Patience in Islam",
        description: "A comprehensive lecture on the virtue of patience (Sabr) and its importance in a Muslim's life.",
        type: "Video",
      },
      {
        title: "Understanding Tawheed",
        description: "Deep dive into the concept of monotheism and its fundamental role in Islamic belief.",
        type: "Video",
      },
      {
        title: "The Night Prayer (Tahajjud)",
        description: "Learn about the blessed night prayer and its spiritual benefits for the believer.",
        type: "Video",
      },
      {
        title: "Purification of the Soul",
        description: "Guidance on spiritual purification and cleansing the heart from sins.",
        type: "Video",
      },
    ],
  },
  {
    category: "Quotes",
    items: [
      {
        title: "On Gratitude",
        description: '"And whoever is grateful, his gratitude is only for himself." - Quran 31:12',
        type: "Quote",
      },
      {
        title: "On Prayer",
        description: '"Prayer is the key to Paradise" - Prophet Muhammad (PBUH)',
        type: "Quote",
      },
      {
        title: "On Knowledge",
        description: '"Seek knowledge from the cradle to the grave" - Prophet Muhammad (PBUH)',
        type: "Quote",
      },
    ],
  },
  {
    category: "Topics",
    items: [
      {
        title: "Islamic Finance",
        description: "Learn about halal investment and Islamic banking principles.",
        type: "Topic",
      },
      {
        title: "Family in Islam",
        description: "Understanding the importance of family bonds and relationships in Islam.",
        type: "Topic",
      },
      {
        title: "Ramadan Preparation",
        description: "How to prepare spiritually and physically for the holy month of Ramadan.",
        type: "Topic",
      },
    ],
  },
]

/* =================================================================== */
/*  GSAP INITIALIZATION & ANIMATIONS                                    */
/* =================================================================== */
let gsapLoaded = false

function initializeGSAP() {
  if (typeof gsap === "undefined") {
    console.warn("GSAP not loaded - animations will be disabled")
    return false
  }

  try {
    gsap.registerPlugin()
    gsap.defaults({ duration: 0.8, ease: "power2.out" })
    gsapLoaded = true
    return true
  } catch (error) {
    console.error("GSAP initialization failed:", error)
    return false
  }
}

function safeGsap(callback) {
  if (gsapLoaded && typeof gsap !== "undefined") {
    try {
      callback()
    } catch (error) {
      console.error("GSAP animation error:", error)
    }
  }
}

function initLoadingAnimation() {
  const loadingOverlay = $id("loadingOverlay")
  const loadingText = $id("loadingText")

  if (!loadingOverlay || !loadingText) {
    initMainAnimations()
    return
  }

  safeGsap(() => {
    const tl = gsap.timeline()
    tl.to(loadingText, { opacity: 1, duration: 1 })
      .to(loadingText, { scale: 1.1, duration: 0.5, yoyo: true, repeat: 1, ease: "power2.inOut" })
      .to(loadingOverlay, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          loadingOverlay.style.display = "none"
          initMainAnimations()
        },
      })
  })

  // Fallback if GSAP fails
  if (!gsapLoaded) {
    setTimeout(() => {
      loadingOverlay.style.display = "none"
      initMainAnimations()
    }, 2000)
  }
}

function initMainAnimations() {
  const heroText = $(".hero-text")
  const heroImage = $(".hero-image")
  const ctaButton = $(".cta-button")

  safeGsap(() => {
    if (heroText) {
      gsap.to(heroText, { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: "power3.out" })
    }

    if (heroImage) {
      gsap.to(heroImage, { opacity: 1, x: 0, duration: 1.2, delay: 0.6, ease: "power3.out" })
    }
  })

  // CTA Button hover effects
  if (ctaButton) {
    ctaButton.addEventListener("mouseenter", () => {
      safeGsap(() => gsap.to(ctaButton, { scale: 1.05, duration: 0.3 }))
    })
    ctaButton.addEventListener("mouseleave", () => {
      safeGsap(() => gsap.to(ctaButton, { scale: 1, duration: 0.3 }))
    })
  }

  // Parallax effect for hero image
  window.addEventListener(
    "scroll",
    debounce(() => {
      const scrolled = window.pageYOffset
      if (heroImage) {
        safeGsap(() => {
          gsap.to(heroImage, {
            y: scrolled * 0.1,
            duration: 0.3,
            ease: "none",
          })
        })
      }
    }, 16),
  )
}

/* =================================================================== */
/*  CONTENT OBSERVER & SCROLL ANIMATIONS                               */
/* =================================================================== */
function initContentObserver() {
  const contentSection = $id("content")
  if (!contentSection) return

  const contentObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          safeGsap(() => {
            const statCards = $all(".stat-card")
            const minbarContent = $(".minbar-content")
            const videoContainer = $(".video-container")
            const instagramPosts = $all(".instagram-post")
            const quoteSection = $(".quote-section")
            const blogHighlights = $(".blog-highlights")

            if (statCards.length > 0) {
              gsap.from(statCards, { y: 50, duration: 0.8, stagger: 0.1, ease: "power3.out" })
            }
            if (minbarContent) {
              gsap.from(minbarContent, { opacity: 0, x: -50, duration: 1, delay: 0.3 })
            }
            if (videoContainer) {
              gsap.from(videoContainer, { opacity: 0, x: 50, duration: 1, delay: 0.5 })
            }
            if (instagramPosts.length > 0) {
              gsap.from(instagramPosts, { opacity: 0, scale: 0.8, duration: 0.6, stagger: 0.1, delay: 1 })
            }
            if (quoteSection) {
              gsap.from(quoteSection, { opacity: 0, y: 30, duration: 0.8, delay: 1.2 })
            }
            if (blogHighlights) {
              gsap.from(blogHighlights, { opacity: 0, y: 30, duration: 0.8, delay: 1.4 })
            }
          })
        }
      })
    },
    { threshold: 0.1 },
  )

  contentObserver.observe(contentSection)
}

/* =================================================================== */
/*  VIDEO MODAL                                                         */
/* =================================================================== */
// function initVideoModal() {
//   const modal = $id("videoModal")
//   if (!modal) {
//     console.warn("[videoModal] not found – skipping")
//     return
//   }

//   const video = $(".ziyarat-video", modal)

//   modal.addEventListener("click", (e) => {
//     if (e.target === modal) closeVideo()
//   })

//   document.addEventListener("keydown", (e) => {
//     if (e.key === "Escape" && modal.classList.contains("ziyarat-show")) {
//       closeVideo()
//     }
//   })

//   function closeVideo() {
//     modal.classList.remove("ziyarat-show")
//     if (video) {
//       video.pause()
//       video.currentTime = 0
//       video.src = ""
//     }
//   }

//   // Global functions
//   window.playVideo = (videoId) => {
//     console.log(`Playing video: ${videoId || "default"}`)
//     modal.classList.add("ziyarat-show")
//     if (video) {
//       video.src = "/placeholder-video.mp4"
//       video.play().catch((error) => {
//         console.error("Video play failed:", error)
//         showNotification("Unable to play video", "error")
//       })
//     }
//   }

//   window.closeVideo = closeVideo
// }

/* =================================================================== */
/*  SEARCH FUNCTIONALITY                                                */
/* =================================================================== */
function initSearchFunctionality() {
  const searchBtn = $id("searchBtn")
  const searchOverlay = $id("searchOverlay")
  const closeSearch = $id("closeSearch")
  const searchInput = $id("searchInput")
  const searchResults = $id("searchResults")

  if (!searchBtn || !searchOverlay || !closeSearch || !searchInput || !searchResults) {
    console.warn("[search] elements not found – skipping")
    return
  }

  function openSearch() {
    searchOverlay.classList.add("active")
    document.body.style.overflow = "hidden"

    safeGsap(() => {
      gsap.fromTo(searchOverlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })

      gsap.fromTo(
        ".search-container",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: "power3.out" },
      )
    })

    setTimeout(() => searchInput.focus(), 300)
  }

  function closeSearchOverlay() {
    safeGsap(() => {
      gsap.to(searchOverlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: resetSearch,
      })
    })

    if (!gsapLoaded) {
      resetSearch()
    }
  }

  function resetSearch() {
    searchOverlay.classList.remove("active")
    document.body.style.overflow = "auto"
    searchInput.value = ""
    searchResults.innerHTML = ""
    searchResults.classList.remove("show")
  }

  function performSearch(query) {
    if (!query.trim()) {
      searchResults.innerHTML = ""
      searchResults.classList.remove("show")
      return
    }

    const filteredResults = searchData
      .map((category) => {
        const filteredItems = category.items.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()),
        )

        return filteredItems.length > 0
          ? {
              ...category,
              items: filteredItems,
            }
          : null
      })
      .filter(Boolean)

    displaySearchResults(filteredResults, query)
  }

  function displaySearchResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = `
                <div class="no-results">
                    <h3>No results found for "${query}"</h3>
                    <p>Try searching with different keywords</p>
                </div>
            `
    } else {
      let html = ""
      results.forEach((category) => {
        html += `
                    <div class="search-category">
                        <h3 class="category-title">${category.category}</h3>
                        ${category.items
                          .map(
                            (item) => `
                            <div class="search-item" onclick="selectSearchItem('${item.title.replace(/'/g, "\\'")}')">
                                <div class="item-title">${highlightText(item.title, query)}</div>
                                <div class="item-description">${highlightText(item.description, query)}</div>
                                <span class="item-type">${item.type}</span>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                `
      })
      searchResults.innerHTML = html
    }

    searchResults.classList.add("show")

    safeGsap(() => {
      gsap.from(".search-item", {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
      })
    })
  }

  function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, "gi")
    return text.replace(
      regex,
      '<mark style="background: var(--gold, #d4af37); color: var(--deep-green, #0f3d2e); padding: 0 2px; border-radius: 2px;">$1</mark>',
    )
  }

  window.selectSearchItem = (title) => {
    console.log(`Selected: ${title}`)
    closeSearchOverlay()
    showNotification(`Selected: ${title}`, "success")
  }

  // Event listeners
  searchBtn.addEventListener("click", openSearch)
  closeSearch.addEventListener("click", closeSearchOverlay)

  let searchTimeout
  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      performSearch(e.target.value)
    }, 300)
  })

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault()
      openSearch()
    }

    if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
      closeSearchOverlay()
    }
  })
}

/* =================================================================== */
/*  FILTER FUNCTIONALITY                                                */
/* =================================================================== */
function initFilterFunctionality() {
  // Filter buttons
  $all(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $all(".filter-btn").forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      safeGsap(() => {
        gsap.to(btn, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        })
      })
    })
  })

  // Filter dropdowns
  const filterDropdowns = $all(".filter-dropdown")
  filterDropdowns.forEach((dropdown) => {
    const button = $(".filter-button", dropdown)
    const options = $all(".filter-option", dropdown)

    if (!button) return

    button.addEventListener("click", (e) => {
      e.stopPropagation()

      // Close other dropdowns
      filterDropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove("active")
        }
      })

      dropdown.classList.toggle("active")
    })

    options.forEach((option) => {
      option.addEventListener("click", () => {
        const value = option.dataset.value
        const text = option.textContent

        const buttonSpan = button.querySelector("span")
        if (buttonSpan) {
          buttonSpan.textContent = text
        }

        dropdown.classList.remove("active")
        console.log("Selected filter:", value)

        filterLectures(dropdown.id, value)
      })
    })
  })

  // Topic tags
  const topicTags = $all(".topic-tag")
  topicTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      topicTags.forEach((t) => t.classList.remove("active"))
      tag.classList.add("active")

      const topic = tag.dataset.topic
      console.log("Selected topic:", topic)
      filterByTopic(topic)
    })
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", () => {
    filterDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active")
    })
  })
}

function filterLectures(filterType, value) {
  console.log(`Filtering ${filterType} by ${value}`)
  const lectureCards = $all(".lecture-card")
  lectureCards.forEach((card) => {
    const cardValue = card.dataset[filterType.replace("Filter", "")]
    if (value === "" || cardValue === value) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

function filterByTopic(topic) {
  console.log(`Filtering by topic: ${topic}`)
  const lectureCards = $all(".lecture-card")
  lectureCards.forEach((card) => {
    const cardTopic = card.dataset.topic
    if (topic === "all" || cardTopic === topic) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

/* =================================================================== */
/*  QUOTE FUNCTIONALITY                                                 */
/* =================================================================== */
function initQuoteFunctionality() {
  // Quote sharing functions
  window.shareQuote = (platform, element) => {
    let quote = "The heart will not find complete happiness, until it is connected with Allah. - Ibn al-Qayyim"

    // If element is provided, get quote from the card
    if (element) {
      const quoteCard = element.closest(".quote-card")
      if (quoteCard) {
        const quoteText = quoteCard.querySelector(".quote-text")?.textContent || ""
        const author = quoteCard.querySelector(".author")?.textContent || ""
        quote = `"${quoteText}" ${author}`
      }
    }

    switch (platform) {
      case "copy":
        navigator.clipboard
          .writeText(quote)
          .then(() => {
            showNotification("Quote copied to clipboard!", "success")
          })
          .catch(() => {
            showNotification("Failed to copy quote", "error")
          })
        break
      case "instagram":
        showNotification("Quote copied! You can now paste it on Instagram.", "info")
        navigator.clipboard.writeText(quote).catch(() => {})
        break
      case "twitter":
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)}`
        window.open(twitterUrl, "_blank", "width=600,height=400")
        break
      case "facebook":
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(quote)}`
        window.open(facebookUrl, "_blank", "width=600,height=400")
        break
      case "share":
        if (navigator.share) {
          navigator
            .share({
              title: "Quote of the Day",
              text: quote,
              url: window.location.href,
            })
            .catch(() => {
              window.shareQuote("copy")
            })
        } else {
          window.shareQuote("copy")
        }
        break
    }
  }

  // Convenience functions
  window.copyQuote = () => window.shareQuote("copy")
  window.shareToInstagram = () => window.shareQuote("instagram")
  window.shareGeneral = () => window.shareQuote("share")
  window.mainShare = () => window.shareQuote("share")

  // Quote filtering
  const scholarFilter = $id("scholarFilter")
  const categoryFilter = $id("categoryFilter")

  function applyFilters() {
    const scholarValue = scholarFilter ? scholarFilter.value : ""
    const categoryValue = categoryFilter ? categoryFilter.value : ""
    const quoteCards = $all(".quote-card")

    quoteCards.forEach((card) => {
      const cardScholar = card.getAttribute("data-scholar")
      const cardCategory = card.getAttribute("data-category")

      let showCard = true

      if (scholarValue && cardScholar !== scholarValue) {
        showCard = false
      }

      if (categoryValue && cardCategory !== categoryValue) {
        showCard = false
      }

      if (showCard) {
        card.classList.remove("hidden")
        card.style.display = "block"
      } else {
        card.classList.add("hidden")
        card.style.display = "none"
      }
    })
  }

  window.resetFilters = () => {
    if (scholarFilter) scholarFilter.value = ""
    if (categoryFilter) categoryFilter.value = ""
    applyFilters()
  }

  if (scholarFilter) scholarFilter.addEventListener("change", applyFilters)
  if (categoryFilter) categoryFilter.addEventListener("change", applyFilters)

  // Quote card animations on scroll
  const quoteCards = $all(".quote-card")
  if (quoteCards.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }
        })
      },
      { threshold: 0.1 },
    )

    quoteCards.forEach((card) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(20px)"
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(card)
    })
  }
}

/* =================================================================== */
/*  DONATION FUNCTIONALITY                                              */
/* =================================================================== */
function initDonationFunctionality() {
  window.handleDonation = () => {
    const donationOptions = `
🇵🇸 PALESTINE EMERGENCY AID:
• $25 - Emergency food package
• $50 - Medical supplies for families
• $100 - Shelter materials
• $250 - Monthly family support

🕌 MOSQUE SUPPORT:
• $30 - Daily maintenance
• $75 - Community programs
• $150 - Facility improvements
• $500 - Major renovations

Choose any amount - every donation matters!
        `
    showNotification(donationOptions, "info")
  }

  window.handleLearnMore = () => {
    const moreInfo = `
OUR IMPACT:

🇵🇸 PALESTINE RELIEF:
• Emergency food & water distribution
• Medical aid and supplies
• Temporary shelter assistance
• Educational support for children

🕌 MOSQUE INITIATIVES:
• Building & renovation projects
• Community center development
• Religious education programs
• Youth and family services

100% of donations go directly to those in need.
All projects are Zakat eligible.
        `
    showNotification(moreInfo, "info")
  }
}

/* =================================================================== */
/*  ZIYARAT PAGE FUNCTIONALITY                                          */
/* =================================================================== */
function initZiyaratFunctionality() {
  // Navigation buttons
  const navButtons = $all(".ziyarat-nav-btn")
  const cards = $all(".ziyarat-card")

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category

      // Update active button
      navButtons.forEach((btn) => btn.classList.remove("ziyarat-active"))
      button.classList.add("ziyarat-active")

      // Add click animation
      button.style.transform = "scale(0.95)"
      setTimeout(() => {
        button.style.transform = ""
      }, 150)

      // Filter cards
      filterZiyaratCards(category)

      console.log(`Filtered by category: ${category}`)
    })

    // Add keyboard support
    button.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        button.click()
      }
    })
  })

  // Card interactions
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.querySelector(".ziyarat-card-title")?.textContent || "Unknown"
      const category = card.dataset.category

      // Add click animation
      card.style.transform = "scale(0.98)"
      setTimeout(() => {
        card.style.transform = ""
      }, 150)

      console.log(`Clicked card: ${title} (${category})`)
      showCardDetails(card)
    })

    // Hover effects
    card.addEventListener("mouseenter", () => {
      const overlay = card.querySelector(".ziyarat-card-overlay")
      if (overlay) {
        overlay.style.transform = "scale(1.1)"
      }
    })

    card.addEventListener("mouseleave", () => {
      const overlay = card.querySelector(".ziyarat-card-overlay")
      if (overlay) {
        overlay.style.transform = ""
      }
    })

    // Add tabindex for keyboard navigation
    card.setAttribute("tabindex", "0")

    // Keyboard support
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        card.click()
      }
    })
  })

  // Map markers
  const markers = $all(".ziyarat-map-marker")
  markers.forEach((marker) => {
    marker.addEventListener("click", () => {
      const location = marker.dataset.location

      // Add click animation
      marker.style.transform = "scale(1.3)"
      setTimeout(() => {
        marker.style.transform = ""
      }, 300)

      showLocationInfo(location)
      console.log(`Clicked location: ${location}`)
    })

    // Add tabindex for keyboard navigation
    marker.setAttribute("tabindex", "0")
    marker.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        marker.click()
      }
    })
  })

  // Scroll animations for Ziyarat elements
  const ziyaratObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("ziyarat-animate-in")

          if (entry.target.classList.contains("ziyarat-card")) {
            entry.target.style.transform = "translateY(0)"
            entry.target.style.opacity = "1"
          }
        }
      })
    },
    { threshold: 0.1 },
  )

  const elementsToObserve = $all(".ziyarat-featured, .ziyarat-card, .ziyarat-map")
  elementsToObserve.forEach((element) => ziyaratObserver.observe(element))
}

function filterZiyaratCards(category) {
  const cards = $all(".ziyarat-card")

  cards.forEach((card, index) => {
    const cardCategory = card.dataset.category

    if (category === "all" || cardCategory === category) {
      card.classList.remove("ziyarat-hidden", "ziyarat-filtered")

      // Stagger animation for showing cards
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }, index * 100)
    } else {
      card.classList.add("ziyarat-filtered")
      card.style.opacity = "0.5"
      card.style.transform = "translateY(20px)"

      // Hide after animation
      setTimeout(() => {
        card.classList.add("ziyarat-hidden")
      }, 300)
    }
  })
}

function showCardDetails(card) {
  const title = card.querySelector(".ziyarat-card-title")?.textContent || "Unknown"
  const description = card.querySelector(".ziyarat-card-description")?.textContent || "No description available"

  showNotification(`${title}: ${description}`, "info")
}

function showLocationInfo(location) {
  const locationData = {
    makkah: {
      name: "Makkah",
      description: "The holiest city in Islam, home to the Kaaba and Masjid al-Haram.",
      significance: "Direction of prayer for Muslims worldwide",
    },
    medina: {
      name: "Medina",
      description: "The second holiest city in Islam, home to the Prophet's Mosque.",
      significance: "The city where Prophet Muhammad (pbuh) is buried",
    },
  }

  const info = locationData[location]
  if (info) {
    showNotification(`${info.name}: ${info.description} - ${info.significance}`, "info")
  }
}

/* =================================================================== */
/*  ABOUT PAGE (ZUHD) FUNCTIONALITY                                     */
/* =================================================================== */
function initZuhdAboutFunctionality() {
  safeGsap(() => {
    // Create main timeline
    const zuhdMainTimeline = gsap.timeline()

    // Header Animation
    const headerSection = $(".zuhd-header-section")
    if (headerSection) {
      zuhdMainTimeline.to(headerSection, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
    }

    // Vision Section Animation
    const visionTitle = $(".zuhd-vision-section .zuhd-section-title")
    const visionText = $(".zuhd-vision-text")

    if (visionTitle) {
      zuhdMainTimeline.to(
        visionTitle,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3",
      )
    }

    if (visionText) {
      zuhdMainTimeline.to(
        visionText,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4",
      )
    }

    // Founders Section Animation
    const foundersTitle = $(".zuhd-founders-section .zuhd-section-title")
    const founderCard = $(".zuhd-founder-card")

    if (foundersTitle) {
      zuhdMainTimeline.to(
        foundersTitle,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.2",
      )
    }

    if (founderCard) {
      zuhdMainTimeline.to(
        founderCard,
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4",
      )
    }

    // Timeline Section Animation
    const timelineTitle = $(".zuhd-timeline-section .zuhd-section-title")
    const timelineLine = $(".zuhd-timeline-line")

    if (timelineTitle) {
      zuhdMainTimeline.to(
        timelineTitle,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3",
      )
    }

    if (timelineLine) {
      zuhdMainTimeline.to(
        timelineLine,
        {
          opacity: 1,
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "-=0.2",
      )
    }

    // Timeline Items Animation
    const timelineItems = $all(".zuhd-timeline-item")
    timelineItems.forEach((item, index) => {
      const timelineDot = item.querySelector(".zuhd-timeline-dot")

      zuhdMainTimeline
        .to(
          item,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          `-=${1.2 - index * 0.2}`,
        )
        .to(
          timelineDot,
          {
            scale: 1,
            duration: 0.4,
            ease: "back.out(2)",
          },
          "-=0.3",
        )
    })

    // Completion callback
    zuhdMainTimeline.eventCallback("onComplete", () => {
      console.log("Zuhd About Us page animations completed!")

      // Add breathing animation to main title
      const mainTitle = $(".zuhd-main-title")
      if (mainTitle) {
        gsap.to(mainTitle, {
          scale: 1.02,
          duration: 2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        })
      }
    })
  })

  // Founder image hover animation
  const founderImage = $(".zuhd-founder-image-container")
  if (founderImage) {
    founderImage.addEventListener("mouseenter", () => {
      safeGsap(() => {
        gsap.to(founderImage, {
          scale: 1.05,
          rotation: 2,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })

    founderImage.addEventListener("mouseleave", () => {
      safeGsap(() => {
        gsap.to(founderImage, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })
  }

  // Timeline dots pulse animation
  const timelineDots = $all(".zuhd-timeline-dot")
  timelineDots.forEach((dot, index) => {
    safeGsap(() => {
      gsap.to(dot, {
        scale: 1.2,
        duration: 0.8,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.2,
      })
    })
  })

  // Text reveal animation on scroll
  const textElements = $all(".zuhd-vision-text, .zuhd-founder-description")
  textElements.forEach((text) => {
    const words = text.textContent.split(" ")
    text.innerHTML = words.map((word) => `<span class="zuhd-word">${word}</span>`).join(" ")

    safeGsap(() => {
      gsap.fromTo(
        text.querySelectorAll(".zuhd-word"),
        {
          opacity: 0.3,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })
  })

  // Parallax effect for sections
  const sections = $all(".zuhd-vision-section, .zuhd-founders-section, .zuhd-timeline-section")
  sections.forEach((section) => {
    safeGsap(() => {
      gsap.to(section, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    })
  })
}

/* =================================================================== */
/*  GLOBAL FUNCTIONS                                                    */
/* =================================================================== */
// Video functions
window.playVideo =
  window.playVideo ||
  ((videoId) => {
    console.log(`Playing video: ${videoId || "default"}`)
  })

// Social functions
window.openInstagramPost = (postId) => {
  console.log(`Opening Instagram post ${postId}`)
}

window.openYouTube = () => {
  console.log("Opening YouTube channel")
  window.open("https://youtube.com", "_blank")
}

window.openInstagram = () => {
  console.log("Opening Instagram profile")
  window.open("https://instagram.com", "_blank")
}

window.openCommunity = () => {
  console.log("Opening community page")
}

// Blog functions
window.openBlog = (type) => {
  console.log(`Opening ${type || "general"} blog`)
}

window.openMore = () => {
  console.log("More options coming soon...")
  showNotification("More options coming soon!", "info")
}

/* =================================================================== */
/*  ACCESSIBILITY ENHANCEMENTS                                          */
/* =================================================================== */
function initAccessibility() {
  // Add ARIA labels
  const playBtn = $(".ziyarat-play-btn")
  if (playBtn) {
    playBtn.setAttribute("aria-label", "Play Makkah experience video")
  }

  const navButtons = $all(".ziyarat-nav-btn")
  navButtons.forEach((btn) => {
    btn.setAttribute("aria-label", `Filter by ${btn.textContent}`)
  })

  const cards = $all(".ziyarat-card")
  cards.forEach((card) => {
    const title = card.querySelector(".ziyarat-card-title")?.textContent
    if (title) {
      card.setAttribute("aria-label", `Learn more about ${title}`)
    }
  })

  // Keyboard navigation improvements
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation")
    }
  })

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation")
  })

  // Skip to main content link
  const skipLink = document.createElement("a")
  skipLink.href = "#main-content"
  skipLink.textContent = "Skip to main content"
  skipLink.className = "skip-link"
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--deep-green, #0f3d2e);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `

  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "6px"
  })

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px"
  })

  document.body.insertBefore(skipLink, document.body.firstChild)
}

/* =================================================================== */
/*  PERFORMANCE MONITORING                                              */
/* =================================================================== */
function initPerformanceMonitoring() {
  if ("PerformanceObserver" in window) {
    const performanceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "measure") {
          console.log(`${entry.name}: ${entry.duration}ms`)
        }
      }
    })
    performanceObserver.observe({ entryTypes: ["measure"] })
  }

  // Monitor long tasks
//   if ("PerformanceObserver" in window) {
//     const longTaskObserver = new PerformanceObserver((list) => {
//       for (const entry of list.getEntries()) {
//         console.warn(`Long task detected: ${entry.duration}ms`)
//       }
//     })

//     try {
//       longTaskObserver.observe({ entryTypes: ["longtask"] })
//     } catch (e) {
//       // longtask not supported in all browsers
//     }
//   }
// }

/* =================================================================== */
/*  ERROR HANDLING                                                      */
/* =================================================================== */
function initErrorHandling() {
  window.addEventListener("error", (e) => {
    console.error("JavaScript error:", e.error)
    console.error("Error details:", {
      message: e.message,
      filename: e.filename,
      lineno: e.lineno,
      colno: e.colno,
    })
  })

  window.addEventListener("unhandledrejection", (e) => {
    console.error("Unhandled promise rejection:", e.reason)
  })
}

/* =================================================================== */
/*  MAKTAB FUNCTIONALITY                                                */
/* =================================================================== */
function initMaktabFunctionality() {
  // Add scroll effect to banner
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const banner = document.querySelector(".banner-wrapper")
    const rate = scrolled * -0.3

    if (banner) {
      banner.style.transform = `translateY(${rate}px)`
    }
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe service boxes for animation
  document.addEventListener("DOMContentLoaded", () => {
    const serviceBoxes = document.querySelectorAll(".service-box")

    serviceBoxes.forEach((box, index) => {
      box.style.opacity = "0"
      box.style.transform = "translateY(30px)"
      box.style.transition = "opacity 0.8s ease, transform 0.8s ease"
      box.style.transitionDelay = `${index * 0.2}s`

      observer.observe(box)
    })

    // Animate section content
    const contentTitle = document.querySelector(".content-title")
    const contentDescription = document.querySelector(".content-description")
    ;[contentTitle, contentDescription].forEach((element, index) => {
      if (element) {
        element.style.opacity = "0"
        element.style.transform = "translateY(20px)"
        element.style.transition = "opacity 0.8s ease, transform 0.8s ease"
        element.style.transitionDelay = `${index * 0.1}s`
        observer.observe(element)
      }
    })
  })

  // Add loading state
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })

  // Program registration functionality
  window.registerForProgram = (programName) => {
    const message = `Thank you for your interest in "${programName}"!\n\nTo complete your enrollment, please:\n\n1. Call us at (555) 123-4567\n2. Email us at enroll@zuhdmaktab.com\n3. Visit our center at 123 Islamic Center Way\n\nOur admissions team will contact you within 24 hours to discuss:\n• Class schedule and availability\n• Tuition fees and payment plans\n• Required materials and books\n• Assessment (if applicable)\n\nJazakAllahu Khair!`

    alert(message)

    // Optional: Track enrollment interest
    trackRegistrationInterest(programName)
  }

  // Track which programs are most popular
  function trackRegistrationInterest(programName) {
    console.log(`Registration interest tracked for: ${programName}`)

    const interests = JSON.parse(localStorage.getItem("programInterests") || "{}")
    interests[programName] = (interests[programName] || 0) + 1
    localStorage.setItem("programInterests", JSON.stringify(interests))
  }

  // Add animation for program cards
  function animateProgramCards() {
    const programItems = document.querySelectorAll(".program-item")
    const extraItems = document.querySelectorAll(".extra-item")

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 100)
        }
      })
    }, observerOptions)
    ;[...programItems, ...extraItems].forEach((card) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(30px)"
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      cardObserver.observe(card)
    })
  }

  // Initialize program card animations when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(animateProgramCards, 100)
  })

  // Utility function for smooth animations
  function animateOnScroll() {
    const elements = document.querySelectorAll(".animate-on-scroll")

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", animateOnScroll)

  // Initialize animations on page load
  document.addEventListener("DOMContentLoaded", () => {
    animateOnScroll()
  })
}

/* =================================================================== */
/*  MAIN INITIALIZATION                                                 */
/* =================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  console.log("Islamic website script loading...")

  // Initialize error handling first
  initErrorHandling()

  // Initialize GSAP
  initializeGSAP()

  // Initialize all functionality
  try {
    initLoadingAnimation()
    initVideoModal()
    initSearchFunctionality()
    initFilterFunctionality()
    initQuoteFunctionality()
    initDonationFunctionality()
    initZiyaratFunctionality()
    initZuhdAboutFunctionality()
    initContentObserver()
    initAccessibility()
    initPerformanceMonitoring()
    initMaktabFunctionality()

    console.log("All modules initialized successfully")
  } catch (error) {
    console.error("Initialization error:", error)
  }

  // Add loading completion
  setTimeout(() => {
    document.body.classList.add("loaded")
    console.log("Islamic website fully loaded and ready")
  }, 100)
})

// Handle window load
window.addEventListener("load", () => {
  console.log("Islamic website page fully loaded")

  // Add subtle animations after load
  setTimeout(() => {
    const mapMarkers = $all(".ziyarat-map-marker")
    mapMarkers.forEach((marker, index) => {
      setTimeout(
        () => {
          marker.style.animation = `ziyaratFloat 3s ease-in-out infinite`
          marker.style.animationDelay = `${index * 0.5}s`
        },
        2000 + index * 500,
      )
    })
  }, 1000)
})

// Handle window resize
const handleResize = debounce(() => {
  const isMobile = window.innerWidth <= 768

  // Adjust animations for mobile
  if (isMobile) {
    const cards = $all(".ziyarat-card")
    cards.forEach((card) => {
      card.style.animationDuration = "0.6s"
    })
  }
}, 250)

window.addEventListener("resize", handleResize)

// Initialize resize check
handleResize()

console.log("Islamic website main script initialized successfully")
}




 // Mobile Footer Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all footer columns (excluding logo and newsletter)
    const footerColumns = document.querySelectorAll('.footer-column:not(.footer-logo):not(.newsletter)');
    
    footerColumns.forEach(column => {
        const header = column.querySelector('h3');
        
        if (header) {
            header.addEventListener('click', function() {
                // Check if we're on mobile (you can adjust this breakpoint as needed)
                if (window.innerWidth <= 768) {
                    // Toggle active class
                    column.classList.toggle('active');
                    
                    // Optional: Close other sections (accordion behavior)
                    // footerColumns.forEach(otherColumn => {
                    //     if (otherColumn !== column) {
                    //         otherColumn.classList.remove('active');
                    //     }
                    // });
                }
            });
        }
    });
    
    // Handle window resize to reset accordion on larger screens
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            footerColumns.forEach(column => {
                column.classList.remove('active');
            });
        }
    });
});

// Existing functions
function linkClick(item) {
    console.log('Link clicked:', item);
    // Add your analytics or tracking code here
}

function socialClick(platform) {
    console.log('Social link clicked:', platform);
    // Add your analytics or tracking code here
}

function submitNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    console.log('Newsletter submitted with email:', email);
    
    // Add your newsletter submission logic here
    // Example:
    // fetch('/api/newsletter', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email: email })
    // });
    
    // Show success message
    alert('Thank you for subscribing!');
    event.target.reset();
}

/* =================================================================== */
/*  END OF SCRIPT                                                       */
/* =================================================================== */
