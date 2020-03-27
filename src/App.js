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


  updateShelf = (myBook, newShelf) => {

    const selectedBook = this.state.myBooks.find(thisBook => thisBook.id === myBook.id);

    if (selectedBook) {
      // update existing
      selectedBook.shelf = newShelf;

      BooksAPI.update(myBook, newShelf)
              .then(this.setState(currentState => ({
                myBooks: currentState.myBooks
              })))

      console.log("updated Book : ", selectedBook)

    } else {
      // add new one
        myBook.shelf = newShelf;
        
        BooksAPI.update(myBook, newShelf)
                .then(this.setState(prevState => ({
                  myBooks: prevState.myBooks.concat(myBook)
                })))
                
        console.log("new Book: ", myBook)
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
