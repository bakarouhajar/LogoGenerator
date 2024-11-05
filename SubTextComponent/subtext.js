class SubTextDisplay extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        fetch('SubTextComponent/subtext.html')
            .then(response => response.text())
            .then(html => {
                this.shadowRoot.innerHTML = html;

                const linkElement = document.createElement('link');
                linkElement.rel = 'stylesheet';
                linkElement.href = 'SubTextComponent/subtext.css';
                this.shadowRoot.appendChild(linkElement);

                this.initialize();
            });
    }

    initialize() {
        const input = this.shadowRoot.querySelector('#subtextInput');
        const fontSizeRange = this.shadowRoot.querySelector('#fontSizeRange');
        const fontSizeValue = this.shadowRoot.querySelector('#fontSizeValue');
        const colorPicker = this.shadowRoot.querySelector('#textColorPicker');
        const colorValueInput = this.shadowRoot.querySelector('#textColorValue');
        const output = document.getElementById('displaySubText');

        if (!input || !fontSizeRange || !fontSizeValue || !colorPicker || !colorValueInput || !output) {
            console.error("Un ou plusieurs éléments n'ont pas pu être trouvés !");
            return;
        }

        const applyStyles = () => {
            const fontSize = fontSizeRange.value;
            const color = colorValueInput.value || colorPicker.value;

            output.textContent = input.value || ''; 
            output.style.fontSize = `${fontSize}px`;
            output.style.color = color; 
        };

        fontSizeRange.addEventListener('input', () => {
            fontSizeValue.textContent = `${fontSizeRange.value}px`;
            applyStyles();
        });
        colorPicker.addEventListener('input', () => {
            colorValueInput.value = colorPicker.value;
            applyStyles();
        });
        colorValueInput.addEventListener('input', () => {
            colorPicker.value = colorValueInput.value;
            applyStyles();
        });
        input.addEventListener('input', applyStyles);

        applyStyles();
    }
}

customElements.define('sub-text-display', SubTextDisplay);
