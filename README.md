# readme

## eslint 配置

- vscode 安装插件

  - Prettier ESLint
  - ESlint
  - EditorConfig for VS Code

- 配置 .vscode

  - 格式化程序选择 Prettier ESLint

- vscode 的 settings.json 配置

```json
  "editor.defaultFormatter": "rvest.vs-code-prettier-eslint",
  "editor.tabSize": 4,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnPaste": false, // required
  "editor.formatOnType": false, // required
  "editor.formatOnSave": true, // optional
  "editor.formatOnSaveMode": "file", // required to format on save
  "files.autoSave": "onFocusChange", // optional but recommended
  "vs-code-prettier-eslint.prettierLast": false, // set as "true" to run 'prettier' last not first
```
