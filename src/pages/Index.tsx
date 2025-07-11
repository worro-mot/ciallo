
import { useState } from 'react';
import { Heart, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  username: string;
  avatar: string;
  timestamp: string;
  content: string;
  likes: number;
  isLiked: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      username: "KawaiiNeko",
      avatar: "🐱",
      timestamp: "2024-01-15 14:30",
      content: "Ciallo～(∠・ω< )!",
      likes: 12,
      isLiked: false
    },
    {
      id: 2,
      username: "RainbowUnicorn",
      avatar: "🦄",
      timestamp: "2024-01-15 14:32",
      content: "Ciallo～(∠・ω< )!",
      likes: 8,
      isLiked: true
    },
    {
      id: 3,
      username: "StarDust",
      avatar: "⭐",
      timestamp: "2024-01-15 14:35",
      content: "Ciallo～(∠・ω< )!",
      likes: 15,
      isLiked: false
    },
    {
      id: 4,
      username: "FluffyCloud",
      avatar: "☁️",
      timestamp: "2024-01-15 14:40",
      content: "Ciallo～(∠・ω< )!",
      likes: 23,
      isLiked: true
    },
    {
      id: 5,
      username: "SakuraBlossom",
      avatar: "🌸",
      timestamp: "2024-01-15 14:45",
      content: "Ciallo～(∠・ω< )!",
      likes: 7,
      isLiked: false
    },
    {
      id: 6,
      username: "MoonbeamDreamer",
      avatar: "🌙",
      timestamp: "2024-01-15 14:50",
      content: "Ciallo～(∠・ω< )!",
      likes: 19,
      isLiked: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleLike = (messageId: number) => {
    setMessages(prevMessages =>
      prevMessages.map(message =>
        message.id === messageId
          ? {
              ...message,
              likes: message.isLiked ? message.likes - 1 : message.likes + 1,
              isLiked: !message.isLiked
            }
          : message
      )
    );
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        username: "You",
        avatar: "😊",
        timestamp: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        content: newMessage,
        likes: 0,
        isLiked: false
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200 py-6 sticky top-0 z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
              Ciallo
            </span>
            <span className="text-pink-400 ml-2">～(∠・ω&lt; )!</span>
          </h1>
        </div>
      </header>

      {/* Messages Body */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100"
          >
            <div className="flex items-start space-x-4">
              <div className="text-3xl bg-gradient-to-br from-pink-100 to-purple-100 rounded-full w-12 h-12 flex items-center justify-center">
                {message.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-800">{message.username}</h3>
                  <span className="text-sm text-gray-500">{message.timestamp}</span>
                </div>
                <p className="text-gray-700 mb-3 text-lg">{message.content}</p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center space-x-1 hover:bg-pink-100 transition-colors ${
                      message.isLiked ? 'text-pink-500' : 'text-gray-500'
                    }`}
                    onClick={() => handleLike(message.id)}
                  >
                    <Heart
                      size={16}
                      className={message.isLiked ? 'fill-current' : ''}
                    />
                    <span>{message.likes}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-pink-100/50 backdrop-blur-sm border-t border-pink-200 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            Welcome to our discussion thread! Share your thoughts and connect with the community.
            Remember to be kind and respectful to everyone. Enjoy your stay! ✨
          </p>
        </div>
      </footer>

      {/* Fixed Input Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-pink-200 p-4 z-20">
        <div className="max-w-4xl mx-auto flex items-center space-x-3">
          <Input
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border-pink-200 focus:border-pink-400 focus:ring-pink-400"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white"
            disabled={!newMessage.trim()}
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
