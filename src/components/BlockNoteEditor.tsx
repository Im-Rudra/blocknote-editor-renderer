'use client';
import { blogJson, json } from '@/app/assets/data';
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react';
import '@blocknote/react/style.css';

const Editor = () => {
  // const [blocks, setBlocks] = useState<Block[]>([]);
  const editor = useCreateBlockNote({
    initialContent: JSON.parse(blogJson)
  });
  console.log(editor.document);
  const handleChange = () => {
    console.log(editor.document);
  };

  return (
    <BlockNoteView
      editor={editor}
      theme="dark"
      // onChange={() => onSave(JSON.stringify(editor.document))}
    />
  );
};

export default Editor;
