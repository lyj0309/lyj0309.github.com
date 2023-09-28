# 

v4l2-ctl -d /dev/video4 --list-formats-ext
ffmpeg -f v4l2 -input_format mjpeg -i /dev/video4 -t 5 out.mp4


ffmpeg -codecs
http://192.168.10.102/webcam/?action=stream&cacheBust=1689651483031


ffmpeg -c:v mjpeg_qsv  -i "http://192.168.10.102/webcam/?action=stream&cacheBust=1689651483031"  -c:v h264_qsv -low_power 1  output.mp4

ffmpeg -thread_queue_size 1024 -f v4l2 -i \"http://192.168.10.102/webcam/?action=stream\" -stream_loop -1 -i \"data/demo_music.m4a\"  -c:v h264_qsv -pix_fmt yuv420p -r 30 -s 1280*720 -g 60 -b:v 10M -bufsize 10M -acodec aac -ac 2 -ar 44100 -ab 128k -f flv [[URL]]


ffmpeg -c:v mjpeg_qsv  -i "http://192.168.10.102/webcam/?action=stream&cacheBust=1689651483031"  -c:v h264_qsv -low_power 1  output.mp4
