import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code2,
  Undo2,
  Redo2,
  Minus,
} from "lucide-react";

function RichEditor({
  content,
  setContent,
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      HorizontalRule,
      Placeholder.configure({
        placeholder:
          "Start writing your article...",
      }),
    ],

    content,

    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class:
          "prose prose-slate prose-xl dark:prose-invert max-w-none min-h-[850px] focus:outline-none px-12 py-12",
      },
    },
  });

  if (!editor) return null;

  const getButtonClass = (active) =>
    `
      rounded-2xl
      border
      px-4
      py-3
      transition-all
      duration-200

      ${
        active
          ? "bg-indigo-600 text-white border-indigo-600 shadow-lg"
          : "border-gray-200 bg-white hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
      }
    `;

  return (
    <section className="space-y-4">
      {/* Header */}

      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          Content
        </p>

        <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
          Write Your Article
        </h2>
      </div>

      {/* Editor Container */}

      <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">

  <div>

    <h3 className="font-bold">
      Rich Text Editor
    </h3>

    <p className="text-sm text-slate-500">
      Write beautiful technical articles.
    </p>

  </div>

  <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300">
    Auto Save Enabled
  </span>

</div>
        {/* Toolbar */}

        <div
  className="
    sticky
    top-0
    z-20
    flex
    flex-wrap
    gap-2
    border-b
    border-slate-200
    bg-white/95
    p-4
    backdrop-blur-xl
    dark:border-slate-800
    dark:bg-slate-900/95
  "
>

          <button
            type="button"
            className={getButtonClass(
              editor.isActive("bold")
            )}
            onClick={() =>
              editor.chain().focus().toggleBold().run()
            }
          >
            <Bold size={18} />
          </button>

          <button
            type="button"
            className={getButtonClass(
              editor.isActive("italic")
            )}
            onClick={() =>
              editor.chain().focus().toggleItalic().run()
            }
          >
            <Italic size={18} />
          </button>

          <button
            type="button"
            className={getButtonClass(
              editor.isActive("heading", {
                level: 1,
              })
            )}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 1,
                })
                .run()
            }
          >
            <Heading1 size={18} />
          </button>

          <button
            type="button"
            className={getButtonClass(
              editor.isActive("heading", {
                level: 2,
              })
            )}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 2,
                })
                .run()
            }
          >
            <Heading2 size={18} />
          </button>

          <button
            type="button"
            className={getButtonClass(
              editor.isActive("bulletList")
            )}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBulletList()
                .run()
            }
          >
            <List size={18} />
          </button>

          <button
            type="button"
            className={getButtonClass(
              editor.isActive("orderedList")
            )}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleOrderedList()
                .run()
            }
          >
            <ListOrdered size={18} />
          </button>

          <button
            type="button"
            className={getButtonClass(
              editor.isActive("blockquote")
            )}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBlockquote()
                .run()
            }
          >
            <Quote size={18} />
          </button>

          <button
            type="button"
            className={getButtonClass(
              editor.isActive("codeBlock")
            )}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleCodeBlock()
                .run()
            }
          >
            <Code2 size={18} />
          </button>

          <button
            type="button"
            className={getButtonClass(false)}
            onClick={() =>
              editor
                .chain()
                .focus()
                .setHorizontalRule()
                .run()
            }
          >
            <Minus size={18} />
          </button>

          <button
            type="button"
            className={getButtonClass(false)}
            onClick={() =>
              editor.chain().focus().undo().run()
            }
          >
            <Undo2 size={18} />
          </button>

          <button
            type="button"
            className={getButtonClass(false)}
            onClick={() =>
              editor.chain().focus().redo().run()
            }
          >
            <Redo2 size={18} />
          </button>
        </div>

        {/* Editor */}

        <EditorContent editor={editor} />
      </div>
    </section>
  );
}

export default RichEditor;