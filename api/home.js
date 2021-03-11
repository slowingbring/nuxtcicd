import { request } from "@/plugins/axios";

// 获取文章
export const getArticles =params => {
  return request({
    method: "get",
    url: "/api/articles",
    params,
  });
};

// 获取标签
export const getTags = () => {
  return request({
    method: "get",
    url: "/api/tags",
  });
};
