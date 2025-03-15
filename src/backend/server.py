from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import fitz  # PyMuPDF
import shared_variable



ACTIVATE_AUDIO = False

app = FastAPI()
pdf_file = "/home/stefars/Downloads/Basic PDF.pdf"


class Query(BaseModel):
    prompt: str = "Generate me a haiku about spring\n"
    model: str = "gemma3"
    #email: str
    #pdf_id



def extract_text(pd_file):
    pdf_document = fitz.open(pd_file)
    text = ""
    for page in pdf_document:
        text += page.get_text()

    return text





@app.post("/generate/{email}")
async def generate_text(query: Query,email: str):
    print(email)
    try:

        extracted_text = extract_text(pdf_file)
        prompt = query.prompt
        print(prompt)

        response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": query.model, "prompt": prompt, "stream": False}

        )

        response.raise_for_status()

        shared_variable.output_text = response.json()["response"]
        print(shared_variable.output_text)


        if ACTIVATE_AUDIO:
            from audio_generation import create_audio
            create_audio()


        return {"generated_text": response.json()["response"]}

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error communicating with Ollama: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


