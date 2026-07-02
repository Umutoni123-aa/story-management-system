import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getStoryById } from "../services/storyService";

function StoryDetails() {
  const { id } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    fetchStory();
  }, []);

  const fetchStory = async () => {
    const data = await getStoryById(id);
    setStory(data);
  };

  if (!story) return (
    <div className="flex justify-center items-center h-40">
      <p className="text-indigo-500 text-lg font-medium animate-pulse">Loading...</p>
    </div>
  );

  return (
    <div>
      <Link to="/" className="text-indigo-600 hover:underline text-sm mb-6 inline-block">← Back to Stories</Link>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-indigo-700 mb-2">{story.authorName}</h2>
        <p className="text-gray-700 leading-relaxed">{story.content}</p>

        <div className="mt-6">
          <Link
            to={`/edit/${story.id}`}
            className="bg-yellow-400 text-white font-semibold px-5 py-2 rounded-lg hover:bg-yellow-500 transition"
          >
            Edit Story
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StoryDetails;