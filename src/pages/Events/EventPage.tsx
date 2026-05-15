import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  SimpleCell,
  Button,
  Text,
  Title,
  Spacing,
  Separator,
} from "@vkontakte/vkui";
import {
  Icon28CalendarOutline,
  Icon28PlaceOutline,
  Icon28UsersOutline,
  Icon24Done,
} from "@vkontakte/icons";
import { EventMap } from "../../components/EventMap/EventMap";
import "@vkontakte/vkui/dist/vkui.css";
const INITIAL_EVENTS = [
  {
    id: 11,
    title: "Локальный Хакатон: Code & Chill",
    description:
      "Собираем команды, брейнштормим крутые фичи и пилим MVP за выходные. С нас — пицца, мерч и мощный нетворкинг!",
    date: "27/06/26",
    time: "18:00",
    place: "IT-vibe",
    coords: [55.7558, 37.6173] as [number, number],
  },
  {
    id: 12,
    title: "Утренний кофе и коворкинг",
    description: "Обсуждаем планы, делимся идеями и заряжаемся бодростью за чашкой отличного кофе.",
    date: "28/06/26",
    time: "10:00",
    place: "Кофейня 'Surf Coffee'",
    coords: [55.7517, 37.6178] as [number, number],
  },
  {
    id: 13,
    title: "Киномарафон под открытым небом",
    description: "Закупаемся попкорном и смотрим новинки кино на большом экране.",
    date: "30/06/26",
    time: "12:00",
    place: "Almaz Cinema Park",
    coords: [55.8, 37.5] as [number, number],
  },
];

export function EventPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const eventData = INITIAL_EVENTS.find((e) => e.id === Number(id));

  const [participants, setParticipants] = useState(12);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!eventData) {
    return (
      <Panel id="error">
        <PanelHeader before={<PanelHeaderBack onClick={() => navigate(-1)} />}>
          {" "}
          Ошибка{" "}
        </PanelHeader>
        <Group>
          <div style={{ padding: 20, textAlign: "center" }}>
            <Title level="2">Событие не найдено</Title>
            <Spacing size={16} />
            <Button size="l" onClick={() => navigate(-1)}>
              Вернуться к списку
            </Button>
          </div>
        </Group>
      </Panel>
    );
  }

  const handleAction = () => {
    if (isJoined) return;
    setLoading(true);
    setTimeout(() => {
      setParticipants((prev) => prev + 1);
      setIsJoined(true);
      setLoading(false);
    }, 800);
  };

  return (
    <Panel id="event-detail">
      <PanelHeader before={<PanelHeaderBack onClick={() => navigate(-1)} />}>Событие</PanelHeader>

      <Group>
        <div style={{ padding: "16px" }}>
          <Title level="1" weight="1" style={{ marginBottom: 8 }}>
            {eventData.title}
          </Title>
          <Text style={{ color: "var(--vkui--color_text_secondary)" }}>
            {eventData.description}
          </Text>
        </div>

        <Spacing size={16} />

        <SimpleCell before={<Icon28CalendarOutline />} subtitle="Дата и время">
          {eventData.date} в {eventData.time}
        </SimpleCell>

        <SimpleCell before={<Icon28PlaceOutline />} subtitle="Место проведения">
          {eventData.place}
        </SimpleCell>

        <SimpleCell before={<Icon28UsersOutline />} subtitle="Участники">
          {participants} человек
        </SimpleCell>

        <Spacing size={12} />
        <Separator />

        <div style={{ padding: "12px 16px" }}>
          <Title level="3" weight="2" style={{ marginBottom: 12 }}>
            Место на карте
          </Title>
          <EventMap coords={eventData.coords} />
        </div>

        <div style={{ padding: "12px 16px" }}>
          <Button
            size="l"
            stretched
            loading={loading}
            onClick={handleAction}
            mode={isJoined ? "outline" : "primary"}
            before={isJoined ? <Icon24Done /> : null}
          >
            {isJoined ? "Вы записаны" : "Записаться"}
          </Button>
        </div>
      </Group>
    </Panel>
  );
}
