/**
 * Overlay class serves as an entry point for initializing the tweakpane overlay.
 */
class Overlay {
    /**
     * Constructs an instance of the Overlay class.
     * Initializes the tweakpane, registers plugins, adds tabs, and sets up views and controllers.
     */
    constructor() {
        this.pane = new Tweakpane.Pane();
        this.pane.registerPlugin(TweakpaneEssentialsPlugin);
        this.pane.registerPlugin(TweakpaneInfodumpPlugin);
        this.pane.registerPlugin(TweakpaneFileImportPlugin);
        this.pane.registerPlugin(TweakpaneTablePlugin);

        this.mainFolder = this.pane.addFolder({ title: '~~ brightness & edge ascii renderer', expanded: true }); // The main folder for the tweakpane, containing all elements

        this.tabBar = this.mainFolder.addTab({ pages: [{ title: 'general' }, { title: 'ascii' }, { title: 'about' }] });

        this.generalView = new GeneralView(this.tabBar.pages[0]);
        this.generalController = new GeneralController(this.generalView);

        this.shadersView = new AsciiView(this.tabBar.pages[1]);
        this.shadersController = new AsciiController(this.shadersView);

        this.generalController.on('importPreset', this.importPreset.bind(this)); // When the general controller emits an importPreset signal, call the importPreset method

        this.initializeFrameRateFolder(); // Initialize the overlay folders, which are always visible across all tabs
        this.initializeDisplayFolder();

        this.initializeAboutTab(); // Initialize the about tab here, since it doesn't have any real functionality
    }

    /**
     * Initializes the display folder for selecting the framebuffer to display.
     */
    initializeDisplayFolder() {
        if (this.displayFolder) { // If the display folder already exists, remove it. (This method also gets called when importing a preset)
            this.mainFolder.remove(this.displayFolder);
        }

        this.displayFolder = this.mainFolder.addFolder({ title: 'display', index: 1 });

        this.displayFolder.addBlade({
            view: 'list',
            label: 'framebuffer',
            options: [
                { text: "sketch", value: "sketch" },
                { text: "sobel", value: "sobel" },
                { text: "sobel sample", value: "sobel sample" },
                { text: "ascii", value: "ascii" },
                { text: "ascii + edges", value: "ascii + edges" }
            ],
            value: PARAMS.selectedDisplayFramebuffer,
        }).on('change', (ev) => { updateDisplayFramebuffer(ev.value); });
    }

    /**
     * Initializes the framerate folder for setting the desired framerate.
     */
    initializeFrameRateFolder() {
        this.frameRateFolder = this.mainFolder.addFolder({ title: 'framerate', index: 0 });

        this.fps_graph = this.frameRateFolder.addBlade({ view: 'fpsgraph', label: 'graph', rows: 1 }); // Needs to have a reference to be used in the p5.js draw loop

        this.frameRateFolder.addInput(PARAMS, 'desiredFrameRate', { label: 'limit', min: 1, max: 60, step: 1 })
            .on('change', (ev) => { frameRate(ev.value); });
    }

    /**
     * Imports a preset into the tweakpane.
     * @param {string} preset - The preset to be imported, in JSON format.
     */
    importPreset(preset) {
        const newParams = JSON.parse(preset); // Parse the JSON string into a new object and replace each key-value pair in PARAMS with the new values
        Object.keys(newParams).forEach(key => {
            PARAMS[key] = newParams[key];
        });
        this.pane.importPreset(PARAMS);

        loadFont(PARAMS.asciiFontData, (font) => { // Load the font in base64 format from the imported preset
            edgesCharacterSet.setFontObject(font);
            brightnessCharacterSet.setFontObject(font);

            grid.resizeCellDimensions(edgesCharacterSet.maxGlyphDimensions.width, edgesCharacterSet.maxGlyphDimensions.height);

            resizeFramebuffers();
        });

        edgesCharacterSet.setCharacterSet(PARAMS.asciiEdgesCharacterSet); // Manually update the edges character set, because of the special input in the overlay

        updateDisplayFramebuffer(PARAMS.selectedDisplayFramebuffer); // Update the display framebuffer based on the selected framebuffer in the imported preset

        this.initializeDisplayFolder(); // Reinitialize the display folder to update the selected framebuffer
        this.shadersView.initializeAsciiEdgesCharactersFolder(); // Reinitialize the ascii edges characters folder to update the edge characters

        this.pane.refresh(); // Refresh the tweakpane to reflect the changes
    }

    /**
     * Initializes the about tab.
     */
    initializeAboutTab() {
        this.tabBar.pages[2].addBlade({
            view: 'infodump',
            content: `# brightness & edge ascii renderer
            \`built with p5.js v1.9.3 and Tweakpane 3.1.10\`
            by **humanbydefinition**
            **links:**
            * **github:** [github.com/humanbydefinition](https://github.com/humanbydefinition)
            * **ig:** [instagram.com/humanbydefinition](https://instagram.com/humanbydefinition)`,
            markdown: true,
        });

        this.tabBar.pages[2].addBlade({
            view: 'infodump',
            content: `# libraries/plugins used
            * **[p5.js](https://p5js.org/):** a JS client-side library for creating graphic and interactive experiences
            * **[Tweakpane](https://cocopon.github.io/tweakpane/):** a compact GUI for fine-tuning parameters and monitoring variables
            * **[Tweakpane Essentials Plugin](https://github.com/tweakpane/plugin-essentials):** a plugin for Tweakpane that adds essential features
            * **[Tweakpane Infodump Plugin](https://github.com/doersino/tweakpane-plugin-infodump):** a plugin for Tweakpane that adds markdown support to infodump blades
            * **[Tweakpane File Import Plugin](https://github.com/LuchoTurtle/tweakpane-plugin-file-import):** a plugin for Tweakpane that adds file import support
            * **[Tweakpane Table Plugin](https://github.com/amir-arad/tweakpane-table):** a plugin for Tweakpane that adds table support
            * **[p5.Capture](https://github.com/tapioca24/p5.capture):** a library to capture canvas-based animations
            * ...and more, since some of those libraries also have dependencies themselves`,
            markdown: true,
        });

        this.tabBar.pages[2].addBlade({
            view: 'infodump',
            content: `# assets used
            **[UrsaFont](https://ursafrank.itch.io/ursafont):** a textmode font by _UrsaFrank_ on [itch.io](https://itch.io/)`,
            markdown: true,
        });
    }
}