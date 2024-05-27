const btn = document.getElementById('btn');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() {
  console.log('You can speak now!!!');
}

recognition.onresult = function(event) {
  var text = event.results[0][0].transcript;
  console.log(text);
  document.getElementById('result').innerHTML = text;
  read(text);
}

function read(text) {
  var speech = new SpeechSynthesisUtterance();
  speech.text = text;
  if (text.includes('time'))
    speech.text = 'It is ' + new Date().getHours() + " " + new Date().getMinutes() + " right now";
  else if (text.includes('your name'))
    speech.text = 'My name is Birbal.I am your artificial intelligence ';
  else if (text.includes('help'))
    speech.text = 'What help do you want?';
  else if (text.includes('video'))
    window.open('https://www.youtube.com/');
  else if (text.includes('mail'))
    window.open('https://www.gmail.com/');
  else if (text.includes('movie'))
    window.open('https://www.netflix.com/');
  else if (text.includes('hack '))
    speech.text = 'hacking is offence.I cannot do it';
  else if (text.includes(' creator'))
    speech.text = 'Mashir Nizamy,Creator of myself';
  else if (text.includes('usage'))
    speech.text = 'Currettly I am limited to you only';
  else if (text.includes('lex'))
    speech.text = 'Of course! She is great artificial intelligence and she is controlling the IOT products. she is controlling the whole industry ';
  else if (text.includes('assistant'))
    speech.text = 'Of course .She is great artificial intelligence and is a whole best artificial intelligence';
  else if (text.includes('bye'))
    speech.text = 'Of course, Hurray! You are my master';
  window.speechSynthesis.speak(speech);
}