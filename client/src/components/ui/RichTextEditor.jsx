import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],

    content: value,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-3">
      <label className="font-medium text-gray-700 dark:text-gray-300">
        Blog Content
      </label>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 rounded-xl border bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className="rounded-lg border px-3 py-1 hover:bg-gray-100"
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className="rounded-lg border px-3 py-1 hover:bg-gray-100"
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({
              level: 2,
            }).run()
          }
          className="rounded-lg border px-3 py-1 hover:bg-gray-100"
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className="rounded-lg border px-3 py-1 hover:bg-gray-100"
        >
          List
        </button>
      </div>

      {/* Editor */}
      <div className="min-h-[350px] rounded-2xl border bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default RichTextEditor;