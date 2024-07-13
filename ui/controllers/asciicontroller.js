/**
 * Represents a controller for managing the ascii shader and the grid in the UI.
 * @class
 */
class AsciiController {
    /**
     * Represents a ShadersController.
     * @param {AsciiView} shadersView - The ShadersView instance.
     */
    constructor(shadersView) {
        this.shadersView = shadersView;

        this.bindEvents();
    }

    /**
     * Binds events to corresponding methods in the shaders controller.
     */
    bindEvents() {
        const events = ['setFontSize', 'setCharacters', 'updateFont', 'setEdgeCharacter'];

        events.forEach(event => {
            this.shadersView.on(event, this[event].bind(this));
        });
    }

    /**
     * Sets an edge character at a specific index for rendering.
     * @param {string} character - The character to set.
     * @param {number} index - The index to set the character at.
     */
    setEdgeCharacter({ character, index }) {
        edgesCharacterSet.setCharacter({ character, index });
        PARAMS.asciiEdgesCharacterSet = edgesCharacterSet.characters.join("");
    }

    /**
     * Updates the font used for ASCII art generation.
     * @param {File} fontFileInput - The font file input.
     */
    updateFont({ fontFileInput }) {
        if (!fontFileInput) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const fontData = e.target.result;

            loadFont(fontData, (font) => {
                PARAMS.asciiFontData = fontData;
                
                edgesCharacterSet.setFontObject(font); 
                brightnessCharacterSet.setFontObject(font);

                grid.resizeCellDimensions(edgesCharacterSet.maxGlyphDimensions.width, edgesCharacterSet.maxGlyphDimensions.height);

                resizeFramebuffers();
            });
        };
        reader.readAsDataURL(fontFileInput);
    }

    /**
     * Sets the characters used for rendering.
     * @param {string[]} characters - An array of characters to be used for rendering.
     */
    setCharacters({ characters }) {
        brightnessCharacterSet.setCharacterSet(characters);
    }

    /**
     * Sets the font size for the ASCII renderer.
     * @param {number} fontSize - The desired font size.
     */
    setFontSize(fontSize) {
        edgesCharacterSet.setFontSize(fontSize);
        brightnessCharacterSet.setFontSize(fontSize);

        grid.resizeCellDimensions(edgesCharacterSet.maxGlyphDimensions.width, edgesCharacterSet.maxGlyphDimensions.height);

        resizeFramebuffers();
    }
}