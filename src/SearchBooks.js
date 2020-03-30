import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {

    static propTypes = {
        myBooks: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        if(query.length > 0 ) {
          this.setState(() => ({
            query: query,
            books: []
        }), console.log(this.state.books))

          this.searchBooks(query)
        }
        else {
          this.clearQuery()
        }
    }

    clearQuery = () => {
        this.setState({
            query: '',
            books: []
        })
    }

    searchBooks = (query) => {
        if (query.length > 0) {
            BooksAPI.search(query)
                .then(booksResults => {
                    query === this.state.query
                        ? this.setState(() => ({ books: this.updateExistingShelves(booksResults)}), console.log(this.state.books))
                        : this.setState({ books: []}) 
                }
            );
        } 
    }

    updateExistingShelves(booksResults) {
        if(!booksResults.error) {
            const myBooks = this.props.myBooks
            const book = booksResults.filter((book) => myBooks.find(myBook => {
                if(myBook.id === book.id) {
                    book.shelf = myBook.shelf
                    return book
                } else { return ''}
            }))

            myBooks.concat(book)
            return booksResults
        }
    }

    render() {

        const { query, books } = this.state
        const { onUpdateShelf } = this.props

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search" onClick={ this.clearQuery }>Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { books ? (
                            books.map((book) => (
                                <li key={book.id}>
                                    <Book
                                        book={book} 
                                        updateShelf={onUpdateShelf}
                                    />
                                </li>
                            ))
                        ) : (
                        <p className="alert alert-danger w-100 mx-auto text-center lead" role="alert">
                            No results found for {query}. Please, try again.
                        </p>)}  
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks;