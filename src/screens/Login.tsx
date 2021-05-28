import React, {FunctionComponent, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import {theme} from "../core/theme";
import CustomTextInput from "../components/TextInput";
import Button from "../components/Button";
import {nameValidator, passwordValidator} from "../helpers/validator";
import {connect, useDispatch} from "react-redux";
import API from "../service/api";
import {userLoginFail, userLoginRequest, userLoginSuccess} from "../store/actions/user";
import LoadingIndicator from "../components/LoadingIndicator";
import {IUserProps} from "../store/props";

type LoginScreenProps = {
  navigation: any,
  user?: IUserProps,
  loading: false
};

const LoginScreen: FunctionComponent<LoginScreenProps> = (props) => {
  const {navigation, loading} = props;
  const [username, setUsername] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const dispatch = useDispatch();

  const onLoginPressed = async () => {
    const nameError = nameValidator(username.value);
    const passwordError = passwordValidator(password.value);
    if (nameError || passwordError) {
      setUsername({...username, error: nameError});
      setPassword({...password, error: passwordError});
      return
    }

    dispatch(userLoginRequest());
    try {
      const resp = await API.User.fetchUserlogin(username.value, password.value);
      dispatch(userLoginSuccess(resp.data.user));
    } catch {
      dispatch(userLoginFail());
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {loading && <LoadingIndicator />}
      <Logo />
      <Text style={styles.appTitle}>Login Screen</Text>
      <CustomTextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({value: text, error: ''})}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
      />
      <CustomTextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button onPress={onLoginPressed} mode='contained'>Login</Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
};


const mapStateToProps = (state: any) => ({
  user: state.users.user,
  loading: state.users.loading,
});

export default connect(mapStateToProps, null)(LoginScreen);

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
