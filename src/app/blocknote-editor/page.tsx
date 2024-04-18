import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/Editor/BlockNoteEditor'), { ssr: false });

export default function BlockEditorPage() {
  return (
    <div className="max-w-5xl mx-auto max-h-screen h-full ">
      <Editor />
    </div>
  );
}
