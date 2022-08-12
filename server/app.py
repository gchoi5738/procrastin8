import json
from flask import Flask
from flask import request
import requests 
from flask_cors import CORS
import googleapiclient.discovery
import urllib
from urllib.request import urlopen
import isodate

api_service_name = "youtube"
api_version = "v3"
DEVELOPER_KEY = "AIzaSyAoKd3U7aTx59jGybqZDT45N8LrWcx8GlE"
youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey = DEVELOPER_KEY)


app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
@app.route('/', methods=['POST'])
def get_urls():
    tags, videoIdHist = request.get_json()['tags'], request.get_json()['videoIdHistory']    
    youtube_req = youtube.search().list(
        part= "snippet",
        maxResults=25,
        order="relevance",
        q=tags + " #shorts",
        relevanceLanguage="en",
        regionCode="US",
        type="video",
        videoDuration="short",
        videoEmbeddable="true"
    )
    response = youtube_req.execute()
    print(response)
    youtube_vids = response["items"]
    video_ids = []
    for video_info in youtube_vids:
        video_ids.append(video_info["id"]["videoId"])
    
    videoListIds = makeVideoList(video_ids)
    return json.dumps(video_ids)


def getDurationOfVideo(video_id):
    url = "https://www.googleapis.com/youtube/v3/videos?id="+video_id+"&key="+DEVELOPER_KEY+"&part=contentDetails"
    response = urlopen(url).read()
    data = json.loads(response)
    all_data=data['items']
    contentDetails = all_data[0]['contentDetails']
    youtube_duration = contentDetails['duration']
    duration = isodate.parse_duration(youtube_duration)
    return (duration.total_seconds())

    