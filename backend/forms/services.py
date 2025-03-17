from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, lightgrey, black, gray
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from django.contrib.staticfiles import finders
from forms.models import Candidate, NominationList
# Constants for positioning
PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN_LEFT = 50
TEXT_START_Y = PAGE_HEIGHT - 100
LINE_SPACING = 20
CHECKBOX_SIZE = 15

# Define Colors
TITLE_COLOR = HexColor("#007ACC")  # VS Code Blue Shade
TEXT_COLOR = HexColor("#333333")   # Dark Gray for better readability

def draw_key_value(pdf, y, key, value):
    """Function to draw key-value pairs with different fonts"""
    text = pdf.beginText(MARGIN_LEFT, y)
    text.setFont("Helvetica-Bold", 12)
    text.textOut(key)
    text.setFont("Helvetica", 12)
    text.textOut(str(value))
    pdf.drawText(text)

def create_consent_pdf(consent):
    """Function to create consent PDF with structured formatting"""
    
    # Hinweis Text
    hinweis_lines = [
        "Rechtsgrundlage für die Erhebung der voran genannten personenbezogenen Daten ist § 16 der Wahlordnung ",
        "der TU Darmstadt. Die Verarbeitung der Daten durch das Wahlamt sowie den Wahlvorstand erfolgt nach den  ",
        "Vorschriften der Datenschutz-Grundverordnung (DSGVO) und des Hessischen Datenschutz- ",
        "und Informationsfreiheitsgesetzes (HDSIG).Gemäß § 18 Abs. 10 der Wahlordnung werden die Wahlvorschläge ",
        "nur mit Name, Vorname und Fach- und Studienbereich bzw. Einrichtung der Bewerber:innen veröffentlicht. ",
        "Eine Rücknahme der Erklärung ist gemäß § 16 Abs. 6 Satz 3 der Wahlordnung bis zur abschließenden ",
        "Zulassungsprüfung durch schriftliche Erklärung gegenüber dem Wahlvorstand möglich."
    ]

    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)
    
    # Load Fonts
    garamond_path = finders.find("admin/fonts/EBGaramond-Regular.ttf")
    garamond_bold_path = finders.find("admin/fonts/EBGaramond-Bold.ttf")  
    garamond_italic_path = finders.find("admin/fonts/EBGaramond-Italic.ttf")

    if garamond_path:
        pdfmetrics.registerFont(TTFont("Garamond", garamond_path))
    if garamond_bold_path:
        pdfmetrics.registerFont(TTFont("Garamond-Bold", garamond_bold_path))
    if garamond_italic_path:
        pdfmetrics.registerFont(TTFont("Garamond-Italic", garamond_italic_path))
    else:
        print("Garamond font not found, falling back to Helvetica.")

    # Set title font and color
    pdf.setFont("Helvetica", 22)
    pdf.setFillColor(TITLE_COLOR)
    pdf.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 50, "Einverständniserklärung")

    # Add an image at the top right
    try:
        img = ImageReader("static/admin/img/tu_darmstadt_logo.png")
        pdf.drawImage(img, PAGE_WIDTH - 170, PAGE_HEIGHT - 75, width=150, height=60, mask="auto")
    except Exception as e:
        print("Image not found or error loading image:", e)

    # Reset text color and font
    pdf.setFillColor(TEXT_COLOR)

    # Draw Personal Information
    current_text_y = TEXT_START_Y
    pdf.setFont("Helvetica", 12)
    pdf.drawString(MARGIN_LEFT, current_text_y, "Ich,")

    draw_key_value(pdf, current_text_y - LINE_SPACING, "Zuname: ", consent["last_name"])
    draw_key_value(pdf, current_text_y - 2 * LINE_SPACING, "Vorname: ", consent["first_name"])
    draw_key_value(pdf, current_text_y - 3 * LINE_SPACING, "Geburtsdatum: ", consent["birth_year"])
    draw_key_value(pdf, current_text_y - 4 * LINE_SPACING, "E-Mail: ", consent["email"])
    draw_key_value(pdf, current_text_y - 5 * LINE_SPACING, "Anschrift: ", consent["address"])
    draw_key_value(pdf, current_text_y - 6 * LINE_SPACING, "Semesteranschrift: ", consent["semester_address"])
    draw_key_value(pdf, current_text_y - 7 * LINE_SPACING, "Matrikelnummer: ", consent["matr_number"])
    draw_key_value(pdf, current_text_y - 8 * LINE_SPACING, "Studienbereichsbezeichnung: ", consent["fb_sb_label"])


    pdf.drawString(MARGIN_LEFT, current_text_y - 9 * LINE_SPACING, "bin mit meiner Benennung als Bewerber:in der Vorschlagsliste:")

    draw_key_value(pdf, current_text_y - 10 * LINE_SPACING, "Kennwort: ", consent["list_password"])
    draw_key_value(pdf, current_text_y - 11 * LINE_SPACING, "für die Wahl im: ", "Sommersemester" if consent["semester"] == "SS" else "Wintersemester")

    draw_key_value(pdf, current_text_y - 12 * LINE_SPACING, "Semesterjahr: ", consent["semester_year"])
    draw_key_value(pdf, current_text_y - 13 * LINE_SPACING, "zu: ", consent["committee"])


    pdf.drawString(MARGIN_LEFT, current_text_y - 14 * LINE_SPACING, "einverstanden")
    
    hinweis_box_y = TEXT_START_Y - 16 * LINE_SPACING


    pdf.line(MARGIN_LEFT, hinweis_box_y - 50, MARGIN_LEFT + 200, hinweis_box_y - 50)
    pdf.drawString(MARGIN_LEFT, hinweis_box_y - 70, "Unterschrift")

    # Draw Hinweis Box
    box_x = MARGIN_LEFT
    box_y = hinweis_box_y - 150  # Position below checkbox
    box_width = PAGE_WIDTH - 2 * MARGIN_LEFT
    box_height = 180  # Adjust height as needed

    pdf.setFillColor(lightgrey)
    pdf.setStrokeColor(black)    # Set border (stroke) color to black
    pdf.rect(box_x, box_y, box_width, box_height, fill=1, stroke=1)  # Draw light gray box
    pdf.setFillColor(black)  # Reset text color to black

    # Hinweis Title
    pdf.setFont("Helvetica", 12)
    pdf.drawString(box_x + 10, box_y + box_height - 20, "Hinweis:")
    pdf.setFont("Helvetica", 9.7)
    
    current_line = box_y + box_height - 20 - 20

    for line in hinweis_lines:
        pdf.drawString(box_x + 10, current_line, line)
        current_line = current_line - 20

    # Use Paragraph for Wrapped Text

    draw_key_value(pdf, 50, "Darmstadt, den: ", consent["date"])
    pdf.line(PAGE_WIDTH - MARGIN_LEFT - 150, 60, PAGE_WIDTH - MARGIN_LEFT, 60)
    pdf.setFont("Garamond-Italic", 11)
    pdf.drawString(PAGE_WIDTH - MARGIN_LEFT - 52, 50, "Unterschrift")
    pdf.save()
    # Save PDF
    buffer.seek(0)
    return buffer


