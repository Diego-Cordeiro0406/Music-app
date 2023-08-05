import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Album.module.css';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicAlbum from '../components/MusicAlbum';

class Album extends Component {
  state = {
    artwork: '',
    artist: '',
    collection: '',
    musicas: [],
  };

  componentDidMount() {
    this.chamaApiMusic();
  }

  chamaApiMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    this.setState({
      artwork: data[0].artworkUrl100,
      artist: data[0].artistName,
      collection: data[0].collectionName,
      musicas: data,
    });
  };

  render() {
    const { artwork, artist, collection, musicas } = this.state;
    return (
      <section className={ styles.pageBody } data-testid="page-album">
        <Header />
        <section className={ styles.albumBody }>
          <div className={ styles.albumArt }>
            <img className={ styles.albumImg } src={ artwork } alt={ artist } />
            <div className={ styles.albumBodyPhrases }>
              <h1 data-testid="artist-name">{artist}</h1>
              <p
                className={ styles.albumPhrase }
                data-testid="album-name"
              >
                {collection}
              </p>
            </div>
          </div>
          {
            musicas.filter((musica) => musica.kind === 'song')
              .map((musica) => (
                <MusicAlbum
                  key={ musica.trackId }
                  trackName={ musica.trackName }
                  previewUrl={ musica.previewUrl }
                  trackId={ musica.trackId }
                />
              ))
          }
        </section>
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
