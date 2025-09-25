// Initialize the Vanilla-Tilt.js library on our glass cards
VanillaTilt.init(document.querySelectorAll(".glass-card"), {
    max: 15,      // Max tilt rotation (degrees)
    speed: 400,   // Speed of the enter/exit transition
    glare: true,  // If it should have a "glare" effect
    "max-glare": 0.5 // The opacity of the glare
});
