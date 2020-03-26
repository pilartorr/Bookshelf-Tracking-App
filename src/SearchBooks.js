import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
import BooksAPI from './BooksAPI'

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
                searchResults.length > 0
                    ? this.setState({ results: searchResults })
                    : this.setState({ results: [] }) 
                }
            );
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
                        <li>
                            { results ? (
                                results.map((book) => (
                                    <Book
                                        key={book.id}
                                        book={book}
                                        updateShelf={onUpdateShelf}
                                    />
                                ))
                            ) : (
                            <h4>No results for, "{query}"</h4>
                            )}
                        </li>
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks;