import { createAction, createReducer, current } from "@reduxjs/toolkit";
import { Post } from "../../type/blog.type";
import { initialPostList } from "../../constants/blog";

interface BlogSate {
    postList: Post[]
    editingPost: Post | null
}
const initialSate:BlogSate = {
    postList: initialPostList,
    editingPost: null
}

export const addPost = createAction<Post>("blog/addPost")
export const deletePost = createAction<Post>("blog/deletePost")
export const editPost = createAction<string>("blog/editPost")
export const cancelEditingPost = createAction("blog/cancelEditingPost")
export const finishEditingPost = createAction<Post>("blog/finishEditingPost")

const blogReducer = createReducer(initialSate, builder => {
    builder
    .addCase(addPost, (state, action) => {
        //immer js giúp mutate  một state an toàn
        const post:Post = action.payload;
        state.postList.push(post);
    })
    .addCase(deletePost, (state, action) => {
        const postId = action.payload.id;
        const foundPostIndex = state.postList.findIndex(post => post.id === postId);
        if (foundPostIndex !== -1) {
            state.postList.splice(foundPostIndex,1);
        }
    })
    .addCase(editPost, (state, action) => {
        const postId = action.payload;
        const foundPost = state.postList.find(post => post.id === postId) || null;
        state.editingPost = foundPost;
        console.log(postId)
    })
    .addCase(cancelEditingPost, (state) => {
        state.editingPost = null;
    })
    .addCase(finishEditingPost, (state, action) => {
        const postId = action.payload.id;
        state.postList.some((post, index) => {
            if( post.id === postId) {
                state.postList[index] = action.payload;
                return true;
            }
            return false;
        });
        state.editingPost = null;
    })
    .addMatcher((action) => (action.type.includes("cancel")), (state, actiong) => {
        console.log(current(state));
    })
})

export default blogReducer