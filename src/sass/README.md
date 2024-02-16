# Sass Guidelines

## General Guidelines

In order to improve the clarity, quality, and development time it is worth considering the following principles whenever possible:

- [Keep Sass Simple](https://www.sitepoint.com/keep-sass-simple/), which means [KISS (Keep It Simple, Stupid)](https://en.wikipedia.org/wiki/KISS_principle) may override [DRY (Don't Repeat Yourself)](https://en.wikipedia.org/wiki/Don't_repeat_yourself) in some cases
- [Single responsibility selectors](https://en.bem.info/methodology/css/#single-responsibility-principle)

---

## Style Guide

- [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css/blob/master/README.md) is partially being followed in our code base.

- [CSS with BEM](https://en.bem.info/methodology/css/) is partially being followed in our code base.

- Most styling issues will be caught by [stylelint](https://github.com/stylelint/stylelint/blob/master/README.md), so before pushing your changes remember to run `grunt stylelint` to catch and fix any issues that it finds.

- Check below for the rules that are not caught by styling but should be followed.

### Naming Conventions

<a id="naming-conventions-selectors"></a>
**[Selectors:](#naming-conventions-selectors)** Selectors should follow the [BEM Two Dashes style](https://en.bem.info/methodology/naming-convention/#two-dashes-style): `block-name__elem-name--mod-name--mod-val`.

```scss
.button {
}
.button--disabled {
}
```

Remember to follow the [Single responsibility principle](https://en.bem.info/methodology/css/#single-responsibility-principle).

<a id="naming-conventions-variables"></a>
**[Variables:](#naming-conventions-variables)** Sass variables should be in uppercase and have a meaningful prefix.

```scss
$COLOR_RED: #e31c4b;

// Light theme
$COLOR_LIGHT_BLACK_1: rgba(0, 0, 0, 0.8);

// Dark theme
$COLOR_DARK_BLUE_1: #0b0e18;
```

Keep all common variables in the [constants.scss](https://github.com/deriv-com/smarttrader/blob/master/src/sass/_common/base/constants.scss) file.

---

### Units

<a id="units-flexibility"></a>
**[Flexibility:](#units-flexibility)** If flexibility is needed, for example for font-size, use units such as `rem`, `vh`, `vw`, `fr`, and only use `px` if it's supposed to be a fixed value.

#### When to use `em` and `px`?

- `em` is typically used in padding and margin to maintain the vertical rhythm. If a user resizes the text, the `em` unit will be scaled proportionately. `em` size is always relative to the font-size of the element.

```scss
// For example: `span` with font-size of 14px and padding of 8px.
// The padding in `em` should be `14px/8px * 1em ~ 0.571em`.
span {
  font-size: 1.4em;
  padding: 0.571em;
}
```

- `px` is used to define a fixed value such as for `box-shadow`, `border-radius` and `border-width`.

#### Converts `px` to `em` values

1. Since the base font-size is set to be `10px = 1rem`, convert `px` to `em` by dividing the `px` value by 10.

```scss
.balloon {
  padding: 1.6em; // 16px;
}
```

2. Or any online converter tool.

---

### Theme

<a id="theme-mixin"></a>
**[Mixin:](#theme-mixin)** use mixins wherever possible to standardize the colours used in different themes and reduce repetition.

```scss
@mixin link {
  color: $COLOR_WHITE;

  &:hover,
  &:active {
    text-decoration: none;
  }
}

.sidebar {
  background: $COLOR_LIGHT_GRAY;

  a {
    @include link;
    display: block;
  }
}
```

---

### Commenting

<a id="commenting-explanations"></a>
**[Explanations:](#commenting-explanations)** Feel free to add comments to explain any styling that is confusing.

<a id="commenting-todo"></a>
**[To do:](#commenting-todo)** Use `TODO: ...` comments anywhere that need consideration or attention in the future.
