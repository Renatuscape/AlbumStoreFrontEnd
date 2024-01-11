import { ChangeEvent, FormEvent, useState } from "react";
import { Album } from "./AlbumStore";

type CreateAlbum = {
    name: string;
    artist: string;
    genre: string;
}

async function createAlbum(props: CreateAlbum): Promise<Album> {
    const res = await fetch('http://localhost:5011/monkeyface/Albums', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: props.name, artist: props.artist, genre: props.genre })
    })

    if (!res.ok) {
        throw new Error('Coult not create album.');
    }

    const createdAlbum = await res.json();
    return createdAlbum;
}

type CreateAlbumFormProps = {
    createAlbum: (album: Album) => void;
};

export function CreateAlbumForm(props: CreateAlbumFormProps) {
    const [album, setAlbum] = useState<CreateAlbum>({ name: "", artist: "", genre: "" });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createAlbum({ name: album.name, artist: album.artist, genre: album.genre })
            .then(createdAlbum => {
                props.createAlbum(createdAlbum);
            });
    }

    //Dynamic change handler
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAlbum({
            ...album,
            [e.target.name]: e.target.value
        })
    }

    return <div style={{ maxWidth: '350px', margin: 'auto', backgroundColor: 'orange', padding: 10, borderRadius: 10 }}>
        <h2>Add New Album</h2>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <input
                placeholder="Name"
                name="name"
                type="text"
                value={album.name}
                onChange={handleChange} //With dynamic change handler. can be used when name= equals a property
            />
            <input
                placeholder="Artist"
                name="artist"
                type="text"
                value={album.artist}
                onChange={e => setAlbum({ ...album, artist: e.target.value })} //without dynamic change handler
            />
            <input
                placeholder="Genre"
                name="genre"
                type="text"
                value={album.genre}
                onChange={e => setAlbum({ ...album, genre: e.target.value })}
            />
            <button type="submit">Submit</button>
        </form>
    </div>
}