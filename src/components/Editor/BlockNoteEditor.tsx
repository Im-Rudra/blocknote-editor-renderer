'use client';

import {
  BlockNoteView,
  DefaultReactSuggestionItem,
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  useCreateBlockNote
} from '@blocknote/react';
import '@blocknote/react/style.css';
import CustomToolbar from './CustomToolbar';
import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems
} from '@blocknote/core';
import { Alert, insertAlertItem } from './Alert';
import { json } from '@/app/assets/data';

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    // Adds the Alert block.
    alert: Alert
  }
});

const getCustomSlashMenuItems = (
  editor: typeof schema.BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  ...getDefaultReactSlashMenuItems(editor),
  insertAlertItem(editor)
];

const Editor = () => {
  const editor = useCreateBlockNote({
    schema,
    initialContent: JSON.parse(json)
  });
  console.log(editor.document);
  const handleChange = () => {
    console.log(editor.document);
  };

  return (
    // <BlockNoteView
    //   editor={editor}
    //   theme="dark"
    //   // onChange={() => onSave(JSON.stringify(editor.document))}
    // />

    <BlockNoteView
      editor={editor}
      formattingToolbar={false}
      slashMenu={false}
      onChange={() => console.log(editor.document)}
    >
      <CustomToolbar />
      <SuggestionMenuController
        triggerCharacter={'/'}
        // Replaces the default Slash Menu items with our custom ones.
        getItems={async (query) => filterSuggestionItems(getCustomSlashMenuItems(editor), query)}
      />
    </BlockNoteView>
  );
};

export default Editor;
