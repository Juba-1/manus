function askQuestion() {
  const userInput = document.getElementById('userInput').value;
  const messagesDiv = document.getElementById('messages');
  if (userInput.trim() === '') return;

  // إضافة السؤال إلى الرسائل
  const userMessage = document.createElement('div');
  userMessage.textContent = 'أنت: ' + userInput;
  messagesDiv.appendChild(userMessage);

  // استخدام API للبحث على الإنترنت
  fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(userInput)}&format=json`)
    .then(response => response.json())
    .then(data => {
      const answerMessage = document.createElement('div');
      answerMessage.textContent = 'مانوس: ' + (data.Abstract || 'لا أستطيع إيجاد إجابة في الوقت الحالي.');
      messagesDiv.appendChild(answerMessage);
    })
    .catch(err => {
      const errorMessage = document.createElement('div');
      errorMessage.textContent = 'مانوس: حدث خطأ أثناء البحث.';
      messagesDiv.appendChild(errorMessage);
    });

  // مسح حقل الإدخال
  document.getElementById('userInput').value = '';
}
