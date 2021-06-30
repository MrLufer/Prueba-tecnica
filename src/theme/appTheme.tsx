import {StyleSheet} from 'react-native';

export const colors = {
  primary: '#3f51b5',
  success: '#14C59E',
  blue: '#3F9FFE',
};

export const appTheme = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 20,
    justifyContent:'center'
  },
});
