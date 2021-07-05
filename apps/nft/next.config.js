const withTM = require('next-transpile-modules')(['@wrap-dapps/components']);

module.exports = withTM({
  webpack5: true,
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: '/',
  }
});
