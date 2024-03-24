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
some of the original icon names start with a number.  as you can not have a javascript variable start with a number, these names are swapped to have the number come last in the name. (e.g. `3d-glasses.svg` becomes `Glasses3d`)

## library license
this library is released under the [MIT License](https://opensource.org/license/mit).  a local copy of which can by found in [LICENSE](./license)

## icon licensing
please see [icons/license.txt](https://github.com/game-icons/icons/blob/master/license.txt) for a list of icon designers included with this package.  all icons are released under [Creative Commons 3.0 BY](https://creativecommons.org/licenses/by/3.0/) or [CC0](https://creativecommons.org/publicdomain/zero/1.0/).  tt is heavliy encourged that you give credit to all authors, regardless of license, when using these icons.