import React, { useEffect, useState } from 'react';
import './index.css';

const url = 'https://pokeres.bastionbot.org/images/pokemon';

const App = () => {

    const [openCard, setopenCard] = useState([]);
    const [matched, setMatched] = useState([]);

    const pokemons = [
        { id: 1, name: "balbasaur"},
        { id: 16, name: "pidgey"},
        { id: 7, name: "squirtile"},
        { id: 10, name: "caterpie"},
        { id: 4, name: "charmander"},
        { id: 13, name: "weedle"},
    ];

    const pairsOfPokemon = [...pokemons, ...pokemons];

    
    const handleFlip = (index) => {
        setopenCard((opened) => [...opened, index])
     }

    useEffect(() => {

        if(openCard > 2) return;

        const firstMatch = pairsOfPokemon[openCard[0]];
        const secondMatch = pairsOfPokemon[openCard[1]];

        if(secondMatch && firstMatch.id == secondMatch.id){
         setMatched([...matched, firstMatch.id])
        }

        if(openCard.length === 2) setTimeout(() => {
            setopenCard([])
        }, 1000);

    }, [openCard]);


    return (
        <>
        <div className="app">
            <div className="cards">
                {
                    pairsOfPokemon.map((pokemon, index) => {

                        let flipCard = false;

                        if(openCard.includes(index)) flipCard = true;

                        if(matched.includes(pokemon.id)) flipCard = true;


                        return <div className={`pokemon-card ${flipCard ? 'flipped' : ""}`} key={index} 
                        onClick={() =>  {handleFlip(index)}}>
                            <div className="inner">
                                <div className="front">
                                    <img src={`${url}/${pokemon.id}.png`} alt="pokemon" width='100'/> 
                                </div>
                                    <div className="back">
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
        </>

    )
}

export default App;