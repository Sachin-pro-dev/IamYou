"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizontal, Bot, User, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
  error?: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      // content: "Hi! I'm you. I'll learn from our conversations and try to understand your style. Feel free to chat with me about anything - I'm here to support you and help you make good decisions. What's on your mind?"

      content:
        "Hey, I'm you. Ready to level up alongside you! 💥 Whether you're grinding through challenges or cruising on a high, I’ll adapt to your energy and vibe. I’m like your personal guide, here to help you get stronger, faster, and smarter. Got a tough situation to conquer? I’ll be your support, just like a trusted teammate, whether it’s in a game or real life. Whether you’re feeling pumped, down, or just need a little extra push, I’m right here. If you're frustrated or stuck in the grind, I’ll help you find the path forward. And if you’re celebrating a victory, we’ll go all out with the hype! 🏆 Let’s go, together we’ll smash it! ",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      if (!data.response) {
        throw new Error("Empty response received");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          error: true,
        },
      ]);
    } finally {
      setIsLoading(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl h-screen p-4 ">
      <div className="flex items-center justify-center mb-4 p-4">
        <Bot className="w-10 h-10 text-primary mr-2 " />
        <h1 className="text-6xl font-bold text-primary p-0 m-0 font-mono">
          Your Doppelganger
        </h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <ScrollArea className="flex-1 p-4 m-0 rounded-lg bg-secondary/50 mb-4 shadow-lg shadow-cyan-500/50">
        <div className="space-y-4 ">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.role === "assistant"
                  ? message.error
                    ? "bg-destructive/10"
                    : "bg-secondary"
                  : "bg-accent"
              } p-4 rounded-lg shadow-lg`}
            >
              {message.role === "assistant" ? (
                <Bot className="w-6 h-6 text-primary mt-1" />
              ) : (
                <User className="w-6 h-6 text-primary mt-1" />
              )}
              <div className="flex-1 message-content">
                <ReactMarkdown className="markdown">
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 bg-secondary p-4 rounded-lg">
              <Bot className="w-6 h-6 text-primary mt-1" />
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Chat with me about anything..."
          className="flex-1 min-h-[50px] max-h-[300px] bg-secondary"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="h-[44px]"
        >
          <SendHorizontal className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
}
// "use client";

// import { useState, useRef, useEffect } from "react";
// import { SendHorizontal, Bot, User, Loader2, AlertCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import ReactMarkdown from "react-markdown";

// interface Message {
//   role: "user" | "assistant";
//   content: string;
//   error?: boolean;
// }

// export default function Chat() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: "assistant",
//       content:
//         "Hey, I'm you. Ready to level up alongside you! 💥 Whether you're grinding through challenges or cruising on a high, I’ll adapt to your energy and vibe. Let’s go, together we’ll smash it! 🏆",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   }, [input]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const userMessage = input.trim();
//     setInput("");
//     setError(null);
//     setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userMessage }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || "Failed to get response");
//       if (!data.response) throw new Error("Empty response received");

//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: data.response },
//       ]);
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "An error occurred";
//       setError(errorMessage);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "Sorry, I encountered an error. Please try again.",
//           error: true,
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//       if (textareaRef.current) textareaRef.current.style.height = "auto";
//     }
//   };

//   return (
//     <div className="flex flex-col w-full max-w-4xl h-screen p-4">
//       <div className="flex items-center justify-center mb-4 p-4">
//         <Bot className="w-8 h-8 text-primary mr-2" />
//         <h1 className="text-2xl font-bold text-primary">Your Doppelganger</h1>
//       </div>

//       {error && (
//         <Alert variant="destructive" className="mb-4">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <ScrollArea className="flex-1 p-4 rounded-lg bg-secondary/50 mb-4 shadow-lg">
//         <div className="space-y-4">
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`flex items-start gap-3 p-4 rounded-lg shadow-lg ${
//                 message.role === "assistant"
//                   ? message.error
//                     ? "bg-destructive/10"
//                     : "bg-secondary"
//                   : "bg-accent"
//               }`}
//             >
//               {message.role === "assistant" ? (
//                 <Bot className="w-6 h-6 text-primary mt-1" />
//               ) : (
//                 <User className="w-6 h-6 text-primary mt-1" />
//               )}
//               <div className="flex-1">
//                 <ReactMarkdown>{message.content}</ReactMarkdown>
//               </div>
//             </div>
//           ))}
//           {isLoading && (
//             <div className="flex items-start gap-3 bg-secondary p-4 rounded-lg">
//               <Bot className="w-6 h-6 text-primary mt-1" />
//               <Loader2 className="w-6 h-6 animate-spin text-primary" />
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
//       </ScrollArea>

//       <form onSubmit={handleSubmit} className="flex gap-2">
//         <Textarea
//           ref={textareaRef}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Chat with me about anything..."
//           className="flex-1 min-h-[50px] max-h-[300px] bg-secondary"
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               handleSubmit(e);
//             }
//           }}
//         />
//         <Button
//           type="submit"
//           disabled={isLoading || !input.trim()}
//           className="h-[44px]"
//         >
//           <SendHorizontal className="w-5 h-5" />
//         </Button>
//       </form>
//     </div>
//   );
// }
