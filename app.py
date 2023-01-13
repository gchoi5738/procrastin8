import json
import os
from flask import Flask
from flask import request
import requests 
from flask_cors import CORS, cross_origin
import googleapiclient.discovery
import urllib
from urllib.request import urlopen
import isodate
import datetime


api_service_name = "youtube"
api_version = "v3"
DEVELOPER_KEY = os.environ["DEVELOPER_KEY"]
youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey = DEVELOPER_KEY)


app = Flask(__name__)
CORS(app)
@app.route('/', methods=['POST'])
@cross_origin()
def get_urls():
    tags, video_id_hist = request.get_json()['tags'], request.get_json()['videoIdHistory']    
    tags = tags.split(",")
    video_id_final = []
    TIME_LIMIT = 450
    total_duration = 0
    for tag in tags:
        next_page_token = False
        tag_section_duration = 0
        while (tag_section_duration < (TIME_LIMIT / len(tags))):
            video_id_search, next_page_token = initiateYoutubeSearch(tag, next_page_token)
            for video_id in video_id_searmch:
                if video_id in video_id_hist:
                    continue
                video_duration = getDurationOfVideo(video_id)
                tag_section_duration += video_duration
                total_duration += video_duration
                video_id_final.append(video_id)
                if (tag_section_duration >= (480 / len(tags))):
                    break
        print(tag_section_duration)
    total_duration = str(datetime.timedelta(seconds=total_duration))
    return json.dumps({ 'video_ids_res' : video_id_final, "time" : total_duration})

#return floating point duration of a video in seconds given a VIDEO_ID
def getDurationOfVideo(video_id):
    url = "https://www.googleapis.com/youtube/v3/videos?id="+video_id+"&key="+DEVELOPER_KEY+"&part=contentDetails"
    response = urlopen(url).read()
    data = json.loads(response)
    all_data=data['items']
    content_details = all_data[0]['contentDetails']
    youtube_duration = content_details['duration']
    duration = isodate.parse_duration(youtube_duration)
    return (duration.total_seconds())

#returns maximum 25 video ids, and next PAGE_TOKEN with given TAG
def initiateYoutubeSearch(tag, page_token = False):
    if page_token:
        youtube_req = youtube.search().list(
        part= "snippet",
        maxResults=50,
        order="relevance",
        q=tag + " #shorts",
        relevanceLanguage="en",
        regionCode="US",
        type="video",
        videoDuration="short",
        videoEmbeddable="true",
        pageToken = page_token
    )
    else:
        youtube_req = youtube.search().list(
            part= "snippet",
            maxResults=50,
            order="relevance",
            q=tag + " #shorts",
            relevanceLanguage="en",
            regionCode="US",
            type="video",
            videoDuration="short",
            videoEmbeddable="true"
        )
    response = youtube_req.execute()
    youtube_vids = response["items"]
    next_page_token = response["nextPageToken"]
    video_ids = []
    for video_info in youtube_vids:
        video_ids.append(video_info["id"]["videoId"])
    return video_ids, next_page_token
    