import { useDispatch } from "react-redux";
import { Post } from "../../../../type/blog.type";
import { deletePost, editPost } from "../../blog.reducer";

interface PostItemType {
  post: Post;
}
export default function PostItem({ post }: PostItemType) {
  const dispatch = useDispatch();

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(deletePost(post));
  };

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(editPost(post.id));
  };

  return (
    <div className="flex gap-4">
      <div className="w-60 h-60">
        <img
          src={post.featuredImage}
          alt="img"
          className=" w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <span className="text-gray-400">{post.publish}</span>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <span className="text-sm text-gray-400">{post.description}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={(event) => handleDelete(event)}
            className=" px-4 py-1 border border-gray-400  font-medium rounded-2xl hover:bg-slate-100"
          >
            Delete
          </button>
          <button
            onClick={handleEdit}
            className=" px-4  py-1 border border-gray-400 font-medium rounded-2xl hover:bg-slate-100"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
