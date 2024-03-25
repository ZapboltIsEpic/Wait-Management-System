from channels.generic.websocket import WebsocketConsumer
import json

class KitchenStaffConsumer(WebsocketConsumer):
    def connect(self):
        self.group_name = 'kitchen_staff'
        async_to_sync(self.channel_layer.group_add)(self.group_name, self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.group_name, self.channel_name)

    def receive(self, text_data):
        pass

    def send_notification(self, event):
        self.send(text_data=json.dumps(event))