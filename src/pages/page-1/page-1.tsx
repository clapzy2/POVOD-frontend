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
import { OpenFilterIcon } from "../../icons/icons";
import { useNavigate } from "react-router-dom";

import {
  InterestsFilter,
  DateFilter,
  TimeFilter,
  LocationFilter,
  type FilterOption,
} from "../../components/Filters";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 18px 24px;
  min-height: 100%;
  background: var(--vkui--color_background_primary);
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

const FiltersContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: #f2f3f5;
  border: 1px solid #2d81e0;
  border-radius: 10px;
  cursor: pointer;
  color: #2d81e0;
  white-space: nowrap;
  &:active {
    opacity: 0.8;
  }
`;

const FilterButton = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #2d81e0;
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
  }
`;
const EventTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;
const EventMeta = styled.div`
  display: flex;
  gap: 10px 14px;
  font-size: 13px;
  color: var(--vkui--color_text_secondary);
`;
const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const EventActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;
const INITIAL_EVENTS = [
  {
    id: 1,
    title: "Пляжный волейбол",
    date: "27/06/26",
    time: "18:00",
    place: "Круглотский сад",
    image: volleyballImg,
    category: "Спорт",
  },
  {
    id: 2,
    title: "Вечернее караоке",
    date: "28/06/26",
    time: "22:00",
    place: "Караоке-клуб 'Голос'",
    image: karaokeImg,
    category: "Музыка",
  },
  {
    id: 3,
    title: "Пикник в лесу",
    date: "30/06/26",
    time: "12:00",
    place: "Лес за городом",
    image: picnicImg,
    category: "Отдых",
  },
];

export function FirstPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [filters, setFilters] = useState({
    date: "",
    location: "",
    startTime: "",
    endTime: "",
  });
  const handleApplyDate = (date: string) => setFilters((prev) => ({ ...prev, date }));
  const handleApplyLocation = (loc: string) => setFilters((prev) => ({ ...prev, location: loc }));
  const handleApplyTime = (start: string, end: string) =>
    setFilters((prev) => ({ ...prev, startTime: start, endTime: end }));

  const [activeModal, setActiveModal] = useState<"interests" | "date" | "time" | "place" | null>(
    null,
  );

  const [interestOptions, setInterestOptions] = useState<FilterOption[]>([
    { id: "1", label: "Спорт", selected: false },
    { id: "2", label: "Искусство", selected: false },
    { id: "3", label: "Путешествия", selected: false },
    { id: "4", label: "IT", selected: false },
    { id: "5", label: "Компьютерные игры", selected: false },
    { id: "6", label: "Технологии", selected: false },
    { id: "7", label: "Еда", selected: false },
    { id: "8", label: "Настольные игры", selected: false },
    { id: "9", label: "Наука", selected: false },
    { id: "10", label: "Музыка", selected: false },
    { id: "11", label: "Саморазвитие", selected: false },
    { id: "12", label: "Образование", selected: false },
    { id: "13", label: "Кино", selected: false },
    { id: "14", label: "Шопинг", selected: false },
    { id: "15", label: "Ресторан", selected: false },
    { id: "16", label: "Музей", selected: false },
    { id: "17", label: "Отдых", selected: false },
  ]);

  const handleToggleInterest = (id: string) => {
    setInterestOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, selected: !opt.selected } : opt)),
    );
  };

  // const filteredEvents = INITIAL_EVENTS.filter((event) => {
  //   const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());

  //   const selectedLabels = interestOptions.filter((o) => o.selected).map((o) => o.label);
  //   const matchesCategory = selectedLabels.length === 0 || selectedLabels.includes(event.category);

  //   const matchesDate = !filters.date || event.date === filters.date;

  //   const matchesPlace =
  //     !filters.location || event.place.toLowerCase().includes(filters.location.toLowerCase());

  //   const matchesTime =
  //     !filters.startTime ||
  //     !filters.endTime ||
  //     (event.time >= filters.startTime && event.time <= filters.endTime);

  //   return matchesSearch && matchesCategory && matchesDate && matchesPlace && matchesTime;
  // });

  const selectedInterests = interestOptions.filter((opt) => opt.selected).map((opt) => opt.label);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedInterests.length === 0 || selectedInterests.includes(event.category);

    const matchesDate =
      !filters.date || event.date === filters.date.replace(/\./g, "/").replace("/20", "/");

    const matchesPlace =
      !filters.location ||
      event.place.toLowerCase().trim().includes(filters.location.toLowerCase().trim());

    const matchesTime =
      !filters.startTime ||
      !filters.endTime ||
      (event.time >= filters.startTime && event.time <= filters.endTime);

    return matchesSearch && matchesCategory && matchesDate && matchesPlace && matchesTime;
  });
  console.log("Фильтр даты:", filters.date);
  console.log("Дата события:", events[0].date);
  console.log("Совпадение?:", events[0].date === filters.date);

  const handleHideEvent = (id: number) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <PageContainer>
      <SearchContainer>
        <Icon28SearchOutline />
        <SearchInput
          type="text"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>

      <FiltersContainer>
        <FilterWrapper onClick={() => setActiveModal("interests")}>
          <FilterButton>Интересы</FilterButton>
          <OpenFilterIcon />
        </FilterWrapper>

        <FilterWrapper onClick={() => setActiveModal("date")}>
          <FilterButton>Дата</FilterButton>
          <OpenFilterIcon />
        </FilterWrapper>

        <FilterWrapper onClick={() => setActiveModal("time")}>
          <FilterButton>Время</FilterButton>
          <OpenFilterIcon />
        </FilterWrapper>

        <FilterWrapper onClick={() => setActiveModal("place")}>
          <FilterButton>Место</FilterButton>
          <OpenFilterIcon />
        </FilterWrapper>
      </FiltersContainer>

      <EventsList>
        {filteredEvents.map((event) => (
          <EventCard key={event.id} onClick={() => navigate(`/page-1/${event.id}`)}>
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
              <Button
                size="m"
                mode="tertiary"
                stretched
                onClick={(e) => {
                  e.stopPropagation();
                  handleHideEvent(event.id);
                }}
              >
                Не сейчас
              </Button>
              <Button
                size="m"
                mode="primary"
                stretched
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/page-1/${event.id}`);
                }}
              >
                Присоединиться
              </Button>
            </EventActions>
          </EventCard>
        ))}
      </EventsList>

      <InterestsFilter
        isOpen={activeModal === "interests"}
        onClose={() => setActiveModal(null)}
        options={interestOptions}
        onToggle={handleToggleInterest}
      />
      <DateFilter
        isOpen={activeModal === "date"}
        onClose={() => setActiveModal(null)}
        onSave={handleApplyDate}
      />

      <LocationFilter
        isOpen={activeModal === "place"}
        onClose={() => setActiveModal(null)}
        onSave={handleApplyLocation}
      />

      <TimeFilter
        isOpen={activeModal === "time"}
        onClose={() => setActiveModal(null)}
        onSave={handleApplyTime}
      />
    </PageContainer>
  );
}
