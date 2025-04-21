import styles from "./StarRating.module.css";
import Star from "../../assets/star.svg?react";
import { useLoading, useUser } from "../../hooks/contexts";
import { BASE_API_URL } from "../../utils/constants";
import { useEffect, useState } from "react";
import httpClient from "../../utils/httpClient";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function StarRating({ recipe }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [rating, setRating] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const { setLoadingTrue, setLoadingFalse } = useLoading();

  const fetchRating = async () => {
    const { data } = await httpClient.get(`${BASE_API_URL}/recipe/rating?id=${recipe.id}`, {
      withCredentials: true,
    });
    return data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["get", "recipe", "rating", recipe.id, user?.id],
    queryFn: fetchRating,
    staleTime: 60 * 1000,
  });

  const onHover = (order) => {
    setCurrent(order);
    setIsHovering(true);
  };

  const isActive = (order) => {
    if (order <= current && current && isHovering) {
      return styles.active;
    }

    if (isHovering) {
      return;
    }

    if (!rating) {
      return;
    }

    if (order <= rating) {
      return styles.active;
    }
  };

  const onHoverLeave = () => {
    setIsHovering(false);
    setCurrent(null);
  };

  const handleClick = (order) => {
    setUserRating(order);

    setLoadingTrue();
    httpClient
      .put(`${BASE_API_URL}/recipe/rating?id=${recipe.id}&number=${order}`)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        if (error.status === 401) {
          alert("You must be logged in to rate a recipe");
          navigate("/login");
        }
        console.log(error);
      })
      .finally(() => {
        setLoadingFalse();
      });
  };

  useEffect(() => {
    if (!userRating) {
      setRating(data);
    }
  }, [data]);

  useEffect(() => {
    if (userRating) {
      setRating(userRating);
    }
  }, [userRating]);

  return (
    <div className={styles.container}>
      <Star
        className={`${styles.star} ${isActive(1)}`}
        onMouseEnter={() => onHover(1)}
        onMouseLeave={onHoverLeave}
        onClick={() => handleClick(1)}
      />
      <Star
        className={`${styles.star} ${isActive(2)}`}
        onMouseEnter={() => onHover(2)}
        onMouseLeave={onHoverLeave}
        onClick={() => handleClick(2)}
      />
      <Star
        className={`${styles.star} ${isActive(3)}`}
        onMouseEnter={() => onHover(3)}
        onMouseLeave={onHoverLeave}
        onClick={() => handleClick(3)}
      />
      <Star
        className={`${styles.star} ${isActive(4)}`}
        onMouseEnter={() => onHover(4)}
        onMouseLeave={onHoverLeave}
        onClick={() => handleClick(4)}
      />
      <Star
        className={`${styles.star} ${isActive(5)}`}
        onMouseEnter={() => onHover(5)}
        onMouseLeave={onHoverLeave}
        onClick={() => handleClick(5)}
      />
    </div>
  );
}

export default StarRating;

