import { useSelector } from "react-redux";
import PostItem from "../PostItem";
import { RootState } from "../../../../store";

export default function PostList() {
  const postList = useSelector((state: RootState) => state.blog.postList);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Dev Blog</h1>
      <p className="text-center text-gray-400 py-4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendiit.
        Eligendi
      </p>
      <hr />
      <div className=" flex flex-wrap">
        {postList.map((post) => {
          return (
            <div className=" w-1/2 p-4">
              <PostItem key={post.id} post={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
