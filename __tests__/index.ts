import jiti from 'jiti'

const mainPath = '../src'

const webchalk: typeof import('../src') = jiti(__filename, {
  esmResolve: true,
  debug: true
})(mainPath)

