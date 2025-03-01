document.addEventListener("DOMContentLoaded", () => {
    const downloadButtons = document.querySelectorAll(".download-btn");

    downloadButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Download will start soon!");
        });
    });
});


// Dpwnload-Section

function downloadFile(fileName) {
    const link = document.createElement("a");
    link.href = fileName;  // Change this to the actual file URL
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const voiceBtn = document.getElementById('voice-btn');
    const voiceInput = document.getElementById('voice-input');
    const voiceStatus = document.getElementById('voice-status');

    // Toggle Sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    mobileMenuToggle.addEventListener('click', toggleSidebar);
    sidebarClose.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // Voice Navigation
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            voiceStatus.textContent = 'Listening... Speak now';
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase().trim();
            voiceInput.value = transcript;
            voiceStatus.textContent = '';

            // Voice Navigation Logic
            const navLinks = document.querySelectorAll('.sidebar-nav-links a');
            let foundMatch = false;

            navLinks.forEach(link => {
                if (transcript.includes(link.textContent.toLowerCase())) {
                    link.click();
                    toggleSidebar(); // Close sidebar after navigation
                    foundMatch = true;
                }
            });

            if (!foundMatch) {
                voiceStatus.textContent = 'No matching navigation found';
            }
        };

        recognition.onerror = (event) => {
            voiceStatus.textContent = 'Error occurred in recognition: ' + event.error;
        };

        recognition.onend = () => {
            voiceStatus.textContent = '';
        };

        voiceBtn.addEventListener('click', () => {
            recognition.start();
        });
    } else {
        voiceBtn.style.display = 'none';
        voiceStatus.textContent = 'Voice recognition not supported';
    }
});
   // Function to create month calendar
   function createMaktabMonths() {
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
                  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    const calendarGrid = document.querySelector('.maktab-months-grid');
    
    months.forEach(month => {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'maktab-month-box';
        monthDiv.innerHTML = `
            <div class="maktab-month-name">${month}</div>
            <div class="maktab-days-grid">
                ${createMaktabDays()}
            </div>
        `;
        calendarGrid.appendChild(monthDiv);
    });
}

// Function to create days for each month
function createMaktabDays() {
    let days = '';
    for(let i = 1; i <= 31; i++) {
        days += `<div class="maktab-day-cell">${i}</div>`;
    }
    return days;
}

// Download function
function downloadMaktabCalendar() {
    alert('Maktab Calendar download started...');
    // Add actual download functionality here
}

// View function
function viewMaktabCalendar() {
    alert('Opening Maktab Calendar in full view...');
    // Add actual view functionality here
}

// Initialize calendar
createMaktabMonths();