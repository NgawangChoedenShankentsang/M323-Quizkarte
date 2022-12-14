const quizletContainer = document.querySelector(".quizlet-container");
const quizletCardsContainer = document.querySelector(".quizlet-cards-container");

let quizCards = [];

// Create Quiz Card
const createQuizCardBtn = document.querySelector("#create-quiz-card-btn");
createQuizCardBtn.addEventListener("click", () => {
  const questionInput = document.querySelector("#question-input");
  const answerInput = document.querySelector("#answer-input");

  if (questionInput.value !== "" && answerInput.value !== "") {
    const quizCard = {
      question: questionInput.value,
      answer: answerInput.value,
      rank: 0
    }

    quizCards.push(quizCard);
    renderQuizCards();

    questionInput.value = "";
    answerInput.value = "";
  }
});

// Render Quiz Cards
const renderQuizCards = () => {
  quizletCardsContainer.innerHTML = "";

  quizCards.sort((a, b) => {
    return a.rank - b.rank;
  });

  quizCards.forEach((quizCard) => {
    const quizCardElement = document.createElement("div");
    quizCardElement.classList.add("quizlet-card");

    quizCardElement.innerHTML = `
      <div class="quizlet-card-question">Question: ${quizCard.question}</div>
      <div class="quizlet-card-answer" style="display:none;">Answer: ${quizCard.answer}</div>
      <div class="quizlet-card-rank">Rank: ${quizCard.rank}</div>
    `;

    // Edit Quiz Card
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", () => {
      editQuizCard(quizCard);
    });

    // Delete Quiz Card
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteQuizCard(quizCard);
    });

    // Reveal Quiz Card
    const revealButton = document.createElement("button");
    revealButton.innerText = "Reveal";
    revealButton.addEventListener("click", () => {
      revealQuizCard(quizCard);
    });

    quizCardElement.appendChild(editButton);
    quizCardElement.appendChild(deleteButton);
    quizCardElement.appendChild(revealButton);

    quizletCardsContainer.appendChild(quizCardElement);
  });
}

// Edit Quiz Card
const editQuizCard = (quizCard) => {
  const editQuestionInput = prompt("Edit Question", quizCard.question);
  const editAnswerInput = prompt("Edit Answer", quizCard.answer);

  if (editQuestionInput !== "" && editAnswerInput !== "") {
    quizCard.question = editQuestionInput;
    quizCard.answer = editAnswerInput;

    renderQuizCards();
  }
}

// Delete Quiz Card
const deleteQuizCard = (quizCard) => {
  quizCards = quizCards.filter((qCard) => {
    return qCard !== quizCard;
  });

  renderQuizCards();
}

// Reveal Quiz Card
const revealQuizCard = (quizCard) => {
  const userAnswer = prompt(quizCard.question);

  if (userAnswer.toLowerCase() === quizCard.answer.toLowerCase()) {
    quizCard.rank += 2;
  } else if (userAnswer !== "") {
    quizCard.rank += 1;
  }

  alert("Correct Answer: " + quizCard.answer);
  renderQuizCards();
}