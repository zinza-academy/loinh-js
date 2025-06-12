"use client";

import React, { useState, useEffect } from "react";
import { onGetMe } from "@/services/user/api";

export default function UserPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      onGetMe()
        .then((me) => {
          setUser(me);
        })
        .catch((err) => {
          console.error("Fetch user failed", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (!user) {
    return <div className="p-8">Không lấy được thông tin người dùng.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Xin chào, {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
