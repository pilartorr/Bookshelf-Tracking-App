import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
  state = {
    books: []
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Route exact path="/" render={()=>(
            <ListBooks />
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

