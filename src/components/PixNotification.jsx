import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Banknote } from 'lucide-react';
import { pixValues } from '../data/content';

export default function PixNotification() {
  const [show, setShow] = useState(false);
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValue(pixValues[Math.floor(Math.random() * pixValues.length)]);
      setShow(true);
      setTimeout(() => setShow(false), 4000); // Mostra por 4 segundos
    }, 8000); // Aparece a cada 8 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className="fixed bottom-6 right-6 z-50 bg-[#0c0c10] border border-[#3ddc84]/30 rounded-xl p-4 shadow-[0_0_30px_rgba(61,220,132,0.15)] flex items-center gap-3 max-w-xs"
        >
          <div className="bg-[#3ddc84]/20 p-2 rounded-full">
            <Banknote className="w-6 h-6 text-[#3ddc84]" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Nova transferência</p>
            <p className="text-sm font-bold text-white">Você recebeu um PIX da TikTok Shop de <span className="text-[#3ddc84]">R$ {currentValue}</span></p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}