import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { collection } = this.props;
    return (
      <Link
        data-testid={ `link-to-album-${collection.collectionId}` }
        to={ `/album/${collection.collectionId}` }
      >
        <img src={ collection.artworkUrl100 } alt={ collection.collectionName } />
        <p>{ collection.artistName }</p>
        <p>{ collection.collectionName }</p>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  artistData: PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  }),
}.isRequired;

export default AlbumCard;
