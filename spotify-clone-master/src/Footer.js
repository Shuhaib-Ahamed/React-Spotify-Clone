import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import "./Footer.css";
import { Grid, Slider } from "@material-ui/core";

function Footer({ spotify }) {
  const [{ token, item, playing }, dispatch] = useStateValue();

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log(r);

      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });
  }, [spotify]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src="data:image/jpeg;base64,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"
          alt={item?.name}
        />
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>Reflections</h4>
            <p>Ariana Grande</p>
          </div>
        )}
      </div>

      <div className="footer__center">
        <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon onClick={skipNext} className="footer__icon" />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextIcon onClick={skipPrevious} className="footer__icon" />
        <RepeatIcon className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
