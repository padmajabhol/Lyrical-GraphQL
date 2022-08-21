import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, useQuery } from "react-apollo";
import { use } from "passport";

// const SongList = () => {
//   const {loading, data} = useQuery()
//   const renderSongs = () => {
//     return data.songs.map((song) => {
//       return <li>{song.title}</li>;
//     });
//   };

//   if (data.loading) {
//     return <div>Loading...</div>;
//   }

//   return <div>{renderSongs()}</div>;
// };

class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map((song) => {
      return (
        <li key={song.id} className="collection-item">
          {song.title}
        </li>
      );
    });
  }
  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return <ul className="collection">{this.renderSongs()}</ul>;
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
