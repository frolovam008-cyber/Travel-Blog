import React from "react";
import { CreateCommentForm } from "@/components/CreateCommentForm/CreateCommentForm";

export const AddCommentPage: React.FC = () => {
  return (
    <div className="home">
      <CreateCommentForm/>
    </div>
  );
};

export default AddCommentPage;