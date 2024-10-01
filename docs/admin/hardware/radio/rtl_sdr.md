# RTL-SDR

main parts:

- RF front end;
- ADC;
- code;

## ADC

- two major characteristics: sampling rate and dynamic range;
- sampling rate - is the speed of ADC to measure the analog signal; 
- dynamic range is the precision of the minimum and maximum signal values of the ADC block (determines the number of bits of ADC digital output);
- the sampling rate of an ADC should at least be twice of the target signal bandwidth to enable an AD conversion without aliasing (Nyquist Theorem);

Example 1:

- an 8-bit AD converter can represent 256 signal levels at most;
- a 16-bit converter can represent 65,536 signal levels;

Example 2 (listen to FM radio of 92.1 MHz using the ADC with sampling rate of 20 MHz):

- down-convert the high-frequency signal with RF front to a lower frequency;
- 90–100 MHz -> 0–10 MHz;
- use 20 MHz ADC;

Example 3: 

- demodulation module of a modem can convert a 50–800 MHz signal with 6 MHz bandwidth to a signal of 0 Hz center frequency;
- the output center frequency is generally referred to as intermediate frequency (IF);
- a receiver of zero intermediate frequency is called zero-intermediate frequency receiver;

## Component chains

- Antenna -> Short cable -> Bandstop filter -> LNA -> Long cable -> SDR;

## Bias T

- to enable on RTL-SDR in SDR#: toggle `offset tuning`;
- use `rtlsdr.bat`;
