import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppSelectorDispatch";
import { fetchUser } from "@/features/auth/authThunk";
import type { RootState } from "@/store/store";

import { Button } from "@/components/common/Button/Button";
import { UpdateIcon, CameraIcon } from "@/components/common/icons/index";
import { Skeleton } from "@/components/common/Skeleton/Skeleton";
import defaultAvatar from "@/assets/images/default-img.jpg";

import "@/components/UserProfileInfo/UserProfileInfo.scss";

export const UserProfileInfo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  if (loading) return <p>Загрузка...</p>;
  if (!user) return <p>Пользователь не найден</p>;

  return (
    <div className="profile-info">
      {/* Аватар */}

      <div className="profile-info__avatar">
        {loading ? (
          <Skeleton width={240} height={240} circle />
        ) : (
          <img
            src={defaultAvatar}
            alt="avatar"
            className="profile-info__avatar-img"
          />
        )}
        <Button
          className="profile-info__avatar-btn btn--update-photo"
          onClick={() => navigate("/profile/update")}
          icon={<CameraIcon size={32} />}
          iconPosition="left"
        >
          Изменить фото
        </Button>
      </div>

      {/* Данные */}

      <div className="profile-info__content">
        {/* Кнопка редактирования */}
        <Button
          className="profile-info__btn-update btn--update"
          onClick={() => navigate("/profile/update")}
        >
          <UpdateIcon width={28} height={26} />
        </Button>
        {loading ? (
          <>
            {/* Skeleton для имени */}
            <Skeleton width={220} height={28} />

            {/* Skeleton для города */}
            <span className="profile-info__city-span">Город:</span>
            <Skeleton width={140} height={18} />

            {/* Skeleton для bio */}
            <span className="profile-info__bio-span">О себе:</span>
            <Skeleton width="80%" height={16} />
            <Skeleton width="70%" height={16} />
            <Skeleton width="90%" height={16} />
          </>
        ) : (
          <>
            <h2 className="profile-info__name">
              {user.full_name || "Имя не указано"}
            </h2>
            <div className="profile-info__data">
              <div className="profile-info__unit">
                <span className="profile-info__city-span">Город:</span>
                {user.city ? (
                  <p className="profile-info__city">{user.city}</p>
                ) : (
                  <p className="profile-info__city">Не указан</p>
                )}
              </div>
              <div className="profile-info__unit">
                <span className="profile-info__bio-span">О себе:</span>
                {user.bio ? (
                  <p className="profile-info__bio">{user.bio}</p>
                ) : (
                  <p className="profile-info__bio">Нет информации</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
