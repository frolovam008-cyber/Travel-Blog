import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/hooks/useAppSelectorDispatch";
import { Logo } from "@/components/common/Logo/Logo";
import { Button } from "@/components/common/Button/Button";
import { UserIcon, ArrowDownIcon, ArrowUpIcon } from "@/components/common/icons/index"; 
import { logoutUser } from "@/features/auth/authThunk";
import logo from "@/assets/images/logo.png";
import defaultAvatar from "@/assets/images/default-img.jpg";

import "./Header.scss";

interface HeaderProps {
  variant: "home" | "inner";
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ variant, title }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const avatarSrc = defaultAvatar;

  const handleAccountClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

const handleLogout = async () => {
  await dispatch(logoutUser());
  setIsDropdownOpen(false); 
   window.location.href = "/";
};

  const handleProfile = () => {
    navigate("/profile");
    setIsDropdownOpen(false);
  };

 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`header header--${variant}`}>
      <div className="header__container">
        <div className="header__top">
          <Logo src={logo} width={181.57} height={41} />

          <div className="header__account-wrapper" ref={dropdownRef}>
            
<Button className="btn--account" onClick={handleAccountClick}>
  {user ? (
    <div className="header__avatar">
      <img src={avatarSrc} alt="avatar" className="header__avatar-img" />
      <span className="btn__account-name">
        {user.full_name || <UserIcon />}
        <span className="header__account-arrow">
          {isDropdownOpen ? <ArrowUpIcon width={14} height={11}/> : <ArrowDownIcon width={14} height={11}/>}
        </span>
      </span>
    </div>
  ) : (
    <span className="btn__account-text">Войти</span>
  )}
</Button>

            {user && (
              <div className={`header__dropdown ${isDropdownOpen ? "open" : ""}`}>
                <Button className="header__dropdown-item" onClick={handleProfile}>
                  Профиль
                </Button>
                <Button className="header__dropdown-item" onClick={handleLogout}>
                  Выйти
                </Button>
              </div>
            )}
          </div>
        </div>

        {(variant === "home" || title) && (
          <h1 className="header__title">
            {title ?? "Там, где мир начинается с путешествий"}
          </h1>
        )}
        {variant === "inner" && !title && (
          <h1 className="header__title">Истории ваших путешествий</h1>
        )}
      </div>
    </header>
  );
};

