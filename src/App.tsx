// import styled from "@emotion/styled";
// import { Outlet } from "react-router-dom";
// import NavMenu from "./components/NavMenu";
// import { TestHeader } from "./components/Header/Header";

// const AppContainer = styled.div`
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   background: var(--bg-color);
//   color: var(--text-color);
//   transition:
//     background 0.3s ease,
//     color 0.3s ease;
// `;

// const MainContent = styled.div`
//   display: flex;
//   flex: 1;
//   gap: 20px;
//   padding: 24px;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 16px;
//     padding: 18px 16px 20px;
//   }
// `;

// // export default App;
// import { observer } from "mobx-react-lite";
// import { rootStore } from "./stores/rootStore";
// import { useEffect } from "react";

// const App = observer(() => {
//   useEffect(() => {
//     rootStore.loadBackendStatus();
//   }, []);

//   return (
//     <AppContainer>
//       <TestHeader />
//       {rootStore.error && <div style={{ color: "red" }}>{rootStore.error}</div>}
//       <MainContent>
//         <NavMenu />
//         <main style={{ flex: 1 }}>
//           <Outlet />
//         </main>
//       </MainContent>
//     </AppContainer>
//   );
// });
// export default App;

import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import { THeader } from "./components/Header/Header";
import { observer } from "mobx-react-lite";
import { rootStore } from "./stores/rootStore";
import { useEffect } from "react";
import {
  ConfigProvider,
  AdaptivityProvider,
  AppRoot,
  SplitLayout,
  SplitCol,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

// const AppContainer = styled.div`
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   background: var(--bg-color);
//   color: var(--text-color);
//   padding-bottom: 20px;
//   transition:
//     background 0.3s ease,
//     color 0.3s ease;
// `;
const AppContainer = styled.div<{ isWhiteBg?: boolean }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* Добавляем проверку пропса и !important, чтобы перебить index.css */
  background: ${(props) => (props.isWhiteBg ? "#ffffff" : "var(--bg-color)")} !important;
  color: var(--text-color);
  padding-bottom: 20px;
  transition:
    background 0.3s ease,
    color 0.3s ease;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  gap: 20px;
  padding: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 18px 16px 20px;
  }
`;

// const App = observer(() => {
//   useEffect(() => {
//     rootStore.loadBackendStatus();
//   }, []);

//   return (
//     /* 1. ConfigProvider управляет темой и платформой */
//     <ConfigProvider>
//       {/* 2. AdaptivityProvider отвечает за адаптивность под разные экраны */}
//       <AdaptivityProvider>
//         {/* 3. AppRoot — основной контейнер для порталов и модальных окон */}
//         <AppRoot>
//           <AppContainer>
//             <TestHeader />

//             {rootStore.error && (
//               <div style={{ color: "red", padding: "0 24px" }}>{rootStore.error}</div>
//             )}

//             <MainContent>
//               {/* 1. Навигация теперь ВНЕ SplitLayout, поэтому она будет сверху */}
//               <NavMenu />

//               {/* 2. Контентная часть под меню */}
//               <SplitLayout style={{ justifyContent: "center" }}>
//                 <SplitCol maxWidth="100%">
//                   <main style={{ flex: 1 }}>
//                     <Outlet />
//                   </main>
//                 </SplitCol>
//                 {/* Пример отображения данных ВК */}
//                 {/* <UserInfo /> */}
//               </SplitLayout>
//             </MainContent>
//           </AppContainer>
//         </AppRoot>
//       </AdaptivityProvider>
//     </ConfigProvider>
//   );
// });

import { useLocation } from "react-router-dom";

const App = observer(() => {
  const location = useLocation();
  const isChatPage = location.pathname === "/chats";
  const isSelectInterestPage = location.pathname === "/SelectInterestPage";
  const isProfilePage = location.pathname === "/Profile";
  const showAppChrome = location.pathname !== "/" && !isSelectInterestPage && !isProfilePage;

  useEffect(() => {
    rootStore.loadBackendStatus();
  }, []);

  const chatSceneTokens = {
    "--vkui--color_background_primary": "#ffffff",
    "--vkui--color_background_content": "#ffffff",
    "--vkui--color_background_tertiary": "#ffffff",
  } as React.CSSProperties;

  return (
    <ConfigProvider colorScheme="light">
      <AdaptivityProvider>
        <AppRoot style={isChatPage ? chatSceneTokens : {}}>
          <AppContainer isWhiteBg={isChatPage}>
            {showAppChrome && <THeader />}

            {rootStore.error && (
              <div style={{ color: "red", padding: "0 24px" }}>{rootStore.error}</div>
            )}

            <MainContent>
              <SplitLayout style={{ justifyContent: "center" }}>
                <SplitCol maxWidth="100%">
                  <main style={{ flex: 1 }}>
                    <Outlet />
                  </main>
                </SplitCol>
              </SplitLayout>
              {showAppChrome && <NavMenu />}
            </MainContent>
          </AppContainer>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
});
export default App;
