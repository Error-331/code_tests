# Gemini

## Models

Date: 11.03.2026

1.`gemini-3.1-pro-preview` and `gemini-3.1-pro-preview-customtools`;
 - latest performance;
 - multimodal understanding;
 - agentic capabilities;
 - vibe-coding;
2. `gemini-3.1-flash-lite-preview`;
 - high-volume agentic tasks;
 - translation; 
 - simple data processing;
3. `gemini-3.1-flash-image-preview`;
 - image generation;
4. `gemini-3-flash-preview`;
 - general;
 - fast;
5. `gemini-3-pro-image-preview`;
 - image generation;
6. `gemini-2.5-flash`;
 - general;
7. `gemini-2.5-flash-lite`;
 - general;
 - work at scale;
8. `gemini-2.5-flash-lite-preview-09-2025`;
 - general;
 - cost-efficiency;
 - high throughput;
9. `gemini-2.5-flash-native-audio-preview-12-2025`;
 - audio;
 - Live API;
10. `gemini-2.5-flash-image`;
 - image generation;
11. `gemini-2.5-flash-preview-tts`;
 - text-to-speech;
12. `gemini-2.5-pro-preview-tts`;
 - text-to-speech;
13. `imagen-4.0-generate-001` and `imagen-4.0-ultra-generate-001` and `imagen-4.0-fast-generate-001`;
 - image generation;
14. `veo-3.1-generate-preview` and `veo-3.1-fast-generate-preview`;
 - video generation;
15. `veo-3.0-generate-001` and `veo-3.0-fast-generate-001`;
 - video generation;
16. `veo-2.0-generate-001`;
 - video generation;
17. `gemini-embedding-2-preview`;
 - embedding generation;
18. `gemini-embedding-001`;
 - embedding generation;
20. `gemini-robotics-er-1.5-preview`;
 - robotics abilities;
21. `gemini-2.5-computer-use-preview-10-2025`;
 - browser agents;
22. Gemma 3;
 - coding;
23. Gemma 3n;
 - coding;

## Rate limits

- regulate the number of requests user can make to the Gemini API within a given timeframe;
- rate limits are applied per project, not per API key;
- requests per day (RPD) quotas reset at midnight Pacific time;
- Limits vary depending on the specific model being used, and some limits only apply to specific models. For example, Images per minute, or IPM, is only calculated for models capable of generating images (Nano Banana), but is conceptually similar to TPM. Other models might have a token per day limit (TPD).
- rate limits are more restricted for experimental and preview models;
- rate limits are tied to the project's usage tier (*as API usage and spending increase - plan will be automatically upgraded to higher tier*);
- Batch API requests are subject to their own rate limits, separate from the non-batch API calls*;

Batch API rate limits

Dimensions:

1. Requests per minute (RPM);
2. Tokens per minute (input) (TPM);
3. Requests per day (RPD);