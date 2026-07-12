"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon, Facebook02Icon, InstagramIcon } from "@hugeicons/core-free-icons";
import { BlogPost } from "./types";

interface BlogTabProps {
  posts: BlogPost[];
  blogFilter: "All" | "Founding Partner" | "Bookly News" | "For Business" | "Customer Tips";
  setBlogFilter: (val: "All" | "Founding Partner" | "Bookly News" | "For Business" | "Customer Tips") => void;
  statusFilter: "All" | "Published" | "Draft";
  setStatusFilter: (val: "All" | "Published" | "Draft") => void;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  onNewPost: () => void;
  onView: (post: BlogPost) => void;
}

export default function BlogTab({
  posts,
  blogFilter,
  setBlogFilter,
  statusFilter,
  setStatusFilter,
  onEdit,
  onDelete,
  onNewPost,
  onView,
}: BlogTabProps) {
  // Filter logic
  const filteredPosts = posts.filter((p) => {
    if (blogFilter !== "All" && p.category !== blogFilter) return false;
    if (statusFilter !== "All" && p.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Sub-filters row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F9FAFB] p-2.5 rounded-xl border border-gray-100">
        <div
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 shrink-0 max-w-full sm:max-w-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {(["All", "Founding Partner", "Bookly News", "For Business", "Customer Tips"] as const).map((filterVal) => {
            const isActive = blogFilter === filterVal;
            return (
              <button
                key={filterVal}
                onClick={() => setBlogFilter(filterVal)}
                className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 shrink-0 ${isActive
                    ? "bg-[#6366F1]/10 border-[#6366F1] text-[#6366F1]"
                    : "bg-white border-[#E5E7EB] text-[#374151] hover:bg-gray-55"
                  }`}
              >
                {filterVal === "Founding Partner" && (
                  <HugeiconsIcon icon={StarIcon} className="w-3.5 h-3.5 text-amber-500" />
                )}
                {filterVal === "All" ? "All Posts" : filterVal}
              </button>
            );
          })}
        </div>

        {/* Status & Add Row */}
        <div className="flex items-center gap-3 shrink-0 border-t border-gray-100 pt-2 sm:border-t-0 sm:pt-0 justify-between sm:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">Status:</span>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-2.5 py-1 pr-7 text-xs font-medium text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#6366F1] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          <button
            onClick={onNewPost}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#6366F1] text-white text-xs font-medium rounded-full hover:bg-indigo-650 transition-colors border-none cursor-pointer shadow-sm shrink-0"
          >
            + New Post
          </button>
        </div>
      </div>

      {/* Cards List Grid */}
      <div className="flex flex-col gap-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row gap-5 items-stretch lg:items-start w-full min-w-0"
            >
              {/* Left image container */}
              <div className="relative w-24 h-20 bg-gradient-to-br from-[#E0E7FF] to-[#C7D2FE] rounded-lg shrink-0 overflow-hidden flex items-center justify-center font-bold text-indigo-400 select-none">
                Image
                <div className="absolute bottom-1 right-1 bg-black/60 text-white font-medium text-[9px] px-1.5 py-0.5 rounded">
                  +2
                </div>
              </div>

              {/* Middle content wrapper */}
              <div className="flex-grow flex flex-col gap-2 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${post.category === "Founding Partner"
                        ? "bg-amber-100/60 text-[#92400E]"
                        : "bg-blue-100/60 text-[#1D4ED8]"
                      }`}
                  >
                    {post.category}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${post.status === "Published"
                        ? "bg-green-100/60 text-[#16A34A]"
                        : "bg-gray-100 text-gray-500 border border-gray-200"
                      }`}
                  >
                    {post.status}
                  </span>
                  <span className="text-[#6B7280]">{post.date}</span>
                </div>

                <h3 className="font-semibold text-[#111827] text-base leading-5 truncate" title={post.title}>
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-5 line-clamp-2">
                  {post.description}
                </p>

                {/* Social Handles */}
                <div className="flex items-center gap-4 text-xs text-[#6B7280] mt-1 flex-wrap">
                  <div className="flex items-center gap-1">
                    <HugeiconsIcon icon={Facebook02Icon} className="w-3.5 h-3.5 text-gray-400" />
                    <span>{post.fbLink}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HugeiconsIcon icon={InstagramIcon} className="w-3.5 h-3.5 text-gray-400" />
                    <span>{post.igLink}</span>
                  </div>
                </div>
              </div>

              {/* Actions column */}
              <div className="flex flex-row lg:flex-col items-center justify-end gap-3 shrink-0 w-full lg:w-auto mt-2 lg:mt-0 border-t border-gray-100 pt-3 lg:border-t-0 lg:pt-0">
                <button
                  onClick={() => onView(post)}
                  className="text-xs font-semibold text-[#6366F1] bg-transparent border-none hover:underline cursor-pointer px-3 py-1"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(post)}
                  className="text-xs font-semibold text-[#6366F1] bg-white border border-[#6366F1] rounded-full hover:bg-indigo-50 px-3.5 py-1.5 transition-colors cursor-pointer shrink-0"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(post.id)}
                  className="text-xs font-semibold text-[#DC2626] bg-transparent border-none hover:underline cursor-pointer px-3 py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-white border border-[#E5E7EB] rounded-xl text-gray-400 text-sm">
            No blog posts found matching the filters.
          </div>
        )}
      </div>
    </div>
  );
}
