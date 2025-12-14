import React, { useRef, useState, useEffect } from "react";

const QA_KB = [
	{ q: ["hello", "hi", "hey"], a: "Hi! How can I help you today?" },
	{ q: ["help", "support"], a: "You can ask me about navigation, posts, connections, or profile settings." },
	{ q: ["feed", "home"], a: "Go to Feed via the sidebar to see recent posts and updates." },
	{ q: ["profile", "edit profile"], a: "Open Profile to view or edit your information and posts." },
	{ q: ["login", "sign in"], a: "Use the Login page. If you forgot your session, try reloading then login again." },
	{ q: ["connections", "friends"], a: "Use Connections to view and manage your network." },
	{ q: ["requests", "invites"], a: "Requests lists your incoming and outgoing connection requests." },
	{ q: ["post", "create post"], a: "Go to Posts to create a new post with text or media." },
];

function findAnswer(message) {
	const text = message.trim().toLowerCase();
	if (!text) return "Please type something, e.g., 'help' or 'profile'.";
	const rule = QA_KB.find((r) => r.q.some((k) => text.includes(k)));
	return rule?.a || "I'm not sure yet. Try keywords like 'help', 'profile', 'feed', 'requests'.";
}

const Bubble = ({ role, children }) => {
	const isUser = role === "user";
	return (
		<div className={`flex mb-2 ${isUser ? "justify-end" : "justify-start"}`}>
			<div
				className={`max-w-[80%] px-3 py-2 text-sm shadow-sm transition-colors duration-150 rounded-2xl border ${
					isUser
						? "bg-gradient-to-r from-blue-600 to-blue-500 text-white border-blue-500/60"
						: "bg-white text-gray-800 border-gray-200"
				}`}
			>
				{children}
			</div>
		</div>
	);
};

const AiChatbot = () => {
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([
		{ id: 1, role: "assistant", content: "Hi! I'm your helper. Ask me about feed, profile, requests, or posts." },
	]);
	const nextId = useRef(2);
	const scrollRef = useRef(null);
	const inputRef = useRef(null);

	useEffect(() => {
		if (open && inputRef.current) {
			inputRef.current.focus();
		}
	}, [open]);

	const handleSend = () => {
		const trimmed = input.trim();
		if (!trimmed) return;
		const userMsg = { id: nextId.current++, role: "user", content: trimmed };
		const reply = findAnswer(trimmed);
		const botMsg = { id: nextId.current++, role: "assistant", content: reply };
		setMessages((m) => [...m, userMsg, botMsg]);
		setInput("");

		requestAnimationFrame(() => {
			if (scrollRef.current) {
				scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
			}
		});
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<>
			
			<button
				onClick={() => setOpen((v) => !v)}
				className="fixed bottom-5 right-5 z-40 btn btn-primary rounded-full shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
				title={open ? "Close assistant" : "Open assistant"}
				aria-label={open ? "Close assistant" : "Open assistant"}
			>
				{open ? "×" : "AI Chatbot"}
			</button>

			
			{open && (
				<div className="fixed bottom-20 right-5 z-40 w-80 sm:w-96 rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden bg-white/80 backdrop-blur-sm">
					<div className="px-4 py-3 bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">AI</div>
							<div className="font-semibold text-gray-800">Assistant</div>
						</div>
						<button className="text-sm text-gray-500 hover:text-gray-700" onClick={() => setOpen(false)} aria-label="Close assistant">Close</button>
					</div>
					<div ref={scrollRef} className="p-3 h-72 overflow-y-auto bg-gray-50/60">
						{messages.map((m) => (
							<Bubble key={m.id} role={m.role}>{m.content}</Bubble>
						))}
					</div>
					<div className="p-3 bg-white border-t border-gray-200">
						<label htmlFor="ai-chat-input" className="sr-only">Type your message</label>
						<div className="flex gap-2">
							<textarea
								id="ai-chat-input"
								ref={inputRef}
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={handleKeyDown}
								rows={1}
								placeholder="Ask a question..."
								className="textarea textarea-bordered w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/40"
							/>
							<button className="btn btn-primary shadow-sm hover:shadow-md" onClick={handleSend} aria-label="Send message">Send</button>
						</div>
						<div className="mt-2 text-[11px] text-gray-500">Tip: try "help", "profile", "feed", "requests", or "post"</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AiChatbot;


