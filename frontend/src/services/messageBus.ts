import type { Message } from '../types/messages';
import { MessageType, createMessage } from '../types/messages';

export interface MessageHandler {
  (message: Message): void;
}

export interface MessageBusConfig {
  onMessage?: (message: Message) => void;
  onError?: (error: string) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export class MessageBus {
  private handlers: Map<MessageType, Set<MessageHandler>> = new Map();
  private config: MessageBusConfig;
  private isConnected = false;

  constructor(config: MessageBusConfig = {}) {
    this.config = config;
  }

  // Register a handler for a specific message type
  public on(type: MessageType, handler: MessageHandler): () => void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set());
    }
    
    this.handlers.get(type)!.add(handler);
    
    // Return unsubscribe function
    return () => {
      this.handlers.get(type)?.delete(handler);
    };
  }

  // Send a message to all registered handlers
  public emit(message: Message): void {
    console.log('MessageBus emitting:', message);
    
    // Call global handler if registered
    this.config.onMessage?.(message);
    
    // Call specific handlers for this message type
    const handlers = this.handlers.get(message.type);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(message);
        } catch (error) {
          console.error('Error in message handler:', error);
          this.config.onError?.(`Handler error: ${error}`);
        }
      });
    }
  }

  // Send a message with automatic type creation
  public send(type: MessageType, data: Record<string, any> = {}, id?: string): void {
    const message = createMessage(type, data, id);
    this.emit(message);
  }

  // Send error message
  public sendError(error: string, data: Record<string, any> = {}): void {
    this.send(MessageType.ERROR, { error, ...data });
  }

  // Connection state management
  public setConnected(connected: boolean): void {
    this.isConnected = connected;
    if (connected) {
      this.config.onConnect?.();
    } else {
      this.config.onDisconnect?.();
    }
  }

  public getConnected(): boolean {
    return this.isConnected;
  }

  // Clear all handlers
  public clear(): void {
    this.handlers.clear();
  }
} 