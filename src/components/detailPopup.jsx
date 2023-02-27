
import styles from './detailPopup.module.css'
import { useEffect, useState } from 'react';
import { get_pokemon } from '../utils/functions'
import { Loading } from './loading';

export function DetailPopup(props) {

    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(false);

    async function get() {
        try {
            const info = await get_pokemon(props.url)
            setInfo(info);
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        } 
        catch (error) {
            setErr(true)
            console.log(error)
        }
    }
    


    useEffect(() => {
        get()
        setErr(false)
    }, []);

    if(err){
        return (
            <h1>FODEU</h1>
        )
    }


    console.log('aq porra', info.typeNames)
    return (
        <>
            {
                loading ? (<Loading />) 
                : (
                    <section>
                        <div className={styles.bodyPopup}>
                            <div className={styles.header}>
                                <h2>#{info.id}</h2>
                                <h2>{info.name}</h2>
                            </div>
                            <div className={styles.details}>
                                <p>HEIGHT: {info.height} </p>
                                <p>WEIGHT: {info.weight}</p>
                                <p>HABITAT: {info.habitat}</p>
                                <div className={styles.types}>
                                    {info?.typeNames?.map((type, index) => (
                                        <p className={styles[type]} type={type} key={index.toString()}>{type}</p>
                                        ))}
                                </div>
                            </div>
                            <img className={styles.sprite} src={info.sprites} />
                            <div className={styles.flavor}>
                                <p>{info.flavor}</p>
                            </div>
                            <span className={styles.circle} type={info?.typeNames[0]}></span>
                        </div>
                    </section>
                )
            }
        </>
    );
}

