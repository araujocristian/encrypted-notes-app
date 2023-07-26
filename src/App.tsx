import { useState } from "react";
import { useEditor, EditorContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { v4 as uuid } from 'uuid'

import styles from "./App.module.css";

type Note = {
  id: string;
  title: string;
  content: Content;
  updatedAt: Date;
}

function App() {
  const [notes, setNotes] = useState<Record<string, Note>>({})

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
    editorProps: {
      attributes: {
        class: styles.textEditor,
      },
    },
  });

  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  const handleCreateNewNote = () => {
    const newNote = {
      id: uuid(),
      title: 'New note',
      content: `<h1>New note</h1>`,
      updatedAt: new Date()
    }

    setNotes((notes) => ({
      ...notes,
      [newNote.id]: newNote
    }))
  }

  const notesList = Object.values(notes).sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  )

  return (
    <div className={styles.pageContainer}>
      <aside className={styles.sidebar}>
        <button className={styles.sidebarButton} onClick={handleCreateNewNote}>
          New Note
        </button>
        <section className={styles.sidebarList}>
          {notesList.map((note) => (
            <div
              key={note.id}
              role="button"
              tabIndex={0}
              className={styles.sidebarItem}
            >
              {note.title}
            </div>
          ))}
        </section>
      </aside>
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
    </div>
  );
}

export default App;
