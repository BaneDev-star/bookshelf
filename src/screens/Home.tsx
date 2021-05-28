import React, {FunctionComponent, useEffect} from 'react';
import {StyleSheet, Text} from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Button from "../components/Button";
import {theme} from "../core/theme";
import {connect} from "react-redux";
import {IUserProps} from "../store/props";

type HomeScreenProps = {
  navigation: any
  user?: IUserProps,
  loading: boolean,
  state: object
}
const HomeScreen: FunctionComponent<HomeScreenProps> = (props) => {
  const {user, loading} = props;
  const {navigation} = props;
  useEffect(() => {
    console.log("home user = ", user);
  }, [user]);
  if (user) {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BooksScreen' }],
    })
  }
  return (
    <Background>
      <Logo />
      <Text style={styles.appTitle}>BookShelf</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  )
};

const styles = StyleSheet.create({
  buttonGroups: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  loading: state.users.loading
});


export default connect(mapStateToProps, null)(HomeScreen);
