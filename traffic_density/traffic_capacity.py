import logging
import threading
import logging.handlers
import os
import time
import sys
from flask import Response
from flask import Flask
from flask import render_template
import cv2
import numpy as np
# import skvideo.io
import utils
import matplotlib.pyplot as plt
# without this some strange errors happen
# cv2.ocl.setUseOpenCL(False)


app = Flask(__name__)
# ============================================================================

IMAGE_DIR = "./out"
VIDEO_SOURCE = '../videos/short-test2.mp4'
SHAPE = (1080, 1920)
# AREA_PTS = np.array([[0, 0], [0, 3840], [2160, 3840], [2160, 0]])
AREA_PTS=np.array([[1080,0],[2160,0],[2160,3840],[1080,3840]])
from pipeline import (
    PipelineRunner,
    CapacityCounter
)
# ============================================================================

context={}
lock=threading.Lock()

def density():



	global context
	log = logging.getLogger("main")
	base = np.zeros(SHAPE + (3,), dtype='uint8')
	area_mask = cv2.fillPoly(base, [AREA_PTS], (255, 255, 255))[:, :, 0]
    
    

    

	pipeline = PipelineRunner(pipeline=[
	    CapacityCounter(area_mask=area_mask)
	   
	], log_level=logging.DEBUG)

	# Set up image source
	cap = cv2.VideoCapture(VIDEO_SOURCE)

	frame_number = -1
	
	while True:

		st = time.time()
		rc,frame=cap.read()
	    

		if not frame.any():
		        log.error("Frame capture failed, skipping...")

		frame_number += 1
		# if not (frame_number%5 is 0):
		# 	continue

		pipeline.set_context({
		    'frame': frame,
		    'frame_number': frame_number,
		})
		context = pipeline.run()
		# print(context['capacity'])
		# cv2.imshow("Mask",context['frame'])
		et=time.time()
		if not (et == st):
			fps = 1.0/(et - st)
		frame=context['frame']
		frame=cv2.putText(frame, "FPS: "+ str(fps*5), (20, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (255,0 , 255), 2)
		context['frame']=frame
		if cv2.waitKey(33) == 27:
		    break

	cv2.destroyAllWindows()
    
def generate():

	# grab global references to the output frame and lock variables
	
	# loop over frames from the output stream
	global outputFrame, lock

	while True:

		with lock:
		# wait until the lock is acquired
		
			# check if the output frame is available, otherwise skip
			# the iteration of the loop
			outputFrame=context['frame']
			if outputFrame is None:
				continue

			# encode the frame in JPEG format
			(flag, encodedImage) = cv2.imencode(".jpg", outputFrame)

			# ensure the frame was successfully encoded
			if not flag:
				continue

		# yield the output frame in the byte format
		yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + 
			bytearray(encodedImage) + b'\r\n')
#=============================================================================



@app.route("/traffic_density")
def video_feed():
	# return the response generated along with the specific media
	# type (mime type)
	return Response(generate(),
		mimetype = "multipart/x-mixed-replace; boundary=frame")

    
# ============================================================================

if __name__ == "__main__":

	log = utils.init_logging()
	if not os.path.exists(IMAGE_DIR):
		log.debug("Creating image directory `%s`...", IMAGE_DIR)
		os.makedirs(IMAGE_DIR)

	t = threading.Thread(target=density)
	t.daemon = True
	t.start()

	app.run(host='0.0.0.0', port='3000', debug=True,threaded=True, use_reloader=False)





	

   

