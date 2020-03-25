import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {
    state = {
        query: "",
        allBooks: []
    }

    updateQuery = (query) => {
        this.setState(()=> ({
            query: query.trim(),
            allBooks: []
        }),
        () => {
            console.log(this.state);
        })
    }

    render() {
        const { query, allBooks } = this.state;
        const { myBooks, book } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
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
                    <ol className="books-grid">ALL BOOKS</ol>
                </div>
          </div>
        )
    }
}

export default SearchBooks;