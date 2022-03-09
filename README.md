# react-native-fontawesome-icons

When only using a few icons, more efficient to use svg files instead of a font.

```javascript
import { Home } from 'react-native-fontawesome-icons';

const Example = () => (
  <View style={{ flexDirection: 'row', backgroundColor: 'black' }}>
    <SvgYoutube size={48} color="#ff0000" />
  </View>
);
```

## Install

`yarn add react-native-fontawesome-icons react-native-svg`

## Search [Font Awesome's Free Icons](https://fontawesome.com/v6/icons?m=free)

Search [Font Awesome's Free Icons](https://fontawesome.com/v6/icons?m=free) list to see available svg files.

## Components

Names are mapped from FontAwesome's website. The names map from snake case to PascalCase. All Icons are prefixed with `Svg`.

- `youtube` becomes `<SvgYoutube />`
- `screwdriver-wrench` becomes `<SvgScrewdriverWrench />`
- `0` becomes `<Svg0 />`

## Properties

- `color`: light='#000000', dark='#ffffff'

  Color of icon in `#rrggbb` format. The default is based on Appearance.getColorScheme().

- `size`: Default is 24.

  Width and height of icon.

- `fillOpacity`: Default = 1

  This prop specifies the opacity of the color or the content the current object is filled with.
