const addCardButton = document.querySelector('#add-card-button');
const deleteCardButton = document.querySelector('.delete-card-button');
const cards = [];

const getInputs = () => {
  const cardFrontInput = document.querySelector('#card-front-input');
  const cardBackInput = document.querySelector('#card-back-input');
  let cardFrontText = cardFrontInput.value;
  let cardBackText = cardBackInput.value;

  if (cardFrontText && cardBackText) {
    clearInputs();
  
    return { cardFrontText: cardFrontText, cardBackText: cardBackText };
  } else {
    alert('Insira uma palavra para frente e verso do cartão.');
  }

  return null;
}

const createCard = (cardFrontText, cardBackText) => {
  const cardElement = document.createElement('li');
  cardElement.classList.add('flip-box');

  const cardInner = document.createElement('div');
  cardInner.classList.add('flip-box-inner');

  const front = document.createElement('div');
  front.classList.add('flip-box-front');

  const frontText = document.createElement('front-text');
  frontText.classList.add('front-text');
  frontText.textContent = cardFrontText;

  const back = document.createElement('div');
  back.classList.add('flip-box-back');

  const backText = document.createElement('back-text');
  backText.classList.add('back-text');
  backText.textContent = cardBackText;

  /* Ícone do botão de exclusão do cartão */
  const deleteCardButtonIcon = document.createElement('i');
  deleteCardButtonIcon.classList.add('bi', 'bi-trash');

  /* Botão de exclusão do cartão */
  const deleteCardButton = document.createElement('button');
  deleteCardButton.type = 'button';
  deleteCardButton.classList.add('delete-card-button');
  deleteCardButton.addEventListener('click', (event) => deleteCard(event, cardFrontText, cardBackText));

  const deleteCardButtonIcon2 = document.createElement('i');
  deleteCardButtonIcon2.classList.add('bi', 'bi-trash');

  const deleteCardButton2 = document.createElement('button');
  deleteCardButton2.type = 'button';
  deleteCardButton2.classList.add('delete-card-button');
  deleteCardButton2.addEventListener('click', (event) => deleteCard(event, cardFrontText, cardBackText));
  
  deleteCardButton.appendChild(deleteCardButtonIcon);
  deleteCardButton2.appendChild(deleteCardButtonIcon2);
  front.appendChild(frontText);
  front.appendChild(deleteCardButton);
  back.appendChild(backText);
  back.appendChild(deleteCardButton2);
  cardInner.appendChild(front);
  cardInner.appendChild(back);
  cardElement.appendChild(cardInner);

  return cardElement;
}

const addCard = (cardFrontText, cardBackText) => {
  const cardElement = createCard(cardFrontText, cardBackText);
  const cardsContainer = document.querySelector('#cards-container');

  cardsContainer.append(cardElement);
  updateCardsTotal();
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
  const cardElement = event.target.closest('.flip-box');

  event.stopPropagation();

  if (confirm('Tem certeza que deseja excluir o cartão?!')) {
    /* Remover elemento do array da forma convencional gera bugs, por isso foi optado por esta forma */
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
    updateCardsTotal();
  }
}

const clearInputs = () => {
  const cardFrontInput = document.querySelector('#card-front-input');
  const cardBackInput = document.querySelector('#card-back-input');

  cardFrontInput.value = '';
  cardBackInput.value = '';

  cardFrontInput.focus();
}

const updateCardsTotal = () => {
  const cardsContainer = document.querySelector('#cards-container');
  const thisCards = cardsContainer.querySelectorAll('.card');
  const cardsTotalContainer = document.querySelector('#cards-total');
  let cardsTotal = thisCards.length;

  cardsTotalContainer.textContent = `Total de cartões: ${cardsTotal}`;
}

const toggleShowCardBack = (event, cardFrontText, cardBackText) => {
  const cardElement = event.target;
  const cardTextElement = cardElement.querySelector('.card-text');
  let cardText = cardTextElement.textContent;

  if (cardText === cardFrontText) {
    cardTextElement.textContent = cardBackText;
    cardElement.classList.replace('front', 'back');
  } else {
    cardTextElement.textContent = cardFrontText;
    cardElement.classList.replace('back', 'front');
  }
}

window.addEventListener('load', loadFromStorage);
addCardButton.addEventListener('click', () => {
  const card = getInputs();
  if (card) {
    let { cardFrontText, cardBackText } = card;
    addCard(cardFrontText, cardBackText);
    cards.push(card);
    localStorage.setItem('cards', JSON.stringify(cards));
  }
});