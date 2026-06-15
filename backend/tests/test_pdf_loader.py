import sys
import os

# Fix path resolution
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.rag.loaders.pdf_loader import PDFLoader

# Use forward slashes or a raw string 'r' to avoid path errors
pdf_path = "app/uploads/369af078-7bb1-434e-bd89-eae30eb9ab3f_Nov_Dec_2025 (6).pdf"
result = PDFLoader.extract_text(pdf_path)

print(f"Total Pages Extracted: {result['total_pages']}")
print("=" * 50)

# Loop through every page extracted and print its full text
for page_data in result["pages"]:
    print(f"--- FULL TEXT FOR PAGE {page_data['page']} ---")
    print(page_data["text"])
    print("=" * 50)