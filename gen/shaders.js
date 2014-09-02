SHADERS={};SHADERS.mandelbrot = {uniforms: {
    "time": { "type": "f", "value": null },
    "resolution": { "type": "v2", "value": null }
}

,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform float time;\nuniform vec2 resolution;\n\nvarying vec2 vUv;\n\nconst int depth = 256;\nfloat iGlobalTime = 1.0;\n\nvec2 complexMult(vec2 a, vec2 b)\n{\n    float real = a.x * b.x - a.y * b.y;\n    float complex = a.y * b.x + a.x * b.y;\n    return vec2(real, complex);\n}\n\nfloat mandelbrot(vec2 c)\n{\n    vec2 z = vec2(0.0, 0.0);\n\n    int howFarWeGot = 0;\n    for (int i=0; i<depth; i++) {\n        if (dot(z, z) < 4.0) {\n            z = complexMult(z, z) + c;\n        } else {\n            howFarWeGot = depth - i;\n            break;\n        }   \n    }\n\n    return 1.0 - float(howFarWeGot) / float(depth);\n}\n\n\nvoid main(void)\n{\n    vec2 uv = (gl_FragCoord.xy / resolution);\n    uv = vec2(uv.x * 3.5 - 2.5, uv.y * 2.0 - 1.0);\n\n    vec2 pos = vec2(0.001643721971153, -0.822467633298876);\n    float zoom = pow(2.0, -time) * 3.5;\n    vec2 c = pos + uv * zoom;\n\n    gl_FragColor = mandelbrot(c) * vec4(1.0, 0.8, 0.6, 0.3);\n}\n"};
SHADERS.default = {uniforms: {
    tDiffuse: { type: 't', value: null },
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform sampler2D tDiffuse;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vec4 colorInput = texture2D( tDiffuse, vUv );\n    gl_FragColor = colorInput;\n}\n"};
SHADERS.multiply = {uniforms: {
    tDiffuse: { type: 't', value: null },
    amount: { type: 'f', value: 0},
    r: { type: 'f', value: 0},
    g: { type: 'f', value: 0},
    b: { type: 'f', value: 0}
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform float amount;\nuniform float r;\nuniform float g;\nuniform float b;\nuniform sampler2D tDiffuse;\nvarying vec2 vUv;\n\nvoid main() {\n    vec4 fragColor = texture2D(tDiffuse, vUv);\n    gl_FragColor = vec4(mix(fragColor.r, fragColor.r * r, amount),\n                        mix(fragColor.g, fragColor.g * g, amount),\n                        mix(fragColor.b, fragColor.b * b, amount),\n                        1.);\n}\n"};
SHADERS.vignette = {uniforms: {
    tDiffuse: { type: 't', value: null },
    amount: { type: 'f', value: 0}
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform sampler2D tDiffuse;\nuniform float amount;\nvarying vec2 vUv;\n\nvoid main() {\n    vec4 original = texture2D(tDiffuse, vUv);\n    float dist = length(vUv - vec2(0.5, 0.5));\n    dist = dist / 0.707;\n    if(dist < 0.) dist = 0.;\n    if(dist > 1.) dist = 1.;\n    dist = dist * dist * dist;\n    gl_FragColor = vec4(original.xyz * (1. - dist * amount), 1.);\n}\n"};
