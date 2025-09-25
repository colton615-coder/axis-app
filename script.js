// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.nav-tab');
    const contentPanes = document.querySelectorAll('.content-pane');

    // Add a click event listener to each tab
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Get the target content ID from the data-target attribute
            const targetId = tab.dataset.target;

            // Remove 'active' class from all tabs and content panes
            tabs.forEach(t => t.classList.remove('active'));
            contentPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add 'active' class to the clicked tab
            tab.classList.add('active');
            
            // Add 'active' class to the corresponding content pane
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            } else {
                console.error(`Content pane with ID "${targetId}" not found.`);
            }
        });
    });
});
