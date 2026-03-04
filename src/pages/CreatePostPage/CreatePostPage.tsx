import React from "react";
import { CreatePostForm } from "@/components/CreatePostForm/CreatePostForm";

export const CreatePostPage: React.FC = () => {
  return (
    <div className="home">
      <CreatePostForm/>
    </div>
  );
};

export default CreatePostPage;