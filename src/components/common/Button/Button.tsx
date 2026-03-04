import React from "react";
import "./Button.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Иконка — только JSX */
  icon?: React.ReactNode;
  loading?: boolean;
  iconPosition?: "left" | "right" | "center";
};

export const Button: React.FC<ButtonProps> = ({
  icon,
  loading = false,
  iconPosition = "left",
  className = "",
  children,
  ...rest
}) => {
  return (
    <button
      className={`btn ${className}`}
      disabled={loading || rest.disabled}
      {...rest}
    >
      <span className="btn__content">
        {loading && <span className="btn__spinner" />}

        {!loading && icon && iconPosition === "left" && (
          <span className="btn__icon-wrapper">{icon}</span>
        )}

        {children && (
          <span
            className={[
              loading ? "invisible" : "",
              iconPosition === "center" ? "centered" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {children}
          </span>
        )}

        {!loading && icon && iconPosition === "right" && (
          <span className="btn__icon-wrapper">{icon}</span>
        )}

        {!loading && icon && iconPosition === "center" && (
          <span className="btn__icon-wrapper">{icon}</span>
        )}
      </span>
    </button>
  );
};
