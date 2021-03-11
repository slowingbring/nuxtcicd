import { request } from "@/plugins/axios";

// 发布文章
export const postArticles = (data) => {
  return request({
    method: "post",
    url: "/api/articles",
    data,
  });
};

// 更新文章
export const putArticles = (slug,data) => {
  return request({
    method: "put",
    url: "/api/articles/"+slug,
    data,
  });
};

// 删除文章
export const delArticles = slug=> {
  return request({
    method: "delete",
    url: "/api/articles/"+slug,
  });
};


//获取文章详情
export const getArticlesSlug = (slug) => {
  return request({
    method: "get",
    url: "/api/articles/" + slug,
  });
};

//发布评论
export const postComment = (slug, data) => {
  return request({
    method: "post",
    url: `/api/articles/${slug}/comments`,
    data,
  });
};

//获取评论列表
export const getComment = (slug) => {
  return request({
    method: "get",
    url: `/api/articles/${slug}/comments`,
  });
};

//点赞文章
export const postFavoriteArticles = (slug) => {
  return request({
    method: "post",
    url: `/api/articles/${slug}/favorite`,
  });
};

//取消点赞文章
export const delFavoriteArticles = (slug) => {
  return request({
    method: "delete",
    url: `/api/articles/${slug}/favorite`,
  });
};

//关注用户
export const postProfilesFollow = username => {
  return request({
    method: "post",
    url: `/api/profiles/${username}/follow`,
  });
};

//取消关注用户
export const delProfilesFollow = slug => {
  return request({
    method: "delete",
    url: `/api/profiles/${username}/follow`,
  });
};


//获取关注用户
export const getProfilesFollow = username => {
  return request({
    method: "get",
    url: `/api/profiles/${username}`,
  });
};



