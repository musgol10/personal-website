document.addEventListener('DOMContentLoaded', function() {

    // --- Page State and Navigation ---
    let currentPage = document.getElementById("front");

    // Centralized function to show any page/popup
    window.showPage = function(pageId) {
        const newPage = document.getElementById(pageId);
        if (!newPage) {
            console.error("Page not found:", pageId);
            return;
        }

        if (currentPage === newPage && pageId !== 'front') {
            closePopup();
        } else if (currentPage !== newPage) {
            if (currentPage) {
                currentPage.classList.replace('fadeIn', 'fadeOut');
            }
            newPage.classList.replace('fadeOut', 'fadeIn');
            currentPage = newPage;
        }
    }

    // Function to close any open popup and return to the front page
    window.closePopup = function() {
        const frontPage = document.getElementById('front');
        if (currentPage && currentPage !== frontPage) {
            currentPage.classList.replace('fadeIn', 'fadeOut');
            frontPage.classList.replace('fadeOut', 'fadeIn');
            currentPage = frontPage;
        }
    }

    window.toggleSection = (element, targetId) => {
        const target = document.getElementById(targetId);
        if (!target) return;
        const isClosed = target.classList.toggle('closed');
        target.classList.toggle('open', !isClosed);
        element.innerHTML = isClosed ? "+" : "-";
    };

    // --- Starry background effect ---
    const starColors = ["#1f0c6e", "#281185", "#482ac3", "#7155e3", "#cec3ff"];
    const starsContainer = document.querySelector("#stars");
    if (starsContainer) {
        const stars = new Array(200).fill(0).map(() => {
            const starEl = document.createElement("div");
            starEl.style.background = starColors[Math.floor(Math.random() * starColors.length)];
            starsContainer.append(starEl);
            return {
                star: starEl,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                r: 5.3 * Math.random(),
                rs: Math.random() * window.innerWidth > 450 ? 3.3 : 2
            };
        });

        function animateStars() {
            stars.forEach((star) => {
                star.x += star.r / 20;
                if (star.x > window.innerWidth) {
                    star.x = 0;
                }
                star.star.style.transform = `translate(${star.x}px, ${star.y}px) scale(${star.rs})`;
                star.star.style.opacity = 0.2 + (star.r / 4);
            });
            requestAnimationFrame(animateStars);
        }
        animateStars();
    }

            
    const terminal = document.getElementById('terminal');
    const terminalHeader = document.getElementById('terminal-header'); // Get the header
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    let commandHistory = [];
    let historyIndex = -1;

    function toggleTerminal() {
        terminal.classList.toggle('hidden');
        if (!terminal.classList.contains('hidden')) {
            terminalInput.focus();
            if(terminalOutput.innerHTML === '') {
                printToTerminal("Welcome to ALI-SHELL. Type 'help' for a list of commands.");
            }
        }
    }
    
    window.closeTerminal = () => terminal.classList.add('hidden');

    function printToTerminal(text, type = 'response') {
        const line = document.createElement('pre');
        line.className = `terminal-line ${type}`;
        line.textContent = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    window.closeTerminal = () => terminal.classList.add('hidden');

    function printToTerminal(text, type = 'response') {
        const line = document.createElement('pre');
        line.className = `terminal-line ${type}`;
        line.textContent = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function processCommand(command) {
        printToTerminal(`> ${command}`, 'command');
        commandHistory.push(command);
        historyIndex = commandHistory.length;

        const [cmd, ...args] = command.trim().toLowerCase().split(' ');

        switch (cmd) {
            case 'help':
                printToTerminal(
                    `Available Commands:\n` +
                    `  help          - Shows this list of commands\n` +
                    `  ls            - List available sections (e.g., 'ls projects')\n` +
                    `  cat           - Display content (e.g., 'cat bio.txt')\n` +
                    `  goto          - Navigate to a page (e.g., 'goto projects')\n` +
                    `  play          - Play a music track (e.g., 'play music2.xm')\n` +
                    `  clear         - Clears the terminal screen\n` +
                    `  exit          - Closes the terminal`
                );
                break;
            case 'ls':
                if (args[0] === 'projects') {
                    const projectTitles = Array.from(document.querySelectorAll('.project-title')).map(p => `- ${p.innerText}`).join('\n');
                    printToTerminal(`Projects:\n${projectTitles}`);
                } else {
                    printToTerminal("Usage: ls [projects]");
                }
                break;
            case 'cat':
                if (args[0] === 'bio.txt') {
                    const bioText = Array.from(document.querySelectorAll('#bio .desc .open')).map(d => d.innerText).join('\n\n');
                    printToTerminal(bioText);
                } else {
                    printToTerminal("Usage: cat [bio.txt]");
                }
                break;
            case 'goto':
                const pageId = args[0];
                if (['bio', 'projects', 'case-studies', 'ai-research', 'my-toolkit'].includes(pageId)) {
                    showPage(pageId);
                    printToTerminal(`Navigating to ${pageId}...`);
                } else {
                    printToTerminal(`Error: Page '${pageId}' not found.`, 'error');
                }
                break;
            case 'play':
                const songName = args[0];
                if (songName && window.XMPlayer) {
                    loadAndPlaySong(`../beats/${songName}`);
                    printToTerminal(`Attempting to play ${songName}...`);
                } else {
                    printToTerminal("Usage: play [song_filename.xm]", 'error');
                }
                break;
            case 'clear':
                terminalOutput.innerHTML = '';
                break;
            case 'exit':
                closeTerminal();
                break;
            default:
                printToTerminal(`Command not found: ${cmd}. Type 'help' for options.`, 'error');
                break;
        }
    }

    let isDragging = false;
    let offsetX, offsetY;

    // When the mouse is pressed down on the header, start the drag
    terminalHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        // Calculate the offset from the top-left corner of the terminal
        offsetX = e.clientX - terminal.offsetLeft;
        offsetY = e.clientY - terminal.offsetTop;

        // Prevent text selection while dragging
        document.body.style.userSelect = 'none';
    });

    // When the mouse moves, update the terminal's position
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        // Calculate new position
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;

        // Apply the new position
        terminal.style.left = `${newX}px`;
        terminal.style.top = `${newY}px`;
    });

    // When the mouse is released, stop the drag
    document.addEventListener('mouseup', () => {
        isDragging = false;
        // Re-enable text selection
        document.body.style.userSelect = 'auto';
    });

    // Event listener for the main trigger key
    document.addEventListener('keydown', (e) => {
        if (e.key === '$' || e.key === '@') {
            e.preventDefault();
            toggleTerminal();
        }
    });

    // Event listener for terminal input
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && terminalInput.value) {
            e.preventDefault();
            processCommand(terminalInput.value);
            terminalInput.value = '';
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        // Handle Tab to open/close
        if (e.key === 'U+001B') {
            e.preventDefault(); 
            toggleTerminal();
        }
        // FIX: Added this check to close the terminal with the Escape key.
        if (e.key === 'Escape') {
            closeTerminal();
        }
    });

    // --- XM Music Player Initialization ---
    if (window.XMPlayer) {
        const player = window.XMPlayer;
        let musicReady = false;

        player.init();

        function unlockAndPlayAudio() {
            if (player.audioctx && player.audioctx.state === 'suspended') {
                player.audioctx.resume();
            }
            if (musicReady && !player.playing) {
                player.play();
                // FIX: ALWAYS set the icon to mute when this function successfully plays.
                document.getElementById("playpause").innerHTML = "🔇";
            }
            localStorage.setItem('audioUnlockedByAli', 'true');
            document.removeEventListener('click', unlockAndPlayAudio);
            document.removeEventListener('touchstart', unlockAndPlayAudio);
        }

        function loadSong(url) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "arraybuffer";
            const playPauseButton = document.getElementById("playpause");
            playPauseButton.innerHTML = "⏳";

            xhr.onload = function() {
                if (xhr.status === 200 && xhr.response) {
                    if(player.load(xhr.response)) {
                        musicReady = true;
                        playPauseButton.disabled = false;
                        
                        // Set up the main click handler with the corrected logic
                        playPauseButton.onclick = function() {
                            if (player.playing) {
                                player.pause();
                                playPauseButton.innerHTML = "🔊";
                            } else {
                                // This handles both the first click and subsequent plays
                                unlockAndPlayAudio();
                            }
                        };

                        // Autoplay if permission was granted on a previous visit
                        if (localStorage.getItem('audioUnlockedByAli') === 'true') {
                            unlockAndPlayAudio();
                        } else {
                            // If it's the first visit, show the "unmuted" icon, indicating it's ready to play.
                            playPauseButton.innerHTML = "🔊";
                        }
                    } else {
                         playPauseButton.innerHTML = "ERR";
                    }
                } else {
                    playPauseButton.innerHTML = "ERR";
                }
            };
            xhr.onerror = function() {
                playPauseButton.innerHTML = "ERR";
            };
            xhr.send(null);
        }
        
        // Add a one-time listener for the very first interaction if no permission is stored
        if (localStorage.getItem('audioUnlockedByAli') !== 'true') {
             document.addEventListener('click', unlockAndPlayAudio);
             document.addEventListener('touchstart', unlockAndPlayAudio);
        }

        const songList = ["calm.xm", "chillout.xm", "arcadeaction.xm", "music2.xm", "dbz.xm", "clocks.xm"];
        const songToPlay = songList[0]; // Simplified for now
        loadSong("../beats/" + songToPlay);
    }

    // --- Easter Eggs and Effects ---
    // (Rest of the file is the same)

    const profileImage = document.querySelector(".profile img");
    if (profileImage) {
        profileImage.addEventListener("click", function() {
            this.classList.toggle("rotate-animation");
        });
    }

    const langToggleButton = document.getElementById("toggleLang");
    if (langToggleButton) {
        let isFrench = false;
        langToggleButton.onclick = function() {
            isFrench = !isFrench;
            langToggleButton.innerHTML = isFrench ? "EN" : "FR";
            document.documentElement.lang = isFrench ? "fr" : "en";
            document.body.style.fontFamily = isFrench ? "'Pixelify Sans', monospace" : "";
            const translatableElements = document.getElementsByClassName("trans");
            for (let i = 0; i < translatableElements.length; i++) {
                const el = translatableElements[i];
                const currentText = el.innerHTML;
                const newText = el.getAttribute("trans");
                el.innerHTML = newText;
                el.setAttribute("trans", currentText);
            }
        };
    }

    const loadingScreen = document.getElementById("loading");
    if (loadingScreen && currentPage) {
        setTimeout(() => {
            showPage('front'); // Use the new navigation function
            setTimeout(() => loadingScreen.remove(), 1500);
        }, 500);
    }
});
