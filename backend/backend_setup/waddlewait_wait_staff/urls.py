from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView

urlpatterns = [
    path('notifications/assistance', RegisterView.as_view()),
    path('notifications/assistance/accepted ', LoginView.as_view()),
    path('notifications/assistance/completed', UserView.as_view()),
    path('requests/assistance', LogoutView.as_view()),
    path('notifications/order', LogoutView.as_view()),
    path('notifications/order/accepted', LogoutView.as_view()),
    path('notifications/order/complete', LogoutView.as_view()),
    path('requests/orders', LogoutView.as_view()),
    # path('checkout/{tableNumber}', LogoutView.as_view()),
]
