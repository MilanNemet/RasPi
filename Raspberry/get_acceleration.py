import socket
import json
import time
import board
import digitalio
import busio
import adafruit_lis3dh

UDP_IP = "127.0.0.2"
UDP_PORT = 50500
remote_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

i2c = busio.I2C(board.SCL, board.SDA)
int1 = digitalio.DigitalInOut(board.D6)  #correct pin for interrupt
lis3dh = adafruit_lis3dh.LIS3DH_I2C(i2c, int1=int1)

lis3dh.range = adafruit_lis3dh.RANGE_4_G

start = time.time()
time.sleep(0.0001)

while(True):
    try:
        stop = time.time()
        accelero_tuple = lis3dh.acceleration + (stop-start)
        start = time.time()
        b_arr = bytearray(json.dumps(accelero_tuple).encode())
        remote_socket.sendto(b_arr, (UDP_IP, UDP_PORT))
        time.sleep(0.0001)
    except KeyboardInterrupt:
        break
    except :
        print("Something went wrong!")
        time.sleep(5)
