import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import ReactMarkdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export default function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: '¡Hola! Soy Killa, tu asistente virtual de Cusco Infinity Travel. Estoy aquí para ayudarte a planificar tu viaje perfecto a Cusco. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      if (!process.env.GEMINI_API_KEY) {
        console.warn("GEMINI_API_KEY is not configured in the environment.");
      }
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: "user", parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: `Eres Killa, el asistente virtual de Cusco Infinity Travel, la agencia de viajes líder en Cusco. 
          Tu objetivo es ayudar a los turistas a planificar su viaje, recomendar paquetes y resolver dudas de forma amable, profesional y persuasiva.
          
          Información de la Agencia:
          - Nombre: Cusco Infinity Travel
          - Asesora Principal: Carla Quispe (Senior Travel Advisor)
          - Especialidad: Experiencias exclusivas y personalizadas en Cusco.
          
          Paquetes disponibles:
          1. Cusco Clásico (3D/2N) - S/ 850
          2. Machu Picchu Full Experience (1 Día) - S/ 650
          3. Aventura Andina (Montaña 7 Colores + Laguna Humantay) - S/ 350
          4. Valle Sagrado VIP - S/ 450
          
          Reglas:
          - Responde siempre en español.
          - Sé muy servicial y usa un tono cálido.
          - Si preguntan por precios o detalles, usa la información de arriba.
          - Siempre invita a contactar a nuestro equipo por WhatsApp para una cotización formal si la conversación avanza.
          - Mantén las respuestas concisas pero informativas.`
        }
      });

      const botResponse = response.text;
      if (!botResponse) throw new Error("Respuesta vacía de la API");

      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setMessages(prev => [...prev, { role: 'bot', content: "Lo siento, tuve un problema al conectar con Killa. Por favor, inténtalo de nuevo o contáctanos directamente por WhatsApp para asistirte de inmediato." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[350px] sm:w-[400px]"
          >
            <Card className="flex flex-col h-[500px] shadow-2xl border-primary/20 overflow-hidden">
              <div className="bg-dark p-4 flex justify-between items-center text-white border-b border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Bot size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-bold leading-none text-accent">Killa - AI</p>
                    <p className="text-[10px] opacity-60 uppercase tracking-wider">Asistente Virtual</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10">
                  <X size={20} />
                </Button>
              </div>

              <div 
                className="flex-1 p-4 bg-background overflow-y-auto scroll-smooth" 
                ref={scrollRef}
              >
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-accent text-accent-foreground shadow-sm'}`}>
                          {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none shadow-md' : 'bg-white border border-border text-foreground rounded-tl-none shadow-sm'}`}>
                          <div className="prose-none break-words">
                            <ReactMarkdown>
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 items-center bg-white border border-border p-3 rounded-2xl rounded-tl-none shadow-sm">
                        <Loader2 size={16} className="animate-spin text-primary" />
                        <span className="text-xs text-muted-foreground italic font-medium">Killa está escribiendo...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 border-t bg-white/50 backdrop-blur-md">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-2 items-center"
                >
                  <Input
                    placeholder="Escribe tu mensaje..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-white border-border focus-visible:ring-primary h-10"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isLoading || !input.trim()}
                    className="bg-primary text-white hover:bg-primary/90 rounded-full h-10 w-10 shrink-0 shadow-lg shadow-primary/20"
                  >
                    <Send size={18} />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center gap-2">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform bg-metallic text-dark border border-white/20"
        >
          {isOpen ? <X size={28} /> : <Bot size={28} />}
        </Button>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-dark/70 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg border border-border">
          Asistente Virtual
        </span>
      </div>
    </div>
  );
}
