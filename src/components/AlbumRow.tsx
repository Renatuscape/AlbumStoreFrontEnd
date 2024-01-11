import { Album } from './AlbumStore'
import { UpdateAlbumForm } from './UpdateAlbumForm';

type AlbumRowProps = {
    album: Album;
    deleteAlbum: (id: number)=>void;
    updateAlbum: (album: Album)=>void;
}

async function deleteAlbumAsync(id: number) {
    const res = await fetch('http://localhost:5011/monkeyface/Albums/' + id, {
        method: 'DELETE',
    })

    if (!res.ok) {
        throw new Error('Could not delete album.');
    }
}
export function AlbumRow({ album, deleteAlbum, updateAlbum }: AlbumRowProps) {

    const handleDeleteEvent = (id:number)=>{
        deleteAlbumAsync(id).then(()=>deleteAlbum(id))
    }

    return <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignContent: "space-between", backgroundColor: "lightblue", borderRadius: 15, margin: 15, padding: 10 }}>
        <h3>{album.name}</h3>
        <p>{album.artist} - {album.genre}</p>
        <div>
        <div style={{display: 'flex', justifyContent:'space-between'}}><button onClick={() => handleDeleteEvent(album.id)}>Delete</button>
        <UpdateAlbumForm updateAlbum={updateAlbum} album={album}/></div>
        </div>
    </div>
}