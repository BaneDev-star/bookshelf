import React, {FunctionComponent, useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Text} from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import {theme} from '../core/theme'
import {nameValidator, passwordValidator} from '../helpers/validator'
import {connect, useDispatch} from "react-redux";
import {userRegisterFail, userRegisterRequest, userRegisterSuccess} from "../store/actions/user";
import API from "../service/api";
import LoadingIndicator from "../components/LoadingIndicator";

type RegisterScreenProps = {
  navigation: any,
  loading: boolean
};

const RegisterScreen: FunctionComponent<RegisterScreenProps> = (props) => {
  const {navigation, loading} = props;
  const [username, setUsername] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const dispatch = useDispatch();

  const onSignUpPressed = async () => {
    const nameError = nameValidator(username.value);
    const passwordError = passwordValidator(password.value);
    if (nameError || passwordError) {
      setUsername({...username, error: nameError});
      setPassword({...password, error: passwordError});
      return
    }

    dispatch(userRegisterRequest());
    try {
      const resp = await API.User.fetchUserRegister(username.value, password.value);
      dispatch(userRegisterSuccess(resp.data.user));
    } catch {
      dispatch(userRegisterFail());
    }

  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {loading && <LoadingIndicator />}
      <Logo />
      <Text style={styles.appTitle}>Create Account</Text>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({value: text, error: ''})}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{marginTop: 24}}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  appTitle: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});


const mapStateToProps = (state: any) => ({
  user: state.users.user,
  loading: state.users.loading,
});

export default connect(mapStateToProps, null)(RegisterScreen);
