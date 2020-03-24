import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchBooks from './SearchBooks'
import MyListBooks from './MyListBooks'
import { BrowserRouter, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class App extends Component {
  state = {
    mybooks: [
      {
        title: "The Linux Command Line",
        authors: ["William E. Shotts, Jr."],
        imageLinks: {
          smallThumbnail: "http://books.google.com/books/content?id=nggnmAEAC…J&printsec=frontcover&img=1&zoom=5&source=gbs_api", 
          thumbnail: "http://books.google.com/books/content?id=nggnmAEAC…J&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        },
        id: "nggnmAEACAAJ",
        shelf: "currentlyReading"
      },
      {
        title: "Learning Web Development with React and Bootstrap",
        authors: ["Harmeet Singh", "Mehul Bhatt"],
        imageLinks: {
          smallThumbnail: "http://books.google.com/books/content?id=sJf1vQAAC…J&printsec=frontcover&img=1&zoom=5&source=gbs_api", 
          thumbnail: "http://books.google.com/books/content?id=sJf1vQAAC…J&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        },
        id: "sJf1vQAACAAJ",
        shelf: "currentlyReading",
      },
      {
        title: "The Cuckoo's Calling",
        authors: ["Robert Galbraith"],
        imageLinks: {
          smallThumbnail: "http://books.google.com/books/content?id=evuwdDLfA…=frontcover&img=1&zoom=5&edge=curl&source=gbs_api", 
          thumbnail: "http://books.google.com/books/content?id=evuwdDLfA…=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        id: "evuwdDLfAyYC",
        shelf: "wantToRead",
      },
      {
        title: "Needful Things",
        authors: ["Stephen King"],
        imageLinks: {
          smallThumbnail: "http://books.google.com/books/content?id=evuwdDLfA…=frontcover&img=1&zoom=5&edge=curl&source=gbs_api", 
          thumbnail: "http://books.google.com/books/content?id=evuwdDLfA…=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        id: "evuwdDLfAyYC",
        shelf: "read"
      }
    ]
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
            <MyListBooks mybooks={this.state.mybooks} />
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

