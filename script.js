// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // --- TAB SWITCHING LOGIC ---
    const tabs = document.querySelectorAll('.nav-tab');
    const contentPanes = document.querySelectorAll('.content-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.target;

            tabs.forEach(t => t.classList.remove('active'));
            contentPanes.forEach(pane => pane.classList.remove('active'));
            
            tab.classList.add('active');
            
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // --- NOTEPAD FUNCTIONALITY ---
    const noteInput = document.getElementById('note-input');
    const saveNoteBtn = document.getElementById('save-note-btn');
    const notesList = document.getElementById('notes-list');

    // Function to add a new note
    const addNote = () => {
        const noteText = noteInput.value.trim();

        if (noteText === '') {
            // Do not add empty notes
            return;
        }

        // Create the note item container
        const noteItem = document.createElement('div');
        noteItem.classList.add('note-item');

        // Create the text element
        const noteTextElement = document.createElement('span');
        noteTextElement.classList.add('note-text');
        noteTextElement.textContent = noteText;

        // Create the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        
        // Assemble the note item
        noteItem.appendChild(noteTextElement);
        noteItem.appendChild(deleteBtn);
        
        // Add the new note to the list
        notesList.appendChild(noteItem);

        // Clear the input field
        noteInput.value = '';
    };

    // Event listener for the save button
    if (saveNoteBtn) {
        saveNoteBtn.addEventListener('click', addNote);
    }

    // Event listener for deleting notes (using event delegation)
    if (notesList) {
        notesList.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-btn')) {
                const noteItem = event.target.parentElement;
                notesList.removeChild(noteItem);
            }
        });
    }
});
