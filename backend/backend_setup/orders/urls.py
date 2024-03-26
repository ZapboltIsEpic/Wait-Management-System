from django.urls import path
from . import views
from .views import OrderDeliverRequestNotificationView, OrderDeliverNotificationAcceptedView, OrderDeliverNotificationCompleteView, OrdersDeliverGetAllNotificationsView, OrdersCheckoutBillView

urlpatterns = [
    path('delivernotifications', OrderDeliverRequestNotificationView.as_view()),
    path('delivernotifications/accepted', OrderDeliverNotificationAcceptedView.as_view()),
    path('delivernotifications/completed', OrderDeliverNotificationCompleteView.as_view()),
    path('deliverrequests', OrdersDeliverGetAllNotificationsView.as_view()),
    path('deliverrequests', OrdersDeliverGetAllNotificationsView.as_view()),
    path('checkout/<int:tableNumber>/', OrdersCheckoutBillView.as_view())
]
