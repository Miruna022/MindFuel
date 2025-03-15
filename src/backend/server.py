from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
import requests
import shared_variable
import fitz
from firebase_connection import get
from firebase_connection import put



ACTIVATE_AUDIO = True

app = FastAPI()
pdf_file = "/home/stefars/Downloads/Basic PDF.pdf"


class Query(BaseModel):
    prompt: str = "Summarize the story, and when it finishes, say 'APPLES': \n"
    model: str = "gemma3"
    #email: str
    #pdf_id



def extract_text(pd_file):
    pdf_document = fitz.open(pd_file)
    text = ""
    for page in pdf_document:
        text += page.get_text()

    return text





@app.post("/generate/{user_id}/{file_id}")
async def generate_text(query: Query,user_id: str, file_id: str):
    try:

        user_path ="USER_DATA/"+user_id+"/PDF_DATA/"+file_id

        #Here is fetching of the PDF from firebase
        get(user_path+"/raw.pdf","in_process.pdf")


        extracted_text = extract_text("in_process.pdf")

        prompt = query.prompt + extracted_text

        print(prompt)

        response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": query.model, "prompt": prompt, "stream": False}

        )

        response.raise_for_status()

        shared_variable.output_text = response.json()["response"]

        #Maybe multiple text_files here
        with open("generated_text.txt", "w") as text_file:
            text_file.write(shared_variable.output_text)


        print(len(shared_variable.output_text))



        character_count = len(shared_variable.output_text)
        word_size = 5
        estimated_word_count = int(character_count/word_size)


        if ACTIVATE_AUDIO:
            from audio_generation import create_audio
            create_audio("generated_audio.wav")

        #after both are generated add them in the database
        put(user_path+"/SEGMENTS/segments_1","generated_text.txt") #text_file
        put(user_path+"/AUDIO/audio_1","generated_audio.wav")  #audio_file


        return {"generated_text": response.json()["response"]}

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error communicating with Ollama: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


    #curl -X POST "http://localhost:8000/generate/user_1/pdf_1" -H "Content-Type: application/json" -d '{"model": "gemma3"}'

