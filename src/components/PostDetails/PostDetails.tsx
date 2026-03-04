import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/api/api";
import { dateTransform } from "@/utils/helpers/dateTransform";
import { Link } from "react-router-dom";
import { Button } from "@/components/common/Button/Button";
import { ArrowLeftIcon } from "@/components/common/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import type { Post } from "@/types/types";
import "@/components/PostDetails/PostDetails.scss";

export const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/api/posts/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  console.log("Post:", JSON.stringify(post, null, 2));

  if (isLoading) return <div>Загрузка...</div>;
  if (!post) return <div>Пост не найден</div>;

  return (
    <div className="post-details">
      <div className="post-details__picture">
      <img
        src={`${BASE_URL}${post.photo}`}
        alt={post.title}
        className="post-details__image"
      /></div>

      <div className="post-details__info">

      <h1 className="post-details__title">{post.title}</h1>

      <p className="post-details__description">{post.description}</p>

      <div className="post-details__comments">
        {post.comments.map((comment, index) => (
          <div key={index} className="post-details__comment">
            <p className="post-details__comment-author">
              {comment.author_name}
            </p>
            <p className="post-details__comment-date">
              {dateTransform(comment.created_at)}
            </p>
            <p className="post-details__comment-text">{comment.comment}</p>
          </div>
        ))}
      </div>
      <div className="post-details__buttons">
        <Link className="post-details__link" to={"/"}>
          <span className="post-details__link-arrow">
            <ArrowLeftIcon />
          </span>
          <span className="post-details__link-text">
            Назад
           </span>
        </Link>
        <Button
          type="button"
           onClick={() => navigate(`/posts/${id}/comment`)}
          className=" post-details-create-comment btn--create-comment"
        >
          Ваше впечатление об этом месте
        </Button>
      </div>
      </div>
    </div>
  );
};
