import React from "react";

function VideoContainer ({embedIdList, index}) {
    const embedId = embedIdList[index]
    console.log(embedId)
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