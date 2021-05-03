/*************************** REACT IMPORTS ***************************/
/*************************** OTHER FILE IMPORTS ***************************/
import Suggestions from '../Suggestions/Suggestions'
import styles from './Home.module.css'


/*************************** COMPONENTS ***************************/
const Home = ()=>{

    return (
        <div className={styles.mainSuggestions}>
            <div className={styles.topSongsDiv1}>
                <Suggestions genreId={4}/>
            </div>
            <div className={styles.topSongsDiv2}>
                <Suggestions genreId={13}/>
            </div>
            <div className={styles.topSongsDiv3}>
                <Suggestions genreId={14}/>
            </div>
            <div className={styles.topSongsDiv4}>
                <Suggestions genreId={10}/>
            </div>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default Home;