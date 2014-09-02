uniform float time;
uniform vec2 resolution;

varying vec2 vUv;

const int depth = 256;
float iGlobalTime = 1.0;

vec2 complexMult(vec2 a, vec2 b)
{
    float real = a.x * b.x - a.y * b.y;
    float complex = a.y * b.x + a.x * b.y;
    return vec2(real, complex);
}

float mandelbrot(vec2 c)
{
    vec2 z = vec2(0.0, 0.0);

    int howFarWeGot = 0;
    for (int i=0; i<depth; i++) {
        if (dot(z, z) < 4.0) {
            z = complexMult(z, z) + c;
        } else {
            howFarWeGot = depth - i;
            break;
        }   
    }

    return 1.0 - float(howFarWeGot) / float(depth);
}


void main(void)
{
    vec2 uv = (gl_FragCoord.xy / resolution);
    uv = vec2(uv.x * 3.5 - 2.5, uv.y * 2.0 - 1.0);

    vec2 pos = vec2(0.001643721971153, -0.822467633298876);
    float zoom = pow(2.0, -time) * 3.5;
    vec2 c = pos + uv * zoom;

    gl_FragColor = mandelbrot(c) * vec4(1.0, 0.8, 0.6, 0.3);
}
