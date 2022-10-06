import BigNumber from "bignumber.js";
const CONTRACT_ADDRESS = '0x5b243B431e8A5Bc136409F31b244f30c16d5c71E';
const transformZombieData = (zombieData) => {
  return {
    name: zombieData[0],
    dna: zombieData[1].toString(),
    level: zombieData[2].toString(),
    readyTime: zombieData[3],
    winCount: zombieData[4],
    lossCount: zombieData[5],
    characterIndex: zombieData[6]
  };
};
export { CONTRACT_ADDRESS,transformZombieData };
