/**
 * ShadersView class serves as an entry point for initializing the tweakpane 'ascii' tab.
 * @extends EventEmitter
 */
class AsciiView extends EventEmitter {

    /**
     * Constructs a new instance of the ShadersView class.
     * @param {Tab} tab - The tab object associated with the view.
     */
    constructor(tab) {
        super();
        this.tab = tab;

        this.asciiCommonFolder = this.tab.addFolder({ title: 'common' });
        this.asciiShaderFolder = this.tab.addFolder({ title: 'brightness' });
        this.asciiEdgesFolder = this.tab.addFolder({ title: 'edges' });

        this.initializeCommonFolder();
        this.initializeAsciiShaderFolder();
        this.initializeAsciiEdgesFolder();
    }

    /**
     * Initializes the common folder for the ASCII tab.
     */
    initializeCommonFolder() {
        this.asciiCommonFolder.addInput(PARAMS, 'fontFileInput', {
            view: 'file-input', lineCount: 1, filetypes: ['.ttf', '.otf'], label: 'font'
        }).on('change', (ev) => { this.emit("updateFont", { fontFileInput: ev.value }) });

        this.asciiCommonFolder.addInput(PARAMS, 'asciiFontSize', {
            label: 'font size', options: { 2: 2, 4: 4, 8: 8, 16: 16, 32: 32, 64: 64, 128: 128 }
        }).on('change', (ev) => { this.emit("setFontSize", ev.value); });
    }

    /**
     * Initializes the ASCII edges characters folder. Gets reinitialized if a preset is imported.
     */
    initializeAsciiEdgesCharactersFolder() {
        if (this.asciiEdgeCharactersFolder) { // If asciiEdgeCharactersFolder already exists, remove it
            this.asciiEdgesFolder.remove(this.asciiEdgeCharactersFolder);
        }

        this.asciiEdgeCharactersFolder = this.asciiEdgesFolder.addFolder({ title: 'characters', index: 0 });

        this.asciiEdgeCharactersFolder.addBlade({
            view: 'tableRow',
            label: 'upper',
            cells: [
                { view: 'text', value: PARAMS.asciiEdgesCharacterSet[1], parse: (v) => { if (v.length !== 1) { return; } this.emit('setEdgeCharacter', { character: v, index: 1 }); return String(v); } },
                { view: 'text', value: PARAMS.asciiEdgesCharacterSet[0], parse: (v) => { if (v.length !== 1) { return; } this.emit('setEdgeCharacter', { character: v, index: 0 }); return String(v); } },
                { view: 'text', value: PARAMS.asciiEdgesCharacterSet[7], parse: (v) => { if (v.length !== 1) { return; } this.emit('setEdgeCharacter', { character: v, index: 7 }); return String(v); } },
            ],
        });

        this.asciiEdgeCharactersFolder.addBlade({
            view: 'tableRow',
            label: 'left/right',
            cells: [
                { view: 'text', value: PARAMS.asciiEdgesCharacterSet[2], parse: (v) => { if (v.length !== 1) { return; } this.emit('setEdgeCharacter', { character: v, index: 2 }); return String(v); } },
                { view: 'text', value: "", parse: (v) => String(v) },
                { view: 'text', value: PARAMS.asciiEdgesCharacterSet[6], parse: (v) => { if (v.length !== 1) { return; } this.emit('setEdgeCharacter', { character: v, index: 6 }); return String(v); } },
            ],
        });

        this.asciiEdgeCharactersFolder.addBlade({
            view: 'tableRow',
            label: 'lower',
            cells: [
                { view: 'text', value: PARAMS.asciiEdgesCharacterSet[3], parse: (v) => { if (v.length !== 1) { return; } this.emit('setEdgeCharacter', { character: v, index: 3 }); return String(v); } },
                { view: 'text', value: PARAMS.asciiEdgesCharacterSet[4], parse: (v) => { if (v.length !== 1) { return; } this.emit('setEdgeCharacter', { character: v, index: 4 }); return String(v); } },
                { view: 'text', value: PARAMS.asciiEdgesCharacterSet[5], parse: (v) => { if (v.length !== 1) { return; } this.emit('setEdgeCharacter', { character: v, index: 5 }); return String(v); } },
            ],
        });
    }

    /**
     * Initializes the ASCII edges folder.
     */
    initializeAsciiEdgesFolder() {
        this.initializeAsciiEdgesCharactersFolder();

        this.asciiEdgesFolder.addInput(PARAMS, 'asciiEdgesInvertCharacters', { label: 'invert chars' });
        this.asciiEdgesFolder.addInput(PARAMS, 'asciiEdgesCharacterColorMode', { options: { 'sampled': 0, 'fixed color': 1 }, label: 'char color mode' });
        this.asciiEdgesFolder.addInput(PARAMS, 'asciiEdgesBackgroundColorMode', { options: { 'sampled': 0, 'fixed color': 1 }, label: 'bg color mode' });
        this.asciiEdgesFolder.addInput(PARAMS, 'asciiEdgesCharacterColor', { label: 'char color' });
        this.asciiEdgesFolder.addInput(PARAMS, 'asciiEdgesBackgroundColor', { label: 'bg color' });

        this.asciiEdgesThresholdsFolder = this.asciiEdgesFolder.addFolder({ title: 'thresholds' });
        this.asciiEdgesThresholdsFolder.addInput(PARAMS, 'sobelThreshold', { label: 'sobel', min: 0.01, max: 1, step: 0.01 });
        this.asciiEdgesThresholdsFolder.addInput(PARAMS, 'sobelSampleThreshold', { label: 'sampling', min: 1, max: 64, step: 1 });
    }

    /**
     * Initializes the ASCII shader folder.
     */
    initializeAsciiShaderFolder() {
        this.asciiShaderFolder.addInput(PARAMS, 'asciiBrightnessCharacterSet', { label: 'charset', })
            .on('change', (ev) => { this.emit('setCharacters', { characters: ev.value }); });

        this.asciiShaderFolder.addInput(PARAMS, 'asciiBrightnessInvertCharacters', { label: 'invert chars' });
        this.asciiShaderFolder.addInput(PARAMS, 'asciiBrightnessCharacterColorMode', { options: { 'sampled': 0, 'fixed color': 1 }, label: 'char color mode' });
        this.asciiShaderFolder.addInput(PARAMS, 'asciiBrightnessBackgroundColorMode', { options: { 'sampled': 0, 'fixed color': 1 }, label: 'bg color mode' });
        this.asciiShaderFolder.addInput(PARAMS, 'asciiBrightnessCharacterColor', { label: 'char color' });
        this.asciiShaderFolder.addInput(PARAMS, 'asciiBrightnessBackgroundColor', { label: 'bg color' });
    }
}