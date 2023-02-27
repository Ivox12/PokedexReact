import { useState, useEffect, Fragment } from 'react';
import { get_pokemon } from '../utils/functions'
import styles from './card.module.css'
import api from '../services/api';
import { Loading } from './loading';
import { DetailPopup } from './detailPopup';


export function Card() {
  const paginate = 20;
  const [cards, setCards] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);
  const [showButton, setShowButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(false);
  const [popUp, setpopUp] = useState(false);
  const [pokeURL, setPokeUrl]= useState('');

  function ChangeTheme() {
    setTheme(oldstate => !oldstate)
  }

  function popFunction (url) {
    setpopUp(oldstate => !oldstate)
    setPokeUrl(url)
    console.log(pokeURL)
  }

  async function get() {

    api.get(`/pokemon?limit=${paginate}&offset=${lastIndex}`)
      .then(async (response) => {
        let items = response.data.results

        const promises = items.map(async (item) => {
          const poke_detail = await get_pokemon(item.url)

          return {
            ...item,
            ...poke_detail,
          }
        });

        items = await Promise.all(promises)

        const newCards = [...cards, ...items];

        setCards(newCards)
        setLastIndex(lastIndex + paginate)
      })
      .catch((err) => console.log(err))
  }


  useEffect(() => {
    get()
  }, [])

  useEffect(() => {
    if (cards.length > 150) {
      setShowButton(false)
      cards.length = 151;
    }
  }, [cards])

  useEffect(() => {
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
    }, 1000);
  }, [cards])



  return (
    <>
      {
        loading ? (<Loading />) : (
          <div className={styles.list}>
            {cards.map((card, index) => (
              <article 
              key={index.toString()} 
              onClick={() => {popFunction(card.url)}}
              adress={card.url}
              typeCard={theme && card.typeNames[0] }
              >
                <div className={styles.names}>
                  <h2>#{card.id}</h2>
                  <h3>{card.name}</h3>
                </div>
                <img src={card.sprites} />
                <div className={styles.types}>
                  {card?.typeNames?.map((type, index) => (
                    <p className={styles[type]} type={type} key={index.toString()}>{type}</p>
                  ))}
                </div>
                <span className={styles.circle} type={`${card?.typeNames[0]}`}></span>

              </article>
            ))}
            <div className={styles.more}>
            {popUp && <DetailPopup url={pokeURL}/>}
              <button onClick={ChangeTheme}>Change</button>
              {showButton && <button onClick={get}>carregar mais</button>}
            </div>
          </div>
        )}
    </>
  );

}