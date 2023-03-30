import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

const App = () => {
  const [champName, setChampName] = useState("");
  const [champs, setChamps] = useState([]);
  const [selectedChampion, setSelectedChampion] = useState(null);

  useEffect(() => {
    searchChamp();
  }, []);

  const championClicked = (champion) => {
    setSelectedChampion(champion);
  };

  const searchChamp = () => {
    Axios.get(`http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json`).then(
      (res) => {
        const champions = Object.values(res.data.data);
        setChamps(champions);
      }
    );
  };

  const filteredChamps = champs.filter((champ) =>
    champ.id.toLowerCase().includes(champName.toLowerCase())
  );

  return (
    <div className="App">
      <div className="TitleSection">
        <input
          type="text"
          placeholder={"BUSCA TU CAMPEÓN"}
          onChange={(event) => {
            setChampName(event.target.value);
          }}
        />
        <img src="https://logodownload.org/wp-content/uploads/2014/09/lol-league-of-Legends-logo.png" alt="League of Legends Logo"/>
        <h1>LolWiki</h1>
      </div>
      <div className="container">
      {selectedChampion && (
        <div className="selected-champion">
          <h2>{selectedChampion.name}</h2>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${selectedChampion.name}_0.jpg`}
            alt={selectedChampion.name}
          />
          <p>{selectedChampion.blurb}</p>
          <p>Attack: {selectedChampion.info.attack}</p>
          <p>Defense: {selectedChampion.info.defense}</p>
          <p>Magic: {selectedChampion.info.magic}</p>
          <p>Difficulty: {selectedChampion.info.difficulty}</p>
        </div>
      )}
        <ol id="champs">
          {filteredChamps.map((champ) => (
            <li key={champ.id}>
              <div className="card" onClick={() => {championClicked(champ);}} style={{backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg)`,}}>
                <div className="textInfo">
                  <h4 className="card-title">{champ.id}</h4>
                  {/* <img
                    className="card-image"
                    src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${champ.image.full}`}
                    alt=""
                  /> */}
                  <p className="card-subtitle">{champ.title}</p>
                  <p className="card-subtitle">{champ.tags.join(", ")}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default App;
