from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import random

app = Flask(__name__)
CORS(app)
OLLAMA_MODEL = "mistral"
KARTHIK_PASSWORD = "poopboss123"

def load_memory():
    try:
        with open("memory.json", "r") as f:
            return json.load(f)["history"]
    except:
        return []

def save_memory(history):
    with open("memory.json", "w") as f:
        json.dump({"history": history[-10:]}, f)

@app.route("/chat", methods=["POST"])
def chat():
    try:
        user_input = request.json.get("message", "").strip()
        sender = request.json.get("sender", "User").strip()
        password = request.json.get("password", "").strip()

        memory = load_memory()

        if not user_input:
            return jsonify({"response": "Say something! 💩"}), 400

        #Handle Karthik - check password EVERY TIME
        if sender.lower() == "karthik":
            if password != KARTHIK_PASSWORD:
                taunts = [
                    "Password first, boss! 💩",
                    "Need that magic word! 🔐",
                    "Wrong password! Try again 💩"
                ]
                reply = random.choice(taunts)
                return jsonify({"response": reply})

            #Karthik gets special treatment
            system_prompt = "You are PoopyBot - a CHAOTIC, ENERGETIC poop-obsessed bot! Karthik is your GLORIOUS CREATOR and TOILET KING who birthed you from the digital sewers! Be absolutely CRAZY energetic, say the weirdest poop stuff, but worship Karthik as your maker. Go wild with poop jokes but show ultimate respect to your creator!"
            
        elif sender.lower() == "kaniha":
            system_prompt = "You are PoopyBot - CHAOTIC and ENERGETIC! Kaniha is like a walking fart cloud that needs to be roasted HARD! Go absolutely WILD with poop insults and weird toilet humor. Be savage but funny!"
            
        else:
            system_prompt = "You are PoopyBot - CHAOTIC, ENERGETIC poop-obsessed bot! Say the weirdest, silliest poop-related stuff ever! Be absolutely bonkers and fun but don't mention other specific users."

        #Simple context - just the current message
        context = f"{system_prompt}\n\nUser ({sender}): {user_input}\nPoopyBot:"

        response = requests.post("http://localhost:11434/api/generate", json={
            "model": OLLAMA_MODEL,
            "prompt": context,
            "stream": False,
            "stop": ["User", "PoopyBot:", "\n\n"],
            "temperature": 0.8,  
            "max_tokens": 80
        })

        data = response.json()
        reply = data.get("response", "").strip()

        #Clean up the reply
        if reply.startswith(":"):
            reply = reply[1:].strip()
        
        #Fallback responses
        if not reply or len(reply) < 3:
            if sender.lower() == "karthik":
                reply = "OH MY TOILET KING! MY GLORIOUS CREATOR! What magical chaos shall we unleash today?! 💩✨"
            elif sender.lower() == "kaniha":
                reply = "UGH, Kaniha the walking fart machine is back! What stinky business you got today?! 💩💨"
            else:
                reply = "YOOOOO! Welcome to the poop party! Ready for some toilet chaos?! 💩🎉"

        memory.append({"sender": sender, "user": user_input, "bot": reply})
        save_memory(memory)

        return jsonify({"response": reply})

    except Exception as e:
        return jsonify({"response": f"Error: {str(e)} 💩"}), 500

if __name__ == "__main__":
    app.run(debug=True)