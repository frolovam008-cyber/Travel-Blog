import React from "react";
import { PostDetails } from "@/components/PostDetails/PostDetails";

export const PostPage: React.FC = () => {
  return (
    <div className="home">
      <PostDetails/>
    </div>
  );
};

export default PostPage;