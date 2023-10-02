const saveButton = document.querySelector('#save-btn');
const addCardButton = document.querySelector('#add-flashcard');
const closeCreationBoxButton = document.querySelector('#close-btn');
const cards = [];

const toggleCreationBoxView = () => {
  const creationBoxElement = document.querySelector('#add-question-card');

  creationBoxElement.classList.toggle('hide');
}

const deleteCard = (event) => {
  const cardElement = event.target.closest('.card');

  cardElement.remove();
}

/* Não funciona */
const editCard = (event) => {
  const cardElement = event.target.closest('.card');

  toggleCreationBoxView();
  const question = getInputs();
  let {questionText, answerText} = question;

  const questionInput = cardElement.querySelector('.question-div');
  const answerInput = cardElement.querySelector('.answer-div');

  questionInput.textContent = questionText;
  answerInput.textContent = answerText;

  //cardElement.remove();
};

const createCard = (questionText, answerText) => {
  /* Cartão */
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');

  /* Pergunta */
  const questionElement = document.createElement('p');
  questionElement.classList.add('question-div');
  questionElement.textContent = questionText;

  /* Resposta */
  const answerElement = document.createElement('p');
  answerElement.classList.add('answer-div', 'hide');
  answerElement.textContent = answerText;

  /* Botão mostrar/esconder resposta */
  const toggleAnswerViewButton = document.createElement('button');
  toggleAnswerViewButton.classList.add('show-hide-btn');
  toggleAnswerViewButton.textContent = 'Mostrar / Esconder';
  toggleAnswerViewButton.addEventListener('click', () => {
    answerElement.classList.toggle('hide');
  });

  /* Botão de edição de cartão */
  const editionButton = document.createElement('button');
  editionButton.type = 'button';
  editionButton.classList.add('edit');
  const editionIcon = document.createElement('i');
  editionIcon.classList.add('bi', 'bi-pencil-square');
  editionButton.appendChild(editionIcon);
  editionButton.addEventListener('click', editCard);

  /* Botão de remoção de cartão */
  const deletionButton = document.createElement('button');
  deletionButton.type = 'button';
  deletionButton.classList.add('delete');
  const deletionIcon = document.createElement('i');
  deletionIcon.classList.add('bi', 'bi-trash');
  deletionButton.appendChild(deletionIcon);
  deletionButton.addEventListener('click', deleteCard);

  /* Container de botões de edição e exclusão */
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons-con');
  buttonsContainer.appendChild(editionButton);
  buttonsContainer.appendChild(deletionButton);

  cardElement.appendChild(questionElement);
  cardElement.appendChild(toggleAnswerViewButton);
  cardElement.appendChild(answerElement);
  cardElement.appendChild(buttonsContainer);

  return cardElement;
}

const loadCards = () => {
  const storedCards = JSON.parse(localStorage.getItem('cards'));

  if (storedCards) {
    for (const storedCard of storedCards) {
      cards.push(storedCard)
      let {questionText, answerText} = storedCard;
      addCard(questionText, answerText);
    }
  }
}

window.addEventListener('load', loadCards);

const clearInputs = () => {
  const questionInput = document.querySelector('#question');
  const answerInput = document.querySelector('#answer');
  questionInput.value = '';
  answerInput.value = '';
}

const getInputs = () => {
  const questionInput = document.querySelector('#question');
  const answerInput = document.querySelector('#answer');
  let questionText = questionInput.value;
  let answerText = answerInput.value;
  clearInputs();

  return {questionText: questionText, answerText: answerText};
}

const addCard = (questionText, answerText) => {
  const card = createCard(questionText, answerText);
  const cardsContainer = document.querySelector('.card-list-container');

  cardsContainer.appendChild(card);
}

addCardButton.addEventListener('click', toggleCreationBoxView);
closeCreationBoxButton.addEventListener('click', toggleCreationBoxView);
saveButton.addEventListener('click', () => {
  const question = getInputs();
  toggleCreationBoxView();
  let {questionText, answerText} = question;
  addCard(questionText, answerText);
  /* Adiciona objeto ao array e armazena este localmente */
  cards.push({ questionText: questionText, answerText: answerText });
  localStorage.setItem('cards', JSON.stringify(cards));
});