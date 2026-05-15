import styled from "@emotion/styled";
import { useTheme } from "../../context/ThemeContext";
import { BellIcon } from "../../icons/icons";
import { useNavigate, useLocation } from "react-router-dom";

const Header = styled.header<{ $mode: "light" | "dark" }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: var(--vkui--color_background_primary);
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-grow: 1;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #ceddf7;
  background-image: url("https://avatars.mds.yandex.net/i?id=84fb949b57c566a07f81dd3a26a2d038_sr-7554713-images-thumbs&n=13");
  background-size: cover;
  cursor: pointer;
`;

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: var(--vkui--color_text_primary);
`;

const IconButton = styled.button<{ $mode: "light" | "dark" }>`
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  color: var(--vkui--color_text_accent);
  display: grid;
  place-items: center;
  cursor: pointer;
  padding: 0;

  &:active {
    opacity: 0.7;
  }
`;

export function THeader() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAvatarClick = () => {
    localStorage.setItem("isAuth", "true");
    navigate("/Profile");
  };

  const displayTitle =
    location.pathname.includes("events") || location.pathname.includes("page-3")
      ? "Мои поводы"
      : "Главная";

  return (
    <Header $mode={theme}>
      <PageHeader>
        <LeftSection>
          <Avatar onClick={handleAvatarClick} />
          <PageTitle>{displayTitle}</PageTitle>
        </LeftSection>

        <IconButton $mode={theme} type="button" aria-label="Уведомления">
          <BellIcon />
        </IconButton>
      </PageHeader>
    </Header>
  );
}
