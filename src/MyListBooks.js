import React,  { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'

class MyListBooks extends Component {

    static propTypes = {
        myBooks: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    }
    render() {
        const { myBooks, onUpdateShelf } = this.props;
      
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
                                        {myBooks.map((book) => {
                                            if(book.shelf === bookshelf.key) {
                                                return (
                                                    <li key={book.id}>
                                                        <Book 
                                                            key={book.id}
                                                            book={book}
                                                            updateShelf={onUpdateShelf} 
                                                        />
                                                    </li>
                                                )
                                            } else {
                                                return ("")
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
                        <button>Add a book</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default MyListBooks;