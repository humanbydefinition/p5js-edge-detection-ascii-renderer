#version 300 es
// Specifies the version of GLSL (OpenGL Shading Language) being used. 
// "300 es" means version 3.00 for OpenGL ES (Embedded Systems).

precision highp float;
// Sets the default precision for floating-point variables to medium. 
// This is a balance between performance and accuracy.

layout(location = 0) in vec3 aPosition;
// Declares an input variable 'aPosition' of type vec3 (3-component vector) 
// with location 0. This typically represents the vertex position.

layout(location = 1) in vec2 aTexCoord;
// Declares an input variable 'aTexCoord' of type vec2 (2-component vector) 
// with location 1. This typically represents the texture coordinates.

out vec2 v_texCoord;
// Declares an output variable 'v_texCoord' of type vec2. 
// This will be passed to the fragment shader.

void main() {
    vec4 positionVec4 = vec4(aPosition, 1.0);
    // Converts the 3-component position vector 'aPosition' to a 4-component 
    // vector 'positionVec4' by adding a 1.0 as the w component.

    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    // Transforms the x and y components of 'positionVec4' from the range [0, 1] 
    // to the range [-1, 1]. This is often done to convert from normalized device 
    // coordinates to clip space.

    gl_Position = positionVec4;
    // Sets the built-in output variable 'gl_Position' to 'positionVec4'. 
    // This determines the final position of the vertex in clip space.

    v_texCoord = aTexCoord;
    // Passes the texture coordinates 'aTexCoord' to the output variable 'v_texCoord'. 
    // This will be used by the fragment shader to sample textures.
}