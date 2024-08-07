/**
 * Represents the general controller that handles events from a general view.
 * @extends EventEmitter
 */
class GeneralController extends EventEmitter {
    /**
     * Represents the GeneralController.
     * @constructor
     * @param {GeneralView} generalView - The general view associated with the controller.
     */
    constructor(generalView) {
        super();

        this.generalView = generalView;

        // Bind events to corresponding methods
        this.generalView.on('saveImage', this.saveImage.bind(this));
        this.generalView.on('toggleRecording', this.toggleRecording.bind(this));
        this.generalView.on('exportPreset', this.exportPreset.bind(this));
        this.generalView.on('importPreset', this.importPreset.bind(this));
    }

    /**
     * Imports a preset from a JSON file.
     */
    importPreset() {
        // Create a file input element and trigger a click event to open the file dialog
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);
        fileInput.click();

        // When a file is selected, read it and import the preset
        fileInput.addEventListener('change', () => {
            const reader = new FileReader();
            reader.onload = (event) => { this.emit('importPreset', event.target.result); };
            reader.readAsText(fileInput.files[0]);
            document.body.removeChild(fileInput);
        });
    }

    /**
     * Exports the preset as a JSON file.
     */
    exportPreset() {
        // Create a copy of PARAMS
        let paramsCopy = { ...PARAMS };

        // Delete the properties that should not be exported
        delete paramsCopy.fontFileInput;
        delete paramsCopy.fontObject;

        const url = URL.createObjectURL(new Blob([JSON.stringify(paramsCopy, null, 2)], { type: 'application/json' }));
        const a = document.createElement('a');

        a.download = 'preset.json';
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Saves the canvas as an image.
     * @param {string} outputType - The output type of the image (e.g., 'jpg', 'png').
     */
    saveImage(outputType) {
        saveCanvas('sketch', outputType);
    }

    /**
     * Toggles the recording of the specified action.
     * @param {string} [action="stop"] - The action to perform. Defaults to "stop".
     */
    toggleRecording(action = "stop") {
        if (action === 'start') {
            if (PARAMS.recordingActive) return; // If already recording, return

            setTimeout(() => { // Delay the start of recording to ensure readiness
                try {
                    capturer = P5Capture.getInstance();

                    if (capturer.state === "idle") {
                        PARAMS.recordingActive = true;
                        capturer.start({
                            format: PARAMS.recordingType
                        });
                    }
                } catch (error) {
                    console.error('Error starting capture:', error);
                    PARAMS.recordingActive = false; // Reset recording flag on error
                }
            }, 1000); // Adjust delay as necessary
        } else {
            if (!PARAMS.recordingActive) return; // If not recording, return

            PARAMS.recordingActive = false;
            PARAMS.recordingElapsedTime = '00:00:00:000'; // Reset the elapsed time
            capturer.stop();
        }
    }
}