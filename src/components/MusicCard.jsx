import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isFavorite: false,
    };
  }

  handleFavorite = ({ target }) => {
    this.setState({
      loading: true,
    }, async () => {
      const { isFavorite } = this.state;
      if (!isFavorite) {
        await addSong(target.name);
        this.setState({ loading: false, isFavorite: true });
      } else {
        await removeSong(target.name);
        this.setState({ loading: false, isFavorite: false });
      }
    });
  }

  render() {
    const { loading, isFavorite } = this.state;
    const { song } = this.props;
    if (loading) return <Loading />;
    return (
      <div>
        <p>{ song.trackName }</p>
        <audio data-testid="audio-component" src={ song.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          data-testid={ `checkbox-music-${song.trackId}` }
          htmlFor={ song.trackName }
        >
          Favorita
          <input
            type="checkbox"
            id={ song.trackName }
            name={ song.trackName }
            checked={ isFavorite }
            onChange={ this.handleFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }),
}.isRequired;

export default MusicCard;
