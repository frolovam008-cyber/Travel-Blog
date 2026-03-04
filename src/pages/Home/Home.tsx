import React from "react";
import { PostsList } from "../../components/PostsList/PostsList";

export const Home: React.FC = () => {
  return (
    <div className="home">
  <PostsList/>
    </div>
  );
};

export default Home;