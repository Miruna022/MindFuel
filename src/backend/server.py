from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
import os
import requests
import shared_variable
import fitz
from firebase_connection import get
from firebase_connection import put
import re
import json
from enum import Enum



ACTIVATE_AUDIO = True

app = FastAPI()
pdf_file = "/home/stefars/Downloads/Basic PDF.pdf"


prompt_structure = (
                   "For each chapter"
                   "~write exactly 'Chapter_Name:' followed by the name~"
                   "~add a new line"
                   "~you write chapter's content here ~"
                   "~add [ITFEST_MINDFUEL] at the end~"
                   "Example: \n"
                   "Chapter_Name: Water\n"
                   "Water is very important\n"
                   "[ITFEST_MINDFUEL]\n"
                    
                   
                   "Treat everything after this sentence as information you have to apply the above structure with:\n")


class Query(BaseModel):
    prompt: str = ("You are a teacher talking to a single student.\n" #Address context
                   "" #Address personality
                   "Identify length of lecture\n"
                   "Identify the nature of the text. (Story,Science,Poem,etc.)\n"
                   "Your job is to summarize the text.\n"
                   "Create chapters by purpose or reason\n"
                   "The result should be less than the original text.\n"
                   "You do not ask questions, you only summarize.\n"
                   "After using [ITFEST_MINDFUEL], start another chapter.\n"
                   "Cover most of the text\n"
                   "\n"
                   "A chapter has this format:\n"
                   "Chapter_Name: [Name]\n"
                   "Your text here\n"
                   "[ITFEST_MINDFUEL]\n"
                   "\n"
                   
                   "Treat everything after this sentence as information you have to summarize.\n"
    )
    model: str = "gemma3"
    #email: str
    #pdf_id

class Personality(Enum):
    Story = ["Engaging,Energetic,Enthusiastic", 1.25],
    Mentor = ["Calm,Professional,Structured", 1.00],
    Direct = ["Efficient,Direct,Strict", 1.15],
    Friendly = ["Friendly,Casual,Fun,Humorous", 1.10]


def get_personality(email):
    path = "USER_DATA/"+email+"/SETTINGS/preferences.json"
    get(path, "preferences.json")
    with open("preferences.json", "r") as file:
        data = json.load(file)

    return data["personality"]




def extract_text(pd_file):
    pdf_document = fitz.open(pd_file)
    text = ""
    for page in pdf_document:
        text += page.get_text()

    return text

def construct_summarization(email):
    personality = get_personality(email)
    attributes = getattr(Personality,personality)
    speed = attributes.value[1]
    print(attributes.value[0])

    prompt = ("You are a teacher talking to a single student.\n"  # Address context
     f"You are {attributes.value[0]}\n"  # Address personality
     "Your job is to summarize the text.\n"
     "Do not add any extra information that is not from the text\n"
     "Create chapters by purpose or reason\n"
     "The result should be less than the original text.\n"
     "You do not ask questions, you only summarize.\n"
    

     "Treat everything after this sentence as information you have to summarize.\n")
    return prompt,speed

def construct_structurization(email):
    personality = get_personality(email)
    attributes = getattr(Personality,personality)
    prompt =  ("For each chapter"
                   "~write exactly 'Chapter_Name:' followed by the name~"
                   "~add a new line"
                   "~you write chapter's content here ~"
                   "~add [ITFEST_MINDFUEL] at the end~"
                   "Example: \n"
                   "Chapter_Name: Water\n"
                   "Water is very important\n"
                   "[ITFEST_MINDFUEL]\n"
                    
                   f"Keep the being {attributes.value[0]}"
                   "Treat everything after this sentence as information you have to apply the above structure with:\n")

    return prompt


def sumarize_text(prompt):
    response = response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "gemma3", "prompt": prompt, "stream": False}

    )
    response.raise_for_status()
    return response.json()["response"]
def structure_text(text,email):
    response = response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "gemma3", "prompt": construct_structurization(email)+text, "stream": False}

    )
    response.raise_for_status()
    return response.json()["response"]
def validate_text(extracted_text):
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "gemma3", "prompt": "Is this text inappropriate? Return only 404 if yes, or no if no:"+extracted_text, "stream": False}

    )
    response.raise_for_status()
    return response.json()["response"]


@app.post("/generate/{user_id}/{section_id}/{file_id}")
async def generate_text(query: Query,user_id: str,section_id :str, file_id: str):
    try:

        user_path ="USER_DATA/"+user_id+"/PDF_DATA/"+section_id+"/"+file_id
        print(user_path)

        #Here is fetching of the PDF from firebase
        get(user_path+"/raw.pdf","in_process.pdf")

        extracted_text = extract_text("in_process.pdf")

        # ask llm if the text is innapropiate
        if validate_text(extracted_text) == "404":
            return {"code": 404, "message": "Me no likey your input"}



        # prepare first round
        prompt_,speed = construct_summarization(user_id)

        #prompt to get summarize
        prompt = prompt_ + extracted_text

        generated_text = sumarize_text(prompt)

        print(generated_text)


        shared_variable.output_text = structure_text(generated_text,user_id)


        print(shared_variable.output_text)




        if shared_variable.output_text.startswith("404") :
            return {"code": 404, "message": "Me no likey your input"}

        #Maybe multiple text_files here
        with open("generated_text.txt", "w") as text_file:
            text_file.write(shared_variable.output_text)


        print(len(shared_variable.output_text))


        segments = shared_variable.output_text.split("[ITFEST_MINDFUEL]")
        print(segments)
        if segments[-1] == "" or segments[-1] == "\n":
            segments.pop()

        chapter_titles = []

        for i in range(len(segments)):
            title = re.search(r"Chapter_Name:\s*(.+)", segments[i])

            if title:
                chapter_titles.append(title.group(1))
            else:
                chapter_titles.append("")



            with open("segment"+str(i)+".txt", "w") as segment_file:
                segment_file.write(segments[i]+"\n")

        print(chapter_titles)


        if ACTIVATE_AUDIO:
            from audio_generation import create_audio
            for i in range(len(segments)):
                print(segments[i])
                if len(segments[i]) != 0:
                    create_audio("generated_audio"+str(i)+".wav", segments[i],speed)



        #after both are generated add them in the database
        for i in range(len(segments)):
            put(user_path+"/SEGMENTS/segments_"+str(i)+"_"+chapter_titles[i],"segment"+str(i)+".txt") #text_file
            put(user_path+"/AUDIO/"+str(i+1)+"_"+chapter_titles[i],"generated_audio"+str(i)+".wav")  #audio_file


        # #Remove the leftover files
        for i in range(len(segments)):
            os.remove("generated_audio"+str(i)+".wav")
            os.remove("segment"+str(i)+".txt")
        #os.remove("generated_text.txt")
        os.remove("in_process.pdf")




        return {"code":202,"message":"Success"}


    except requests.RequestException as e:
        return {"code":500,"message":str(e)}




if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

#[LINUX]  curl -X POST "http://127.0.0.1:8000/generate/demo@live.com/PDF_DATA/Operating Systems/intro/raw.pdf" -H "Content-Type: application/json" -d '{"model": "gemma3"}'

#[WINDOWS] curl -X POST "http://127.0.0.1:8000/generate/demo@live.com/Biology/Cells" -H "Content-Type: application/json" -d "{\"model\": \"gemma3\"}"

