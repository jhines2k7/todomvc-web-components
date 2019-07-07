class TodoMvcAppFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer class="info">
                <p>Double-click to edit a todo</p>
                <!-- Remove the below line ↓ -->
                <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
                <!-- Change this out with your name and url ↓ -->
                <p>Created by <a href="https://jhinesconsulting.com">jhinesconsulting.com</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        `;
    }
}

customElements.define('todomvc-app-footer', TodoMvcAppFooter);