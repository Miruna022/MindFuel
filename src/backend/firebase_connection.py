import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage



cred = credentials.Certificate('/home/stefars/Downloads/mindfuel-dd636-firebase-adminsdk-fbsvc-23a1ade7c2.json')

firebase_admin.initialize_app(cred, {
    'storageBucket': "mindfuel-dd636.firebasestorage.app"
})

bucket = storage.bucket()
blobs = bucket.list_blobs()


def put(location_in_db,file):
    """
    :param location_in_db: the location of the file from the database
    :param file: the location of the file from the computer
    :return:
    """
    blob = bucket.blob(location_in_db)
    blob.upload_from_filename(file)

def get(location_in_db,file):
    """
    :param location_in_db: the location of the file from the database
    :param file: the location of the file where it will be downloaded
    :return:
    """
    blob = bucket.blob(location_in_db)
    blob.download_to_filename(file)

def display_contents(location_in_db):
    blobs = bucket.list_blobs()
    for blob in blobs:
        print(blob.name if location_in_db in blob.name[:-1] else "")


get("USER_DATA/user_1/PDF_DATA/pdf_1/AUDIO/audio_0","audio0.wav")
get("USER_DATA/user_1/PDF_DATA/pdf_1/AUDIO/audio_1","audio1.wav")




#Still frontend put("USER_DATA/USER_(ID)/PDF_DATA/PDF_(ID)/raw.pdf","pdf_to_upload.pdf")
#Frontend calls the api