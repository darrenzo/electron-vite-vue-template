/* eslint-env node */
// 此文件不能是json文件，否则在使用cz提交commit时不会出现选项提示

module.exports = {
    extends: ["@commitlint/config-conventional"],
    // 自定义部分规则
    rules: {}
};
