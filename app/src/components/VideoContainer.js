import { updateDoc, 
        arrayUnion, 
        doc, } 
from "firebase/firestore";
import React, {useEffect} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
function VideoContainer ({embedIdList, index}) {
    const [user, loading, error] = useAuthState(auth)
    const embedId = embedIdList[index]
    async function addIDToHistory(docRef) {
        await updateDoc(docRef, {
        videoIdData: arrayUnion(embedId)
        })
    }
    const getCurrentUserDoc = () => {
        return doc(db, "users", user.uid)
    }
    useEffect(() => {
        if (!embedId) {
            return
        }
        const docs = getCurrentUserDoc()
        addIDToHistory(docs)
    }, )
    if (index === -1 || !embedId) {
        return (
            <div className="video-responsive">
            <iframe
            title="Embedded youtube"
            style={{width: "1000px", height: "600px", border: "0"}}
            />
            </div>
        )
    }
    
    
    
    return (
        <div className="video-responsive">
            <iframe
            title="Embedded youtube"
            src={`https://www.youtube.com/embed/${embedId}?&autoplay=1`}
            style={{width: "1000px", height: "600px", border: "0"}}
            allowFullScreen
            />
        </div>
);

}

export default VideoContainer;