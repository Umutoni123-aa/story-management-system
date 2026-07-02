import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStories, deleteStory } from "../services/storyService";

function StoryList() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      const data = await getStories();
      setStories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this story?");
    if (!confirmDelete) return;
    await deleteStory(id);
    loadStories();
  };

  if (loading) return (
    <div className="flex justify-center items-center h-40">
      <p className="text-indigo-500 text-lg font-medium animate-pulse">Loading stories...</p>
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Stories</h2>

      {stories.length === 0 && (
        <p className="text-gray-500">No stories yet. Add one!</p>
      )}

      <div className="flex flex-col gap-4">
        {stories.map((story) => (
          <div key={story.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-indigo-700">{story.authorName}</h3>
            <p className="text-gray-600 mt-1 mb-4">{story.content}</p>
            <div className="flex gap-3">
              <Link
                to={`/stories/${story.id}`}
                className="text-sm px-4 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition font-medium"
              >
                View
              </Link>
              <Link
                to={`/edit/${story.id}`}
                className="text-sm px-4 py-1.5 rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition font-medium"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(story.id)}
                className="text-sm px-4 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoryList;