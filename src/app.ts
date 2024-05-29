import OpenAI from "openai";
import readlineSync from "readline-sync";
import { PaymentQuota, PaymentQuotaStatus, ExampleProfiles, StudentProfile } from "../objects/example.profiles";
import { Prompt_Completion } from "../objects/example.prompt"
import {ExampleAdvisors} from "../objects/example.advisors";
import { config } from "dotenv";

config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//Selecciona un nombre de la lista de asesores academicos al azar.
function getRandomAdvisorName(): string{
  return ExampleAdvisors[Math.floor(Math.random()*ExampleAdvisors.length)];
}

/**
 * Construye el prompt final con las claves y valores dados.
 *
 * Cada clave se denota como `{clave}` en el prompt y se reemplaza por el valor correspondiente.
 *
 * @param {string} prompt El prompt original con las claves provistas.
 * @param {Record<string, string>} keys Las claves y valores a reemplazar en el prompt.
 *
 * @returns {string} El prompt final con las claves reemplazadas por los valores.
 */
function buildPrompt(prompt: string, keys: Record<string, string>): string {
  return prompt.replace(/{(.*?)}/g, (_, key) => keys[key] || "");
}

/**
 * Construye el valor de la clave `student_payments` para el prompt final.
 *
 * Si la cuota está completada, no se agrega la fecha de vencimiento.
 *
 * @param {Array<PaymentQuota>} payments Las cuotas del alumno.
 *
 * @returns {string} El valor de la clave `student_payments` para el prompt final.
 */
function buildStudentPayments(payments: Array<PaymentQuota>): string {
  return payments
    .map(
      (payment) =>
        `- Cuota ${payment.sequence}: (Monto: ${payment.amount}) (Estado: ${payment.status
        }) ${payment.status !== PaymentQuotaStatus.COMPLETE
          ? `(Vencimiento: ${payment.due_date})`
          : ""
        }`
    )
    .join("\n");
}

/**
 * Busca el perfil de estudiante por número de teléfono.
 *
 * @param {string} phone El número de teléfono del estudiante.
 * @returns {StudentProfile | undefined} El perfil del estudiante si se encuentra, o undefined si no.
 */
function getStudentProfileByPhone(phone: string): StudentProfile | undefined {
  return ExampleProfiles.find(profile => profile.phone === phone);
}

async function main() {
  const phone = readlineSync.question("Ingrese el número de teléfono del alumno en formato E.164: ");
  const studentProfile = getStudentProfileByPhone(phone);

  if (!studentProfile) {
    console.log("No se encontró un perfil de estudiante con ese número de teléfono.");
    return;
  }

  const studentPayments = buildStudentPayments(studentProfile.payments);

  const keys = {
    student_name: studentProfile.name,
    student_career: studentProfile.career,
    student_status: studentProfile.status,
    student_payments: studentPayments,
    current_date: new Date().toISOString().split('T')[0]
  };

  const prompt = buildPrompt(Prompt_Completion, keys);

  const conversationHistory: { role: 'system' | 'user' | 'assistant'; content: string }[] = [];

  // Agrega el prompt inicial del sistema
  conversationHistory.push({ role: 'system', content: prompt });

  //Genera un asesor aleatorio
  const advisorName = getRandomAdvisorName();

  const initialGreeting = `Hola, un gusto conversar contigo ${studentProfile.name}. Mi nombre es ${advisorName}, soy un asesor académico de FRVM. ¿Como puedo ayudarte hoy?`;

  console.log(`${advisorName}: ${initialGreeting}`);

  //Inicia el chat con el saludo personalizado segun el nombre del alumno y su asesor
  conversationHistory.push({role: 'assistant', content: initialGreeting});

  while (true) {
    const userMessage = readlineSync.question("Tú: ");
    conversationHistory.push({ role: "user", content: userMessage });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationHistory,
      max_tokens: 150
    });

    if (response && response.choices && response.choices.length > 0) {
      const botMessage: string = response.choices[0].message?.content || "";
      conversationHistory.push({ role: "assistant", content: botMessage });
      console.log(`${advisorName}: ${botMessage}`);
    } else {
      console.log("Error al llamar a la API de OpenAI.");
    }

    //Manejo del historial en caso de que sea muy largo, en este caso, lo recorto
    if (conversationHistory.length > 50) { 
      conversationHistory.splice(0, conversationHistory.length - 20);
    }
  }
}

main();
