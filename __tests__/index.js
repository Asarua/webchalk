import jiti from 'jiti'

const mainPath = '../src'

/**
 * @type {typeof import('../src')}
 */
export const webchalk = jiti(__filename, {
  esmResolve: true,
  debug: true
})(mainPath)

