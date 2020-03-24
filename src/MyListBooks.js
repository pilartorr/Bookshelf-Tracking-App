import React,  { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class MyListBooks extends Component {
    state = {
        showSearchPage: false 
    }
    render() {
        const { mybooks } = this.props;
        const bookshelves = [
            {
              key: 'currentlyReading',
              name: 'Currently Reading'
            },
            {
              key: 'wantToRead',
              name: 'Want To Read'
            },
            {
              key: 'read',
              name: 'Read'
            }
        ];

        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content mt-4">
                    <div>
                        {bookshelves.map((bookshelf) => (
                            <div key={bookshelf.key} className="bookshelf">
                                <h2 className="bookshelf-title">{bookshelf.name}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {mybooks.map((book) => {
                                            if(book.shelf === bookshelf.key) {
                                                return (
                                                    <li key={book.id}>
                                                        <Book book={book} />
                                                    </li>
                                                )
                                            }
                                        })}
                                    </ol>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">
                        <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default MyListBooks;