const CHAVE = 'ranking';

const saveRankingLocalStorage = (ranking) => localStorage
  .setItem(CHAVE, JSON.stringify(ranking));

export const getRankingLocalStorage = () => {
  const ranking = localStorage.getItem(CHAVE);
  if (ranking === null) return [];
  return JSON.parse(ranking);
};

export function addRanking({ name, score, picture }) {
  const rankings = getRankingLocalStorage();
  const playerRanking = rankings.find((player) => player.picture === picture);
  if (playerRanking) {
    playerRanking.score = score;
    saveRankingLocalStorage(rankings);
    return;
  }
  rankings.push({ name, score, picture });
  saveRankingLocalStorage(rankings);
}
