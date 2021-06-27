/*************************** REACT IMPORTS ***************************/
/*************************** OTHER FILE IMPORTS ***************************/
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Suggestions from '../Suggestions/Suggestions'
import ClipLoader from 'react-spinners/ClipLoader'
import { getTopLikes } from '../../store/topSongs';
import TruncatedSong from '../Song/TruncatedSong';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';


import styles from './Home.module.css'
import './Home.css'
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

/*************************** COMPONENTS ***************************/
const Home = ()=>{
    const dispatch = useDispatch()

    const topSongs = useSelector(state => state.topSongs);

    useEffect(()=>{
        if(!topSongs.likes){
            dispatch(getTopLikes())
        }
    },[dispatch])

    return (
        <div className={styles.home}>
            <div className={styles.splash}>
                <div className={styles.ocean}>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                </div>
                <div className={styles.logo}>
                    <img className={styles.logo__image} src='/img/Songaku_Logo.png'></img>
                </div>
            </div>
            <div className={styles.mainSuggestions}>
                <div className={styles.mainSuggestions__header}>
                    Top
                </div>
                { topSongs.likes ?
                    <Swiper
                    breakpoints={{
                        200:{slidesPerView: 1},
                        501:{slidesPerView: 2},
                        900:{slidesPerView: 3},
                        1100:{slidesPerView: 4}
                    }}
                    navigation
                    slidesPerView={4}
                    >
                    {topSongs.likes && Object.entries(topSongs.likes).map(([id, song])=>(
                        <SwiperSlide><TruncatedSong key={id} song={song}/></SwiperSlide>
                    ))}
                    </Swiper>
                    :
                    <ClipLoader />
                }
                {/* <div className={styles.topSongsDiv2}>
                    <Suggestions genreId={13}/>
                </div>
                <div className={styles.topSongsDiv3}>
                    <Suggestions genreId={14}/>
                </div>
                <div className={styles.topSongsDiv4}>
                    <Suggestions genreId={10}/>
                </div> */}
            </div>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default Home;