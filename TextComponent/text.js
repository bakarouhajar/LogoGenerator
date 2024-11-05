class TextDisplay extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        fetch('TextComponent/text.html')
            .then(response => response.text())
            .then(html => {
                this.shadowRoot.innerHTML = html;

                const linkElement = document.createElement('link');
                linkElement.rel = 'stylesheet';
                linkElement.href = 'TextComponent/text.css';
                this.shadowRoot.appendChild(linkElement);

                this.initialize();
            });
    }

    initialize() {
        const input = this.shadowRoot.querySelector('input[type="text"]');
        const fontSizeRange = this.shadowRoot.querySelector('#fontSizeRange');
        const fontSizeValue = this.shadowRoot.querySelector('#fontSizeValue');
        const orientationSelect = this.shadowRoot.querySelector('#orientationSelect');
        const alignmentSelect = this.shadowRoot.querySelector('#alignmentSelect');
        const colorPicker = this.shadowRoot.querySelector('#textColorPicker');
        const colorValueInput = this.shadowRoot.querySelector('#textColorValue');
        const animationSelect = this.shadowRoot.querySelector('#animationSelect');
        const output = document.getElementById('displayText');

        const shadowColorPicker = this.shadowRoot.querySelector('#shadowColorPicker');
        const shadowColorValueInput = this.shadowRoot.querySelector('#shadowColorValue');
        const shadowOffsetX = this.shadowRoot.querySelector('#shadowOffsetX');
        const shadowOffsetY = this.shadowRoot.querySelector('#shadowOffsetY');
        const shadowBlur = this.shadowRoot.querySelector('#shadowBlur');

        if (!input || !fontSizeRange || !fontSizeValue || !orientationSelect || !alignmentSelect || !colorPicker || !colorValueInput ||
            !shadowColorPicker || !shadowColorValueInput || !shadowOffsetX || !shadowOffsetY || !shadowBlur || !output || !animationSelect) {
            console.error("Un ou plusieurs éléments n'ont pas pu être trouvés !");
            return;
        }

        const applyStyles = () => {
            const fontSize = fontSizeRange.value;
            const orientation = orientationSelect.value;
            const alignment = alignmentSelect.value;
            const color = colorValueInput.value || colorPicker.value;

            // Récupérer les valeurs d'ombre
            const shadowColor = shadowColorValueInput.value || shadowColorPicker.value;
            const offsetX = shadowOffsetX.value;
            const offsetY = shadowOffsetY.value;
            const blur = shadowBlur.value;

            output.textContent = input.value || ''; // Mettre à jour le texte affiché
            output.style.fontSize = `${fontSize}px`;
            output.style.color = color; // Appliquer la couleur
            output.style.textShadow = `${offsetX}px ${offsetY}px ${blur}px ${shadowColor}`;

            // Appliquer l'orientation
            switch (orientation) {
                case 'horizontal':
                    output.style.transform = 'none';
                    output.style.whiteSpace = 'normal';
                    output.style.writingMode = 'horizontal-tb';
                    output.style.textAlign = alignment;
                    break;
                case 'vertical-up':
                    output.style.transform = 'none';
                    output.style.whiteSpace = 'nowrap';
                    output.style.writingMode = 'vertical-rl';
                    output.style.textAlign = 'center';
                    break;
                case 'vertical-down':
                    output.style.transform = 'rotate(180deg)';
                    output.style.whiteSpace = 'nowrap';
                    output.style.writingMode = 'vertical-lr';
                    output.style.textAlign = 'center';
                    break;
            }

            // Appliquer l'alignement
            if (orientation === 'horizontal') {
                output.style.textAlign = alignment;
            } else {
                output.style.textAlign = 'center';
            }

            // Appliquer l'animation
            const animationClass = animationSelect.value !== 'none' ? `animation-${animationSelect.value}` : '';
            output.className = animationClass; // Met à jour la classe pour l'animation
        };

        // Ajoutez les écouteurs d'événements pour les mises à jour
        animationSelect.addEventListener('change', applyStyles);
        fontSizeRange.addEventListener('input', () => {
            fontSizeValue.textContent = `${fontSizeRange.value}px`;
            applyStyles();
        });

        orientationSelect.addEventListener('change', applyStyles);
        alignmentSelect.addEventListener('change', applyStyles);
        input.addEventListener('input', applyStyles);
        colorPicker.addEventListener('input', () => {
            colorValueInput.value = colorPicker.value;
            applyStyles();
        });
        colorValueInput.addEventListener('input', () => {
            colorPicker.value = colorValueInput.value;
            applyStyles();
        });

        shadowColorPicker.addEventListener('input', () => {
            shadowColorValueInput.value = shadowColorPicker.value;
            applyStyles();
        });
        shadowColorValueInput.addEventListener('input', () => {
            shadowColorPicker.value = shadowColorValueInput.value;
            applyStyles();
        });
        shadowOffsetX.addEventListener('input', applyStyles);
        shadowOffsetY.addEventListener('input', applyStyles);
        shadowBlur.addEventListener('input', applyStyles);

        applyStyles(); // Appliquer les styles par défaut
    }
}

customElements.define('text-display', TextDisplay);
