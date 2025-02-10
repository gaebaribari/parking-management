// firebase
import React, { useState, useEffect } from 'react';
import {
    app,
} from "../firebase";
import { getDownloadURL, ref, uploadBytes, getStorage, listAll } from "firebase/storage";

export default function ImageUploadTest() {
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [imageList, setImageList] = useState<string[]>([]);

    const storage = getStorage(app);
    const imageListRef = ref(storage, "images/");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            setImageUpload(event.target.files[0]);
        }
    }

    const upload = () => {
        if (imageUpload === null) return;
        const imageRef = ref(storage, `images/${imageUpload.name}`);
        console.log('imageRef',imageRef);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url]);
            });
        });
    };
    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                });
            });
        });
    }, []);
    return (
        <div>
            <input
                type="file"
                onChange={handleChange}
            />
            <button onClick={upload}>업로드</button>
            {imageList.map((el) => {
                return <img key={el} src={el} />;
            })}
        </div>
    );
}
