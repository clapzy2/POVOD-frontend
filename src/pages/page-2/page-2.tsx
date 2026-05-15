import styled from "@emotion/styled";
import { useState } from "react";
import { Button } from "@vkontakte/vkui";
import {
  Icon28CalendarOutline,
  Icon28ClockOutline,
  Icon28PlaceOutline,
  Icon28SearchOutline,
} from "@vkontakte/icons";
import volleyballImg from "../../assets/images/volleyball.png";
import karaokeImg from "../../assets/images/karaoke.png";
import picnicImg from "../../assets/images/picnic.jpg";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 18px 24px;
  min-height: 100%;
  background: var(--vkui--color_background_primary);
`;

const PageLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--vkui--color_text_secondary);
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 12px 14px;
  background: var(--vkui--color_background_secondary);
  border-radius: 16px;
  border: 1px solid var(--vkui--color_separator_primary_alpha);
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  color: var(--vkui--color_text_primary);
  outline: none;

  &::placeholder {
    color: var(--vkui--color_text_secondary);
  }
`;

const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: var(--vkui--color_background_secondary);
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const EventImage = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 16px;
  background: linear-gradient(135deg, #67b5ff 0%, #3d88ff 100%);
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const EventTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--vkui--color_text_primary);
  margin: 0;
`;

const EventMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  color: var(--vkui--color_text_secondary);
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    flex-shrink: 0;
    width: 10px;
    height: 10px;
  }
`;

const EventActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export function SecondPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const events = [
    {
      id: 1,
      title: "Вечер караоке",
      date: "27/06/26",
      time: "18:00",
      place: "Круглосветский сад",
      image: volleyballImg,
    },
    {
      id: 2,
      title: "Вечернее караоке",
      date: "28/06/26",
      time: "10:00",
      place: "Караоке-клуб 'Голос'",
      image: karaokeImg,
    },
    {
      id: 3,
      title: "Пикник в лесу",
      date: "30/06/26",
      time: "12:00",
      place: "Лес за городом",
      image: picnicImg,
    },
  ];

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.place.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <PageContainer>
      <SearchContainer>
        <Icon28SearchOutline />
        <SearchInput
          type="text"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Поиск событий"
        />
      </SearchContainer>

      <EventsList>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id}>
              <EventImage>{event.image && <img src={event.image} alt={event.title} />}</EventImage>

              <EventTitle>{event.title}</EventTitle>

              <EventMeta>
                <MetaRow>
                  <Icon28CalendarOutline />
                  <span>{event.date}</span>
                </MetaRow>
                <MetaRow>
                  <Icon28ClockOutline />
                  <span>{event.time}</span>
                </MetaRow>
                <MetaRow>
                  <Icon28PlaceOutline />
                  <span>{event.place}</span>
                </MetaRow>
              </EventMeta>

              <EventActions>
                <Button size="m" mode="primary" stretched>
                  Не сейчас
                </Button>
                <Button size="m" mode="primary" stretched>
                  Присоедениться
                </Button>
              </EventActions>
            </EventCard>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "var(--vkui--color_text_secondary)",
            }}
          >
            Ничего не найдено
          </div>
        )}
      </EventsList>
    </PageContainer>
  );
}
