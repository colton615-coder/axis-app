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

    // --- DRILLS MODULE FUNCTIONALITY ---
    const drillForm = document.getElementById('drill-form');
    const drillsList = document.getElementById('drills-list');

    const getDrills = () => JSON.parse(localStorage.getItem('axis-app-drills')) || [];
    const saveDrills = (drills) => localStorage.setItem('axis-app-drills', JSON.stringify(drills));

    const renderDrills = () => {
        drillsList.innerHTML = ''; // Clear the list before rendering
        const drills = getDrills();
        drills.forEach(drill => {
            const drillElement = document.createElement('div');
            drillElement.classList.add('drill-item');
            drillElement.dataset.id = drill.id;

            drillElement.innerHTML = `
                <div class="drill-header">
                    <span class="drill-title-category">
                        ${drill.title}
                        <span class="drill-category-badge">${drill.category}</span>
                    </span>
                    <button class="delete-btn">Delete</button>
                </div>
                <div class="drill-content">
                    <p>${drill.description}</p>
                </div>
            `;
            drillsList.appendChild(drillElement);
        });
    };

    if (drillForm) {
        drillForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newDrill = {
                id: Date.now(),
                title: document.getElementById('drill-title').value,
                category: document.getElementById('drill-category').value,
                description: document.getElementById('drill-description').value,
            };
            const drills = getDrills();
            drills.push(newDrill);
            saveDrills(drills);
            renderDrills();
            drillForm.reset();
        });
    }

    if (drillsList) {
        drillsList.addEventListener('click', (e) => {
            const drillItem = e.target.closest('.drill-item');
            if (!drillItem) return;
            
            const drillId = Number(drillItem.dataset.id);
            
            // Handle delete button click
            if (e.target.classList.contains('delete-btn')) {
                let drills = getDrills();
                drills = drills.filter(drill => drill.id !== drillId);
                saveDrills(drills);
                renderDrills();
            }
            // Handle accordion toggle
            else if (e.target.closest('.drill-header')) {
                const content = drillItem.querySelector('.drill-content');
                content.classList.toggle('visible');
            }
        });
    }
    
    // --- NOTEPAD FUNCTIONALITY ---
    const noteInput = document.getElementById('note-input');
    const saveNoteBtn = document.getElementById('save-note-btn');
    const notesList = document.getElementById('notes-list');

    const saveNotes = () => {
        const currentNotes = Array.from(document.querySelectorAll('#notes-list .note-text')).map(note => note.textContent);
        localStorage.setItem('axis-app-notes', JSON.stringify(currentNotes));
    };

    const createNoteElement = (text) => {
        const noteItem = document.createElement('div');
        noteItem.classList.add('note-item');
        noteItem.innerHTML = `<span class="note-text">${text}</span><button class="delete-btn">Delete</button>`;
        notesList.appendChild(noteItem);
    };

    const loadNotes = () => {
        const savedNotes = JSON.parse(localStorage.getItem('axis-app-notes')) || [];
        savedNotes.forEach(noteText => createNoteElement(noteText));
    };

    if (saveNoteBtn) {
        saveNoteBtn.addEventListener('click', () => {
            const noteText = noteInput.value.trim();
            if (noteText) {
                createNoteElement(noteText);
                saveNotes();
                noteInput.value = '';
            }
        });
    }

    if (notesList) {
        notesList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                e.target.closest('.note-item').remove();
                saveNotes();
            }
        });
    }

    // --- INITIAL LOAD ---
    renderDrills();
    loadNotes();
});
