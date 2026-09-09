# 6GZ strategy

Cables: 

| Cable Type |   Thickness   | Thickness (approx.) | Signal Loss at 6 GHz (for 5 meters) |                              Recommendation                               |
|:----------:|:-------------:|:-------------------:|:-----------------------------------:|:-------------------------------------------------------------------------:|
|  LMR-400   | Very Thick    |       ~10 mm        |  ~1.8 dB loss (Excellent signal)    |  Best performance, but very stiff and hard to bend around room corners.   |
|  LMR-240   |    Medium     |        ~6 mm        |    ~3.2 dB loss (Great balance)     |         Recommended. Flexible enough for an apartment, low loss.          |
|   RG-58    |    Medium     |        ~5 mm        |         Extremely High Loss         |                   Avoid. Not rated or usable for 6 GHz.                   |
|   RG-316   |   Very Thin   |       ~2.5 mm       | Over 10+ dB loss (Destroys signal)  |            Avoid. Too thin for long runs at high frequencies.             |
|   RG-174   |   Very Thin   |      ~2.5 mm        | Over 10+ dB loss (Destroys signal)  |            Avoid. Too thin for long runs at high frequencies.             |


Losses:

|          Frequency          | 8-Meter RG-316 Loss | LNA Boost (Gain) | Net Signal Reaching SDR |       Will it work?        |
|:---------------------------:|:-------------------:|:----------------:|:-----------------------:|:--------------------------:|
|    100 MHz (FM Radio)       |    ~0.2 dB loss     |      +20 dB      |        +19.8 dB         |  Perfect (Strong signal)   |
| 1.5 GHz (GPS / Satellites)  |    ~7.5 dB loss     |      +20 dB      |        +12.5 dB         | Excellent (Overcomes loss) |
| 2.4 GHz (Wi-Fi / Bluetooth) |    ~10.2 dB loss    |      +20 dB      |       +9.8 dB           |   Great (Overcomes loss)   |
|  6.0 GHz (5G / New Wi-Fi)   |    ~19.5 dB loss    |      +20 dB      |         +0.5 dB         |      Barely Saving It      |





