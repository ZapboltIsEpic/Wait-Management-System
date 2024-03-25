# signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

@receiver(post_save, sender=Order)
def order_created_notification(sender, instance, created, **kwargs):
    if created:
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            'kitchen_staff',
            {
                'type': 'send_notification',
                'message': 'New order received',
                'order_id': instance.id
            }
        )