"use client";
import { sendTextToOpenAi } from "@/utils/SendTextToOpenAi";
import React, { useState, FormEvent } from "react";


export const TextToSpeech = () => {
    const [userText, setUserText] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
	const voices = synth?.getVoices();
    
    

	const seletedVoice = voices?.find((voice) => voice.name === "Microsoft Mitchell Online (Natural) - English (New Zealand)"); // Other voice that sounds good Karen, Tessa, Trinoids

	const speak = (textToSpeak: string) => {
		const utterance = new SpeechSynthesisUtterance(textToSpeak);
		utterance.voice = seletedVoice!;
        utterance.rate = 0.3;
        synth?.speak(utterance);
        setIsLoading(true);
        utterance.onend = (()=> {
            setIsLoading(false);
        })
    }

    const handleUserText = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const message = await sendTextToOpenAi(userText)
            speak(message);
        } catch (error) {
            let message = "";
            if(error instanceof Error) message = error.message;
            console.log(message);
        } finally {
            setIsLoading(false);
            setUserText("");
        }
    }
  return (
    <div className="relative top-0 z-50">
      <form 
     onSubmit={handleUserText} 
      className="absolute top-[800px] left-[30px] space-x-2 pt-2">
        <input
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
          className="bg-transparent w-[510px] border border-[#b00c3f]/80 outline-none rounded-lg placeholder:text-[#b00c3f] p-2 text-[#b00c3f]"
          type="text"
          placeholder="Unleash your queries, mortal..."
        />
        <button
         disabled = {isLoading}
         className="text-[#b00c3f] p-2 border border-[#b00c3f] rounded-lg disabled:text-blue-100 disabled:cursor-not-allowed disabled:bg-gray-500 hover:scale-110 hover:text-black hover:bg-[#b00c3f] duration-300 transition-all ">
          {isLoading ? "Thinking...." : "Ask"}
        </button>
      </form>
    </div>
  );
};
