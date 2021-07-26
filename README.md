# Windi CSS Bug Reproduction

This application demonstrates a problem in the CSS generation.

## Replication Steps 🐞

- Run `pnpm install`
- Build the application with `pnpm build`
- Check the generated `.css` asset file in `dist/assets`

### Unexpected CSS rule

1. The `http-equiv="content-type"` meta header is interpreted as the `content` utility.

  ```html
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
  ```

  ```css
  .content-type {
    content: "type"
  }
  ```

2. Having `.content-type` inside the HTML content generates a escaped version of it:

  ```css
  .\.content-type {
    content: "type"
  }
  ```

  Probably caused by the same "expression" bug as mentioned in https://github.com/windicss/vite-plugin-windicss/issues/213.
