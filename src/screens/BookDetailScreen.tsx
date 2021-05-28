import {IBookProps, IUserProps} from "../store/props";
import React, {FunctionComponent, useEffect, useState} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import Background from "../components/Background";
import API from "../service/api";
import {connect} from "react-redux";
import BackButton from "../components/BackButton";
import LoadingIndicator from "../components/LoadingIndicator";


type IProps = {
  user: IUserProps,
  navigation: any,
  route: any
}

const BookDetailScreen: FunctionComponent<IProps> = (props) => {
  const {route, user, navigation} = props;
  const {bookId} = route.params;
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<IBookProps>({} as IBookProps);

  useEffect(() => {
    const fetchBookDetail = async () => {
      if (bookId) {
        setLoading(true);
        try {
          const resp = await API.Books.fetchBookDetail(user.token, bookId);
          setBook(resp.data.book);
          setLoading(false);
        } catch {
          setLoading(false);
        }
      }
    };
    fetchBookDetail();
  }, [bookId]);
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {loading && <LoadingIndicator />}
      {!loading && (
        <View style={styles.itemContainer}>
          <View style={styles.bookHeader}>
            <Text style={styles.bookTitle}>{book!.title}</Text>
            <View>
              <Text>{book!.author}</Text>
              <Text>{book!.publisher}</Text>
            </View>
          </View>
          <Image source={{uri: book!.coverImageUrl}} style={styles.coverImage} />
          <Text>{book!.synopsis}</Text>
        </View>
      )}
    </Background>
  )
};

const mapStateToProps = (state: any) => ({
  user: state.users.user,
});

export default connect(mapStateToProps, null)(BookDetailScreen);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
  },
  coverImage: {
    width: 200,
    height: 305,
    marginBottom: 8,
  },
  bookHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterInput: {
    marginTop: 10,
    marginBottom: 10,
  }
});
