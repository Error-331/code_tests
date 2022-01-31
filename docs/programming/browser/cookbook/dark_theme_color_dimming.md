# Dark theme color dimming

- Using simple css rules:

```css

.message--dark * {
    background-color: black !important;
    color: white !important;
    border-color: #333 !important;
}

```

- Using simple css filters:

```css

.message--dark {
    filter: invert(100) hue-rotate(180deg); /* hue-rotate возвращает тона обратно */
}

.message-dark img {
    filter: invert(100) hue-rotate(180deg);
}

```

- Using HSL transformation formula: `(h, s, l) => [h, s, 1 - l]`;
- Using css `color` function and css `variables`: `color(var(--bg) lightness(-50%))`;
