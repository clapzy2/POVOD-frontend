// // import { FormLayoutGroup, FormItem, Input, Button, Headline } from "@vkontakte/vkui";
// // import "@vkontakte/vkui/dist/vkui.css"; // Убедитесь, что стили импортированы

// import { FormLayoutGroup, FormItem, Input, Button, Headline } from "@vkontakte/vkui";
// import "@vkontakte/vkui/dist/vkui.css";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import { validatePassword } from "../../utils/ValidatePass";

// export const MyLoginForm = () => {
//   const navigate = useNavigate();
//   const [passwordError, setPasswordError] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     // Если флаг есть, выкидываем пользователя на страницу 1
//     console.log(localStorage.getItem("isAuth"));
//     if (localStorage.getItem("isAuth") === "true") {
//       navigate("/page-1", { replace: true });
//     }
//   }, [navigate]);
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const passwordCheck = validatePassword(password);
//     if (!passwordCheck.isValid) {
//       setPasswordError(passwordCheck.message);
//       return;
//     }

//     setPasswordError("");
//     console.log("Форма отправлена!");
//     localStorage.setItem("isAuth", "true"); // Отмечаем, что пользователь вошел
//     navigate("/page-1", { replace: true });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <FormLayoutGroup>
//         <Headline level="2" weight="2" style={{ marginBottom: 16 }}>
//           Вход в систему
//         </Headline>

//         <FormItem top="Email" htmlFor="email">
//           <Input id="email" type="email" placeholder="example@mail.com" align="left" required />
//         </FormItem>

//         <FormItem top="Пароль" htmlFor="password" bottom={passwordError}>
//           <Input
//             id="password"
//             type="password"
//             placeholder="Введите пароль"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </FormItem>

//         <FormItem>
//           <Button size="l" stretched type="submit">
//             Отправить
//           </Button>
//         </FormItem>
//       </FormLayoutGroup>
//     </form>
//   );
// };
import styled from "@emotion/styled";
import { Button } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import photoTop from "../../assets/images/2.png";
import photoBottom from "../../assets/images/1.png";
import topLogo from "../../assets/images/logo.png";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 18px 24px;
  height: 94dvh;
  background: #ebf2fa;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0;
`;

const HeroCard = styled.div`
  background: transparent;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0; /* Чтобы карточка не сжималась */
`;

const ImageStack = styled.div`
  position: relative;
  height: 300px; /* Немного уменьшили, чтобы влезло на маленькие экраны */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const HeroImage = styled.div<{ $zIndex: number; $top?: string; $left?: string; $image?: string }>`
  position: absolute;
  width: 70%; /* Уменьшили ширину для безопасности */
  height: 180px;
  border-radius: 24px;
  background-image: url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
  z-index: ${(props) => props.$zIndex};
  top: ${(props) => props.$top || "0"};
  left: ${(props) => props.$left || "auto"};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 4px solid white;
  /* Ограничиваем поворот, чтобы края не выходили за экран */
  transform: rotate(${(props) => (props.$zIndex === 1 ? "-5deg" : "3deg")});
`;

const TextCard = styled.div`
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
  margin-top: 10px;
  flex-grow: 1; /* Занимает свободное место */
`;

const PageTitle = styled.h1`
  font-size: 28px; /* Чуть уменьшили для мобильных */
  font-weight: 800;
  color: #000000; /* Черный текст */
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PageDescription = styled.p`
  font-size: 16px;
  color: #818c99;
  margin: 0 0 10px 0;
`;

const ActionButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-top: 3%;
`;

const FooterText = styled.div`
  padding-top: 20px;
  font-size: 12px;
  color: #818c99;
  text-align: center;
  opacity: 0.8;
  line-height: 1.4;
  flex-shrink: 0;

  span {
    text-decoration: underline;
  }
`;

const EnterButton = styled(Button)`
  background-color: #2d81e0 !important;
  color: #ffffff !important;
  &:active {
    background-color: #0062d4 !important;
  }
`;
const TopIcon = styled.img`
  width: 148px;
  height: 44px;
  align-self: center;
  margin-bottom: 16px;
  object-fit: contain;
`;

export const MyLoginForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAuth") === "true") {
      navigate("/SelectInterestPage", { replace: true });
    }
  }, [navigate]);

  const handleLogin = () => {
    localStorage.setItem("isAuth", "true");
    navigate("/SelectInterestPage", { replace: true });
  };

  return (
    <PageContainer>
      <TopIcon src={topLogo} alt="Logo" />
      <HeroCard>
        <ImageStack>
          <HeroImage $zIndex={1} $top="10px" $left="10%" $image={photoTop} />
          <HeroImage $zIndex={2} $top="90px" $left="20%" $image={photoBottom} />
        </ImageStack>
      </HeroCard>

      <TextCard>
        <PageTitle>Создать повод</PageTitle>
        <PageDescription>Без долгих переписок. Пригласи одним кликом</PageDescription>

        <ActionButtonWrapper>
          <EnterButton size="l" stretched onClick={handleLogin}>
            Войти через VK ID
          </EnterButton>
        </ActionButtonWrapper>
      </TextCard>

      <FooterText>
        Создавая аккаунт, вы соглашаетесь с <br />
        <span>Условиями</span> и <span>Политикой</span>
      </FooterText>
    </PageContainer>
  );
};
