# Media queries

## Media types

- screen;
- tty;
- tv;
- projection;
- handheld;
- print;
- braille;
- aural;
- all;

## Formats

- `@media only media and (expression) { rules }`;
- `@media not media and (expression) { rules }`;

- `@media media and (feature:value) { rules }`;
- `@media media and (feature) { rules }`;

- `@media media and (orientation:value) { rules }` (landscape portrait);

- `@media media and (aspect-ratio:horizontal/vertical) { rules }`;
- `@media media and (device-aspect-ratio:horizontal/vertical) { rules }`;

- `@media media and (-webkit-device-pixel-ratio: number) { rules }`;

- `@media media and (-webkit-max-device-pixel-ratio: number) { rules }`;
- `@media media and (-webkit-min-device-pixel-ratio: number) { rules }`;

- `@media logic media and (expression) and (expression) { rules }`;

## Types

1. `<link href="file" rel="stylesheet" media="logic media and (expression)">`;

2. `@import url('file') logic media and (expression);`;

2. `@media logic media and (expression) { rules }`;

## How to use

- Multiple media types (coma):

```html

<link href="style.css" rel="stylesheet" media="screen, projection">

```

## Examples

- `@media media and (width:600px) { rules }`;
- `@media media and (max-width:480px) { rules }`;
- `@media media and (min-width:640px) { rules }`;

- `@media media and (height:value) { rules }`;
- `@media media and (max-height:value) { rules }`;
- `@media media and (min-height:value) { rules }`;

- `@media media and (device-width:1024px) { rules }`;
- `@media media and (max-device-width:320px) { rules }`;
- `@media media and (min-device-width:800px) { rules }`;

- `@media media and (device-height:value) { rules }`;
- `@media media and (max-device-height:value) { rules }`;
- `@media media and (min-device-height:value) { rules }`;

- `<link href="basic.css" rel="stylesheet" media="screen">`;
- `<link href="desktop.css" rel="stylesheet" media="screen and (min-device-width: 480px)">`;

- CSS block: 

```css

ul { overflow: hidden; }
li { float: left; }

@media only screen and (orientation: portrait) {
    li { float: none; }
}

```

- `@media only screen and (aspect-ratio: 15/10) and (aspect-ratio: 16/9) and (aspect-ratio: 16/10) { rules }`;
- `@media all and (orientation: landscape), projection and (orientation: portrait) { rules }`;
- `@media media and (-moz-touch-enabled) { rules }`;

## IE9 note

Versions of IE before 9 does not support media queries, so better use this technique:

```html

<link href="basic.css" rel="stylesheet" media="screen">
<link href="desktop.css" rel="stylesheet" media="screen and (min-device-width: 480px)">
<!--[if lt IE 9]>
<link href="desktop.css" rel="stylesheet" media="screen”>
<![endif]-->

```
