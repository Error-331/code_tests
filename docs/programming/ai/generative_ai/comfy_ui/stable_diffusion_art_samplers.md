# Stable Diffusion Art Samplers

Old solvers:

- Euler (the simplest possible solver, image converge);
- Heun (a more accurate but slower version of _Euler_);
- LMS (linear multi-step method, same speed as Euler but (supposedly) more accurate);

Ancestral samplers:

They are stochastic samplers image would not converge.

- Euler a;
- DPM2 a;
- DPM++ 2S a;
- DPM++ 2S a Karras;

## How to select a sampler?

Need fast generation, converging, new, and with decent quality:
- DPM++ 2M Karras with 20 – 30 steps;
- UniPC with 20-30 steps;

Need good quality images that don’t converge:
- DPM++ SDE Karras with 10-15 steps (Note: This is a slower sampler);
- DDIM with 10-15 steps;

Need something simple:
- Euler;

## Notes

- DPM++ SDE and DPM++ SDE Karras don’t converge, the images also fluctuate significantly as the number of steps changes;
- DPM++ 2M and DPM++ 2M Karras perform well;
- The Karras variant converges faster when the number of steps is high enough;
- UniPC converges a bit slower than Euler, but not too bad;
- Avoid using any ancestral samplers if you prefer stable, reproducible images;
- Euler and Heun are fine choices if you prefer something simple;
- Reduce the number of steps for Heun to save time;
- The LCM sampler should only be used with Latent Consistency Models (LCM) - they are models trained to generate images in 1 step;