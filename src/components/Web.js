import React from "react";
import Draggable from "react-draggable";
import SingleCard from "./SingleCard";

class Web extends React.Component {
  render() {
    // function Web(props) {
    const webbedCharacters = this.props.webOfTeam;

    return (
      <div className="h-80">
        <div className="h-full bg-slate-700 row-span-6 rounded-md">
          <Draggable
            handle=".handle"
            defaultPosition={{ x: 12, y: 25 }}
            position={null}
            grid={[25, 50]}
            scale={1}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}
          >
            {webbedCharacters &&
              webbedCharacters.map((character) => (
                <div key={character.id}>
                  <SingleCard
                    characterId={character.id}
                    characterLinks={character.link_skill}
                    characterThumb={character.thumb}
                    characterArt={character.art}
                  />
                </div>
              ))}
          </Draggable>
        </div>
      </div>
    );
  }
}

export default Web;
