# ChatGPT

## Settings

### Temperature

Temperature controls the amount of randomness used in the generation of output. 

- allows the user to adjust the level of creativity and unpredictability in the output; 
- setting the value between 0 and 2 (the default is 1), output will range from highly creative and unpredictable (2) to highly structured and conservative (0);

### Top P

Nucleus sampling or penalty-free sampling.

- helps control the diversity of the generated text; 
- it involves selecting the most likely words for the next token in a sequence, considering a cumulative probability threshold (P);
- instead of generating from its entire vocabulary, it narrows choices to a subset of the most probable words whose cumulative probabilities exceed P; 
- this helps control the output’s length and diversity while maintaining coherence;
- Top P allows the model to think beyond the obvious choices while still staying coherent (useful when user wants creative responses that don’t completely deviate from the topic);
- by adjusting the Top P value, users can influence the amount of randomness or diversity in the model’s responses; 
- a higher value(0.9) includes a larger set of potential tokens, making the output more diverse, while a lower value (0.1) narrows the choices, resulting in more focused and deterministic outputs;

#### Difference with temperature

- temperature controls the randomness in language generation: higher values (1.0) increase diversity, and lower values ( 0.2) produce more predictable output; 
- Top P sampling sets a probability threshold (p) to select from a subset of the most probable words, adjusting output diversity based on the threshold (0.9 for more diversity; 0.2 for less); 
- as a rule, one can alter Temperature or Top P but not both;

### Stop sequences

Stop sequences are special tokens used to indicate the end of a generated response or to prompt the model to stop generating further text. These tokens are typically added to the 
input prompt to control the length of the generated output.

- in English, a common example of an end-of-sentence token is the period (.), followed by a space; 
- in programming languages, a common stop sequence might be a pair of curly braces ({}) to indicate the end of a code block; 
- in HTML or XML, a closing tag like </tag> signals the end of an element;
- special tokens like <eos> (end of sequence) internally;

### Frequency penalty

The frequency penalty is used to discourage repetitive or redundant output. 

- applying a frequency penalty, users can control the tradeoff between generating diverse responses and avoiding repetitive patterns;
- penalty value, which can lie between -2.0 and 2.0, can be adjusted based on the desired level of repetition avoidance;
- higher penalty values result in stronger discouragement of repetition, while lower values allow for more flexibility in the generated output;
- finding the right balance is important to ensure the generated text remains coherent and contextually relevant while avoiding excessive repetition;

### Presence penalty

The presence penalty is a parameter in GPT models that helps control the repetition of phrases and words in the generated text. It’s designed to prevent the model from repeating the 
same phrases or words too often in the generated output. 

- the presence penalty modifies the probability distribution so that the use of words in the input prompt or seed text is less likely; 
- this encourages the model to generate words and cover topics that were not explicit in the input;
- this encourages the model to generate words that were not in the input;
- by adjusting the presence penalty, user can control how much the AI adheres to specific keywords or concepts in its generated text;
- lower values may result in the model mentioning the desired topics more frequently, while higher values encourage the model to avoid excessive repetition of those topics;

### Best Of

When generating responses from a generative AI model, user may sometimes receive multiple candidate outputs. The Best Of approach involves selecting the most suitable or highest-quality
response from these candidates based on certain criteria. 

- default setting (1) will stream all outputs without any selection or filtering;
- higher values (up to 20) will increase the ratio of possibility generations to outputs that you’re shown;

### Inject Start Text

The *Inject Start Text* or Input Prefix setting guides or conditions the model’s output based on specific initial text provided by the user. It involves prepending or inserting a prompt, 
question, or context at the beginning of the input sequence to influence the generated response. By injecting start text, user can provide the model with additional context or 
information that helps steer its output in a desired direction.
