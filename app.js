const question = document.getElementById('question');
const submit = document.getElementById('submit');
const messageContainer = document.getElementById('message-container');
const lastQuestion = document.getElementById('last-questions');
const recordVoiceBtn = document.getElementById('recordVoiceBtn');

submit.addEventListener('click', () => {
  fetch('https://chat-gpt-example.vercel.app/makeRequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      question: question.value,
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => renderAnswer(data))
    .catch((err) => {
      messageContainer.innerHTML += `<div class="chat-message-left pb-4">
                                      <div>
                                        <img
                                          src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                          class="rounded-circle mr-1"
                                          alt="AI"
                                          width="40"
                                          height="40" />
                                        <div class="text-muted small text-nowrap mt-2">${new Date().toLocaleTimeString()}</div>
                                      </div>
                                      <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                        <div class="font-weight-bold mb-1">AI</div>
                                        <div class="answerBody">The request was sent with an error, please try again
                                          </br>
                                          Error Message: ${err}
                                        </div>
                                      </div>
                                    </div>`;
    });
  renderQuestion();
  lastQuestionTemplate();
  question.value = '';
});

question.addEventListener('keypress', function enterKey(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    submit.click();
  }
});

function renderAnswer(data) {
  messageContainer.innerHTML += `<div class="chat-message-left pb-4">
                          <div>
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar3.png"
                              class="rounded-circle mr-1"
                              alt="AI"
                              width="40"
                              height="40" />
                            <div class="text-muted small text-nowrap mt-2">${new Date().toLocaleTimeString()}</div>
                          </div>
                          <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                            <div class="font-weight-bold mb-1">AI</div>
                            <pre class="answerBody">${data.answer}</pre>
                          </div>
                        </div>`;
}

function renderQuestion() {
  messageContainer.innerHTML += `<div class="chat-message-right pb-4">
              <div>
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  class="rounded-circle mr-1"
                  alt="User"
                  width="40"
                  height="40" />
                <div class="text-muted small text-nowrap mt-2">${new Date().toLocaleTimeString()}</div>
              </div>
              <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                <div class="font-weight-bold mb-1">You</div>
                ${question.value}
              </div>
            </div>`;
}

function lastQuestionTemplate() {
  lastQuestion.innerHTML += `<div id="last-question" class="mt-3" style="cursor: pointer;">${question.value}</div>`;
  const lastQuestionValues = document.querySelectorAll('#last-question');
  for (const lastQuestionValue of lastQuestionValues) {
    lastQuestionValue.addEventListener('click', () => {
      question.value = lastQuestionValue.innerText;
    });
  }
}

// Создаем распознаватель
var recognizer = new webkitSpeechRecognition();

// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = true;

// Какой язык будем распознавать?
recognizer.lang = 'en-En';

// Используем колбек для обработки результатов
recognizer.onresult = function (event) {
  var result = event.results[event.resultIndex];
  if (result.isFinal) {
    // alert('Вы сказали: ' + result[0].transcript);
    question.value = '';
    question.value = result[0].transcript;
    recordVoiceBtn.style.backgroundColor = '#f8f9fa';
  } else {
    // console.log('Промежуточный результат: ', result[0].transcript);
    question.value = result[0].transcript;
  }
};

let flag = true;
recordVoiceBtn.addEventListener('click', () => {
  // Начинаем слушать микрофон и распознавать голос
  if (flag == true) {
    recognizer.start();
    console.log('start');
    recordVoiceBtn.style.backgroundColor = 'red';
    flag = false;
  } else {
    recognizer.stop();
    console.log('stop');
    recordVoiceBtn.style.backgroundColor = '#f8f9fa';
    flag = true;
  }
});
