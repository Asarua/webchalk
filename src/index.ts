import { ChalkKind, colors } from './kind'

interface Chalk {
  (raws: unknown[], ...args: ChalkKind[]): void
}

const chalk: Chalk = (raws: unknown[], ...args: ChalkKind[]) => {
  if (!raws?.length) {
    return ''
  }
  const styleContainer: string[] = []
  
  const rawIterator = raws[Symbol.iterator]()
  const argsIterator = args[Symbol.iterator]()

  let curResult: IteratorResult<unknown>
  while (!(curResult = rawIterator.next()).done) {
    const curArg = argsIterator.next()
    if (curArg.done) {
      break
    }

    if (!(curArg.value instanceof ChalkKind)) {
      styleContainer.push(curArg.value)
    }
  }
}
export default chalk
