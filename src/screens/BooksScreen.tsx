import React, {FunctionComponent, useEffect, useState} from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect, useDispatch} from "react-redux";
import API from "../service/api";
import {IBookProps, IUserProps} from "../store/props";
import {getBookListFail, getBookListRequest, getBookListSuccess} from "../store/actions/books";
import Background from "../components/Background";
import CustomTextInput from "../components/TextInput";

type IProps = {
  user: IUserProps,
  books: IBookProps[],
  navigation: any,
}

const BooksScreen: FunctionComponent<IProps> = (props) => {
  const {user, books, navigation} = props;
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      dispatch(getBookListRequest());
      try {
        if (user) {
          const resp = await API.Books.fetchBooks(user.token, query);
          dispatch(getBookListSuccess(resp.data.books));
        }
      } catch {
        dispatch(getBookListFail());
      }
    };
    fetchBooks()
  }, [user, query]);


  const handleBookDetails = (book: IBookProps) => {
    navigation.navigate('BookDetailScreen', {
      bookId: book.id
    })
  };

  return (
    <Background>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.booksContainer}>
          <CustomTextInput
            label="Filter"
            returnKeyType="next"
            style={styles.filterInput}
            value={query}
            onChangeText={(text) => setQuery(text)}
            autoCapitalize="none"
          />
          {books.map((book, index) => (
            <View style={styles.itemContainer} key={`book_${index}`}>
              <View style={styles.bookHeader}>
                <TouchableOpacity onPress={() => handleBookDetails(book)}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                </TouchableOpacity>
                <View>
                  <Text>{book.author}</Text>
                  <Text>{book.publisher}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleBookDetails(book)}>
                <Image source={{uri: book.coverImageUrl}} style={styles.coverImage} />
              </TouchableOpacity>
              <Text>{book.synopsis}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Background>
  )
};

const mapStateToProps = (state: any) => ({
  user: state.users.user,
  loading: state.books.loading,
  books: state.books.books,
});

export default connect(mapStateToProps, null)(BooksScreen);

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
    width: '100%'
  },

  booksContainer: {
    flex: 1,
    width: '100%'
  },

  itemContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'grey',
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
