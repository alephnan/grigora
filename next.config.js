const withSass = require('@zeit/next-sass')
const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript(withSass({
  sassLoaderOptions: {
    includePaths: ['./node_modules']
  }
}));