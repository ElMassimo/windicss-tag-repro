# Windi CSS Bug Reproduction

This application demonstrates a problem in the CSS generation where HTML tags
and certain JS variables are parsed incorrectly as CSS classes.

## Replication Steps 🐞

- Run `pnpm install`
- Build the application with `pnpm build`
- Check the generated `.css` asset file in `dist/assets`

### Unexpected CSS rules

1. The `animate` SVG element is detected as a CSS class

  ```css
  .\<animate {
      -webkit-animation-iteration-count: 1;
      aniamtion-iteration-count: 1
  }
  ```

  Notice the typo in `animation-iteration-count`. Fixed in https://github.com/windicss/windicss/pull/400.

2. A JS expression is detected as a CSS class

  ```css
  .duration\.value {
      -webkit-transition-duration: 150ms;
      -o-transition-duration: 150ms;
      transition-duration: 150ms
  }
  ```

3. A variable interpolated in the template is detected as a CSS class

  ```css
  .duration {
      -webkit-transition-duration: 150ms;
      -o-transition-duration: 150ms;
      transition-duration: 150ms
  }
  ```

### Expected Behavior

None of these rules should be generated.
