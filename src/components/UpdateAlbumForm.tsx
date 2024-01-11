import { ChangeEvent, FormEvent, useState } from "react";
import { Album } from "./AlbumStore";

type UpdateAlbum = {
    album: Album
    updateAlbum: (album: Album) => void;
}

async function updateAlbumAsync(props: Album): Promise<Album> {
    const res = await fetch(`http://localhost:5011/monkeyface/Albums/`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: props.id, name: props.name, artist: props.artist, genre: props.genre })
    })

    if (!res.ok) {
        throw new Error('Coult not create album.');
    }

    const updatedAlbum = await res.json();
    return updatedAlbum;
}

export function UpdateAlbumForm({album, updateAlbum: refreshAlbum}: UpdateAlbum) {
    const [albumState, setAlbumState] = useState<Album>({ id: album.id, name: album.name, artist: album.artist, genre: album.genre });
    const [isEditing, setIsEditing] = useState<Boolean>(false);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateAlbumAsync({ id: albumState.id, name: albumState.name, artist: albumState.artist, genre: albumState.genre })
        .then(updatedAlbum => {
            refreshAlbum(updatedAlbum);
        });
        setIsEditing(!isEditing);
    };

    //Dynamic change handler
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAlbumState({
            ...albumState,
            [e.target.name]: e.target.value
        })
    }

    return <>
        {isEditing &&
        <form onSubmit={onSubmit} style={{flexGrow: 3, marginLeft: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <input
                placeholder="Name"
                name="name"
                type="text"
                value={albumState.name}
                onChange={handleChange} //WIth dynamic change handler. can be used when name= equals a property
            />
            <input
                placeholder="Artist"
                name="artist"
                type="text"
                value={albumState.artist}
                onChange={handleChange} //without dynamic change handler
            />
            <input
                placeholder="Genre"
                name="genre"
                type="text"
                value={albumState.genre}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
            <button onClick={()=>setIsEditing(!isEditing)}>Cancel</button>
        </form>
        }
        {!isEditing &&
        <button onClick={()=>setIsEditing(!isEditing)}>Edit</button>
        }
    </>
}