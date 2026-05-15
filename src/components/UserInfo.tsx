import React, { useEffect, useState } from "react";
import bridge from "@vkontakte/vk-bridge-mock";
import { Avatar, Title, Text, Cell, Group } from "@vkontakte/vkui";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  photo_200: string;
}

export function UserInfo() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    bridge.send("VKWebAppInit");

    bridge
      .send("VKWebAppGetUserInfo")
      .then((data) => {
        setUser(data);
        console.log("User data:", data);
      })
      .catch((error) => console.error(error));
  }, []);

  if (!user) return <div>Загрузка...</div>;

  return (
    <Group>
      <Cell
        before={<Avatar src={user.photo_200} />}
        subtitle={
          <Text>
            {user.first_name} {user.last_name}
          </Text>
        }
      >
        <Title level="3">Привет!</Title>
      </Cell>
    </Group>
  );
}

// export default UserInfo;
