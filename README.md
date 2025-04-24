# Context7 Pydantic AI Agent

A powerful AI agent that integrates with Context7 to provide instant access to documentation and examples for over 1,800 frameworks and tools.

## Features

- 🤖 Interactive chat interface
- 📚 Access to Context7's extensive documentation database
- 🔍 Framework-specific documentation search
- 💾 Conversation history management
- 🎨 Rich terminal UI with color-coded output
- ⚙️ Configurable through environment variables
- 🚀 Smart caching system for faster responses
- 🔄 Rate limiting protection
- 📊 Progress indicators for long-running operations
- ❌ Improved error handling and messages

## Installation

1. Clone the repository:
```powershell
git clone <repository-url>
cd context7-agent
```

2. Create and activate a virtual environment:
```powershell
python -m venv venv
.\venv\Scripts\activate
```

3. Install dependencies:
```powershell
pip install -r requirements.txt
```

4. Create a .env file:
```powershell
Copy-Item .env.example .env
```

5. Configure your environment variables in the .env file:
```env
OPENAI_API_KEY=your-api-key-here
OPENAI_BASE_URL=your-base-url-here
OPENAI_MODEL=your-model-name-here
```

## Usage

### Start Chat Session

```powershell
python main.py chat
```

This starts an interactive chat session where you can:
- Chat with the AI assistant
- Get framework-specific help
- Access documentation and examples
- Type 'exit' or 'quit' to end the session

### Get Framework Documentation

```powershell
python main.py docs <framework> <topic>
```

Example:
```powershell
python main.py docs nextjs api-routes
python main.py docs supabase authentication
```

### Clear Conversation History

```powershell
python main.py clear
```

### Check Version

```powershell
python main.py version
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| OPENAI_API_KEY | Your OpenAI API key | Required |
| OPENAI_BASE_URL | OpenAI API base URL | Required |
| OPENAI_MODEL | OpenAI model to use | Required |
| DEBUG | Enable debug mode | false |
| MAX_HISTORY_LENGTH | Max conversation messages | 10 |
| HISTORY_FILE | History file location | conversation_history.json |
| CONTEXT7_TOKEN_LIMIT | Initial token limit | 5000 |
| CONTEXT7_MAX_TOKENS | Maximum token limit | 20000 |

## Performance Features

### Caching System

The agent implements a smart caching system to improve response times and reduce API calls:

- Documentation results are cached for 1 hour by default
- Library ID resolutions are cached to avoid redundant lookups
- Cache entries automatically expire after their TTL
- Cache hits are indicated in the terminal output

Example of cache in action:
```powershell
> python main.py docs react hooks
Fetching documentation for hooks...
[Documentation displayed]

> python main.py docs react hooks
Using cached documentation
[Documentation displayed instantly]
```

### Rate Limiting

To prevent API abuse and ensure stable operation:

- Maximum 10 requests per minute per endpoint
- Automatic request throttling when limit is reached
- Clear error messages with wait time information
- Automatic retry after rate limit window resets

Example of rate limit message:
```powershell
Rate limit exceeded. Please wait 30.5 seconds.
```

### Progress Indicators

Visual feedback for long-running operations:

- Spinner animation during API calls
- Clear status messages for each operation
- Error messages with detailed information
- Success confirmations for completed operations

Example of progress indication:
```powershell
⠋ Resolving library ID...
⠙ Fetching documentation for hooks...
✓ Documentation retrieved successfully
```

### Error Handling

Improved error handling with:

- Clear, user-friendly error messages
- Specific error types for different failures
- Suggestions for resolving common issues
- Detailed debug information when enabled

Example error messages:
```powershell
Error: Query cannot be empty
Error: Library ID and topic cannot be empty
Error: Rate limit exceeded. Please wait 45.2 seconds.
```

## Examples

1. Chat with documentation assistance:
```powershell
> python main.py chat
You: How do I implement authentication in Next.js with Supabase?
Assistant: Let me fetch the relevant documentation...
```

2. Direct documentation lookup:
```powershell
> python main.py docs supabase auth-flow
Searching documentation for supabase - auth-flow...
[Documentation will be displayed here]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this in your own projects!
