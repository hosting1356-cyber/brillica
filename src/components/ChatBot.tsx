import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { collection, addDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY is missing. Chat might not work.");
      return null;
    }
    ai = new GoogleGenAI({ apiKey: key });
  }
  return ai;
};

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hello! How can I help you with Brillica Services today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initConversation = async () => {
    if (conversationId) return conversationId;
    
    const newId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    try {
      await setDoc(doc(db, 'conversations', newId), {
        createdAt: serverTimestamp(),
        status: 'active'
      });
      setConversationId(newId);
      return newId;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `conversations/${newId}`);
      return null;
    }
  };

  const saveMessage = async (convId: string, role: Message['role'], text: string) => {
    try {
      await addDoc(collection(db, 'conversations', convId, 'messages'), {
        role,
        text,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `conversations/${convId}/messages`);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const currentText = input;
    const userMessage: Message = { role: 'user', text: currentText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const convId = await initConversation();
    if (convId) {
      await saveMessage(convId, 'user', currentText);
    }

    try {
      const gemini = getAI();
      if (!gemini) {
        setMessages(prev => [...prev, { role: 'bot', text: "Chat is currently unavailable. Please check back later." }]);
        setIsLoading(false);
        return;
      }

      const response = await gemini.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            parts: [
              { text: `You are a helpful assistant for Brillica Services, an IT training provider. 
              We offer courses in Data Science, Machine Learning, Data Analytics, Python, Cloud Computing, etc. 
              Our office is in Dehradun. 
              Answer questions about our services in a friendly and professional manner.
              User question: ${currentText}` }
            ]
          }
        ],
      });

      const botText = response.text || "I'm sorry, I couldn't process that. Please contact our support.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
      
      if (convId) {
        await saveMessage(convId, 'bot', botText);
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg = "Sorry, I'm having trouble connecting. Please try again later.";
      setMessages(prev => [...prev, { role: 'bot', text: errorMsg }]);
      if (convId) {
        await saveMessage(convId, 'bot', errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl border border-indigo-100 w-[350px] sm:w-[400px] overflow-hidden mb-4 overflow-y-auto max-h-[600px] flex flex-col"
          >
            {/* Header */}
            <div className="bg-indigo-900 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Brillica AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs text-indigo-200">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto h-[400px] space-y-4 bg-slate-50">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-indigo-100 text-indigo-900'}`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm font-medium leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 shadow-sm border border-indigo-50 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-indigo-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-2 items-center">
                    <Loader2 size={16} className="animate-spin text-indigo-600" />
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">AI is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask something..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all font-medium"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-indigo-900 text-white rounded-2xl flex items-center justify-center shadow-2xl relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-slate-50 rounded-full" />
        )}
      </motion.button>
    </div>
  );
};
