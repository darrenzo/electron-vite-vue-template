/* eslint-env node */

module.exports = {
    root: true,
    plugins: ["stylelint-order", "stylelint-less"],
    extends: [
        "stylelint-config-standard",
        "stylelint-config-rational-order",
        "stylelint-config-html/vue",
        "stylelint-config-recommended-less",
        "stylelint-config-recommended-vue"
    ],
    overrides: [
        {
            files: ["**/*.(less|css|vue|html)"],
            customSyntax: "postcss-less"
        },
        {
            files: ["**/*.(html|vue)"],
            customSyntax: "postcss-html"
        }
    ],
    rules: {
        "selector-class-pattern": null
    }
};
