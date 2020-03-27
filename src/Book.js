import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        updateShelf: PropTypes.func.isRequired
    }
    render() {
        const { book, updateShelf } = this.props;
        const options = [
            {value: "move", disabled: true, text: "Move to ..."},
            {value: "currentlyReading", disabled: false, text: "Currently Reading"},
            {value: "wantToRead", disabled: false, text: "Want to Read"},
            {value: "read", disabled: false, text: "Read"},
            {value: "none", disabled: false, text: "None"}
        ];

        const imageThumb = book.imageLinks ? book.imageLinks.smallThumbnail : null;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageThumb})` }}></div>
                    <div className="book-shelf-changer">
                    <select value={book.shelf ? book.shelf : 'none'} onChange={(event) => {updateShelf(book, event.target.value)}}>
                        {options.map(option => (<option key={option.value} value={option.value} disabled={option.disabled}>{option.text}</option>))}
                    </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        )
    }
}

export default Book