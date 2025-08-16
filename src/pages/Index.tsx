
import { useEffect, useState } from 'react';
import { Heart, Send, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import axios from 'axios';

interface Message {
  id: number;
  timestamp: string;
  country: string;
  username: string;
}

function convertTimestampToRelative(str: string): string {
  let diff = Date.now() - new Date(str).getTime();
  // 1000ms - 1s | 60s - 1m | 60m - 1hr | 24h - 1d | 7d - 1w | 4.3w - 1m | 12m - 1yr
  const timeDiv = [1000, 60, 60, 24, 7, 4.35, 12];
  const timeName = [' second', ' minute', ' hour', ' day', ' week', ' month', ' year'];
  for (let i = 0; i < 7; i++) {
    const quo = Math.floor(diff / timeDiv[i]);
    if (i < 6 && quo >= timeDiv[i+1]) {
      diff /= timeDiv[i ];
      continue;
    }
    if (quo == 1) return quo + timeName[i];
    return quo + timeName[i] + 's';
  }
  return 'literally just now. like at this very moment. how did this even happen?';
}



const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isGalleryView, setIsGalleryView] = useState(false);
  const [postError, setPostError] = useState('');

  const loadMessagesFromAPI = () => {
    axios.get('http://127.0.0.1:8000/ciallo/messages/').then((res) => {
      setMessages(res.data.reverse());
    }).catch((err) => {
      console.error("Failed to fetch messages: " + err);
    });
  }

  useEffect(() => {
    loadMessagesFromAPI();
  }, []);
  const handleSendMessage = () => {
    axios.post('http://127.0.0.1:8000/ciallo/messages/', {'username': newMessage.trim().substring(0, 16)}).then((res) => {
      loadMessagesFromAPI();
    }).catch((e)=>{
      console.error("Posting failed: " +e);
      // setPostError();
      // loadMessagesFromAPI();
    })
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setNewMessage('');
      handleSendMessage();
    }
  };

  

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pb-20">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200 py-6 sticky top-0 z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                Ciallo
              </span>
              <span className="text-pink-400 ml-2">～(∠・ω&lt; )⌒★!</span>
            </h1>
          </div>
        </header>

        {/* View Toggle Button */}
        <div className="fixed top-20 right-4 z-20">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsGalleryView(!isGalleryView)}
                className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg"
                size="sm"
              >
                {isGalleryView ? <List size={16} /> : <Grid3X3 size={16} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Ciallo～(∠・ω&lt; )⌒★!</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Messages Body */}
        <main className={`max-w-6xl mx-auto px-4 py-6 custom-scrollbar max-h-screen overflow-y-auto ${
          isGalleryView 
            ? 'grid grid-cols-4 gap-4' 
            : 'max-w-4xl space-y-4'
        }`}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100 ${
                isGalleryView ? 'p-2' : 'p-3'
              }`}
            >
              <div className={`flex ${isGalleryView ? 'flex-col' : 'items-center'} ${isGalleryView ? 'space-y-2' : 'space-x-3'}`}>
                <div className={`${isGalleryView ? 'text-center' : 'flex-1 min-w-0'}`}>
                  <div className={`flex items-center ${isGalleryView ? 'flex-col space-y-1' : 'space-x-2'} mb-1`}>
                    <h3 className={`font-semibold text-gray-800 ${isGalleryView ? 'text-xs' : 'text-sm'}`}>{message.username}</h3>
                    <span className={`text-gray-500 ${isGalleryView ? 'text-xs' : 'text-xs'}`}>from {message.country} - {convertTimestampToRelative(message.timestamp)} ago~</span>
                  </div>
                  <p className={`text-gray-700 mb-2 ${isGalleryView ? 'text-xs' : 'text-base'}`}>{`Ciallo～(∠・ω< )⌒★!`}</p>
                </div>
              </div>
            </div>
          ))}
        </main>

        {/* Footer */}
        <footer className="bg-pink-100/50 backdrop-blur-sm border-t border-pink-200 py-8 mt-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-gray-600">
              helo
            </p>
          </div>
        </footer>

        {/* Fixed Input Section */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-pink-200 p-4 z-20">
          <div className="max-w-4xl mx-auto flex items-center space-x-3">
            <Input
              placeholder="Ciallo～(∠・ω< )⌒★! - Who do you want to be known as?"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border-pink-200 focus:border-pink-400 focus:ring-pink-400"
              maxLength={15} // tf??
            />
            <Button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white"
              // disabled={!newMessage.trim()}
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Index;