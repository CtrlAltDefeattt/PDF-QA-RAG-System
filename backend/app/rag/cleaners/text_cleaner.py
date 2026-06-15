import re

class TextCleaner:
    @staticmethod
    def clean(text: str) -> str:
        if not text:
            return ""
        # Replace multiple spaces/newlines with a single space
        text = re.sub(r"\s+", " ", text)
        return text.strip()