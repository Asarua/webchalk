import { ChalkKind, internalColors, KIND } from './kind'

type AttrCallback = (info: unknown | ChalkKind) => ChalkKind

type Chalk = {
  (raws: TemplateStringsArray, ...args: ChalkKind[]): void
} & {
  [P in typeof internalColors[number]]: AttrCallback
} & {
  [P in `bg${Capitalize<typeof internalColors[number]>}`]: AttrCallback
}

const defaultChalk: Chalk = (() => {}) as any

export const chalk = new Proxy(defaultChalk, {
  apply(_target, _this, args: [TemplateStringsArray, ...ChalkKind[]]) {
    const [raws, ...others] = args
    if (!raws?.length) {
      return ''
    }
    const resultContainer: string[] = []
    const styleContainer: string[] = []
    
    const rawIterator = raws[Symbol.iterator]()
    const argsIterator = others[Symbol.iterator]()
  
    let curResult: IteratorResult<string>
    while (!(curResult = rawIterator.next()).done) {
      pushContentAndStyle(curResult.value)
      const curArg = argsIterator.next()
      if (curArg.value instanceof ChalkKind) {
        pushContentAndStyle(curArg.value)
      }
    }

    console.log(resultContainer.join(''), ...styleContainer)

    function pushContentAndStyle(result: string): void
    function pushContentAndStyle(result: ChalkKind): void
    function pushContentAndStyle(result: any) {
      if (typeof result === 'string') {
        resultContainer.push(`%c${result}`)
        styleContainer.push('all: unset;')
      } else {
        resultContainer.push(`%c${result.info}`)
        styleContainer.push(result.styles.join(' '))
      }
    }
  },
  get(_, attr: string) {
    const kind = checkAttrKind(attr)
    let initializeStyle = getOriginAttr(attr)

    if (attr === 'color' || attr === 'bg') {
      return function(color: string) {
        initializeStyle = color
        return generateKind
      }
    }

    return generateKind

    function generateKind(info: unknown) {
      const CurKind = class extends ChalkKind {
        constructor(...args: ConstructorParameters<typeof ChalkKind>) {
          super(...args)
        }
      }

      return new CurKind(kind, info, initializeStyle)
    }
  }
})

function checkAttrKind<T extends string>(attr: T) {
  if (attr.startsWith('bg')) {
    return KIND.BG_COLOR
  } else {
    return KIND.COLOR
  }
}

function getOriginAttr(attr: string) {
  if (attr.startsWith('bg')) {
    return attr.charAt(2).toLowerCase() + attr.slice(3)
  }

  return attr
}

export default chalk
