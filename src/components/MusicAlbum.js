import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import styles from '../styles/Album.module.css';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class CardAlbum extends Component {
  state = {
    loading: false,
    checkado: false,
  };

  componentDidMount() {
    this.recoverFavSongs();
  }

  recoverFavSongs = async () => {
    this.setState({ loading: true });
    await getFavoriteSongs();
    this.setState({ loading: false });
  };

  addFavoriteSong = async () => {
    // const { checkado } = this.state;
    this.setState({ loading: true });
    // const { previewUrl, trackName, trackId } = this.state;
    // const favMusic = {
    //   previewUrl,
    //   trackName,
    //   trackId,
    // };
    await addSong(this.props);
    // if (!checkado) {
    //   await removeSong(this.props);
    // }
    // this.setState({
    // }, () => {
    this.setState({
      loading: false,
      checkado: true,
    });
    // });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checkado } = this.state;
    return (
      <div>
        {
          loading ? <Loading />
            : (
              <div>
                <p>{trackName}</p>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor={ trackId }>
                  Favorita
                  <input
                    id={ trackId }
                    checked={ checkado }
                    data-testid={ `checkbox-music-${trackId}` }
                    onChange={ this.addFavoriteSong }
                    type="checkbox"
                  />
                </label>
              </div>
            )
        }
      </div>
    );
  }
}

CardAlbum.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default CardAlbum;
