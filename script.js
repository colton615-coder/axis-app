// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Get references to the button and the display area from the HTML
    const actionButton = document.getElementById('action-button');
    const displayArea = document.getElementById('display-area');

    // Check if both elements were found
    if (actionButton && displayArea) {
        
        // Add a click event listener to the button
        actionButton.addEventListener('click', () => {
            // When the button is clicked, update the HTML inside the display area
            displayArea.innerHTML = '<p><strong>Success!</strong> The content has been updated.</p>';
        });

    } else {
        // Log an error to the console if elements are missing
        console.error('Required elements (button or display area) not found.');
    }

});
