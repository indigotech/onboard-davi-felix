import * as React from 'react';
import {ColorValue, TouchableOpacity} from 'react-native';

import {floatingActionsStyles} from './styles';

import Feather from 'react-native-vector-icons/Feather';

interface FloatingActionButtonProps {
  onPress: () => void;
  iconName: string;
  iconColor: ColorValue;
}

export const FloatingActionButton = ({
  onPress,
  iconName,
  iconColor,
}: FloatingActionButtonProps) => {
  return (
    <TouchableOpacity style={floatingActionsStyles.button} onPress={onPress}>
      <Feather name={iconName} size={56} color={iconColor} />
    </TouchableOpacity>
  );
};
