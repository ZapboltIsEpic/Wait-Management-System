from django.urls import path
from .views import RequestNotificationView, NotificationAcceptedView, NotificationCompleteView, GetAllNotificationsView

urlpatterns = [
    path('notifications', RequestNotificationView.as_view()),
    path('notifications/accepted', NotificationAcceptedView.as_view()),
    path('notifications/completed', NotificationCompleteView.as_view()),
    path('requests', GetAllNotificationsView.as_view()),
]
