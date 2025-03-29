class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                header {
                    background-color: var(--light-color);
                    color: var(--secondary-color);
                    padding: 1.5rem;
                    box-shadow: var(--box-shadow);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }
                
                .header-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                h1 {
                    font-size: 1.8rem;
                    font-weight: 600;
                }
                
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .logo-icon {
                    font-size: 2rem;
                }
                
                @media (max-width: 600px) {
                    h1 {
                        font-size: 1.4rem;
                    }
                    
                    .logo-icon {
                        font-size: 1.6rem;
                    }
                }
            </style>
            <header>
                <div class="header-container">
                    <div class="logo">
                        <h1>Notes App</h1>
                    </div>
                    <div class="welcome">
                        <p>Welcome!</p>
                    </div>
                </div>
            </header>
        `;
    }
}

customElements.define('app-header', AppHeader);