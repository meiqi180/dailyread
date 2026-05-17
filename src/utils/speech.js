export function speak(text, lang = "en-US") {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    return Promise.reject(new Error("Speech synthesis not supported"));
  }

  return new Promise((resolve) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}
