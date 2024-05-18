from flask import Flask, render_template, request, jsonify
import time

app = Flask(__name__)

@app.route('/')
def index():
    sample_text = ("This is a sample paragraph for the typing test. "
                   "The quick brown fox jumps over the lazy dog.")
    return render_template('index.html', sample_text=sample_text)

@app.route('/results', methods=['POST'])
def results():
    data = request.get_json()
    input_text = data['input_text']
    sample_text = data['sample_text']
    start_time = float(data['start_time'])
    end_time = float(data['end_time'])

    duration = (end_time - start_time) / 60  # in minutes
    words_typed = len(input_text.split())
    wpm = words_typed / duration

    errors, error_details = calculate_errors(input_text, sample_text)

    response = {
        'wpm': round(wpm, 2),
        'errors': errors,
        'error_details': error_details
    }
    return jsonify(response)

def calculate_errors(input_text, sample_text):
    errors = 0
    error_details = ""
    for i in range(len(input_text)):
        if i < len(sample_text):
            if input_text[i] != sample_text[i]:
                errors += 1
                error_details += f"[{input_text[i]}]"
            else:
                error_details += input_text[i]
        else:
            errors += 1
            error_details += f"[{input_text[i]}]"

    for i in range(len(input_text), len(sample_text)):
        errors += 1
        error_details += f"[_]"

    return errors, error_details

if __name__ == '__main__':
    app.run(debug=True)
