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
    this.setState(prevState => {
      
      let selectedBook = prevState.myBooks.find(thisBook => thisBook.id === myBook.id);
      let bookToChange = Object.assign(selectedBook, {});

      return {  
        myBooks: selectedBook && (
                 bookToChange.shelf = newShelf,
                 prevState.myBooks.filter(book => book.id !== myBook.id).concat(bookToChange) 
               )
      }
    });
    
    BooksAPI.update(myBook, newShelf)
  }

  
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

