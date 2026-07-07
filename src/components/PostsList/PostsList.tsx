import { useEffect, useRef } from "react";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import axios from "axios";
import { PostCard } from "@/components/PostCard/PostCard";
import { useAppSelector } from "@/hooks/useAppSelectorDispatch";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common/Button/Button";
import "@/components/PostsList/PostsList.scss";
import type { Post } from "@/types/types";

const POSTS_PER_PAGE = 6;

export const PostsList = () => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const navigate = useNavigate();

  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<
    Post[],
    Error,
    InfiniteData<Post[]>,
    readonly string[],
    number
  >({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axios.get<Post[]>(
        `https://travelblog.skillbox.cc/api/posts?limit=${POSTS_PER_PAGE}&offset=${
          pageParam * POSTS_PER_PAGE
        }`,
      );
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < POSTS_PER_PAGE ? undefined : allPages.length,
    initialPageParam: 0,
  });

  // ✅ Отслеживаем скролл контейнера
  useEffect(() => {
    const element = listRef.current;
    if (!element) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = element;

      const isNearBottom = scrollHeight - scrollTop <= clientHeight + 50;

      if (isNearBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки</div>;

  const infiniteData = data;

  const allPosts: Post[] = infiniteData ? infiniteData.pages.flat() : [];

  return (
    <div className="posts">
      <div className="posts__add-post">
        {isAuth && (
          <Button
            className="btn--add-post"
            onClick={() => navigate("/posts/create")}
          >
            Добавить мое путешествие
          </Button>
        )}
      </div>
      <ul className="posts__list" ref={listRef}>
        {allPosts.map((post) => (
          <li key={post.id} className="posts__item">
            <PostCard post={post} />
          </li>
        ))}

        {isFetchingNextPage && (
          <li className="posts__loading">Загрузка ещё...</li>
        )}
      </ul>
    </div>
  );
};
