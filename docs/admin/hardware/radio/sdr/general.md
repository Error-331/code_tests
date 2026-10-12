# SDR

## General

- A Software-Defined Radio (SDR) moves typical hardware radio tasks—like filtering, modulation, and demodulation—into software algorithms;
- Its core internal architecture relies on an analog RF front-end, data converters (ADC/DAC), and digital processors (FPGA, DSP, or GPP);

### Analog RF front-end

- **Antenna**: Captures or radiates raw electromagnetic waves in the air;
- **Bandpass Filters**: Blocks out-of-band noise and heavy local signals that can overload the receiver;
- **Low-Noise Amplifier (LNA)**: Boosts weak incoming radio signals while adding as little internal noise as possible;
- **Mixer and Local Oscillator (LO)**: Shifts the high radio frequency (RF) down to a lower intermediate frequency (IF) or baseband in superheterodyne designs;

### Data conversion layer

- **Analog-to-Digital Converter (ADC)**: Samples the conditioned analog wave and turns it into a stream of digital numbers (high-end SDRs use direct RF sampling to digitize wide bands instantly);
- **Digital-to-Analog Converter (DAC)**: Converts processed digital baseband data back into an analog waveform for transmission;

### Digital Signal Processing (DSP) and Computing

- **Field-Programmable Gate Array (FPGA)**: Handles heavy, ultra-fast parallel math like channelization, decimation, and digital down-conversion (DDC);
- **General-Purpose Processor (GPP) / DSP Chips:** Runs high-level protocol stacks, user interfaces, and software demodulation via tools like GNU Radio;