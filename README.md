# webchalk

A library for outputting colored fonts in browser developer tools

## Usage

```typescript
import { chalk } from 'webchalk'


// colored font
chalk`123${chalk.red('456')}789`

// colored background
chalk`123${chalk.bgRed(`456`)}789`

// compose
chalk`123${chalk.bgRed(chalk.white('456'))}`

// custom font or background colors
const aurora = chalk.color('#01c2c3')
const bgHua = chalk.bg('#666666')
chalk`123${aurora('aurora')}${bgHua('bgHua')}`
```
