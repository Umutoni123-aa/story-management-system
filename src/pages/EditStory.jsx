import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getStoryById, updateStory } from "../services/storyService";

function EditStory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    loadStory();
  }, []);

  const loadStory = async () => {
    const story = await getStoryById(id);
    setAuthorName(story.authorName);
    setContent(story.content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateStory(id, { authorName, content });
    alert("Story updated!");
    navigate("/");
  };

  return (
    <div>
      <Link to="/" className="text-indigo-600 hover:underline text-sm mb-6 inline-block">← Back to Stories</Link>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Story</h2>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
            <input
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Story Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-700 text-white font-semibold py-2 rounded-lg hover:bg-indigo-800 transition"
          >
            Update Story
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditStory;