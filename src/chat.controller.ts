import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ChatService } from './chat.service';

interface ChatMessage {
  phone: string;
  userMessage: string;
}

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body(ValidationPipe) message: ChatMessage): Promise<any> {
    try {
      const response = await this.chatService.handleChat(message.phone, message.userMessage);
      return response; // Or customize the response based on your needs
    } catch (error) {
      // Handle errors appropriately, e.g., log the error and return a user-friendly message
      console.error('Error handling chat message:', error);
      return { success: false, message: 'An error occurred while processing your chat message.' };
    }
  }
}