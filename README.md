# p5.js brightness & edge ascii renderer

![header](https://github.com/humanbydefinition/p5js-ascii-renderer/blob/main/assets/repository_media/logo_gif.gif)

### intro (todo)

<hr/>

If there are any questions regarding this project, feel free to reach out to me via email (_travellingwithoutarriving@gmail.com_) or instagram (_[`@humanbydefinition`](https://www.instagram.com/humanbydefinition/)_).

## Demo
- [`editor.p5js.org`](https://editor.p5js.org/humanbydefinition/full/-WR64SJCL)

**Note:** The demo _should_ work on all types of devices and screens. **Let me know if you experience any issues!**

## Features
todo

## Structure
todo

## Installation
To get started with the p5.js ASCII Renderer, follow these steps to set up a local or remote web server and run the project:
1. **Clone the Repository**:
    ```
    git clone https://github.com/humanbydefinition/p5js-brightness-and-edge-ascii-renderer.git
    cd p5js-brightness-and-edge-ascii-renderer
    ```
2. **Set Up a Web Server**:
    - For local development, you need a web server to run the project. Refer to the [p5.js Wiki](https://github.com/processing/p5.js/wiki/Local-server) for detailed instructions on setting up a local server.
3. **Open the Project**:
    - Once the server is set up, open [`index.html`](https://github.com/humanbydefinition/p5js-brightness-and-edge-ascii-renderer/blob/main/index.html) in your browser to see the renderer in action.

_Personally, as described in the above wiki article, I recommend using [VS Code](https://code.visualstudio.com/) with the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for a smooth development experience._

## Dependencies
- [`p5.js (1.9.3)`](https://github.com/processing/p5.js) _(licensed under the LGPL-2.1 License)_
- [`p5.Capture (1.4.1)`](https://github.com/tapioca24/p5.capture) _(licensed under the MIT License)_
- [`Tweakpane (3.1.10)`](https://github.com/cocopon/tweakpane) _(licensed under the MIT License)_
    - [`Essentials Plugin (0.1.8)`](https://github.com/tweakpane/plugin-essentials) _(licensed under the MIT License)_
    - [`Infodump Plugin (0.3.0)`](https://github.com/doersino/tweakpane-plugin-infodump) _(licensed under the MIT License)_
    - [`File Import Plugin (0.1.7)`](https://github.com/LuchoTurtle/tweakpane-plugin-file-import) _(licensed under the MIT License)_
    - [`Table Plugin (0.3.1)`](https://github.com/amir-arad/tweakpane-table) _(licensed under the MIT License)_

For a complete list of dependencies, please refer to the repositories linked above.

## Assets
- [`UrsaFont`](https://ursafrank.itch.io/ursafont) - A textmode font by [UrsaFrank](https://ursafrank.itch.io/) on [itch.io](https://itch.io/). _(licensed under the CC0 1.0 Universal License)_

Besides this awesome font, I am unfortunately not allowed to redistribute any other fonts here. However, here are some other textmode/pixel fonts that have been successfully tested without any issues:

| Font  | Description | 
| ------------- | ------------- |
| [C64 Pro Mono](https://style64.org/c64-truetype)  | Includes all 304 unique C64 glyphs.  |
| [DOS/V re. JPN12](https://int10h.org/oldschool-pc-fonts/fontlist/font?dos-v_re_jpn12)  | Japanese versions of IBM (PC-)DOS / MS-DOS.  |
| [Retromoticons](https://www.fontspace.com/retromoticons-font-f26602)  | Bitmap emoticon dingbat font containing 77 glyphs. |
| [og-emoji-font](https://github.com/notwaldorf/og-emoji-font)  | Based on the original DoCoMo emoji set, designed in 1999 by Shigetaka Kurita. |
| [pixelated-wingdings](https://fontstruct.com/fontstructions/show/1218140/pixelated-wingdings)  | Pixelated/8-bit version of the Wingdings font. |
| [FROGBLOCK-V2.1](https://polyducks.itch.io/frogblock)  | Monospaced 8x8 textmode font with 256 glyphs. |
| [CHUNKY](https://batfeula.itch.io/chunky)  | 8x8 textmode font with 366 glyphs. |
| [Kitchen Sink](https://polyducks.itch.io/kitchen-sink-textmode-font)  | Monospaced 8x8 textmode font with 256 glyphs. |
| [CozetteVector](https://github.com/slavfox/Cozette)  | 6x13 bitmap programming font. |
| [PixelCode](https://qwerasd205.github.io/PixelCode/)  | Monospace pixel art style programming font. |
| [ark-pixel-font](https://github.com/TakWolf/ark-pixel-font)  | Open source pan-Chinese, Japanese and Korean pixel font. |
| [Vonwaon](https://timothyqiu.itch.io/vonwaon-bitmap)  | Chinese pixel font with thousands of glyphs. |
| [unscii-16](http://viznut.fi/unscii/)  | Bitmapped Unicode fonts based on classic system fonts. |

Feel free to test your favorite fonts, but keep in mind that the current implementation for creating a 2D character tile map texture from a [`p5.Font`](https://p5js.org/reference/#/p5.Font) object may not work properly with all fonts. For fonts not mentioned here, characters might overlap into other tiles on the texture.

**If you have font suggestions to share, I'd love to hear them! 😊**

## Contributing
Contributions are welcome. Please [`open an issue`](https://github.com/humanbydefinition/p5js-brightness-and-edge-ascii-renderer/issues) or [`submit a pull request`](https://github.com/humanbydefinition/p5js-brightness-and-edge-ascii-renderer/pulls) on GitHub.

## License
This project is licensed under the MIT License. See the [`LICENSE`](https://github.com/humanbydefinition/p5js-brightness-and-edge-ascii-renderer/blob/main/LICENSE) file for more details.


