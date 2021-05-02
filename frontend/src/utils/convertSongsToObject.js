export default function convertSongsToObject(songs){
    let songsObj={}

    songs.forEach((song)=>{
        songsObj[song.id]=song
    })

    return songsObj
}