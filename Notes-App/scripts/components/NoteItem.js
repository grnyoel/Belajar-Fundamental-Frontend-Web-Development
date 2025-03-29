class NoteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['title', 'body', 'created-at', 'archived'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || 'No Title';
        const body = this.getAttribute('body') || 'No Content';
        const createdAt = this.getAttribute('created-at') || '';
        const archived = this.getAttribute('archived') === 'true';

        const date = new Date(createdAt);
        const formattedDate = createdAt ? date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) : '';

        this.shadowRoot.innerHTML = `
            <style>
                .note-card {
                    background-color: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid #e0e0e0;
                    overflow: hidden;
                    break-inside: avoid;
                }
                
                .note-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
                }
                
                .note-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin: 0 0 0.75rem 0;
                    color: #2d3e50;
                    line-height: 1.4;
                }
                
                .note-body {
                    color: #4a4a4a;
                    margin: 0 0 1.25rem 0;
                    flex-grow: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 5;
                    -webkit-box-orient: vertical;
                    line-height: 1.5;
                    font-size: 0.95rem;
                }
                
                .note-date {
                    font-size: 0.8rem;
                    color: #8e8e8e;
                    margin: 0 0 1rem 0;
                }
                
                .note-actions {
                    display: flex;
                    justify-content: space-between;
                    gap: 0.75rem;
                }
                
                .action-btn {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    font-size: 0.85rem;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .archive-btn {
                    background-color: ${archived ? '#f0f7ff' : '#f0f7ff'};
                    color: ${archived ? '#1a73e8' : '#1a73e8'};
                    border: 1px solid ${archived ? '#1a73e8' : '#d0e3ff'};
                }
                
                .archive-btn:hover {
                    background-color: #e1f0ff;
                    border-color: #1a73e8;
                }
                
                .delete-btn {
                    background-color: #fff5f7;
                    color: #e53958;
                    border: 1px solid #ffd6de;
                }
                
                .delete-btn:hover {
                    background-color: #ffeef1;
                    border-color: #e53958;
                }
            </style>
            <div class="note-card">
                <h3 class="note-title">${title}</h3>
                <p class="note-body">${body}</p>
                <p class="note-date">${formattedDate}</p>
                <div class="note-actions">
                    <button class="action-btn archive-btn">
                        ${archived ? 'Unarchive' : 'Archive'}
                    </button>
                    <button class="action-btn delete-btn">Delete</button>
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('.archive-btn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('archive', {
                bubbles: true,
                composed: true,
                detail: { id: this.getAttribute('note-id') }
            }));
        });

        this.shadowRoot.querySelector('.delete-btn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('delete', {
                bubbles: true,
                composed: true,
                detail: { id: this.getAttribute('note-id') }
            }));
        });
    }
}

customElements.define('note-item', NoteItem);