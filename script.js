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

    // Function to save all notes currently in the DOM to localStorage
    const saveNotes = () => {
        const currentNotes = [];
        document.querySelectorAll('#notes-list .note-text').forEach(note => {
            currentNotes.push(note.textContent);
        });
        localStorage.setItem('axis-app-notes', JSON.stringify(currentNotes));
    };

    // Function to create a single note element in the DOM
    const createNoteElement = (text) => {
        const noteItem = document.createElement('div');
        noteItem.classList.add('note-item');

        const noteTextElement = document.createElement('span');
        noteTextElement.classList.add('note-text');
        noteTextElement.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        
        noteItem.appendChild(noteTextElement);
        noteItem.appendChild(deleteBtn);
        
        notesList.appendChild(noteItem);
    };

    // Function to load notes from localStorage when the app starts
    const loadNotes = () => {
        const savedNotes = JSON.parse(localStorage.getItem('axis-app-notes')) || [];
        savedNotes.forEach(noteText => {
            createNoteElement(noteText);
        });
    };

    // Event listener for the save button to add a new note
    if (saveNoteBtn) {
        saveNoteBtn.addEventListener('click', () => {
            const noteText = noteInput.value.trim();
            if (noteText) {
                createNoteElement(noteText);
                saveNotes(); // Save after adding
                noteInput.value = '';
            }
        });
    }

    // Event listener for deleting notes (using event delegation)
    if (notesList) {
        notesList.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-btn')) {
                const noteItem = event.target.parentElement;
                notesList.removeChild(noteItem);
                saveNotes(); // Save after deleting
            }
        });
    }

    // --- INITIAL LOAD ---
    // Load any saved notes as soon as the page is ready
    loadNotes();
});
