import { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";

// ctx组件
const postContext = createContext();

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

// provider组件 将所有状态都存在此处
function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
    setSearchQuery("");
  }

  return (
    <postContext.Provider
      value={{
        posts: searchedPosts,
        onClearPosts: handleClearPosts,
        onAddPost: handleAddPost,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </postContext.Provider>
  );
}
// 自定义hook,在组件中使用usePost()代替useContext(postContext)
function usePost() {
  const ctx = useContext(postContext);
  if (ctx === "undefined")
    throw new Error("PostContext was used outside of the PostProvider");
  return ctx;
}

export { usePost, PostProvider, createRandomPost };
