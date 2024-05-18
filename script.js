let startTime, endTime;
let totalWords = 0;
let totalErrors = 0;

function startTest() {
    document.getElementById('typingArea').value = "";
    document.getElementById('results').style.display = 'none';
    document.getElementById('typingArea').disabled = false;
    document.getElementById('typingArea').focus();
    startTime = new Date();
    totalWords = 0;
    totalErrors = 0;
}

function trackTyping() {
    const sampleText = document.getElementById('sampleText').innerText;
    const inputText = document.getElementById('typingArea').value;

    const errors = calculateErrors(inputText, sampleText);
    totalErrors = errors;
    const wordsTyped = inputText.trim().split(/\s+/).length;
    totalWords = wordsTyped;

    updateResults();

    if (inputText === sampleText) {
        endTest();
    }
}

function calculateErrors(input, sample) {
    let errors = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== sample[i]) {
            errors++;
        }
    }
    if (input.length < sample.length) {
        errors += sample.length - input.length;
    }
    return errors;
}

function endTest() {
    document.getElementById('typingArea').disabled = true;
    endTime = new Date();
    const duration = (endTime - startTime) / 60000; // in minutes
    const wpm = totalWords / duration;
    const errorDetails = generateErrorDetails(document.getElementById('typingArea').value, document.getElementById('sampleText').innerText);

    document.getElementById('speed').innerText = `Speed: ${wpm.toFixed(2)} WPM`;
    document.getElementById('errors').innerText = `Errors: ${totalErrors}`;
    document.getElementById('errorDetails').innerHTML = `Error Details:<br>${errorDetails}`;
    document.getElementById('results').style.display = 'block';
}

function updateResults() {
    const duration = (new Date() - startTime) / 60000; // in minutes
    const wpm = totalWords / duration;
    document.getElementById('speed').innerText = `Speed: ${wpm.toFixed(2)} WPM`;
    document.getElementById('errors').innerText = `Errors: ${totalErrors}`;
}

function generateErrorDetails(input, sample) {
    let details = "";
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== sample[i]) {
            details += `<span style="color:red">${input[i] || ' '}</span>`;
        } else {
            details += input[i] || ' ';
        }
    }
    for (let i = input.length; i < sample.length; i++) {
        details += `<span style="color:red">_</span>`;
    }
    return details;
}
