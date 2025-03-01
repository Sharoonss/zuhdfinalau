document.addEventListener("DOMContentLoaded", function () {
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar").innerHTML = data;
            initSidebar(); // Initialize sidebar after navbar loads
            initVoiceRecognition(); // Initialize voice functionality after navbar loads
        })
        .catch(error => console.error("Error loading navbar:", error));
});

function initSidebar() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');

    if (!mobileMenuToggle || !sidebarClose || !sidebar || !overlay) {
        console.error("One or more sidebar elements are missing!");
        return;
    }

    // Toggle Sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    mobileMenuToggle.addEventListener('click', toggleSidebar);
    sidebarClose.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);
}

function initVoiceRecognition() {
    const voiceBtn = document.getElementById('voice-btn');
    const voiceInput = document.getElementById('voice-input');
    const voiceStatus = document.getElementById('voice-status');

    if (!voiceBtn || !voiceInput || !voiceStatus) {
        console.error("Voice recognition elements are missing!");
        return;
    }

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
                    foundMatch = true;
                }
            });

            if (!foundMatch) {
                voiceStatus.textContent = 'No matching navigation found';
            }
        };

        recognition.onerror = (event) => {
            voiceStatus.textContent = 'Error: ' + event.error;
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
}
