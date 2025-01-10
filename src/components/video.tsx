import { Component } from "react";
import explosion from "../assets/explosion.webm";
import "../styles/Video.css"

class Video extends Component {
  render() {
    return (
      <div>
        <video
          src={explosion}
          // width="600"
          // height="300"
          autoPlay={true}
        />
      </div>
    );
  }
}

export default Video;
