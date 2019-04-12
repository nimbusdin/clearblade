from clearblade.ClearBladeCore import System, Query, Developer
import subprocess
import ast


class ClearBladeMQTTSocket(object):

    def __init__(self, system, user):
        self.mqtt = system.Messaging(user)


class ClearBladeSystemSocket(object):

    def __init__(self, key, secret):
        self.system = System(key, secret)


class ClearBladeDeviceSocket(object):

    def __init__(self, system, name, activeKey):
        self.device = system.Device(name, activeKey)


class ClearBladeUserSocket(object):

    def __init__(self, system, email, password, anon=False):
        if anon is True:
            myAnon = system.AnonUser()
            self.user = system.registerUser(myAnon, email, password)
        else:
            self.user = system.User(email, password)


class ClearBladeCodeServiceSocket(object):

    def __init__(self, system, service):
        self.service = system.Service(service)


class ClearBladeSocket(object):

    def main():
        # System Credentials
        SystemKey = "9af1cbca0bf283ffe3bfc8eba62a"
        SystemSecret = "D4F3CBCA0BF4D290F293A4FEE0AC01"

        # User Credentials
        User = "wannabeklutz@gmail.com"
        Password = "clearblade11"

        # Device Credentials
        DeviceName = "nimbus22"
        DeviceActiveKey = "sQ8crd9g37p44f1Lkb799ISa"
        
        # Code Service
        # ServiceName = "mqtt"

        # myClearBladeSockets
        mySystem = ClearBladeSystemSocket(SystemKey, SystemSecret).system
        myUser = ClearBladeUserSocket(mySystem, User, Password).user
        myDevice = ClearBladeDeviceSocket(mySystem, DeviceName, DeviceActiveKey).device
        myMQTT = ClearBladeMQTTSocket(mySystem, myUser).mqtt
        # myService = ClearBladeCodeServiceSocket(mySystem, ServiceName).service
        
        # Connect and Publish and Execute
        myMQTT.connect()
        myMQTT.subscribe("CPU_Info")
        cpuinfo = ClearBladeSocket.cpuinfo()
        cpuinfodict = ast.literal_eval(cpuinfo)
        myMQTT.publish("CPU_Info", cpuinfo)
        #myService.execute(myUser, cpuinfodict)
        myMQTT.unsubscribe("CPU_Info")
        myMQTT.disconnect()

    def cpuinfo():
        command = ['lscpu', '-J']
        p = subprocess.Popen(command, stdout=subprocess.PIPE)
        text = p.stdout.read()
        retcode = p.wait()
        result = text.decode("utf-8")
        return result


if __name__ == "__main__":
    ClearBladeSocket.main()
