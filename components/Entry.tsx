"use client";
import { useEffect, useState } from "react";
import { datalearn } from "../data/data";
import logoround from "../public/assest/genround.svg";
import logo from "../public/assest/genlogo.svg";
import Image from "next/image";

const Entrypage = () => {
  const allCards = [
    "/assest/onegen.jpg",
    "/assest/genten.jpg",
    "/assest/genthree.jpg",
    "/assest/genfour.jpg",
    "/assest/genfive.jpg",
    "/assest/gensix.jpg",
    "/assest/genseven.jpg",
    "/assest/geneight.jpg",

    "/assest/gennine.jpg",
    "/assest/gentwo.jpg",
    "/assest/geneleven.jpg",
    "/assest/gentwelve.jpg",
    "/assest/blazymod.png",
    "/assest/xailongmod.jpg",
    "/assest/gasmod.jpg",
    "/assest/kumomod.jpg",

    "/assest/9776mod.jpg",
    "/assest/meshguy.jpg",
    "/assest/fabsmacmod.jpg",
    "/assest/sunnymod.png",
    "/assest/jovarmod.jpg",
    "/assest/sanjay.jpg",
    "/assest/samurimod.jpg",
    "/assest/genlogo.jpg",
  ];

  const [cardsPerRound, setCardsPerRound] = useState(8);

  useEffect(() => {
    const updateCardsPerRound = () => {
      if (window.innerWidth < 768) {
        setCardsPerRound(6);
      } else {
        setCardsPerRound(8);
      }
    };

    updateCardsPerRound();
    window.addEventListener("resize", updateCardsPerRound);

    return () => window.removeEventListener("resize", updateCardsPerRound);
  }, []);

  const totalRounds = Math.ceil(allCards.length / cardsPerRound);

  const generateCards = (round: number) => {
    const start = round * cardsPerRound;
    const end = start + cardsPerRound;
    const selectedCards = allCards.slice(start, end);
    const deck = [...selectedCards, ...selectedCards];
    return deck.sort(() => Math.random() - 0.5);
  };

  const [round, setRound] = useState(0);
  const [cards, setCards] = useState<string[]>([]);
  const [flipCard, setflipCard] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [showDidYouKnow, setShowDidYouKnow] = useState(true);
  const [randomDescription, setRandomDescription] = useState<string | null>(
    null
  );
  const [moregame, setMoregame] = useState(false);
  const [showLearnMoreBox, setShowLearnMoreBox] = useState(false);

  const [timeLeft, setTimeLeft] = useState(60);
  const [timeUp, setTimeUp] = useState(false);

  const tickSound =
    typeof Audio !== "undefined" ? new Audio("/assest/tick.mp3") : null;

  useEffect(() => {
    setCards(generateCards(round));
  }, [cardsPerRound, round]);

  useEffect(() => {
    if (solved.length === cards.length) return;
    if (timeLeft <= 0) {
      setTimeUp(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, solved, cards.length]);

  useEffect(() => {
    const Mathchedcard = () => {
      const [first, second] = flipCard;
      if (cards[first] === cards[second]) {
        setSolved([...solved, ...flipCard]);
      }
      setflipCard([]);
    };

    if (flipCard.length === 2) {
      setTimeout(() => {
        Mathchedcard();
      }, 500);
    }
  }, [cards, flipCard, solved]);

  const handleLearnMore = () => {
    const randomIndex = Math.floor(Math.random() * datalearn.length);
    setRandomDescription(datalearn[randomIndex].description);
    setShowDidYouKnow(false);
    setShowLearnMoreBox(true);
  };

  const moregames = () => {
    setMoregame(true);
    setShowDidYouKnow(false);
  };

  const Clickedimage = (index: number) => {
    if (flipCard.includes(index) || flipCard.length < 2) {
      if (tickSound) {
        tickSound.currentTime = 0;
        tickSound.play().catch(() => {});
      }
      setflipCard([...flipCard, index]);
    }
  };

  const handleNextRound = () => {
    const nextRound = round + 1;
    if (nextRound < totalRounds) {
      setRound(nextRound);
      setCards(generateCards(nextRound));
      setflipCard([]);
      setSolved([]);
      setShowDidYouKnow(true);
      setTimeLeft(60);
      setTimeUp(false);
    } else {
      setRound(nextRound);

      setShowDidYouKnow(true);
      setflipCard([]);
      setSolved([]);
      setTimeUp(false);
      setTimeLeft(0);
    }
  };

  const allRoundsCompleted = round >= totalRounds;

  const gameOver =
    (cards.length > 0 && solved.length === cards.length) || allRoundsCompleted;

  return (
    <div className="text-center relative">
      {!timeUp && !gameOver && (
        <div className="fixed top-5 right-5 bg-transparent border-[#6e7777] hover:bg-[#fad8d133] border-2 text-white px-5 py-2  text-lg font-semibold shadow-md">
          Time Left: {timeLeft}s
        </div>
      )}

      {gameOver && (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-transform duration-300 delay-300 ease-in-out">
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
          {moregame ? (
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6 shadow-[#fad8d1e6] bg-[#1d1d1e] shadow-xs w-auto md:w-[350px] md:h-[340px]  p-6 ">
              <h2 className="text-3xl font-bold text-[#FFFFFFB2]">
                More Games
              </h2>
              <div className="flex gap-3 items-center w-full text-left">
                <h3 className="font-semibold text-lg text-white">
                  Gensyn puzzle :
                </h3>
                <a
                  href="https://gensyn-puzzle-game.vercel.app/"
                  className="text-green-600 underline"
                >
                  Game Link
                </a>
              </div>
              <div className="flex gap-3 items-center w-full text-left">
                <h3 className="font-semibold text-lg text-white">
                  Gensyn Quiz :
                </h3>
                <a
                  href="https://gensyn-quiz-zeta.vercel.app/"
                  className="text-green-600 underline"
                >
                  Quiz Link
                </a>
              </div>
              <button
                className="py-3 px-5 bg-transparent cursor-pointer text-lg font-bold border-[#6e7777] hover:bg-[#fad8d133] border-2 text-white   "
                onClick={() => window.location.reload()}
              >
                Restart Game
              </button>
            </div>
          ) : showLearnMoreBox ? (
            <div className="relative z-10 flex flex-col items-center space-y-9 shadow-[#fad8d1e6] bg-[#1d1d1e] shadow-xs w-auto md:w-[350px] md:h-[340px]  p-6 ">
              <h1 className="text-4xl font-bold text-[#FFFFFFB2]">
                Do You Know? 🤔
              </h1>
              <p className="text-left text-white font-medium ">
                {randomDescription}
              </p>
              <button
                className="py-3 px-5 bg-transparent cursor-pointer text-lg font-bold  border-[#6e7777] hover:bg-[#fad8d133] border-2 text-white   "
                onClick={() => window.location.reload()}
              >
                PLAY AGAIN
              </button>
            </div>
          ) : showDidYouKnow ? (
            <div className="relative z-10 flex flex-col items-center space-y-9 shadow-[#fad8d1e6] bg-[#1d1d1e] shadow-xs w-auto md:w-[350px] md:h-[340px]  p-6 ">
              <h2 className="text-green-400 font-semibold text-2xl">
                {allRoundsCompleted
                  ? "🎉 Congratulations! You completed all rounds!"
                  : "You won believer"}
              </h2>
              <div className="grid grid-cols-2 items-center gap-3">
                {!allRoundsCompleted ? (
                  <button
                    className="bg-transparent py-3 px-5 border-[#6e7777] hover:bg-[#fad8d133] text-white border-2 font-semibold cursor-pointer"
                    onClick={handleNextRound}
                  >
                    Next Round
                  </button>
                ) : (
                  <button
                    className="bg-transparent border-[#6e7777] hover:bg-[#fad8d133] border-2 text-white  p-3  font-semibold cursor-pointer"
                    onClick={() => window.location.reload()}
                  >
                    Restart Game
                  </button>
                )}

                <button
                  className="bg-transparent border-[#6e7777] hover:bg-[#fad8d133] border-2 text-white  py-3 px-5  font-semibold opacity-60 hover:opacity-100 cursor-pointer"
                  onClick={handleLearnMore}
                >
                  Learn More
                </button>
                <button
                  className="bg-transparent border-[#6e7777] hover:bg-[#fad8d133] border-2 text-white  p-3   font-semibold opacity-60 hover:opacity-100 cursor-pointer"
                  onClick={() => window.location.reload()}
                >
                  Restart Game
                </button>
                <button
                  className="bg-transparent border-[#6e7777] hover:bg-[#fad8d133] border-2 text-white  py-3 px-5  font-semibold opacity-60 hover:opacity-100 cursor-pointer"
                  onClick={moregames}
                >
                  More Games
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {timeUp && !gameOver && (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-transform duration-300 delay-300 ease-in-out">
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
          <div className="relative z-10 flex flex-col items-center justify-center space-y-6 shadow-[#fad8d1e6] bg-[#1d1d1e] shadow-xs w-auto md:w-[350px] md:h-[340px]  p-6 ">
            <h2 className="text-3xl font-bold text-red-400">⏰ Time’s Up!</h2>
            <p className="text-white text-lg font-medium">
              Try again. Game Over!
            </p>
            <button
              className="py-3 px-5 bg-transparent border-[#6e7777] hover:bg-[#fad8d133] border-2 cursor-pointer text-lg font-bold text-white   "
              onClick={() => window.location.reload()}
            >
              Restart Game
            </button>
          </div>
        </div>
      )}

      <h3 className="mb-5 font-bold text-xl md:text-3xl flex items-center gap-3">
        <a
          href="https://www.gensyn.ai/"
          className="flex items-baseline gap-2 md:gap-3"
        >
          <Image src={logoround} alt="name" className="w-[20px] md:w-auto" />
          <Image src={logo} alt="name" className="w-[90px] md:w-[120px]" />
        </a>{" "}
        Memory — Round {round + 1}
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 bg-[#fad8d1] p-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`w-[90px] h-[90px] md:h-28 md:w-28 text-4xl font-bold text-[#3E3170] cursor-pointer transform bg-gray-600 flex justify-center items-center transition-transform duration-300 ${
              flipCard.includes(index) || solved.includes(index)
                ? "rotate-180"
                : ""
            } `}
            onClick={() => Clickedimage(index)}
          >
            {flipCard.includes(index) || solved.includes(index) ? (
              <img src={card} alt="name" className="w-auto h-auto rotate-180" />
            ) : (
              "?"
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Entrypage;
