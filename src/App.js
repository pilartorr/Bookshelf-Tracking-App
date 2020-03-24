import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import { BrowserRouter, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class App extends Component {
  state = {
    mybooks: []
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }),
        () => {
          console.log(this.state);
        })
      })
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

