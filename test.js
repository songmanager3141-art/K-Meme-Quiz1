const testList = [
  { answer: "무야호", imageUrl: "assets/test1.jpeg" },
  { answer: "아모르파티", imageUrl: "assets/test2.jpeg" },
  { answer: "던질까말까", imageUrl: "assets/test3.jpeg" },
  { answer: "깡", imageUrl: "assets/test4.jpeg" },
  { answer: "4달라", imageUrl: "assets/test5.jpeg" },
  { answer: "호롤롤로", imageUrl: "assets/test6.jpeg" },
  { answer: "아안돼", imageUrl: "assets/test7.jpeg" },
  { answer: "ppap", imageUrl: "assets/test8.jpeg" },
  { answer: "마포대교는무너졌냐", imageUrl: "assets/test9.jpeg" },
  { answer: "이제는더이상물러날곳이없다", imageUrl: "assets/test10.jpeg" }
];

let currentIndex = 0;
let userAnswers = [];

const questionNumber = document.getElementById("questionNumber");
const questionImage = document.getElementById("questionImage");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const resultArea = document.getElementById("resultArea");
const quizCard = document.getElementById("quizCard");

// 문제 로드
function loadQuestion() {
  const current = testList[currentIndex];

  questionNumber.textContent = `문제 ${currentIndex + 1}`;
  questionImage.src = current.imageUrl;
  questionImage.loading = "lazy"; // SEO + 성능
  answerInput.value = "";
}

// Enter 제출
answerInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") submitBtn.click();
});

// 제출
submitBtn.addEventListener("click", () => {
  const userAnswer = answerInput.value.trim();
  if (!userAnswer) return;

  userAnswers.push(userAnswer);
  currentIndex++;

  if (currentIndex < testList.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// 결과
function showResult() {
  quizCard.classList.add("d-none");
  resultArea.classList.remove("d-none");

  let correctCount = 0;
  let html = `<h2 class="text-center mb-4">결과</h2>`;

  testList.forEach((item, i) => {
    const user = userAnswers[i].replace(/\s/g, "").toLowerCase();
    const correct = item.answer.replace(/\s/g, "").toLowerCase();
    const isCorrect = user === correct;

    if (isCorrect) correctCount++;

    html += `
      <article class="card mb-3 p-3">
        <h3 class="h6">문제 ${i + 1}</h3>
        <p>정답: ${item.answer}</p>
        <p>내 답: ${userAnswers[i]}</p>
        <p class="${isCorrect ? "text-success" : "text-danger"}">
          ${isCorrect ? "정답" : "오답"}
        </p>
      </article>
    `;
  });

  html = `
    <h2 class="text-center mb-4">
      최종 점수: ${correctCount} / ${testList.length}
    </h2>
  ` + html;

  resultArea.innerHTML = html;

  // 체류시간 증가 유도 (SEO 중요)
  window.scrollTo({ top: 0, behavior: "smooth" });
}

loadQuestion();