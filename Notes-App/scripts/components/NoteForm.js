class NoteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .note-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .form-label {
                    font-weight: 500;
                    color: var(--secondary-color);
                }
                
                .form-input {
                    padding: 0.8rem;
                    border: 1px solid #ced4da;
                    border-radius: var(--border-radius);
                    font-family: inherit;
                    font-size: 1rem;
                    transition: border-color 0.2s ease;
                }
                
                .form-input:focus {
                    outline: none;
                    border-color: var(--accent-color);
                    box-shadow: 0 0 0 2px rgba(72, 149, 239, 0.25);
                }
                
                .form-textarea {
                    min-height: 120px;
                    resize: vertical;
                }
                
                .submit-btn {
                    background-color: var(--primary-color);
                    color: white;
                    padding: 0.8rem 1.5rem;
                    border: none;
                    border-radius: var(--border-radius);
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                    align-self: flex-start;
                }
                
                .submit-btn:hover {
                    background-color: var(--secondary-color);
                }
                
                .submit-btn:disabled {
                    background-color: #adb5bd;
                    cursor: not-allowed;
                }
                
                .error-message {
                    color: var(--warning-color);
                    font-size: 0.8rem;
                    margin-top: 0.25rem;
                    display: none;
                }
                
                .input-error {
                    border-color: var(--warning-color);
                }
                
                .show-error {
                    display: block;
                }
            </style>
            <form class="note-form">
                <div class="form-group">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" id="title" class="form-input" placeholder="Enter note title" required>
                    <span class="error-message" id="title-error">Title must be at least 3 characters</span>
                </div>
                
                <div class="form-group">
                    <label for="body" class="form-label">Content</label>
                    <textarea id="body" class="form-input form-textarea" placeholder="Enter note content" required></textarea>
                    <span class="error-message" id="body-error">Content must be at least 10 characters</span>
                </div>
                
                <button type="submit" class="submit-btn" disabled>Add Note</button>
            </form>
        `;

        this.titleInput = this.shadowRoot.getElementById('title');
        this.bodyInput = this.shadowRoot.getElementById('body');
        this.submitBtn = this.shadowRoot.querySelector('.submit-btn');
        this.titleError = this.shadowRoot.getElementById('title-error');
        this.bodyError = this.shadowRoot.getElementById('body-error');
        this.form = this.shadowRoot.querySelector('.note-form');

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.titleInput.addEventListener('input', this.validateForm.bind(this));
        this.bodyInput.addEventListener('input', this.validateForm.bind(this));
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('add-note', {
                bubbles: true,
                composed: true,
                detail: {
                    title: this.titleInput.value,
                    body: this.bodyInput.value
                }
            }));
            this.form.reset();
            this.submitBtn.disabled = true;
        });
    }

    validateForm() {
        const titleValid = this.titleInput.value.length >= 3;
        const bodyValid = this.bodyInput.value.length >= 10;

        // Title validation
        if (this.titleInput.value.length > 0 && !titleValid) {
            this.titleInput.classList.add('input-error');
            this.titleError.classList.add('show-error');
        } else {
            this.titleInput.classList.remove('input-error');
            this.titleError.classList.remove('show-error');
        }

        // Body validation
        if (this.bodyInput.value.length > 0 && !bodyValid) {
            this.bodyInput.classList.add('input-error');
            this.bodyError.classList.add('show-error');
        } else {
            this.bodyInput.classList.remove('input-error');
            this.bodyError.classList.remove('show-error');
        }

        this.submitBtn.disabled = !(titleValid && bodyValid);
    }
}

customElements.define('note-form', NoteForm);