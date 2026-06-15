import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { eventStore } from "../../stores/EventStore";
import { eventsAPI } from "../../services/api";
import {
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
import styled from "@emotion/styled";
import volleyballImg from "../../assets/images/volleyball.png";
import karaokeImg from "../../assets/images/karaoke.png";
import picnicImg from "../../assets/images/picnic.jpg";

const EventImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 12px;
  display: block;
  margin-bottom: 16px;
`;
const INITIAL_EVENTS = [
  {
    id: 1,
    title: "Пляжный волейбол",
    description: "Играем на песчаном корте, делимся командой и после — лёгкий фуршет на пляже.",
    date: "27/06/26",
    time: "18:00",
    place: "Круглотский сад",
    image: volleyballImg,
    coords: [55.7558, 37.6173] as [number, number],
  },
  {
    id: 2,
    title: "Вечернее караоке",
    description: "Пой вместе с друзьями любимые хиты и открой новые вокальные таланты.",
    date: "28/06/26",
    time: "22:00",
    place: "Караоке-клуб 'Голос'",
    image: karaokeImg,
    coords: [55.7517, 37.6178] as [number, number],
  },
  {
    id: 3,
    title: "Пикник в лесу",
    description: "Собираем пледы, еду и настольные игры для уютного отдыха на природе.",
    date: "30/06/26",
    time: "12:00",
    place: "Лес за городом",
    coords: [55.8, 37.5] as [number, number],
    image: picnicImg,
  },
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

function EventPageComponent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const allAvailableEvents = [
    ...INITIAL_EVENTS,
    ...eventStore.createdEvents,
    ...eventStore.acceptedEvents,
  ];

  const eventData = allAvailableEvents.find((e) => e.id === Number(id));
  const [loading, setLoading] = useState(false);
  const isJoined = eventData
    ? eventStore.acceptedEvents.some((item) => item.id === eventData.id) ||
      eventStore.createdEvents.some((item) => item.id === eventData.id)
    : false;
  const participants = 12 + (isJoined ? 1 : 0);

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

  const handleJoin = async () => {
    if (!eventData || isJoined) return;
    setLoading(true);
    try {
      await eventsAPI.join(String(eventData.id));
    } catch (err) {}
    eventStore.addAcceptedEvent(eventData);
    setLoading(false);
  };

  const handleLeave = async () => {
    if (!eventData || !isJoined) return;
    setLoading(true);
    try {
      await eventsAPI.leave(String(eventData.id));
    } catch (err) {}
    eventStore.removeAcceptedEvent(eventData);
    setLoading(false);
  };

  return (
    <Panel id="event-detail" style={{ marginBottom: "40px" }}>
      <PanelHeader before={<PanelHeaderBack onClick={() => navigate(-1)} />}>Событие</PanelHeader>

      <Group>
        <div style={{ padding: "16px" }}>
          <Title level="1" weight="1" style={{ marginBottom: 8 }}>
            {eventData.title}
          </Title>
          <Text style={{ color: "var(--vkui--color_text_secondary)" }}>
            {eventData.description}
          </Text>
          {eventData.image && (
            <EventImage
              src={typeof eventData.image === "string" ? eventData.image : ""}
              alt={eventData.title}
              style={{ marginTop: 16 }}
            />
          )}
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

        {eventData.coords && (
          <div style={{ padding: "12px 16px" }}>
            <Title level="3" weight="2" style={{ marginBottom: 12 }}>
              Место на карте
            </Title>
            <EventMap coords={eventData.coords} />
          </div>
        )}

        <div style={{ padding: "12px 16px" }}>
          {!isJoined ? (
            <Button size="l" stretched loading={loading} onClick={handleJoin} mode="primary">
              Записаться
            </Button>
          ) : (
            <>
              <Button size="l" stretched mode="secondary" before={<Icon24Done />} disabled>
                Вы записаны
              </Button>
              <div style={{ height: 8 }} />
              <Button
                size="l"
                stretched
                loading={loading}
                onClick={handleLeave}
                style={{ background: "#e05b5b", color: "white" }}
              >
                Отписаться
              </Button>
            </>
          )}
        </div>
      </Group>
    </Panel>
  );
}

export const EventPage = observer(EventPageComponent);
