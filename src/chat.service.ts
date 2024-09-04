import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ExampleProfiles, PaymentQuotaStatus } from '../objects/example.profiles';
import { Prompt_Completion } from '../objects/example.prompt';
import { ExampleAdvisors } from '../objects/example.advisors';

@Injectable()
export class ChatService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  getRandomAdvisorName(): string {
    return ExampleAdvisors[Math.floor(Math.random() * ExampleAdvisors.length)];
  }

  buildPrompt(keys: Record<string, string>): string {
    return Prompt_Completion.replace(/{(.*?)}/g, (_, key) => keys[key] || '');
  }

  buildStudentPayments(payments: any[]): string {
    return payments
      .map(payment => `- Cuota ${payment.sequence}: (Monto: ${payment.amount}) (Estado: ${payment.status}) ${payment.status !== PaymentQuotaStatus.COMPLETE ? `(Vencimiento: ${payment.due_date})` : ''}`)
      .join('\n');
  }

  getStudentProfileByPhone(phone: string) {
    return ExampleProfiles.find(profile => profile.phone === phone);
  }

  async handleChat(phone: string, userMessage: string) {
    const studentProfile = this.getStudentProfileByPhone(phone);
    if (!studentProfile) {
      return { error: "No se encontró un perfil de estudiante con ese número de teléfono." };
    }

    const studentPayments = this.buildStudentPayments(studentProfile.payments);
    const keys = {
      student_name: studentProfile.name,
      student_career: studentProfile.career,
      student_status: studentProfile.status,
      student_payments: studentPayments,
      current_date: new Date().toISOString().split('T')[0]
    };

    const prompt = this.buildPrompt(keys);
    const conversationHistory: Array<{
        role: 'system' | 'user' | 'assistant';
        content: string;
      }> = [];      

    try {
        const response = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: conversationHistory.map(({ role, content }) => ({
              role,
              content
            })),
            max_tokens: 150
          });
          

      if (response && response.choices && response.choices.length > 0) {
        return { botMessage: response.choices[0].message?.content || "" };
      } else {
        return { error: "Error al llamar a la API de OpenAI." };
      }
    } catch (error) {
      return { error: "Error al llamar a la API de OpenAI." };
    }
  }
}
