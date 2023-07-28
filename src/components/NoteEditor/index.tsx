import { EditorContent, JSONContent, generateText, useEditor } from "@tiptap/react";
import { Note } from "../../types";
import StarterKit from "@tiptap/starter-kit";

import styles from "./styles.module.css";

const extensions = [StarterKit]

type NoteEditorProps = {
  note: Note;
  onChange: (content: JSONContent, title?: string) => void;
};
export function NoteEditor({ note, onChange }: NoteEditorProps) {
  const editor = useEditor({
    extensions,
    content: note.content,
    editorProps: {
      attributes: {
        class: styles.textEditor,
      },
    },
    onUpdate: ({ editor }) => {
      const editorContent = editor.getJSON()
      const firstNodeContent = editorContent.content?.[0]
      onChange(
        editorContent,
        firstNodeContent && generateText(firstNodeContent, extensions)
      );
    },
  }, [note.id]);

  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  return (
    <main className={styles.editorContainer}>
      <div className={styles.toolbar}>
        <button
          className={
            editor?.isActive("bold")
              ? styles.toolbarButtonActive
              : styles.toolbarButton
          }
          onClick={toggleBold}
        >
          B
        </button>
        <button
          className={
            editor?.isActive("italic")
              ? styles.toolbarButtonActive
              : styles.toolbarButton
          }
          onClick={toggleItalic}
        >
          I
        </button>
      </div>
      <EditorContent editor={editor} className={styles.textEditorContent} />
    </main>
  );
}
