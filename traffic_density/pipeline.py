import os
import logging
import csv
import numpy as np
import cv2
import matplotlib.pyplot as plt
import utils


AREA_COLOR = (66, 183, 42)

backSub = cv2.createBackgroundSubtractorMOG2()
class PipelineRunner(object):
    

    def __init__(self, pipeline=None, log_level=logging.DEBUG):
        self.pipeline = pipeline or []
        self.context = {}
        self.log = logging.getLogger(self.__class__.__name__)
        

    def set_context(self, data):
        self.context = data

    def add(self, processor):
        if not isinstance(processor, PipelineProcessor):
            raise Exception(
                'Processor should be an isinstance of PipelineProcessor.')
        # processor.log.setLevel(self.log_level)
        self.pipeline.append(processor)

    def remove(self, name):
        for i, p in enumerate(self.pipeline):
            if p.__class__.__name__ == name:
                del self.pipeline[i]
                return True
        return False

    # def set_log_level(self):
    #     for p in self.pipeline:
    #         p.log.setLevel(self.log_level)

    def run(self):
        for p in self.pipeline:
            self.context = p(self.context)

        self.log.debug("Frame #%d processed.", self.context['frame_number'])

        return self.context


class PipelineProcessor(object):
    '''
        Base class for processors.
    '''

    def __init__(self):
        self.log = logging.getLogger(self.__class__.__name__)
        

class CapacityCounter(PipelineProcessor):

    def __init__(self, area_mask):
        super(CapacityCounter, self).__init__()
    
        self.area_mask = area_mask
        self.all = np.count_nonzero(area_mask)
        
        
    def calculate_capacity(self, frame, frame_number):
        base_frame = frame
        # CLAHE (Contrast Limited Adaptive Histogram Equalization)
        # this used for noise reduction at night time
        gray = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)
        # clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
        # cl1 = clahe.apply(frame)
    
        # edges = cv2.Canny(frame,50,70)
        # edges = ~edges
        # blur = cv2.bilateralFilter(cv2.blur(edges,(21,21), 100),9,200,200)
        # _, threshold = cv2.threshold(blur,230, 255,cv2.THRESH_BINARY)
        # cv2.imshow("Threshold",threshold)
        # t = cv2.bitwise_and(threshold,threshold,mask = self.area_mask)
        # fgmask=backSub.apply(frame, None, 0.01)
        # kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2, 2))

        # # Fill any small holes
        # closing = cv2.morphologyEx(frame, cv2.MORPH_CLOSE, kernel)
        # # Remove noise
        # opening = cv2.morphologyEx(closing, cv2.MORPH_OPEN, kernel)
        # # Dilate to merge adjacent blobs
        # dilation = cv2.dilate(opening, kernel, iterations=2)

        # # threshold
        # threshold = dilation[dilation < 240] = 0
        # fgmask=backSub.apply(frame)
        # fgmask=cv2.medianBlur(fgmask,9)
        # _, threshold = cv2.threshold(fgmask,235, 255,cv2.THRESH_BINARY)
        # threshold=cv2.dilate(threshold,None,iterations=4)
        # cv2.imshow("Threshold", threshold)
        fgMask=backSub.apply(gray)
        thresh = cv2.threshold(fgMask, 200, 255, cv2.THRESH_BINARY)[1]
        cv2.imshow("Threshold",thresh)
        t = cv2.bitwise_and(thresh,thresh,mask = self.area_mask)
        free = np.count_nonzero(t)
        capacity = 1 - float(free)/self.all



        
        
        img = np.zeros(base_frame.shape, base_frame.dtype)
        img[:, :] = AREA_COLOR
        mask = cv2.bitwise_and(img, img, mask=self.area_mask)
        cv2.addWeighted(mask, 1, base_frame, 1, 0, base_frame)
        cv2.putText(base_frame, "Capacity: "+ str(capacity*100), (20, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (255,0 , 255), 2)
        # cv2.putText(base_frame, "Frame Rate"+ str())


        return (capacity,base_frame)
        
    def __call__(self, context):
        frame = context['frame'].copy()
        frame_number = context['frame_number']
        
        capacity,base_frame = self.calculate_capacity(frame, frame_number)
        
        # self.log.debug("Capacity: {}%".format(capacity*100))
        context['capacity'] = capacity
        context['frame']=base_frame
        return context
        
        






