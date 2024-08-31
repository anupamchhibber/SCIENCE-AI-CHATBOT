import { Chatbot } from "@/components/component/chatbot";

export default function Home() {
  return (
    <main 
    className="flex items-center justify-center h-screen w-full bg-gray-500"
    style={{
      backgroundImage: "url('/background.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",}}
    >
      <Chatbot />
    </main>
  );
}
