import { useState } from "react";
import Questions from "../../questions";

export default function Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const prizes = [
    "$50,000",
    "$25,000",
    "$10,000",
    "$5,000",
    "$1,000",
    "$500",
    "$100",
  ];
  const question = Questions[activeQuestion];
  const currentPrize = prizes[Questions.length - activeQuestion - 1];

  function chooseAnswer(answer, index) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answer);
    setIsCorrect(index === 0);
    if (index !== 0) setGameOver(true);
  }

  function advanceQuestion() {
    if (activeQuestion === Questions.length - 1) {
      setWon(true);
      setGameOver(true);
      return;
    }
    setActiveQuestion((current) => current + 1);
    setSelectedAnswer(null);
    setIsCorrect(null);
  }

  function restartGame() {
    setActiveQuestion(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setGameOver(false);
    setWon(false);
  }

  return (
    <main className="game-shell mx-auto grid w-full max-w-6xl gap-5 px-4 pb-10 pt-2 md:grid-cols-[minmax(0,1fr)_19rem] md:px-8">
      <section
        className={`stage-panel flex min-h-[34rem] flex-col justify-between overflow-hidden rounded-lg border border-cyan-300/50 p-5 shadow-[0_0_45px_rgba(0,210,255,0.12)] sm:p-8 ${won ? "stage-panel-won" : ""}`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="brand-mark" aria-hidden="true">
              <span>Q</span>
            </div>
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-cyan-200">
                The React challenge
              </p>
              <h1 className="font-display text-xl font-black uppercase leading-none text-white sm:text-2xl">
                Quiz Millionaire
              </h1>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-slate-400">
              Question
            </p>
            <p className="font-display text-lg font-bold text-white">
              {String(activeQuestion + 1).padStart(2, "0")}{" "}
              <span className="text-slate-500">
                / {String(Questions.length).padStart(2, "0")}
              </span>
            </p>
          </div>
        </div>

        {!won && (
          <div className="mx-auto my-10 flex w-full max-w-2xl flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-amber-300/70 bg-amber-300/10 font-display text-2xl font-black text-amber-200 shadow-[0_0_28px_rgba(255,194,61,0.2)]">
              {String(activeQuestion + 1).padStart(2, "0")}
            </div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
              For {currentPrize}
            </p>
            <h2 className="font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
              {question.text}
            </h2>
            <div className="mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-400 to-amber-300" />
          </div>
        )}

        {gameOver ? (
          won ? (
            <div className="win-celebration mx-auto my-auto w-full max-w-xl">
              <div className="fireworks" aria-hidden="true">
                <span className="firework-burst firework-burst-one" />
                <span className="firework-burst firework-burst-two" />
                <span className="firework-burst firework-burst-three" />
              </div>
              <article
                className="prize-cheque"
                aria-label="Prize cheque for fifty thousand dollars"
              >
                <div className="cheque-heading">
                  <div>
                    <p className="cheque-bank-name">QUIZ MILLIONAIRE BANK</p>
                    <p className="cheque-bank-caption">Grand prize award</p>
                  </div>
                  <span className="cheque-seal" aria-hidden="true">
                    Q
                  </span>
                </div>
                <p className="cheque-number">CHEQUE NO. 000050</p>
                <p className="cheque-payee-label">Pay to the order of</p>
                <p className="cheque-payee">QUIZ CHAMPION</p>
                <div className="cheque-amount-row">
                  <span className="cheque-amount-words">
                    Fifty thousand dollars and 00/100
                  </span>
                  <strong className="cheque-amount">$50,000.00</strong>
                </div>
                <div className="cheque-footer">
                  <span className="cheque-memo">MEMO: PERFECT RUN</span>
                  <span className="cheque-signature">Quizmaster</span>
                </div>
              </article>
              <p className="win-announcement" role="status" aria-live="polite">
                You won <strong>$50,000</strong>! A perfect run.
              </p>
              <button
                type="button"
                onClick={restartGame}
                className="mx-auto mt-4 block rounded-md border border-cyan-300 bg-cyan-300 px-6 py-3 text-sm font-black uppercase tracking-wider text-slate-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                Play again
              </button>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-xl rounded-lg border border-cyan-300/40 bg-slate-950/75 p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">
                Game over
              </p>
              <h3 className="mt-2 font-display text-3xl font-black text-white">
                Thanks for playing
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Your best prize was{" "}
                {activeQuestion === 0
                  ? "$0"
                  : prizes[Questions.length - activeQuestion]}
                .
              </p>
              <button
                type="button"
                onClick={restartGame}
                className="mt-6 rounded-md border border-cyan-300 bg-cyan-300 px-6 py-3 text-sm font-black uppercase tracking-wider text-slate-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                Play again
              </button>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {question.answers.map((answer, index) => {
              const isSelected = selectedAnswer === answer;
              const answerStyle = isSelected
                ? isCorrect
                  ? "answer-correct"
                  : "answer-wrong"
                : "";
              return (
                <button
                  key={answer}
                  type="button"
                  disabled={selectedAnswer !== null}
                  onClick={() => chooseAnswer(answer, index)}
                  className={`answer-option group flex min-h-[4.25rem] items-center gap-3 rounded-md border border-cyan-400/60 bg-slate-950/75 px-4 py-3 text-left text-sm font-semibold text-slate-100 transition hover:border-amber-300 hover:bg-cyan-950/80 focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:cursor-default sm:px-5 ${answerStyle}`}
                >
                  <span className="font-display text-base font-black text-amber-300">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{answer}</span>
                </button>
              );
            })}
            {selectedAnswer !== null && (
              <div className="flex items-center justify-between gap-4 pt-2 sm:col-span-2">
                <p
                  className={`text-sm font-bold ${isCorrect ? "text-emerald-300" : "text-rose-300"}`}
                  aria-live="polite"
                >
                  {isCorrect
                    ? "Correct answer!"
                    : "That is not the right answer."}
                </p>
                {isCorrect && (
                  <button
                    type="button"
                    onClick={advanceQuestion}
                    className="rounded-md bg-amber-300 px-5 py-3 text-sm font-black uppercase tracking-wider text-slate-950 transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    {activeQuestion === Questions.length - 1
                      ? "Finish game"
                      : "Next question"}{" "}
                    <span aria-hidden="true">→</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      <aside
        className="ladder-panel rounded-lg border border-cyan-400/60 p-4 sm:p-5"
        aria-label="Prize ladder"
      >
        <div className="mb-4 flex items-center justify-between border-b border-cyan-200/20 pb-3">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-cyan-200">
              Prize ladder
            </p>
            <h2 className="font-display text-lg font-black uppercase text-white">
              Your climb
            </h2>
          </div>
          <span className="text-xl" aria-hidden="true">
            ✦
          </span>
        </div>
        <ol className="flex flex-col gap-1.5">
          {prizes.map((prize, index) => {
            const questionNumber = Questions.length - index;
            const isActive = questionNumber === activeQuestion + 1 && !gameOver;
            const isPassed = questionNumber <= activeQuestion;
            return (
              <li
                key={prize}
                className={`flex items-center justify-between rounded px-3 py-1.5 font-display text-sm font-bold ${isActive ? "bg-amber-300 text-slate-950 shadow-[0_0_18px_rgba(255,194,61,0.28)]" : isPassed ? "text-cyan-200" : "text-slate-300"}`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-5 text-xs opacity-70">
                    {String(questionNumber).padStart(2, "0")}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                </span>
                <span>{prize}</span>
              </li>
            );
          })}
        </ol>
        <div className="mt-5 rounded border border-cyan-100/15 bg-slate-950/50 px-3 py-3">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-400">
            Current prize
          </p>
          <p className="mt-1 font-display text-2xl font-black text-amber-200">
            {gameOver && !won && !isCorrect
              ? activeQuestion === 0
                ? "$0"
                : prizes[Questions.length - activeQuestion]
              : won
                ? prizes[0]
                : currentPrize}
          </p>
        </div>
      </aside>
    </main>
  );
}
