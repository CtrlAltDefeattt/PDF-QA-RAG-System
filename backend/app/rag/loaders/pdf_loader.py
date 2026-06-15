import fitz


class PDFLoader:

    @staticmethod
    def extract_text(
        pdf_path: str
    ):

        document = fitz.open(pdf_path)

        total_pages = len(document)

        pages = []

        for page_num in range(total_pages):

            page = document[page_num]

            text = page.get_text()

            pages.append(
                {
                    "page": page_num + 1,
                    "text": text
                }
            )

        document.close()

        return {
            "total_pages": total_pages,
            "pages": pages
        }