import React from "react";
import {
  AppRoot,
  SplitLayout,
  SplitCol,
  Panel,
  PanelHeader,
  Group,
  Cell,
  Avatar,
  Search,
  Counter,
} from "@vkontakte/vkui";
import { Icon28PinOutline } from "@vkontakte/icons";
import styled from "@emotion/styled";
import "@vkontakte/vkui/dist/vkui.css";

const WhitePanel = styled(Panel)`
  .vkuiGroup {
    background-color: inherit;
  }
`;

const ChatContainer = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
`;

const MessageText = styled.span`
  color: #818c99;
  font-size: 14px;
`;

const AuthorName = styled.span`
  color: #000000;
  font-weight: 400;
`;

const TimeText = styled.span`
  color: #99a2ad;
  margin-left: 8px;
`;

interface ChatItemProps {
  title: string;
  author: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isPinned?: boolean;
}

export const ChatPage: React.FC<ChatItemProps> = ({
  title,
  author,
  lastMessage,
  time,
  unreadCount,
  isPinned,
}) => {
  return (
    <Cell
      before={<Avatar size={56} gradientColor="blue" />}
      after={
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          {isPinned && <Icon28PinOutline width={20} height={20} fill="#3f8ae0" />}
          {unreadCount && (
            <Counter mode="contrast" size="m">
              {unreadCount}
            </Counter>
          )}
        </div>
      }
      subtitle={
        <MessageText>
          <AuthorName>{author}:</AuthorName> {lastMessage} · <TimeText>{time}</TimeText>
        </MessageText>
      }
    >
      <span style={{ fontWeight: 600, fontSize: 16 }}>{title}</span>
    </Cell>
  );
};

export const ChatList = () => {
  return (
    <AppRoot>
      <SplitLayout>
        <SplitCol>
          <WhitePanel id="main">
            <ChatContainer>
              <Group mode="plain">
                <Search placeholder="Поиск" />

                <ChatPage
                  title="Премьера «Человек-паук: Новый день»"
                  author="Костя П"
                  lastMessage="Давайте подумаем про..."
                  time="54м"
                  isPinned={true}
                />

                <ChatPage
                  title="Кофе на Восстания"
                  author="Маша П"
                  lastMessage="Встреча через 30 минут..."
                  time="14м"
                  unreadCount={3}
                />

                <ChatPage
                  title="Настольные игры"
                  author="Петя Т"
                  lastMessage="Спасибо за компанию..."
                  time="22ч"
                />
              </Group>
            </ChatContainer>
          </WhitePanel>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default ChatList;
