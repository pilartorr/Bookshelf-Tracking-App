import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import MyListBooks from './MyListBooks'


class App extends Component {

  state = {
    myBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((myBooks) => {
        this.setState(() => ({
          myBooks
        }),
        () => {
          console.log(this.state);
        })
      })
  }


  updateShelf = (book, newShelf) => {

    const myBook = this.state.myBooks.find(myBook => myBook.id === book.id);

    if (myBook) {
      // update existing
      myBook.shelf = newShelf;

      BooksAPI.update(book, newShelf)
              .then(this.setState(currentState => ({
                myBooks: currentState.myBooks
              })))

      console.log("updated Book : ", myBook)

    } else {
      // add new one
        book.shelf = newShelf;
        
        BooksAPI.update(book, newShelf)
                .then(this.setState(prevState => ({
                  myBooks: prevState.myBooks.concat(book)
                })))
                
        console.log("new Book: ", book)
    }
  };

  
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Route exact path="/" render={()=>(
            <MyListBooks 
              myBooks={this.state.myBooks}
              onUpdateShelf={this.updateShelf} />
          )} />
          <Route path="/search" render={()=>(
            <SearchBooks 
              myBooks={this.state.myBooks}
              onUpdateShelf={this.updateShelf}/>
          )} />
        </BrowserRouter> 
      </div>
    )
  }
}

export default App
