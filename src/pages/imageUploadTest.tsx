import React, { useState, useEffect } from 'react';
import { app, db } from "../firebase";
import { getDownloadURL, ref, uploadBytes, getStorage, listAll, } from "firebase/storage";
import { addDoc, collection, } from "firebase/firestore";

export default function ImageUploadTest() {
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    const storage = getStorage(app);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file == null) return;
        try {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    setImageUrl(reader.result as string);
                    setImageUpload(file);
                    uploadFirestore(reader.result as string);
                };
                img.src = reader.result as string;
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('이미지 변환 오류:', error);
            alert('이미지 파일을 처리하는 중 오류가 발생했습니다.');
        }
    };

    const upload = () => {
        if (imageUpload === null) return;
        const imageRef = ref(storage, `images/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(() => {
                alert('업로드 완료');
                setImageUrl('');
            });
        });
    };

    const uploadFirestore = async (url: string) => {
        try {
            const docRef = await addDoc(collection(db, "parking_records"), {
                imgUrl: url,
                timestamp: new Date(),
            });
            console.log("문서 ID: ", docRef.id);
        } catch (e) {
            console.error("문서 추가 오류: ", e);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleChange}
            />
            <button onClick={upload}>업로드</button>
            {imageUrl && <img src={imageUrl} />}
        </div>
    );
}
