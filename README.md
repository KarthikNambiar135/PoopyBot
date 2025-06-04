# PoopyBot 💩

A chaotic, energetic AI chatbot with personality-based responses and a poop-obsessed sense of humor! Built with React frontend and Flask backend, powered by Ollama's Mistral model.

## 🚀 Features

- **Personality-Based Responses**: Different behaviors for different users
- **Real-time Chat Interface**: Smooth messaging experience with typing indicators
- **Password Protection**: Special access controls for specific users
- **Memory System**: Maintains conversation context
- **Animated UI**: Bouncing emojis and smooth transitions
- **Responsive Design**: Works on desktop and mobile

## 🛠️ Tech Stack

**Frontend:**
- React (Hooks)
- CSS3 with animations
- Responsive design

**Backend:**
- Flask (Python)
- Flask-CORS for cross-origin requests
- JSON file storage for conversation memory

**AI Model:**
- Ollama (Mistral model)
- Custom prompt engineering for personality traits

## 📋 Prerequisites

- Node.js (v14 or higher)
- Python 3.7+
- Ollama installed and running
- Mistral model pulled in Ollama

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/KarthikNambiar135/PoopyBot.git
```

### 2. Install Ollama and Mistral model
```bash
# Install Ollama (if not already installed)
[curl -fsSL https://ollama.ai/install.sh | sh](https://ollama.com/download)

# Pull the Mistral model
ollama pull mistral

# Start Ollama service
ollama run mistral
```

### 3. Set up the Backend
```bash
# Install Python dependencies
pip install flask flask-cors requests
pip install -r requirements.txt

# Run the Flask server
python app.py
```

### 4. Set up the Frontend
```bash
cd poopybot-frontend  
# Install Node.js dependencies
npm install

# Start the React development server
npm run dev
```

## 🎮 Usage

1. **Start Ollama**: Make sure Ollama is running on `localhost:11434`
2. **Run Backend**: Start the Flask server on `localhost:5134` 
3. **Run Frontend**: Start the React app on `localhost:3000`
4. **Chat Away**: Select your persona and start chatting!
localhost ports may change depending on your device.
Make sure you run both frontend and backend on 2 different terminals.  

### User Personas

- **User**: Default chaotic poop-obsessed responses
- **Karthik**: Treated as the "Toilet King" creator (requires password: `poopboss123`)
- **Kaniha**: Gets roasted with savage poop humor

## 📁 Project Structure

```
├── app.py               # Flask backend server
├── memory.json          # Conversation history storage
├── requirements.txt     # Python dependencies (create this)
└── README.md           # This file
poopybot-frontend/
├── src/
    ├── App.jsx              # React frontend component
├── package.json         # Node.js dependencies
```

## 🔐 Configuration

### Passwords
- Karthik's password is hardcoded as `poopboss123` in `app.py`
- Modify the `KARTHIK_PASSWORD` variable to change it

### AI Model Settings
- Model: Mistral via Ollama
- Temperature: 0.8 (for chaotic responses)
- Max tokens: 80 (for response lengths)  
- Modify these in the `app.py` file

## 🎨 Customization

### Adding New Personas
1. Add a new option in the frontend select dropdown
2. Create a new system prompt in the backend `chat()` function
3. Define the personality traits and response style

### Styling
- All styles are contained in the `App.jsx` file
- Uses Comic Sans MS font for a playful feel
- Brown/yellow color scheme with poop theme

## 📝 API Endpoints

### POST `/chat`
Handles chat messages and returns bot responses.

**Request Body:**
```json
{
  "message": "Hello!",
  "sender": "User", 
  "password": "optional_password"
}
```

**Response:**
```json
{
  "response": "Bot's chaotic response! 💩"
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Ollama not responding**: Make sure Ollama service is running
2. **CORS errors**: Ensure Flask-CORS is installed and configured
3. **Memory file errors**: The app will create `memory.json` automatically
4. **Password issues**: Check that the password matches exactly

### Error Messages
- Empty input: "Say something! 💩"
- Wrong password: Random taunt messages
- Server errors: Displays error with poop emoji

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

Open Source, made for fun, to understand the basics of prompt engineering, and to Fine-Tune an exisiting model.  

## 🎉 Acknowledgments

- Built with love and lots of poop jokes
- Powered by Ollama and Mistral AI
- Inspired by chaotic energy and toilet humor  

Karthik Nambiar - karthiknambiar135@gmail.com  

*Made with 💩 and chaos*
