import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import MyListBooks from './MyListBooks'


class App extends Component {
  state = {
    myBooks: [
      
    ]
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
  searchBook = (book) => {
    BooksAPI.search(book)
      .then((book) => {
        this.setState((currentState) => ({
          myBooks: currentState.myBooks.concat([book])
        }))
      })
  }
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Route exact path="/" render={()=>(
            <MyListBooks myBooks={this.state.myBooks} />
          )} />
          <Route path="/search" render={()=>(
            <SearchBooks />
          )} />
        </BrowserRouter> 
      </div>
    )
  }
}

export default App

