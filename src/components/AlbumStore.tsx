import { useEffect, useState } from "react";
import { AlbumRow } from "./AlbumRow";
import { CreateAlbumForm } from "./CreateAlbumForm";

export type Album = {
    id: number;
    name: string;
    artist: string;
    genre: string;
}

async function fetchAlbumsAsync(): Promise<Album[]> {
    const res = await fetch('http://localhost:5011/monkeyface/Albums');

    try {
        const resObject = await res.json();

        console.log(resObject);

        return resObject;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}


export function AlbumStore() {
    const [albums, setAlbums] = useState<Album[]>([{ id: 1, name: "The Doomstar Requiem", artist: "Dethklok", genre: "Symphonic Death Metal" }]);

    useEffect(() => {

        fetchAlbumsAsync().then(albums => setAlbums(albums));

    }, [])

    const deleteAlbum = (id: number) => {
        const albumsAfterDelete = albums.filter(album => album.id != id);
        setAlbums(albumsAfterDelete)
    }

    const updateAlbum = (album: Album) => {
        const updatedAlbums: Album[] = [];

        albums.map((updatedAlbum) => {
            if (album.id === updatedAlbum.id) {
                updatedAlbums.push(updatedAlbum)
            } else {
                updatedAlbums.push(album)
            }
        }

            // a.id === album.id
            //     ? {
            //         id: album.id,
            //         name: album.name,
            //         artist: album.artist,
            //         genre: album.genre,
            //     }
            //     : a
        );

        // Set the state with the new array
        setAlbums(updatedAlbums);
    }

    const addAlbum = (album: Album) => {
        setAlbums([...albums, album]);
    };

    const gridLayout = {
        minWidth: "80vw",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto"
    }
    return <>
        <h1>Albums</h1>
        <div style={gridLayout}>
            {albums.map(album =>
                <AlbumRow
                    key={album.id}
                    album={album}
                    updateAlbum={updateAlbum}
                    deleteAlbum={deleteAlbum}
                />)}
        </div>
        <CreateAlbumForm createAlbum={addAlbum} />
    </>
}