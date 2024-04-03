from django.urls import path
from . import views
from .views import OrderDeliverRequestNotificationView, OrderDeliverNotificationAcceptedView, OrderDeliverNotificationCompleteView, OrdersDeliverGetAllNotificationsView, OrdersCheckoutBillView

urlpatterns = [
    path('delivernotifications', OrderDeliverRequestNotificationView.as_view(), name="orders-delivernotifications"),
    path('delivernotifications/accepted', OrderDeliverNotificationAcceptedView.as_view(), name="orders-delivernotifications-accepted"),
    path('delivernotifications/completed', OrderDeliverNotificationCompleteView.as_view(), name="orders-delivernotifications-completed"),
    path('deliverrequests', OrdersDeliverGetAllNotificationsView.as_view(), name="order-deliverrequests"),
    path('checkout/<int:tableNumber>/', OrdersCheckoutBillView.as_view(), name="orders-checkout")
]
