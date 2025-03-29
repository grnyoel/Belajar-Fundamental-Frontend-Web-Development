import { notesData } from './notes.js';

class NotesApp {
    constructor() {
        this.notes = [...notesData];
        this.notesContainer = document.getElementById('notesContainer');
        this.init();
    }

    init() {
        this.renderNotes();
        this.setupEventListeners();
    }

    renderNotes() {
        this.notesContainer.innerHTML = '';
        
        this.notes.forEach(note => {
            const noteElement = document.createElement('note-item');
            noteElement.setAttribute('note-id', note.id);
            noteElement.setAttribute('title', note.title);
            noteElement.setAttribute('body', note.body);
            noteElement.setAttribute('created-at', note.createdAt);
            noteElement.setAttribute('archived', note.archived);
            
            this.notesContainer.appendChild(noteElement);
        });
    }

    setupEventListeners() {
        document.addEventListener('add-note', (e) => {
            const newNote = {
                id: `notes-${Math.random().toString(36).substr(2, 9)}`,
                title: e.detail.title,
                body: e.detail.body,
                createdAt: new Date().toISOString(),
                archived: false
            };
            
            this.notes.unshift(newNote);
            this.renderNotes();
        });

        document.addEventListener('archive', (e) => {
            const noteIndex = this.notes.findIndex(note => note.id === e.detail.id);
            if (noteIndex !== -1) {
                this.notes[noteIndex].archived = !this.notes[noteIndex].archived;
                this.renderNotes();
            }
        });

        document.addEventListener('delete', (e) => {
            this.notes = this.notes.filter(note => note.id !== e.detail.id);
            this.renderNotes();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NotesApp();
});