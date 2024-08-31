"use client";

import { useChat } from "ai/react";
import { SetStateAction, useState } from "react";
import Markdown from "react-markdown";
import { SendIcon, SquareIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, setMessages, setInput } = useChat({
    api: "api/chat",
  });

  const predefinedQuestions = [
    "What is the speed of light?",
    "Tell me about black holes.",
    "How is Pluto not a planet?",
    "Explain the theory of relativity.",
  ];

  const [showPredefined, setShowPredefined] = useState(true);

  const handlePredefinedClick = (question: SetStateAction<string>) => {
    setShowPredefined(false);
    setInput(question)
  };

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-[672px] mx-auto bg-background rounded-lg shadow-lg">
      <div className="flex-1 overflow-auto p-6">
        {showPredefined ? (
          <><div className="flex flex-col justify-center items-center mb-20">
          <Image src="/ai.png" alt="AI" width={80} height={80} />
          <p className="text-lg text-muted-foreground mt-4 text-center">
            Welcome to the Science Facts Chatbot! Ask me anything related to Science and Technology.
          </p>
        </div>
          <div className="flex flex-col gap-4">
            {predefinedQuestions.map((question, index) => (
              <Button
                type="submit"
                key={index}
                onClick={() => handlePredefinedClick(question)}
                className="bg-muted rounded-lg p-3 text-left text-black hover:text-white"
              >
                {question}
              </Button>
            ))}
          </div></>
        ) : (
          <>
            {messages.length === 0 && (
              <div className="flex flex-col justify-center items-center h-full">
                <Image src="/ai.png" alt="AI" width={80} height={80} />
                <p className="text-lg text-muted-foreground mt-4 text-center">
                  Welcome to the Science Facts Chatbot! Ask me anything related to Science and Technology.
                </p>
              </div>
            )}
            <div className="flex flex-col gap-4">
              {messages.map((message) =>
                message.role === "assistant" ? (
                  <div key={message.id} className="flex items-start gap-3">
                    <div className="p-2 border border-gray-700 rounded-full">
                      <Image src="/ai.png" alt="AI" width={20} height={20} />
                    </div>
                    <div className="bg-muted rounded-lg p-3 max-w-[70%]">
                      <Markdown className="text-sm text-muted-foreground">
                        {message.content}
                      </Markdown>
                    </div>
                  </div>
                ) : (
                  <div key={message.id} className="flex justify-end">
                    <div className="bg-primary rounded-lg p-3 max-w-[70%]">
                      <p className="text-sm text-primary-foreground">
                        {message.content}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-muted/50 px-4 py-3 flex items-center gap-2"
      >
        <div className="relative flex-1">
          <Textarea
            placeholder="Type your message..."
            className="rounded-lg pr-12 min-h-[64px]"
            rows={1}
            value={input}
            onChange={handleInputChange}
          />

          {!isLoading ? (
            <Button
              type="submit"
              size="icon"
              disabled={!input || isLoading}
              className="absolute bottom-3 right-3 rounded-full"
            >
              <SendIcon className="w-5 h-5" />
              <span className="sr-only">Send</span>
            </Button>
          ) : (
            <Button
              type="button"
              size="icon"
              disabled={!isLoading}
              onClick={stop}
              className="absolute bottom-3 right-3 rounded-full"
            >
              <SquareIcon className="w-5 h-5" fill="white" />
              <span className="sr-only">Send</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
