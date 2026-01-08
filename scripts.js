// Array of different "NO" responses
const noResponses = [
    "NO!",
    "NOPE!",
    "NO WAY!",
    "NEVER!",
    "ABSOLUTELY NOT!",
    "NAH!",
    "NOT A CHANCE!",
    "FORGET IT!",
    "NO NO NO!",
    "NOOOO!",
    "UH-UH!",
    "NOT HAPPENING!",
    "DENIED!",
    "NEGATIVE!",
    "NO THANKS!",
];

let clickCount = 0;

// Get elements
const grumpyCat = document.getElementById('grumpy-cat');
const palmTree = document.getElementById('palm-tree');
const responseDiv = document.getElementById('response');
const clickCounter = document.getElementById('click-counter');

// Function to get random response
function getRandomResponse() {
    return noResponses[Math.floor(Math.random() * noResponses.length)];
}

// Function to get random color
function getRandomColor() {
    const colors = ['#ff6b6b', '#ff0000', '#ff3333', '#cc0000', '#ff5555', '#ee0000'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Click event handler
grumpyCat.addEventListener('click', function() {
    // Increment click counter
    clickCount++;
    clickCounter.textContent = `Clicks: ${clickCount}`;
    
    // Add shake animation
    grumpyCat.classList.add('shake');
    setTimeout(() => {
        grumpyCat.classList.remove('shake');
    }, 500);
    
    // Display random "NO" response
    const response = getRandomResponse();
    responseDiv.textContent = response;
    responseDiv.style.color = getRandomColor();
    
    // Add pop-in animation
    responseDiv.classList.remove('show');
    void responseDiv.offsetWidth; // Trigger reflow
    responseDiv.classList.add('show');
    
    // Play a sound effect (browser will make a default click sound)
    // Optional: Add your own sound effect here
    
    // Special message after many clicks
    if (clickCount === 10) {
        responseDiv.textContent = "STILL NO!";
    } else if (clickCount === 20) {
        responseDiv.textContent = "SERIOUSLY, NO!";
    } else if (clickCount === 50) {
        responseDiv.textContent = "NO MEANS NO!";
    } else if (clickCount === 100) {
        responseDiv.textContent = "ARE YOU KIDDING ME?!";
    }
});

// Add hover effect to pupils (follow cursor slightly)
grumpyCat.addEventListener('mousemove', function(e) {
    const pupils = document.querySelectorAll('.pupil');
    const rect = grumpyCat.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    pupils.forEach(pupil => {
        const moveX = x / 30;
        const moveY = y / 30;
        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Reset pupil position when mouse leaves
grumpyCat.addEventListener('mouseleave', function() {
    const pupils = document.querySelectorAll('.pupil');
    pupils.forEach(pupil => {
        pupil.style.transform = 'translate(0, 0)';
    });
});

// Initial message
responseDiv.textContent = "👇 Click me!";
responseDiv.style.color = '#ffffff';

// Palm Tree Click Handler
palmTree.addEventListener('click', function() {
    // Add sway animation
    palmTree.classList.add('sway');
    setTimeout(() => {
        palmTree.classList.remove('sway');
    }, 500);
    
    // Generate random number 0-9
    const randomNumber = Math.floor(Math.random() * 10);
    
    // Display the number
    responseDiv.textContent = randomNumber;
    responseDiv.style.color = '#4a7c2c'; // Green color matching the palm leaves
    
    // Add pop-in animation
    responseDiv.classList.remove('show');
    void responseDiv.offsetWidth; // Trigger reflow
    responseDiv.classList.add('show');
});








