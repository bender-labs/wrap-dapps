'use strict';
const path = require('path');
const fs = require('fs');

module.exports = {
  modifyWebpackConfig({ webpackConfig }) {
    const appDirectory = fs.realpathSync(process.cwd());

    const resolvePackage = (relativePath) =>
      path.resolve(appDirectory, relativePath);

    webpackConfig.module.rules[0].include.push(resolvePackage('../../libs'));
    return webpackConfig;
  },
  options: {
    buildType: 'spa',
  },
};
