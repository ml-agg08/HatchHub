import { useState } from "react";
import api from "../api";

function NoteForm({ refreshNote, skill }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", {
        title: title,
        content: content,
        tag: tag,
      })
      .then(() => {
        refreshNote(skill);
        setTitle("");
        setContent("");
        setTag("");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <form onSubmit={createNote} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Building a weather app with React"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-400 focus:border-rose-400"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          What’s it about?
        </label>
        <textarea
          id="content"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write something interesting…"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-400 focus:border-rose-400 resize-none"
        ></textarea>
      </div>

      <div>
        <label htmlFor="tag" className="block text-sm font-medium text-gray-700">
          Tag (optional)
        </label>
        <input
          id="tag"
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="e.g. React, AI, Startup"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-400 focus:border-rose-400"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-rose-400 text-white font-semibold px-4 py-2 rounded-md hover:bg-rose-500 transition-colors"
        >
          🚀 Post it!
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
