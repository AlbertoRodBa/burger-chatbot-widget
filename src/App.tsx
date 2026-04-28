import { useState } from "react";

type Message = {
sender:"bot" | "user";
text:string;
};

function App(){

const [messages,setMessages] = useState<Message[]>([
{
sender:"bot",
text:"Hi! 👋 Bienvenido a North Coast Burgers 🌊🍔 ¿En qué te podemos ayudar?"
}
]);

const botReplies: Record<string,string> = {
Menú:"Tenemos hamburguesas desde $6.990 🍔",
Promociones:"Hoy hay 2x1 en cheeseburgers 🔥",
Horario:"Abrimos de 12:00 a 23:00",
Ubicación:"Estamos en La Serena, calle Las Brisas #4444 📍"
};

const handleOption = (option:string) => {
setMessages(prev=>[
...prev,
{sender:"user",text:option},
{sender:"bot",text:botReplies[option]}
])
};

return (
<main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

<div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">

<h1 className="text-3xl font-bold mb-6 text-center">
North Coast Burgers 🍔
</h1>

<section className="bg-gray-50 rounded-2xl p-4 min-h-[420px] space-y-4 mb-6 overflow-y-auto">

{messages.map((msg,index)=>(
<div
key={index}
className={
msg.sender === "user"
? "flex justify-end"
: "flex justify-start"
}
>

<div
className={
msg.sender === "user"
? "bg-black text-white px-4 py-3 rounded-2xl max-w-[80%]"
: "bg-white shadow px-4 py-3 rounded-2xl max-w-[80%]"
}
>
{msg.text}
</div>

</div>
))}

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

</main>
)

}

export default App;