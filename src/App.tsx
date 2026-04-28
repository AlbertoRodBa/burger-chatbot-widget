import { useState, useEffect, useRef } from "react";

type Message = {
sender:"bot" | "user";
text:string;
};

function App(){
const [isOpen, setIsOpen] = useState(false);

const [messages,setMessages] = useState<Message[]>([
{
sender:"bot",
text:"Hi! 👋 Bienvenido a North Coast Burgers 🌊🍔 ¿En qué te podemos ayudar?"
}
]);

const chatEndRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
chatEndRef.current?.scrollIntoView({
behavior:"smooth"
});
}, [messages]);



const botReplies: Record<string, string> = {
  "Menú": "Tenemos hamburguesas desde $6.990 🍔",
  "Promociones": "Hoy hay 2x1 en cheeseburgers 🔥",
  "Horario": "Abrimos de 12:00 a 23:00",
  "Ubicación": "Estamos en La Serena, calle Las Brisas #4444 📍",
  // WhatsApp:
  "Pedir por WhatsApp": "¡Genial! Haz clic aquí para enviarnos tu pedido por WhatsApp y coordinar el pago: https://wa.me/56912345678"
};

const handleOption = (option:string) => {
setMessages(prev=>[
...prev,
{sender:"user",text:option},
{sender:"bot",text:botReplies[option]}
])
};

return (
<main>

<button
onClick={() => setIsOpen(!isOpen)}
className="
fixed
bottom-6
right-6
w-16
h-16
rounded-full
bg-black
text-white
text-2xl
shadow-xl
hover:scale-110
transition
"
>
🍔
</button>

{isOpen && (
<div className="
fixed
bottom-24
right-6
w-[360px]
max-w-[90vw]
bg-white
rounded-3xl
shadow-2xl
p-5
">

<h2 className="text-xl font-bold mb-4">
North Coast Burgers
</h2>

<section className="
bg-gray-50
rounded-2xl
p-4
h-[320px]
space-y-4
mb-4
overflow-y-auto
">

{messages.map((msg,index)=>(
<div
key={index}
className={
msg.sender==="user"
? "flex justify-end"
: "flex justify-start"
}
>
<div
className={
msg.sender==="user"
? "bg-black text-white px-4 py-3 rounded-2xl max-w-[80%]"
: "bg-white shadow px-4 py-3 rounded-2xl max-w-[80%]"
}
>
{msg.text}
</div>

</div>
))}
<div ref={chatEndRef} />
</section>

<nav className="grid grid-cols-2 gap-3">
{Object.keys(botReplies).map(option=>(
<button
key={option}
onClick={()=>handleOption(option)}
className="
rounded-xl
bg-black
text-white
py-3
font-medium
hover:scale-105
transition
"
>
{option}
</button>
))}
</nav>

</div>
)}

</main>
)

}

export default App;