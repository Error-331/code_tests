# LED strip

## Physical layer

Modulation: ASK/OOK (Amplitude Shift Keying / On-Off Keying);
Frequency: 433 MHz;

• To send a digital 1, the radio turns 100% ON.
• To send a digital 0, the radio turns 100% OFF.

## Chipset protocols

PT2262 / SC2262 (Fixed Code Protocol):

- older but incredibly common protocol;
- standard packet sends 24 bits of data;
- the first 16 to 20 bits are a hardwired "Address Code" (unique to that remote model so it doesn't trigger your neighbor's lights);
- the last 4 to 8 bits are the "Data Code" (the actual button pressed, like "Red" or "Brighten");

EV1527 / HS1527 (Learning Code Protocol):

- it sends a 24-bit payload prefixed by a long preamble (sync pulse);
- the first 20 bits are a pre-programmed random ID;
- he final 4 bits represent the data key;