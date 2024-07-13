#version 300 es
precision highp float;

uniform sampler2D u_characterTexture; // Texture containing the characters of the charset
uniform float u_charsetCols; // Number of columns in the charset texture
uniform float u_charsetRows; // Number of rows in the charset texture
uniform int u_totalChars; // Total number of characters in the charset texture

uniform sampler2D u_sketchTexture; // Texture containing the original simulation colors
uniform sampler2D u_edgesTexture; // Necessary edges texture for edge rendering
uniform sampler2D u_asciiBrightnessTexture; // Optional brightness texture for edge rendering (used to combine the brightness and edge rendering)

uniform vec2 u_gridCellDimensions; // Number of columns and rows in the grid

uniform vec3 u_characterColor; // Color of the characters (used when u_characterColorMode is 1 (fixed color))
uniform int u_characterColorMode; // Indicates whether to use the character color or the simulation color
uniform vec3 u_backgroundColor; // Color of the background (used when u_backgroundColorMode is 1 (fixed color))
uniform int u_backgroundColorMode; // Indicates whether to use the background color or the simulation color

uniform int u_invertMode; // Indicates whether to invert the character colors

uniform int u_renderMode; // Indicates whether to render including the edges or brightness only

out vec4 fragColor;

void main() {
    // Get the dimensions of the sketch texture
    vec2 u_gridCellPixelDimensions = vec2(textureSize(u_sketchTexture, 0));

    // Adjust the fragment coordinate to the grid
    vec2 adjustedCoord = gl_FragCoord.xy / u_gridCellPixelDimensions;

    // Calculate the grid coordinate
    vec2 gridCoord = adjustedCoord * u_gridCellDimensions;
    vec2 cellCoord = floor(gridCoord);
    vec2 centerCoord = cellCoord + vec2(0.5);
    vec2 baseCoord = centerCoord / u_gridCellDimensions;

    vec4 edgeColor; // edge color (only used in edges mode)
    vec4 sketchColor; // Simulation color

    if (u_renderMode == 1) { // edges mode
        vec2 gridCellDimensions = vec2(textureSize(u_edgesTexture, 0)) / u_gridCellDimensions;
        vec2 edgeAdjustedCoord = gl_FragCoord.xy / gridCellDimensions;
        vec2 edgeCellCoord = floor(edgeAdjustedCoord);
        vec2 edgeCenterCoord = edgeCellCoord + vec2(0.5);
        vec2 edgeBaseCoord = edgeCenterCoord * gridCellDimensions / vec2(textureSize(u_edgesTexture, 0));

        edgeColor = texture(u_edgesTexture, edgeBaseCoord);
        sketchColor = texture(u_sketchTexture, edgeBaseCoord);

        if (edgeColor.rgb == vec3(0.0f)) {
            fragColor = texture(u_asciiBrightnessTexture, gl_FragCoord.xy / vec2(textureSize(u_asciiBrightnessTexture, 0)));
            return;
        }
    } else { // Brightness mode
        sketchColor = texture(u_sketchTexture, baseCoord);
    }

    // Calculate the brightness from the sketch color if the render mode is 0, otherwise use the edge color (rgb are the same for the edge color)
    float brightness = u_renderMode == 1 ? edgeColor.r : dot(sketchColor.rgb, vec3(0.299, 0.587, 0.114));

    // Map the brightness to a character index
    int charIndex = int(brightness * float(u_totalChars));
    charIndex = min(charIndex, u_totalChars - 1);

    // Calculate the column and row of the character in the charset texture
    int charCol = charIndex % int(u_charsetCols);
    int charRow = charIndex / int(u_charsetCols);

    // Calculate the texture coordinate of the character in the charset texture
    vec2 charCoord = vec2(float(charCol) / u_charsetCols, float(charRow) / u_charsetRows);
    vec2 fractionalPart = fract(gridCoord) * vec2(1.0 / u_charsetCols, 1.0 / u_charsetRows);
    vec2 texCoord = charCoord + fractionalPart;

    // Get the color of the character from the charset texture
    vec4 charColor = texture(u_characterTexture, texCoord);

    // If the inversion mode is enabled, invert the character color
    if (u_invertMode == 1) {
        charColor.a = 1.0 - charColor.a;
        charColor.rgb = vec3(1.0);
    }

    // Calculate the final color of the character
    vec4 finalColor = (u_characterColorMode == 0) ? vec4(sketchColor.rgb * charColor.rgb, charColor.a) : vec4(u_characterColor * charColor.rgb, charColor.a);

    // If the background color mode is 0, mix the simulation color and the final color based on the character's alpha value
    // Otherwise, mix the background color and the final color based on the character's alpha value
    if (u_backgroundColorMode == 0) {
        fragColor = mix(vec4(sketchColor.rgb, 1.0), finalColor, charColor.a);
    } else {
        fragColor = mix(vec4(u_backgroundColor, 1.0), finalColor, charColor.a);
    }
}
