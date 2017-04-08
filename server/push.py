from pyfcm import FCMNotification

push_service = FCMNotification(
    api_key="AAAAXJjyAOk:APA91bGhmPgsFZG9P1zv8_TouwST7Ueg-lJm8QDqhZuDKqdBOeuMaTUtWn1EpZnQ-PEgNpSGd6q7qQZL8dO7j3HQddQ9TuVQ5pPc6T7WIS_n-M_nf__E1j8ybGmwFziBrQ-nGbHIoRrn")

# OR initialize with proxies

push_service = FCMNotification(
    api_key="AAAAXJjyAOk:APA91bGhmPgsFZG9P1zv8_TouwST7Ueg-lJm8QDqhZuDKqdBOeuMaTUtWn1EpZnQ-PEgNpSGd6q7qQZL8dO7j3HQddQ9TuVQ5pPc6T7WIS_n-M_nf__E1j8ybGmwFziBrQ-nGbHIoRrn")

# Your api-key can be gotten from:
# https://console.firebase.google.com/project/<project-name>/settings/cloudmessaging

registration_id = "eyyarHtOyQ4:APA91bHP2L1P25INHjAkncna5s_Pevdd9huo-lrx3Yq3OpBjbfHvL5lxn9V-BqiaKmnJbJCI75TjFVm__NL4E0Ugyx68n-7Dfk27YZr5wBb9wpFEdg8m3L0jZJHsrM2dlZks6OTVLWRM"
message_title = "Are you OK?"
message_body = " "


def push_send():
    result = push_service.notify_single_device(
        registration_id=registration_id, message_title=message_title, message_body=message_body)
