import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      isButtonDisabled: true,
      searchInput: '',
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.searchChar);
  };

    searchChar = () => {
      const { searchInput } = this.state;
      const minCharInput = 2;
      if (searchInput.length >= minCharInput) {
        this.setState({ isButtonDisabled: false });
      } else {
        this.setState({ isButtonDisabled: true });
      }
    };

    render() {
      const { searchInput, isButtonDisabled } = this.state;
      return (
        <div data-testid="page-search">
          <Header />
          Search
          <input
            type="text"
            name="searchInput"
            data-testid="search-artist-input"
            onChange={ this.handleInput }
            value={ searchInput }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            onClick={ this.handleInput }
          >
            Pesquisar

          </button>
        </div>
      );
    }
}

export default Search;
