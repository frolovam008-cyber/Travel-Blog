import type { Post } from "@/types/types";
import { BASE_URL } from "@/api/api";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@/components/common/icons/index";
import "@/components/PostCard/PostCard.scss";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  console.log(post);
  return (
    <div className="post-card">
      <div className="post-card__top">
        <img
          className="post-card__image"
          src={`${BASE_URL}${post.photo}`}
          alt={post.title}
        />{" "}
      </div>
      <div className="post-card__center">
        <h2 className="post-card__title">{post.title}</h2>
        <p className="post-card__description">{post.excerpt} </p>
      </div>
      <div className="post-card__bottom">
        <span className="post-card__city">
          {post.city}, {post.county}
        </span>

        <Link className="post-card__link" to={`/posts/${post.id}`}>
          <span className="post-card__link-text">
            Подробнее
            <span className="post-card__underline" />
          </span>

          <span className="post-card__link-arrow">
            <ArrowRightIcon />
          </span>
        </Link>
      </div>
    </div>
  );
};
