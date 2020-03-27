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
        results: []
    }

    updateQuery = (query) => {
        if(query.length > 0 ) {
          this.setState(() => ({
            query: query,
            results: []
        }), console.log(this.state.results))

          this.searchBooks(query)
        }
        else {
          this.clearQuery()
        }
    }

    clearQuery = () => {
        this.setState({
            query: '',
            results: []
        })
    }

    searchBooks = (query) => {
        if (query.length > 0) {
            BooksAPI.search(query)
                .then(searchResults => {
                    query === this.state.query
                        ? this.setState(() => ({ results: this.updateExistingShelves(searchResults)}), console.log(this.state.results))
                        : this.setState({ results: []}) 
                }
            );
        } 
    }

    updateExistingShelves(searchResults) {
        if(!searchResults.error) {
            const myBooks = this.props.myBooks
            const newBook = searchResults.filter((result) => myBooks.find(b => {
                if(b.id === result.id) {
                    result.shelf = b.shelf
                    return result
                } else { return ''}
            }))

            myBooks.concat(newBook)
            return searchResults
        }
    }

    render() {

        const { query, results } = this.state
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
                        { results ? (
                            results.map((book) => (
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