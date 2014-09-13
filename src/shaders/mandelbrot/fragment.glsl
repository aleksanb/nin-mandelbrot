uniform float time;
uniform vec2 resolution;
uniform sampler2D tExplosion;

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

    int depth_reached = 0;
    for (int i=0; i<depth; i++) {
        if (dot(z, z) > 4.0) {
            depth_reached = i;
            break;
        }
        z = complexMult(z, z) + c;
    }

    return 1.0 - float(depth - depth_reached) / float(depth);
}


void main(void)
{
    vec2 uv = (gl_FragCoord.xy / resolution);
    uv = vec2(uv.x * 3.5 - 2.5, uv.y * 2.0 - 1.0);

    vec2 pos = vec2(0.001643721971153, -0.822467633298876);
    //vec2 pos = vec2(-1.25, 0.1);
    float zoom = pow(2.0, -time) * 3.5;
    vec2 c = pos + uv * zoom;

    gl_FragColor = texture2D(tExplosion, vec2(0.0, mandelbrot(c)));
}
