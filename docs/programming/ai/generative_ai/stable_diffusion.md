# Stable diffusion

## Controls

### Stable Diffusion Checkpoint

- used to switch between your models using a drop-down menu; 
- additional models can be downloaded online for more niche purposes like comic art; 
- there is a brief delay upon switching models as all the code gets loaded;

### Prompt

- the English text prompt to feed into the AI;
- user write English sentences to describe the picture user want to create and the AI will come up with something close to what user described;

### Negative Prompt

When the AI is generating user's image, it’ll try to move closer to elements user described in his/her prompt, but further away from elements described in his/her negative prompt.

Example:
- user generates images of a man and he/she wants him to be *clean-shaven*; 
- user could type "beard, mustache" into the negative prompt field and user decrease the likelihood of generating a picture of a man with facial hair;

### Sampling Steps

- number of "denoising steps" (how many times the AI makes a pass over an image to refine it); 
- very low values will output a bad image that looks like pure noise; 
- higher values will refine the image and increase detail (higher values are not always better);

### Sampling Method

- changes how the AI algorithm runs on the backend; 
- user will get different results with each sampler (though some samplers produce near-identical images at very high sampling steps);

### CFG Scale (prompt weight)

- classifier-free guidance scale;
- determines how closely *Stable Diffusion* should follow user text prompt;
- low numbers (around 0 to 6) allow Stable Diffusion free reign;
- mid-range numbers (around 6 to 12) guide *Stable Diffusion* into collaborating with the user;
- higher numbers (12 and up) order Stable Diffusion to strictly follow usre's prompt;

### Width and Height

- 512 x 512 is the default, and the size at which *Stable Diffusion’s* models were trained;
- with good enough video card can generate images with larger dimensions;
- generating an image at 1024 x 512 might cause user to get repeating subjects (unless "Highres" is off);

### Highres

- this special option will start generating an image at a low resolution, and then upscale it to finish generating it at specified higher resolution; 
- the end result is that the image will generally keep the better composition (and non-repeating subject) of the low resolution version while still producing a high resolution final image that is detailed and sharp;

### Tiling

- if user check it off, user will get an image which can literally tile with itself to make a larger continuous, repeating pattern; 
- it could be useful if user wants to make a tiled background (for a website - example);

### Restore Faces

- this option lets user automatically improve faces in images with either GFPGAN or CodeFormer;
- user can choose between the two methods on the "Settings" tab under the "Face Restoration" section; 
- however, it is better to use the "Extras" tab, which gives you greater control;

### Seed

- a number that is used as a starting point for generating an image, ranging from 0 to 4,294,967,295;
- in the Web GUI, a seed of -1 simply means "choose a random seed for me.";
- using a random seed give fresh, unique results each time; 
- using the same seed will produce identical results each time (as long as prompt and settings don’t change);
- if user get an image that user like but isn’t quite right, user can use that same seed again and then refine the image by adjusting his/her prompt and other settings;

### Batch Count 

- specifies how many images to generate, one after another; 
- user will get a series of generated images starting with a random seed (or the specified seed) where each subsequent image adds 1 to the seed (e.g. 646, 647, 648…); 
- generating images in a batch is great if user wants to test generating a whole bunch of images at once for a particular prompt;

### Batch Size

- specifies how many images to generate simultaneously;
- if user's computer have a video card that has a lot of VRAM, user can increase his/her batch size to speed up generations;
- if the user specify a batch count of 10 and a batch size of 4, user will generate 10 sets of 4 images, or a total of 40 images;

## Promoting basics

- prompts should be written in English (Stable Diffusion was largely trained largely on images labeled with English);
- words at the start of the prompt are given higher priority (unless user uses weights);
- user can separate various elements of his/her prompt with a comma;
- adding artists at the end predisposes the AI toward following those artists’ visual styles;

Template:

a painting of a <subject>, <action> in a <setting>, <style>, art by <artist 1>, art by <artist2>,

Example: 

```text

a painting of a beautiful princess wearing a crown, standing in a forest, mist and sparkles, rays of sunlight through the trees, artgerm, greg rutkowski, alphonse mucha

```

### Increasing the significance (weight) of a word

- in the Web GUI, user can wrap any word or phrase in parentheses for (emphasis), or square brackets for [de-emphasis]; 
- this causes the AI to pay more attention to emphasized words and to move away from de-emphasized words;
- since Web GUI offers a negative prompt, it’s better to type  "de-emphasized" words and phrases in that box instead of the prompt box;
- emphasizing a word increases its "weight" (or significance) to the AI; 
- user can give words and phrases more fine-tuned "weights" as well by adding a colon and a small fractional number before the closing parentheses;

Example:

```text

a painting of a beautiful princess (wearing a crown:1.3), standing in a forest, mist and sparkles, rays of sunlight through the trees, artgerm, greg rutkowski, alphonse mucha

```

- this will tell the AI to focus on "wearing a crown" above other words in the prompt; 
- it will try harder to make sure the princess in my image is, in fact, wearing a crown; 
- this is a great strategy if user will find something in his/her prompt keeps getting missed when the AI generates his/her images;
- "push ctrl + up" arrow on the keyboard to increase the weight, or ctrl + down arrow to decrease the weight;
