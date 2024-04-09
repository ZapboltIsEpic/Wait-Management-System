from django.urls import path
from . import views
from .views import OrderDeliverRequestNotificationView, OrderDeliverNotificationAcceptedView, OrderDeliverNotificationCompleteView, OrdersDeliverGetAllNotificationsView, OrdersCheckoutBillView, OrderDeliverRequestNotificationCheckView, OrderDeliverNotificationAcceptedNotificationCheckView

urlpatterns = [
    path('delivernotifications', OrderDeliverRequestNotificationView.as_view(), name="orders-delivernotifications"),
    path('delivernotifications/notificationcheck', OrderDeliverRequestNotificationCheckView.as_view(), name="orders-delivernotifications-notificationcheck"),
    path('delivernotifications/accepted', OrderDeliverNotificationAcceptedView.as_view(), name="orders-delivernotifications-accepted"),
    path('delivernotifications/accepted/notificationcheck', OrderDeliverNotificationAcceptedNotificationCheckView.as_view(), name="orders-delivernotifications-accepted-notificationcheck"),
    path('delivernotifications/completed', OrderDeliverNotificationCompleteView.as_view(), name="orders-delivernotifications-completed"),
    path('deliverrequests', OrdersDeliverGetAllNotificationsView.as_view(), name="order-deliverrequests"),
    path('checkout/<int:table>/', OrdersCheckoutBillView.as_view(), name="orders-checkout")
]
