import NeuralNetwork from '@/components/NeuralNetwork';
import Portfolio from '@/components/Portfolio';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NeuralNetwork />
      <Portfolio />
    </div>
  );
}
