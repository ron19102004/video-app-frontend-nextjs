"use client";
import { AuthContext } from "@/contexts/authContext";
import React, { use } from "react";

const AdminHome = () => {
  const { userCurrent } = use(AuthContext);
  return (
    <div className="p-2">
      <h1 className="font-bold text-xl ">Resource Management</h1>
      <div>
        <h1 className="font-semibold">Admin's information</h1>
        <div className="ring-1 rounded-lg ring-p3 inline-block p-3">
          <h2>
            <span className="font-bold">Full name: </span>
            {userCurrent?.fullName}
          </h2>
          <h2>
            <span className="font-bold">Username: </span>
            {userCurrent?.username}
          </h2>
          <h2>
            <span className="font-bold">Email: </span>
            {userCurrent?.email}
          </h2>
          <h2>
            <span className="font-bold">Phone number: </span>
            {userCurrent?.phone}
          </h2>
          <h2>
            <span className="font-bold">Create at: </span>
            {userCurrent?.createdAt}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
