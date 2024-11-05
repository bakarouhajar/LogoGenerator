class ImageUpload extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <div class="image-upload">
                <label for="fileInput">Téléchargez votre image :</label>
                <input type="file" id="fileInput" accept="image/*">
                <input type="number" id="widthInput" placeholder="Largeur (px)">
                <input type="number" id="heightInput" placeholder="Hauteur (px)">
                <select id="positionSelect">
                    <option value="above">Au-dessus</option>
                    <option value="below">En dessous</option>
                    <option value="same-level">Au même niveau</option>
                </select>
            </div>
        `;

        this.fileInput = this.shadowRoot.getElementById('fileInput');
        this.widthInput = this.shadowRoot.getElementById('widthInput');
        this.heightInput = this.shadowRoot.getElementById('heightInput');
        this.positionSelect = this.shadowRoot.getElementById('positionSelect');

        this.fileInput.addEventListener('change', this.loadImage.bind(this));
        this.widthInput.addEventListener('input', this.updateDimensions.bind(this));
        this.heightInput.addEventListener('input', this.updateDimensions.bind(this));
        this.positionSelect.addEventListener('change', this.updatePosition.bind(this));
    }

    loadImage(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageSrc = e.target.result;

                // Déclenche l'événement image-uploaded
                const imageEvent = new CustomEvent('image-uploaded', {
                    detail: { imageSrc }
                });
                this.dispatchEvent(imageEvent);
            };
            reader.readAsDataURL(file);
        }
    }

    updateDimensions() {
        const width = this.widthInput.value;
        const height = this.heightInput.value;

        const dimensionsEvent = new CustomEvent('image-dimensions-updated', {
            detail: { width: width || null, height: height || null }
        });
        this.dispatchEvent(dimensionsEvent);
    }

    updatePosition() {
        const position = this.positionSelect.value;

        const positionEvent = new CustomEvent('image-position-updated', {
            detail: { position }
        });
        this.dispatchEvent(positionEvent);
    }
}

customElements.define('image-upload', ImageUpload);
