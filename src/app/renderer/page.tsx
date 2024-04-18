import { parseBlocks } from '@/components/renderer/parser';
import { json } from '../assets/data';

export default function RenderPage() {
  return (
    <div className="container mx-auto px-6 my-8 text-gray-700 dark:text-gray-200 max-w-6xl">
      {parseBlocks(JSON.parse(json), 0)}
    </div>
  );
}
