import React from 'react';
import { Appearance, ColorValue } from 'react-native';
import { SvgXml, XmlProps } from 'react-native-svg';

export interface MIconProps extends Omit<XmlProps, 'fill' | 'width' | 'height' | 'xml'> {
  color?: ColorValue;
  size?: number;
}

export const createSvgIcon = (xml: string) => 
  ({ color, fillOpacity = 1.0, size = 24, ...props }: MIconProps<V>) => {
    const defaultIconColor = Appearance.getColorScheme() === 'light' ? '#000000' : '#ffffff';

    return (
      <SvgXml
        {...props}
        fillOpacity={fillOpacity}
        fill={color ?? defaultIconColor}
        width={size}
        height={size}
        xml={xml}
      />
    );
  };
};
