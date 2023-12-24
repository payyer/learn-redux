import { Fragment, useEffect, useState } from "react";
import { Post } from "../../../../type/blog.type";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  cancelEditingPost,
  finishEditingPost,
} from "../../blog.reducer";
import { RootState } from "../../../../store";

const initialSate: Post = {
  id: "",
  featuredImage: "",
  description: "",
  publish: "",
  published: false,
  title: "",
};
export default function CreatePost() {
  const [formData, setFormData] = useState<Post>(initialSate);
  const dispatch = useDispatch();

  const editingPost = useSelector((state: RootState) => state.blog.editingPost);

  useEffect(() => {
    setFormData(editingPost || initialSate);
  }, [editingPost]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formDataWithId = { ...formData, id: new Date().toISOString() };
    console.log(formDataWithId);
    dispatch(addPost(formDataWithId));
    setFormData(initialSate);
  };

  const handleCancelEditingPost = () => {
    dispatch(cancelEditingPost());
  };

  const handleFinishEditingPost = () => {
    dispatch(finishEditingPost(formData));
    setFormData(initialSate);
  };

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      onReset={handleCancelEditingPost}
    >
      <h1>Title</h1>
      <input
        type="text"
        placeholder="Title"
        className="w-full border border-black p-2 rounded-xl"
        value={formData.title}
        onChange={(event) =>
          setFormData((prev) => ({ ...prev, title: event.target.value }))
        }
      />
      <h1>URL Image</h1>
      <input
        type="text"
        placeholder="URL Image"
        className="w-full border border-black p-2 rounded-xl"
        value={formData.featuredImage}
        onChange={(event) =>
          setFormData((prev) => ({
            ...prev,
            featuredImage: event.target.value,
          }))
        }
      />
      <h1>Description</h1>
      <input
        type="text"
        placeholder="Description"
        className="w-full border border-black p-2 rounded-xl"
        value={formData.description}
        onChange={(event) =>
          setFormData((prev) => ({ ...prev, description: event.target.value }))
        }
      />
      <h1>Publish date</h1>
      <select
        name="date"
        id="publish-date"
        className=" border border-black rounded-xl"
        value={formData.publish}
        onChange={(event) =>
          setFormData((prev) => ({
            ...prev,
            publish: event.target.value,
          }))
        }
      >
        <option value="21/12/2023">21/12/2023</option>
        <option value="22/12/2023">22/12/2023</option>
      </select>
      <div>
        <input
          type="checkbox"
          checked={formData.published}
          onChange={(event) =>
            setFormData((prev) => ({
              ...prev,
              published: event.target.checked,
            }))
          }
        />{" "}
        <span>Publish</span>
      </div>

      <div className="flex gap-4">
        {!editingPost && (
          <button
            type="submit"
            className=" border border-green-800 rounded-xl p-2"
          >
            Publish
          </button>
        )}

        {editingPost && (
          <Fragment>
            <button
              type="button"
              onClick={handleFinishEditingPost}
              className=" border border-green-800 rounded-xl p-2"
            >
              Update
            </button>
            <button
              type="reset"
              className=" border border-green-800 rounded-xl p-2"
            >
              Cancle
            </button>
          </Fragment>
        )}
      </div>
    </form>
  );
}
