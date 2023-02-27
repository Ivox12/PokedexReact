
import styles from './header.module.css'

export function Header (){
    return (
    <div className={styles.headerDiv}>
        <header className={styles.header}>
            <a onClick={reload}><img src='src\assets\pokeball(black).png'/></a>
            <input type="text" placeholder='ID / NAME'/>
            <a href='https://github.com/ivox12'><img src='src\assets\git.png'/></a>
        </header>
    </div>
    );
    function reload (){
        location.reload(true);
    }
}

