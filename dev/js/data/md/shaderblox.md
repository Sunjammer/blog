Shaderblox allows a developer to write GLSL inline with Haxe code, using the power of macros to not only validate the source, but also generate static attribute and uniform handlers compile-time. This means shader integration and source validation is one and the same: A shader written in a way that does not conform with the rest of the source will simply block the build altogether, giving graphics developers compile-time error handling.  

Shaderblox also allows a natural creation of ubershaders by leveraging class inheritance to construct complex shaders from smaller variations, and due to the macro-based approach also offers code completion hints for GLSL uniforms and more.  

Source available on [GitHub](https://github.com/furusystems/shaderblox)
