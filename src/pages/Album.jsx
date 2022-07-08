import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumName: {},
      albumSongs: [],
    };
  }

  componentDidMount = async () => {
    await this.fetchGetMusics();
  }

  fetchGetMusics = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const track = await getMusics(id);
    const [albumName, ...albumSongs] = track;
    this.setState({ albumName, albumSongs });
  }

  render() {
    const { albumName, albumSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{albumName.artistName}</h1>
        <h1 data-testid="album-name">{albumName.collectionName}</h1>
        {albumSongs.map((song) => (<MusicCard
          song={ song }
          key={ song.trackId }
          // previewUrl={ song.previewUrl }
          trackId={ song.trackId }
        />))}
        Album
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
}.isRequired;

export default Album;
