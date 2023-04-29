const enum KIND {
  COLOR = '__CHALK_KIND_COLOR__',
  BG_COLOR = '__CHALK_KIND_BG_COLOR__'
}

type GetKindAttr<K extends KIND, T extends string> = K extends KIND.BG_COLOR ? `bg${Capitalize<T>}` : T

function genKindAttr<K extends KIND, T extends string>(
  kind: KIND,
  attr: string
): GetKindAttr<K, T> {
  switch (kind) {
    case KIND.BG_COLOR:
      return `bg${attr.charAt(0).toUpperCase()}${attr.slice(1)}` as any
    case KIND.COLOR:
      return 'color' as any
    default:
      return '' as any
  }
}

const kindValuePrefixMapping: Record<KIND, string> = {
  [KIND.COLOR]: 'color: ',
  [KIND.BG_COLOR]: 'background-color: '
}

export abstract class ChalkKind {
  public styles: string[] = []

  constructor(
    public kind: KIND,
    private info: unknown,
    private initializeStyle: string
  ) {
    if (info instanceof ChalkKind) {
      this.styles.push(...info.styles)
      this.info = info.info
    }
    this.styles.push(`${kindValuePrefixMapping[kind]}${initializeStyle};`)
  }

  protected compare(kind: ChalkKind) {
    this.styles.push(...kind.styles)
  }
}

function chalkKindFactory<K extends KIND, T extends readonly string[]>(kind: K, properties: T): Record<GetKindAttr<K, typeof properties[number]>, (info: unknown) => ChalkKind> {
  const CurKind = class extends ChalkKind {
    constructor(...args: ConstructorParameters<typeof ChalkKind>) {
      super(...args)
    }
  }

  return properties.reduce((ret, color) => {
    ret[genKindAttr(kind, color)] = (info: unknown) => new CurKind(kind, info, color)
    return ret
  }, {} as any)
}

const internalColors = ['red', 'yellow', 'orange', 'green', 'cyan', 'blue', 'tomato', 'pink'] as const

export const colors = chalkKindFactory(KIND.COLOR, internalColors)
export const bgColors = chalkKindFactory(KIND.BG_COLOR, internalColors)
