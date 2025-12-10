import { IAIService } from '@/domain/interfaces';
import OpenAI from 'openai';

// Default model - GPT-5-Nano for fast, cost-efficient summarization
const DEFAULT_MODEL = 'gpt-5-nano';

export class OpenAIService implements IAIService {
  private client: OpenAI;
  private model: string;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    // Use environment variable or default to GPT-5-Nano
    this.model = process.env.OPENAI_MODEL || DEFAULT_MODEL;
  }

  async generateSummary(transcript: string): Promise<string> {
    if (!transcript) {
        throw new Error("Transcript is empty");
    }

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: "Eres un asistente experto en generar informes en formato Markdown." },
      { role: "user", content: `
        A partir de los subtítulos de un video, genera un resumen bien estructurado en formato Markdown con:

        - **Título del informe**
        - **Resumen del contenido**
        - **Puntos clave**
        - **Conclusión**

        Subtítulos:

        ${transcript.substring(0, 20000)} 
        
        Note: Transcript truncated to 20k chars to avoid token limits for this MVP.

        Por favor, responde exclusivamente en formato Markdown sin agregar explicaciones adicionales.
      `}
    ];

    try {
      const maxTokens = process.env.OPENAI_MAX_TOKENS ? parseInt(process.env.OPENAI_MAX_TOKENS) : undefined;
      
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: messages,
        ...(maxTokens && { max_completion_tokens: maxTokens }),
      });

      console.log('OpenAI response received');
      console.log('Response choices:', JSON.stringify(response.choices[0], null, 2));
      
      // GPT-5 family may return content in different ways
      const message = response.choices[0].message;
      const content = message.content || '';
      
      console.log('Extracted content length:', content.length);
      
      if (!content) {
        console.error('Warning: OpenAI returned empty content');
        // Check if there's an output_text for reasoning models
        const anyMessage = message as any;
        if (anyMessage.output_text) {
          console.log('Found output_text:', anyMessage.output_text.length);
          return anyMessage.output_text;
        }
      }
      
      return content;
    } catch (error) {
      console.error("Error generating summary with OpenAI:", error);
      throw new Error("Failed to generate summary");
    }
  }

  async *generateSummaryStream(transcript: string): AsyncGenerator<{ type: 'thinking' | 'content' | 'reasoning', data: string }, void, unknown> {
    if (!transcript) {
      throw new Error("Transcript is empty");
    }

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: "Eres un asistente experto en generar informes en formato Markdown." },
      { role: "user", content: `
        A partir de los subtítulos de un video, genera un resumen bien estructurado en formato Markdown con:

        - **Título del informe**
        - **Resumen del contenido**
        - **Puntos clave**
        - **Conclusión**

        Subtítulos:

        ${transcript.substring(0, 20000)} 
        
        Note: Transcript truncated to 20k chars to avoid token limits for this MVP.

        Por favor, responde exclusivamente en formato Markdown sin agregar explicaciones adicionales.
      `}
    ];

    try {
      const maxTokens = process.env.OPENAI_MAX_TOKENS ? parseInt(process.env.OPENAI_MAX_TOKENS) : undefined;
      
      // Signal that thinking has started
      yield { type: 'thinking', data: 'Analizando contenido del video...' };
      
      const stream = await this.client.chat.completions.create({
        model: this.model,
        messages: messages,
        stream: true,
        ...(maxTokens && { max_completion_tokens: maxTokens }),
      });

      let hasStartedContent = false;
      
      for await (const chunk of stream) {
        const anyChunk = chunk as any;
        
        // Check for reasoning/thinking content (GPT-5 models)
        if (anyChunk.choices?.[0]?.delta?.reasoning_content) {
          yield { type: 'reasoning', data: anyChunk.choices[0].delta.reasoning_content };
        }
        
        // Check for regular content
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          if (!hasStartedContent) {
            hasStartedContent = true;
            yield { type: 'thinking', data: 'Generando informe...' };
          }
          yield { type: 'content', data: content };
        }
      }
    } catch (error) {
      console.error("Error generating summary stream with OpenAI:", error);
      throw new Error("Failed to generate summary stream");
    }
  }
}
