/*************************** REACT IMPORTS ***************************/
import { useSelector } from 'react-redux';


/*************************** OTHER FILE IMPORTS ***************************/
import { usePlayerContext } from '../../context/player';

/*************************** COMPONENTS ***************************/
const PlayStatus = ({song, styles})=>{
    const {play} = usePlayerContext()
    const currentSong = useSelector(state => state.currentSong);

    return(
        <div className={styles.playstatus}>
            {(currentSong?.id===song.id && play) ?
            <i className={`fas fa-pause ${styles.status}`}></i>
                :
            <i className={`fas fa-play ${styles.status}`}></i>
            }
        </div>
    )
}

/*************************** EXPORT ***************************/
export default PlayStatus;