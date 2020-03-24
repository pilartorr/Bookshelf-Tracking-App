import React,  { Component } from 'react'
import { Link } from 'react-router-dom'

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
        //const options = [ "Move to...", "Currently Reading", "Want to Read", "Read", "None"];

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
                                                        <div className="book">
                                                            <div className="book-top">
                                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                                <div className="book-shelf-changer">
                                                                <select>
                                                                    <option value="move" disabled>Move to...</option>
                                                                    <option value="currentlyReading">Currently Reading</option>
                                                                    <option value="wantToRead">Want to Read</option>
                                                                    <option value="read">Read</option>
                                                                    <option value="none">None</option>
                                                                </select>
                                                                </div>
                                                            </div>
                                                            <div className="book-title">{book.title}</div>
                                                            <div className="book-authors">{book.authors}</div>
                                                        </div>
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