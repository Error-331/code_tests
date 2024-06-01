# Devices

## SDR

- NooElec R820 SDR & DVB-T NESDR Mini 25MHz-1750MHz;
- Astrometa DVB-T2  25 MHz - 1766 MHz;
- rtl2832u 25 MHz - 1766 MHz;
- Icom IC-R20;
- BladeRF - 47 MHz - 6 GHz;
- LimeSDR - 100 kHz – 3.8 GHz;
- RSP1A - 1kHz to 2GHz;
- RSP1B - 1kHz to 2GHz;
- HackRF - 1 MHz to 6 GHz;

## Portable consumer radio

### Tecsun R-1010A

Antenna length: 52 cm;

#### MW 530 KHz - 1600 KHz (0.53 - 1.6 MHz)

- Wave length: 565.646 m - 187.3703 m;
- Dipole antenna length (leg): 13.458 cm -  4.458 cm;
- Monopole antenna length: 14.141 cm -  4.684 cmm;

#### SW 5.90 MHz - 22 MHz

- Wave length: 50.8123 m - 13.62693 m;
- Dipole antenna length (leg): 1.209 cm - 324.2 cm;
- Monopole antenna length: 1.270 cm - 340.7 cm;

#### FM 88 MHz - 108 MHz

- Wave length: 3.40673 m - 2.776 m;
- Dipole antenna length (leg): 81.05 cm - 66.04 cm;
- Monopole antenna length: 85.17 cm - 69.4 cm;

## Handheld radios

- DMR Baofeng DM-1801 - AES256;

## Antennas

- Nagoya ut106 - связь на 70см по всему городу, на двойке только с теми кто с моей стороны, но за 40км;
- Diamond X-50 - 
- Лемм 2001 турбо -  26~28,5 MHz, 2000 W;

### DAT - 01

Frequency: 174 MHz - 230 MHz, 470 MHz - 862 MHz;
Gain: 12-18 dB
Orientation: 12-26 dB
Size: 3.70 cm x 3.70 cm x 13.70 cm;
Weight: 0.2 kg

## TinySA Ultra

### Measure

- Harmonic - гармоники;
- OIP3 - ???;
- Phase Noise - фазовый шум;
- SNR - соотношение сигнал/шум;
- -3dB width - по полосе 3 децибела;
- AM - ???;
- FM - ???;
- THD - гармонические искажения;
- Channel Power - мощьность в канале;
- Linear - ???;
- Noise Figure - профиль шума;


## LNA

### RTL-SDR BLOG 1090 MHZ ADS-B LNA

- high gain LNA;
- expected to be used at the antenna side, with some 3+ db loss expected on the coax;
- for improving 1090 MHz ADS-B reception mostly;
- helping to overcome losses in the coax cable and/or any other components such as switches and connector in the signal path;
- the LNA needs to be positioned close to the antenna, before the coax to the radio;
- attenuation in the broadcast FM band and below 800 MHz is actually closer to over 100 dB's;
- in the LNA signal path there is first a low insertion loss high pass filter that reduces the strength of any broadcast FM, TV, pager or other similar signals;
- in between the first and second stage of the LNA is a SAW filter tuned for 1090 MHz;
- a second SAW filter sits on the output of the LNA;
- bias tee power is required (DC power comes through the coax cable);

#### Specs

**Frequency**: 1090 MHz;
**Gain**: 27 dB @ 1090 MHz;
**Return Loss**: -16 dB @ 1090 MHz (SWR = 1.377);
**Noise Figure**: ~1 dB;
**Out of band attenuation**: More than 60 dB;
**ESD Protection**: Dual with GDT and ESD Diode;
**Power**: 3.3 - 5V via bias tee only, 150 mA current draw;
**Enclosure**: Aluminum enclosure;
**Connectors**: Two SMA Female (Male to Male adapter included);