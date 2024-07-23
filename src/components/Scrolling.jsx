import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

const InfiniteScroll = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: { _page: page, _limit: 10 },
          }
        );
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
        setHasMore(response.data.length > 0);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [page]);

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
    >
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <div
              ref={lastPostElementRef}
              key={post.id}
              style={{
                margin: "20px",
                padding: "20px",
                border: "1px solid black",
              }}
            >
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          );
        } else {
          return (
            <div
              key={post.id}
              style={{
                margin: "20px",
                padding: "20px",
                border: "2px solid blue",
                width: "70%",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h3 style={{ fontSize: "120%", width: "70%", borderBottom:'1px solid black' , paddingBottom:'5%'}}>{post.title}</h3>
              <p style={{textAlign:'start'}}>{post.body}</p>
            </div>
          );
        }
      })}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScroll;
