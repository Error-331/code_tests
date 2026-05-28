# AI general

- Generative AI can sometimes insert invisible `Narrow No‑Break Space` (Unicode U+202F) symbols which are different from regular `Space` character;

## Tokens

- Large language models (LLMs) process the text as smaller chunks called tokens; 
- The tokens are embedded in an n-dimensional space that captures their features, such as semantics and context;
- Tokens are the fundamental building blocks of data—words, parts of words, or characters—used to process and generate language; 
- Tokens act as the `currency` and `alphabet` for AI, representing raw input, such as the phrase `tokenization` being split into `token`, `iz`, `ation`;
- Tokens are not always cut precisely at word boundaries;
- Depending on the method, tokens can be words, parts of words, or phrases;
- Each token is analyzed individually, giving AI a structured framework to understand language;
- After tokenization, these elements are transformed into numeric vectors, or embeddings; 
- Embeddings capture word meanings, allowing AI to detect patterns, relationships, and context in text;
- In computer vision, tokens can represent patches (grids) of an image, which are processed similarly to text tokens;

Examples: 

1 token ≈ 4 characters in English
1 token ≈ ¾ words
100 tokens ≈ 75 words

Summary:

1. Definition & Usage: Tokens break down language into manageable pieces (chunks) for processing - input/output;
2. Examples: A token can be a single character (like 'a'), a whole word (like 'token'), a part of a word (like 'ing'), or even punctuation;
3. Synonyms/Related Terms: In AI, tokens are often described as building blocks, sub-word units, text segments, or data units;
4. Size Rules of Thumb (English): 1 token is roughly 4 characters or 0.75 words, therefore, 1,000 tokens are approximately 750 words;
5. Role in AI: Tokens are essential for calculating cost (billing), managing the context window (memory), and determining processing speed;
