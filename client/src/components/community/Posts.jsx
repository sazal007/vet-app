import { useEffect, useState } from 'react';
import { Popover } from 'antd';
import { BsThreeDotsVertical, BsChat } from 'react-icons/bs';
import { GiPawHeart } from "react-icons/gi";
import { addComment, getComments, getPosts, postLike } from '../../apis/posts/postApis';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [commentInput, setCommentInput] = useState({});
  const [showComments, setShowComments] = useState({});
  const [commentsData, setCommentsData] = useState({});
  const [likedPosts, setLikedPosts] = useState(new Set());

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts();
        setPosts(res);
        const commentsVisibility = {};
        const initialComments = {};
        const initialCommentsData = {};
        const initialLikedPosts = new Set();

        res.forEach(post => {
          commentsVisibility[post._id] = false;
          initialComments[post._id] = "";
          initialCommentsData[post._id] = [];
          if (post.likedByUser) {
            initialLikedPosts.add(post._id);
          }
        });

        setShowComments(commentsVisibility);
        setCommentInput(initialComments);
        setCommentsData(initialCommentsData);
        setLikedPosts(initialLikedPosts);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };

    fetchPosts();
  }, []);

  const fetchAndSetComments = async (postId) => {
    try {
      const comments = await getComments(postId);
      setCommentsData(prev => ({ ...prev, [postId]: comments }));
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  };

  const handleToggleComments = async (postId) => {
    const isVisible = !showComments[postId];
    setShowComments(prev => ({ ...prev, [postId]: isVisible }));
    if (isVisible && commentsData[postId].length === 0) {
      await fetchAndSetComments(postId);
    }
  };

  const handleAddComment = async (postId, commentText) => {
    if (!commentText.trim()) {
      alert('Comment cannot be empty.');
      return;
    }
    try {
      const newComment = await addComment(postId, commentText);
      setCommentsData(prev => ({
        ...prev,
        [postId]: [...prev[postId], newComment]
      }));
      setCommentInput({ ...commentInput, [postId]: '' }); // Reset comment input field
    } catch (err) {
      console.error('Failed to add comment:', err);
      alert('Failed to add comment. Please try again.');
    }
  };


  const renderComments = (comments, postId) => (
    <div className="p-4 max-h-[200px] overflow-y-auto bg-gray-100 border-t border-gray-300">
      {comments.map((comment, index) => (
        <div key={index} className="comment text-sm p-2 bg-white border border-gray-200 rounded">
          <strong>{comment.user.name}:</strong> {comment.text}
        </div>
      ))}
      <div className="input-area mt-5 flex">
        <input
          type="text"
          placeholder="Add a comment..."
          className="input input-bordered w-full max-w-xs"
          value={commentInput[postId] || ''}
          onChange={(e) => setCommentInput({ ...commentInput, [postId]: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && commentInput[postId].trim()) {
              handleAddComment(postId, commentInput[postId]);
              e.preventDefault(); // Prevent form submission
            }
          }}
        />
        <button
          className="btn btn-primary btn-md ml-2"
          onClick={() => handleAddComment(postId, commentInput[postId])}
        >
          Add
        </button>
      </div>
    </div>
  );

  const handleLike = async (postId) => {
    try {
      const updatedLikes = await postLike(postId); // This function should now return the updated likes array
      const newPosts = posts.map(post => {
        if (post._id === postId) {
          return { ...post, likes: updatedLikes };
        }
        return post;
      });
      setPosts(newPosts);
      // Toggle liked state
      setLikedPosts(prevLikedPosts => {
        const newLikedPosts = new Set(prevLikedPosts);
        if (newLikedPosts.has(postId)) {
          newLikedPosts.delete(postId);
        } else {
          newLikedPosts.add(postId);
        }
        return newLikedPosts;
      });
    } catch (error) {
      console.error('Failed to like the post:', error);
    }
  };

  const renderLikeButton = (postId) => {
    const isLiked = likedPosts.has(postId);
    return (
      <button onClick={() => handleLike(postId)} aria-label={isLiked ? 'Unlike this post' : 'Like this post'}>
        <GiPawHeart className={isLiked ? "text-red-500 text-2xl" : "text-2xl"} />
      </button>
    );
  };

  return (
    <>
      {posts.map((post) => (
        <div key={post._id} className="my-5 card lg:card-side bg-base-200 shadow-xl">
          {post.images[0] && (
            <figure><img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}/${post.images[0]}`} alt="Post" style={{ width: "400px", height: "200px" }} /></figure>
          )}
          <div className="card-body">
            <div className="card-actions justify-end">
              <Popover placement="leftTop" content={<div className="p-2 cursor-pointer"><p>Edit</p><p>Delete</p></div>} trigger="click">
                <button><BsThreeDotsVertical className="text-xl" /></button>
              </Popover>
            </div>
            <h2 className="card-title">{post.title}</h2>
            <p className="text-md">{post.content}</p>
            <div className="flex items-center space-x-4 mt-3">
              {renderLikeButton(post._id)}
              <span>{post.likes.length} Likes</span>
              <button onClick={() => handleToggleComments(post._id)}>
                <BsChat className="text-xl" />
              </button>
              <span>{post.comments.length} Comments</span>
            </div>
            {showComments[post._id] && renderComments(commentsData[post._id], post._id)}
          </div>
        </div>
      ))}
    </>
  );
}

export default Posts;
