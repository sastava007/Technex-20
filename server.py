import io
from flask import Flask
from flask import current_app as app
from flask import send_file
import queue
# from myproject import Obj


vehicles=queue.Queue(maxsize=50)
vehicles.put(4)
vehicles.put(3)

app = Flask(__name__)

@app.route('/getImages')

def get_image():
	carNum=vehicles.get()
	filename=(".\\images\\%scar.jpg",carNum)

	return send_file(filename, mimetype="image/jpg")


if __name__ == '__main__':

	# t = threading.Thread(target=trackMultipleObjects)
	# t.daemon = True
	# t.start()

	# t2=threading.Thread(target=overspeeding)
	# t2.daemon=True
	# t2.start()
	# trackMultipleObjects()d

	app.debug=True
	app.run(host='0.0.0.0', port='3001', debug=True,threaded=True)