def create_nomination_pdf(nomination_list):
    """Function to create a nomination PDF with structured formatting"""


    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)
    # Load Fonts
    garamond_path = finders.find("admin/fonts/EBGaramond-Regular.ttf")
    garamond_bold_path = finders.find("admin/fonts/EBGaramond-Bold.ttf")  
    garamond_italic_path = finders.find("admin/fonts/EBGaramond-Italic.ttf")

    if garamond_path:
        pdfmetrics.registerFont(TTFont("Garamond", garamond_path))
    if garamond_bold_path:
        pdfmetrics.registerFont(TTFont("Garamond-Bold", garamond_bold_path))
    if garamond_italic_path:
        pdfmetrics.registerFont(TTFont("Garamond-Italic", garamond_italic_path))
    else:
        print("Garamond font not found, falling back to Helvetica.")

    # Set title font and color
    pdf.setFont("Helvetica", 18)
    pdf.setFillColor(TITLE_COLOR)
    pdf.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 50, "Vorschlagsliste")
    pdf.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 70, "Statusgruppe der Studierenden")


    # Add an image at the top right
    try:
        img = ImageReader("static/admin/img/tu_darmstadt_logo.png")
        pdf.drawImage(img, PAGE_WIDTH - 170, PAGE_HEIGHT - 75, width=150, height=60, mask="auto")
    except Exception as e:
        print("Image not found or error loading image:", e)

    # Reset text color and font
    pdf.setFillColor(TEXT_COLOR)

    # Draw Personal Information
    current_text_y = TEXT_START_Y
    pdf.setFont("Helvetica", 12)
    draw_key_value(pdf, current_text_y - LINE_SPACING, "Hochschulwahlen im: ", "Sommersemester" if nomination_list["semester"]=="SS" else "WS" )
    draw_key_value(pdf, current_text_y - 2 * LINE_SPACING, "Semesterjahr: ", str(nomination_list["semester_year"]))
    draw_key_value(pdf, current_text_y - 3 * LINE_SPACING, "Kennwort der Liste: ", nomination_list["list_password"])
    pdf.setFont("Helvetica-Bold", 12)
    trusted_person = nomination_list["trusted_person"]
    pdf.drawString(MARGIN_LEFT, current_text_y - 4 * LINE_SPACING, "Vorschlagsliste für die Wahl zu:")
    pdf.setFont("Helvetica", 12)
    pdf.drawString(MARGIN_LEFT, current_text_y - 5 * LINE_SPACING, nomination_list["committee_fb_sb_wf"])
    name = trusted_person.get("name", "N/A")
    fb_sb_wf = trusted_person.get("fb_sb_wf", "N/A")
    address = trusted_person.get("address", "N/A")
    email = trusted_person.get("email", "N/A")
    phone = trusted_person.get("phone", "N/A")
    draw_key_value(pdf, current_text_y - 6 * LINE_SPACING, "Name, Vorname: ", f'{name}')
    draw_key_value(pdf, current_text_y - 7 * LINE_SPACING, "FB Nr./SB: ", fb_sb_wf)
    draw_key_value(pdf, current_text_y - 8 * LINE_SPACING, "Anschrift: ", address)
    draw_key_value(pdf, current_text_y - 9 * LINE_SPACING, "E-mail Adresse: ", email)
    draw_key_value(pdf, current_text_y - 10 * LINE_SPACING, "Telefonnummer: ", phone)
    draw_key_value(pdf, current_text_y - 11 * LINE_SPACING, "Anzahl der Kandidierenden: ", nomination_list["number_of_candidates"])

    candidates_box_y = TEXT_START_Y - 13 * LINE_SPACING


    box_x = MARGIN_LEFT
    box_y = candidates_box_y
    box_width = PAGE_WIDTH - 2 * MARGIN_LEFT
    box_height = 20

    pdf.setFillColor(gray)
    pdf.rect(box_x, box_y, box_width, box_height, fill=1, stroke=0)  # Draw light gray box
    pdf.setFillColor(black)  # Reset text color to black

    # Hinweis Title
    pdf.setFont("Helvetica-Oblique", 11)
    pdf.drawString(box_x + 5, TEXT_START_Y - 12.7 * LINE_SPACING + box_height - 20, "Ifd.Nr.")
    pdf.drawString(box_x + 50, TEXT_START_Y - 12.7 * LINE_SPACING + box_height - 20, "Nachname.")
    pdf.drawString(box_x + 180, TEXT_START_Y - 12.7 * LINE_SPACING + box_height - 20, "Vorname")
    pdf.drawString(box_x + 300, TEXT_START_Y - 12.7 * LINE_SPACING + box_height - 20, "Geburtsjahr")
    pdf.drawString(box_x + 420, TEXT_START_Y - 12.7 * LINE_SPACING + box_height - 20, "FB Nr./SB")

    
    candidates_list = Candidate.objects.filter(nomination_list=nomination_list["id"])

    def create_cell(candidate, box_y, i):
        box_y = box_y - LINE_SPACING
        pdf.setFillColor(lightgrey)
        pdf.rect(box_x, box_y, box_width, box_height, fill=1, stroke=0)  # Draw light gray box
        pdf.setFillColor(black)
        pdf.drawString(box_x + 5, box_y + box_height - 15, str(i))
        pdf.drawString(box_x + 50, box_y + box_height - 15, candidate.last_name)
        pdf.drawString(box_x + 180, box_y + box_height - 15, candidate.first_name)
        pdf.drawString(box_x + 300, box_y + box_height - 15, str(candidate.birth_year))
        pdf.drawString(box_x + 420, box_y + box_height - 15, candidate.fb_sb)
        return box_y

    i = 0
    pdf.setFont("Helvetica", 11)
    for candidate in candidates_list:
        box_y = create_cell(candidate, box_y, i)
        if box_y < 120 and i < len(candidates_list) - 1:
            pdf.showPage()
            box_y = PAGE_HEIGHT - 40
        i += 1


    pdf.setFont("Helvetica-Bold", 9.7)

    draw_key_value(pdf, 50, "Darmstadt, den: ", nomination_list["date"])
    pdf.line(PAGE_WIDTH - MARGIN_LEFT - 150, 60, PAGE_WIDTH - MARGIN_LEFT, 60)
    pdf.setFont("Garamond-Italic", 11)
    pdf.drawString(PAGE_WIDTH - MARGIN_LEFT - 52, 50, "Unterschrift")
    pdf.showPage()
    

    pdf.setFont("Helvetica", 18)
    pdf.setFillColor(TITLE_COLOR)
    pdf.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 50, "Anlage zur Vorschlagsliste")

    pdf.setFillColor(black)  # Reset text color to black

    current_y = TEXT_START_Y
    draw_key_value(pdf, current_y,"Kennwort: ", nomination_list["list_password"])
    current_y -= 10 * LINE_SPACING
    box_x = MARGIN_LEFT
    box_y = current_y  # Position below checkbox
    box_width = PAGE_WIDTH - 2 * MARGIN_LEFT
    box_height = 180  # Adjust height as needed

    pdf.setFillColor(lightgrey)
    pdf.setStrokeColor(black)    # Set border (stroke) color to black
    pdf.rect(box_x, box_y, box_width, box_height, fill=1, stroke=1)  # Draw light gray box
    pdf.setFillColor(black)  # Reset text color to black

    hinweis_lines = [
        "Bei der Aufstellung von Wahlvorschlägen sollen Frauen und Männer entsprechend ihrem jeweiligen Anteil",
        "in der jeweiligen Statusgruppe angemessen berücksichtigt werden. Für die Gruppe der wissenschaftlichen",
        "Mitglieder sollen zusätzlich unbefristet und befristet Beschäftigte entsprechend ihrem Anteil in der Gruppe  ",
        "angemessen berücksichtigt werden. Eine entsprechende Erklärung, dass diese Anforderungen erfüllt sind ",
        "oder eine Begründung für die Abweichung ist schriftlich dem Wahlvorschlag beizufügen (§ 16 Abs. 2 WahlO).   ",
        "Die Erklärung wird bei Zulassung des Wahlvorschlages mit der Bekanntmachung der Zulassung veröffentlicht",
        "(§ 18 Abs. 10 WahlO)."
    ]


    # Hinweis Title
    pdf.setFont("Helvetica", 12)
    pdf.drawString(box_x + 10, box_y + box_height - 20, "Hinweis:")
    pdf.setFont("Helvetica", 9.7)

    current_line = box_y + box_height - 20 - 20

    for line in hinweis_lines:
        pdf.drawString(box_x + 10, current_line, line)
        current_line = current_line - 20
    
    current_y -= 2 * LINE_SPACING
    pdf.setFont("Helvetica", 22)
    text = "Erklärung gemäß § 16 Abs. 2 WahlO"
    x_center = PAGE_WIDTH / 2  # Center X position
    y_position = current_y  # Y position of text
    text_width = pdf.stringWidth(text, "Helvetica", 12)  # Get text width

    # Draw the text
    pdf.setFont("Helvetica", 12)
    pdf.drawCentredString(x_center, y_position, text)
    current_y -= LINE_SPACING
    # Draw underline
    underline_y = y_position - 2  # Position slightly below the text
    pdf.drawString(MARGIN_LEFT, current_y, "Bei der Aufstellung des Wahlvorschlages wurden Frauen und Männer entsprechend ihrem")
    current_y -= LINE_SPACING

    pdf.drawString(MARGIN_LEFT, current_y, "jeweiligen Anteil in der Statusgruppe angemessen berücksichtigt.")
    pdf.line(x_center - (text_width / 2), underline_y, x_center + (text_width / 2), underline_y)

    draw_key_value(pdf, 50, "Darmstadt, den: ", nomination_list["date"])
    pdf.line(PAGE_WIDTH - MARGIN_LEFT - 150, 60, PAGE_WIDTH - MARGIN_LEFT, 60)
    pdf.setFont("Garamond-Italic", 11)
    pdf.drawString(PAGE_WIDTH - MARGIN_LEFT - 140, 50, "Unterschrift der Vertrauensperson")


    pdf.save()
    # Save PDF
    buffer.seek(0)
    return buffer

