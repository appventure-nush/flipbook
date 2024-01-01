from pikepdf import Pdf, ObjectStreamMode, settings
from tqdm import tqdm

settings.set_flate_compression_level(9)

INPUT_PDF = "Yearbook-2020.pdf"
OUTPUT_PDF = "Yearbook-2020-opt.pdf"

with Pdf.open(INPUT_PDF) as pdf:
    with tqdm(total=100, unit="%") as pbar:
        pdf.save(OUTPUT_PDF, recompress_flate=True, object_stream_mode=ObjectStreamMode.generate, linearize=True, progress=(lambda x: pbar.update(x - pbar.n)))