import React, { useEffect, useState } from 'react';
import "./ZombieBody.css";

const ZombieBody = (props) => {
  const { dna } = props;
  const parseDna = (dna) => {
    return {
      hatType: (parseInt(dna.substring(0, 2)) % 7) + 1,
      eyeType: (parseInt(dna.substring(2, 4)) % 11) + 1,
      shirtType: (parseInt(dna.substring(4, 6)) % 6) + 1,
      skinColor: (parseInt(dna.substring(6, 8)) / 100) * 360,
      eyeColor: (parseInt(dna.substring(2, 4)) / 100) * 360,
      clothesColor: (parseInt(dna.substring(2, 4)) / 100) * 360,
    };
  };
  const { hatType, eyeType, shirtType, skinColor, eyeColor, clothesColor } =
    parseDna(dna);

  function getColor(deg) {
    return { filter: `hue-rotate(${deg}deg)` };
  }

  return (
    <div className="zombie-char">
      <div className="zombie-parts partsVisible">
        <img
          className="left-feet"
          src="/src/assets/img/left-feet-1@2x.png"
          style={getColor(clothesColor)}
          alt=""
        />
        <img
          className="right-feet"
          src="/src/assets/img/right-feet-1@2x.png"
          style={getColor(clothesColor)}
          alt=""
        />

        <img
          className="left-leg"
          src="/src/assets/img/left-leg-1@2x.png"
          style={getColor(clothesColor)}
          alt=""
        />
        <img
          className="right-leg"
          src="/src/assets/img/right-leg-1@2x.png"
          style={getColor(clothesColor)}
          alt=""
        />

        <img
          className="left-thigh"
          src="/src/assets/img/left-thigh-1@2x.png"
          style={getColor(clothesColor)}
          alt=""
        />
        <img
          className="right-thigh"
          src="/src/assets/img/right-thigh-1@2x.png"
          style={getColor(clothesColor)}
          alt=""
        />

        <img
          className="left-forearm"
          src="/src/assets/img/left-forearm-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />
        <img
          className="right-forearm"
          src="/src/assets/img/right-forearm-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />

        <img
          className="right-upper-arm"
          src="/src/assets/img/right-upper-arm-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />

        <img
          className="torso"
          src="/src/assets/img/torso-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />

        <img
          className="shirt"
          src={`/src/assets/img/shirt-${shirtType}@2x.png`}
          style={getColor(clothesColor)}
          alt=""
        />

        <img
          className="left-upper-arm"
          src="/src/assets/img/left-upper-arm-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />

        <img
          className="left-forearm"
          src="/src/assets/img/left-forearm-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />
        <img
          className="right-forearm"
          src="/src/assets/img/right-forearm-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />

        <img
          className="left-hand"
          src="/src/assets/img/hand1-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />
        <img
          className="right-hand"
          src="/src/assets/img/hand-2-1@2x.png"
          style={getColor(skinColor)}
          alt=""
        />

        <img
          className="head head-part-1"
          src={`/src/assets/img/head-${hatType}@2x.png`}
          style={getColor(skinColor)}
          alt=""
        />
        <img
          className="eye"
          src={`/src/assets/img/eyes-${eyeType}@2x.png`}
          style={getColor(eyeColor)}
          alt=""
        />

        <img
          className="mouth"
          src="/src/assets/img/mouth-1@2x.png"
          style={getColor(eyeColor)}
          alt=""
        />
      </div>
    </div>
  );
};
export default ZombieBody;