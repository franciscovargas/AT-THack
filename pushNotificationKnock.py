# Send to single device.
from pyfcm import FCMNotification

push_service = FCMNotification(api_key="AAAAkF8fZmE:APA91bEaW8c-b9YW9nuFT0ngorCQzfteQ75e71RW5qUqFq199-VXhTRwqriLeGLfsXPG5OnBWvmnC9SAxrXDXPebH7j8igJlt7pXbxS6GXW1PvQkuZ3j5-1ZgLEqyFy0Q6FHVvO2wIdi ")

# OR initialize with proxies

push_service = FCMNotification(api_key="AAAAkF8fZmE:APA91bEaW8c-b9YW9nuFT0ngorCQzfteQ75e71RW5qUqFq199-VXhTRwqriLeGLfsXPG5OnBWvmnC9SAxrXDXPebH7j8igJlt7pXbxS6GXW1PvQkuZ3j5-1ZgLEqyFy0Q6FHVvO2wIdi ")

# Your api-key can be gotten from:  https://console.firebase.google.com/project/<project-name>/settings/cloudmessaging

registration_id = "cQzHHQkMooA:APA91bFZ6c1E-s0Uv6S058MJpm_QY7tMB6p7Gx3HmR5pvJPxXwPl9gcE_tHlIJJaAPE2tXd3SLD3n5EZMYCj06vDEUyh-9pyiOcqCOZqs9gizAdqPGWPudll6MuO8Ka-JoEYNiRYJ6zM"
message_title = "Knock"
message_body = "We think someone is knocking"
result = push_service.notify_single_device(registration_id=registration_id, message_title=message_title, message_body=message_body)