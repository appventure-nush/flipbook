from pypdf import PdfWriter, PdfReader, Transformation
from pypdf.generic import RectangleObject
from pypdf.annotations import Link
from copy import copy

# constants
FILE_NAME = "Yearbook 2021.pdf"
ICON_NAME = "house.pdf"
FILE_OUT = "merged-pdf.pdf"
PAGES = range(6, 103, 2)
HOME_PAGE_INDEX = 2
MARGIN = 5

# get the base file
reader_base = PdfReader(FILE_NAME)

# get the icon
reader = PdfReader(ICON_NAME)
page_icon = reader.pages[0]

# get the icon size
icon_width: float = page_icon.mediabox.width
icon_height: float = page_icon.mediabox.height

# result writer
writer = PdfWriter(clone_from=reader_base)

for page in range(len(writer.pages)):
    page_base = writer.pages[page]

    if page in PAGES:
        # get the page size
        page_width: float = page_base.mediabox.width
        page_height: float = page_base.mediabox.height

        # transform the icon to the right, with a small margin
        trans = Transformation().translate(tx=page_width - icon_width - MARGIN, ty=MARGIN)
        page_icon_copy = copy(page_icon)
        page_icon_copy.mediabox = RectangleObject((0, 0, page_width, page_height))
        page_icon_copy.add_transformation(trans)

        page_base.merge_page(page_icon_copy, over=True)

        # add a link annotation to page 2
        annotation = Link(
            rect=(page_width - icon_width - MARGIN, MARGIN, page_width - MARGIN, icon_height + MARGIN),
            target_page_index=HOME_PAGE_INDEX
        )
        writer.add_annotation(page_number=page, annotation=annotation)
    else:
        writer.add_page(page_base)

with open("merged-pdf.pdf", "wb") as fp:
    writer.write(fp)