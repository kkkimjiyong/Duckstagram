// E스타그램 첫 페이지 (전체리스트 가져오기 - GET)
export const imageApi = {
  getImages: () => instance.get("/posts"),
  getImage: (id) => instance.get(`/posts?postId=${id}`),
};

// E스타그램 Detail페이지 댓글
export const DetailApi = {
  getDetail: () => instance.get("/comments"), //GET

  postDetail: (comment) => instance.post("/comments", comment), //POST
};
