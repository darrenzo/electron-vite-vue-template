/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "@vue/eslint-config-typescript/recommended"],
    rules: {
        "@typescript-eslint/no-var-requires": "warn",
        "vue/html-indent": ["error", 4]
    }
};
