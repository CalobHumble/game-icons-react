# game-icons-react
> game-icons.net, converted to typed react icon components

## installation

### npm
`npm install game-icons-react`

### yarn
`yarn add game-icons-react`

### bun
`bun add game-icons-react`

## usage

### properties
each icon has a `color` and `size` property for simple inline manipulation of the icons presentation. you can pass any react-native-svg prop as well

### example
```ts
import { Delapouite } from 'game-icons-react';

export function BlackSheep() {
  return <Delapouite.Sheep size={24} color='#0e0e0e' />
}
```

### a note on names
Some of the original icon names start with a number.  As you can not have a JavaScript variable start with a number, these names are swapped to have the number come last in the name. (e.g. `3d-glasses.svg` becomes `Glasses3d`)

## library license
This library is released under the [MIT License](https://opensource.org/license/mit).  A local copy of which can by found in [LICENSE](./license)

## icon licensing
Please see [icons/license.txt](https://github.com/game-icons/icons/blob/master/license.txt) for a list of icon designers included with this package.  All icons are released under [Creative Commons 3.0 BY](https://creativecommons.org/licenses/by/3.0/) or [CC0](https://creativecommons.org/publicdomain/zero/1.0/).  It is heavliy encourged that you give credit to all authors, regardless of license, when using these icons.