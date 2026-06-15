import os
from google import genai
from google.genai.errors import APIError
from dotenv import load_dotenv  # ◄ Add this import

def test_gemini_connection():
    print("🚀 Initializing Gemini API Connection Test...")
    
    # Check if the environment variable is picked up
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("❌ Error: GEMINI_API_KEY not found in environment variables.")
        print("Please ensure your .env file is loaded or export the variable manually.")
        return

    try:
        # Initialize the client (it automatically picks up GEMINI_API_KEY from os.environ)
        client = genai.Client()
        
        print("Sending test prompt to 'gemini-2.5-flash'...")
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents="Hello! Confirm that you can read this message by replying with 'System operational'.",
        )
        
        print("\n--- Gemini Response ---")
        print(response.text.strip())
        print("-----------------------")
        
        if "System operational" in response.text:
            print("\n🎉 SUCCESS: Gemini integration is fully working and verified!")
        else:
            print("\n⚠️ Note: Received a response, but it didn't match the test string exactly.")
            
    except APIError as e:
        print(f"\n❌ API Error: Google GenAI returned an error: {e}")
    except Exception as e:
        print(f"\n❌ Unexpected Error: {e}")

if __name__ == "__main__":
    load_dotenv()  # ◄ Call this BEFORE running the test pipeline to load the .env file
    test_gemini_connection()