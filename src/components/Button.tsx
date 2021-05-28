import React, {FunctionComponent} from 'react'
import {StyleSheet} from 'react-native'
import {Button as PaperButton} from 'react-native-paper'
import {theme} from '../core/theme'

type PaperButtonProps = React.ComponentProps<typeof PaperButton>;
type CustomButtonProps = PaperButtonProps & {
  mode: string,
  style?: object
}

const Button: FunctionComponent<CustomButtonProps> = ({mode, style, ...props}) => {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && {backgroundColor: theme.colors.surface},
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

export default Button;
