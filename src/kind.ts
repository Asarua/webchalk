import internalColors from '../internalColors.json'

export const enum KIND {
  COLOR = '__CHALK_KIND_COLOR__',
  BG_COLOR = '__CHALK_KIND_BG_COLOR__'
}

const kindValuePrefixMapping: Record<KIND, string> = {
  [KIND.COLOR]: 'color: ',
  [KIND.BG_COLOR]: 'background-color: '
}

export abstract class ChalkKind {
  public styles: string[] = []

  constructor(
    public kind: KIND,
    public info: unknown,
    initializeStyle: string
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

export {
  internalColors
}
