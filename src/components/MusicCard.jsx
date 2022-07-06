import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { song } = this.props;
    return (
      <>
        <p>{song.trackName}</p>
        <audio data-testid="audio-component" src="{previewUrl}" controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }),
}.isRequired;

export default MusicCard;
