import React from 'react';
import Header from './Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      isButtonDisabled: true,
      searchInput: '',
      albuns: [],
      loading: false,
      busca: '',
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

    handleSearch = async () => {
      const { searchInput } = this.state;
      this.setState({ loading: true, busca: searchInput });
      const albuns = await searchAlbumsAPIs(searchInput);
      this.setState({ albuns, searchInput: '', loading: false });
    }

    render() {
      const { searchInput, isButtonDisabled, albuns, loading, busca } = this.state;
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
            onClick={ this.handleSearch }
          >
            Pesquisar
          </button>
          { albuns.length < 1
          && <h5>Nenhum álbum foi encontrado</h5>}
          { loading
            ? <Loading />
            : (
              <div>
                <h1>{`Resultado de álbuns de: ${busca}`}</h1>
                (
                { albuns.map((album) => (
                  <AlbumCard collection={ album } key={ album.collectionId } />
                ))}
                )
              </div>)}
        </div>
      );
    }
}

export default Search;
