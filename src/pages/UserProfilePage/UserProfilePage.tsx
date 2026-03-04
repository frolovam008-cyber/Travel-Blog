import React from "react";
import { UserProfileInfo } from "@/components/UserProfileInfo/UserProfileInfo";

export const UserProfilePage: React.FC = () => {
  return (
    <div className="home">
      <UserProfileInfo/>
    </div>
  );
};

export default UserProfilePage;