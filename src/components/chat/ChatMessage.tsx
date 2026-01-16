import { Message } from '@/hooks/useChat';
import { cn } from '@/lib/utils/cn';

type ChatMessageProps = {
  message: Message;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex w-full',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-4 py-3',
          isUser
            ? 'bg-orange-600 text-white'
            : 'bg-gray-100 text-gray-900 border border-gray-200'
        )}
      >
        <div className="whitespace-pre-wrap break-words text-sm">
          {message.content}
        </div>
      </div>
    </div>
  );
}
