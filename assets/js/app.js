const addCardButton = document.querySelector('#add-card-button');
const deleteCardButton = document.querySelector('.delete-card-button');
const cards = [];

const getInputs = () => {
  const cardFrontInput = document.querySelector('#card-front-input');
  const cardBackInput = document.querySelector('#card-back-input');
  let cardFrontText = cardFrontInput.value;
  let cardBackText = cardBackInput.value;

  return { cardFrontText: cardFrontText, cardBackText: cardBackText };
}

const createCard = (cardFrontText, cardBackText) => {
  /* Cartão */
  const cardElement = document.createElement('li');
  cardElement.classList.add('card');
  cardElement.addEventListener('click', (event) => toggleShowCardBack(event, cardFrontText, cardBackText));

  /* Texto da frente do cartão */
  const cardTextElement = document.createElement('span');
  cardTextElement.classList.add('card-text');
  cardTextElement.textContent = cardFrontText;

  /* Botão de exclusão do cartão */
  const deleteCardButton = document.createElement('button');
  deleteCardButton.type = 'button';
  deleteCardButton.classList.add('delete-card-button');
  deleteCardButton.addEventListener('click', (event) => deleteCard(event, cardFrontText, cardBackText));

  /* Ícone do botão */
  const deleteCardButtonIcon = document.createElement('i');
  deleteCardButtonIcon.classList.add('bi', 'bi-trash');

  deleteCardButton.appendChild(deleteCardButtonIcon);

  cardElement.appendChild(cardTextElement);
  cardElement.appendChild(deleteCardButton);

  return cardElement;
}

const addCard = (cardFrontText, cardBackText) => {
  const cardElement = createCard(cardFrontText, cardBackText);
  const cardsContainer = document.querySelector('#cards-container');

  cardsContainer.append(cardElement);
}

const loadFromStorage = () => {
  const storedCards = JSON.parse(localStorage.getItem('cards'));

  if (storedCards) {
    for (const storedCard of storedCards) {
      let { cardFrontText, cardBackText } = storedCard;
      addCard(cardFrontText, cardBackText);
      cards.push(storedCard);
    }
  } else {
    const defaultCards = [
      { cardFrontText: 'Amor', cardBackText: 'Love' },
      { cardFrontText: 'Carinho', cardBackText: 'Kindness' },
      { cardFrontText: 'Afeto', cardBackText: 'Affection' }
    ];

    defaultCards.forEach((defaultCard) => {
      let { cardFrontText, cardBackText } = defaultCard;
      addCard(cardFrontText, cardBackText);
      cards.push(defaultCard);
    });
    
    localStorage.setItem('cards', JSON.stringify(cards));
  }
}

const deleteCard = (event, cardFrontText, cardBackText) => {
  const cardElement = event.target.closest('.card');

  event.stopPropagation();

  /* Remover elemento do array da forma convencional gera bugs */
  cards.forEach((card, index, cards) => {
    if (card.cardFrontText === cardFrontText && card.cardBackText === cardBackText) {
      cards.splice(index, 1);
    }
  });

  if (cards.length >= 1) {
    localStorage.setItem('cards', JSON.stringify(cards));
  } else {
    localStorage.setItem('cards', JSON.stringify(null));
    location.reload();
  }

  cardElement.remove();
}

const toggleShowCardBack = (event, cardFrontText, cardBackText) => {
  const cardElement = event.target;
  const cardTextElement = cardElement.querySelector('.card-text');
  let cardText = cardTextElement.textContent;

  if (cardText === cardFrontText) {
    cardTextElement.textContent = cardBackText;
  } else {
    cardTextElement.textContent = cardFrontText;
  }
}

window.addEventListener('load', loadFromStorage);
addCardButton.addEventListener('click', () => {
  const card = getInputs()
  let { cardFrontText, cardBackText } = card;
  addCard(cardFrontText, cardBackText);
  cards.push(card);
  localStorage.setItem('cards', JSON.stringify(cards));
});