// import React, { useState, useEffect, useRef } from "react";
// import {
//   AppRoot,
//   SplitLayout,
//   SplitCol,
//   View,
//   Panel,
//   Group,
//   SimpleCell,
//   Button,
//   Text,
//   Title,
//   Spacing,
//   Separator,
// } from "@vkontakte/vkui";
// import {
//   Icon28CalendarOutline,
//   Icon28PlaceOutline,
//   Icon28UsersOutline,
//   Icon24Done,
// } from "@vkontakte/icons";
// import "@vkontakte/vkui/dist/vkui.css";

// const EventMap: React.FC<{ coords: [number, number] }> = ({ coords }) => {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const leafletInstance = useRef<any>(null);

//   useEffect(() => {
//     const loadLeaflet = () => {
//       if (!(window as any).L) {
//         const link = document.createElement("link");
//         link.rel = "stylesheet";
//         link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
//         document.head.appendChild(link);

//         const script = document.createElement("script");
//         script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
//         script.onload = init;
//         document.body.appendChild(script);
//       } else {
//         init();
//       }
//     };

//     const init = () => {
//       const L = (window as any).L;
//       if (!L || !mapRef.current || leafletInstance.current) return;

//       leafletInstance.current = L.map(mapRef.current, {
//         attributionControl: false,
//         zoomControl: false,
//       }).setView(coords, 14);

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
//         leafletInstance.current,
//       );

//       const customIcon = L.divIcon({
//         className: "custom-div-icon",
//         html: `<div style="background-color:var(--vkui--color_background_accent); width:12px; height:12px; border-radius:50%; border:3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
//         iconSize: [12, 12],
//         iconAnchor: [6, 6],
//       });

//       L.marker(coords, { icon: customIcon }).addTo(leafletInstance.current);
//     };

//     loadLeaflet();
//     return () => {
//       if (leafletInstance.current) {
//         leafletInstance.current.remove();
//         leafletInstance.current = null;
//       }
//     };
//   }, [coords]);

//   return (
//     <div
//       ref={mapRef}
//       style={{
//         width: "100%",
//         height: "200px",
//         borderRadius: "12px",
//         overflow: "hidden",
//         border: "1px solid var(--vkui--color_separator_primary_alpha)",
//       }}
//     />
//   );
// };

// // export function ThirdPage() {
// //   const [participants, setParticipants] = useState(124);
// //   const [isJoined, setIsJoined] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   const eventData = {
// //     title: "Весенняя рыбалка 2024",
// //     description:
// //       "Традиционный выезд на Озеро Светлое. В программе: ловля окуня, мастер-класс по фидеру и горячая уха.",
// //     location: "Озеро Светлое, сектор Б",
// //     date: "18 мая, воскресенье",
// //     coords: [55.912, 37.734] as [number, number],
// //   };

// //   const handleAction = () => {
// //     if (isJoined) return;
// //     setLoading(true);
// //     setTimeout(() => {
// //       setParticipants((prev) => prev + 1);
// //       setIsJoined(true);
// //       setLoading(false);
// //     }, 1000);
// //   };

// //   return (
// //     <AppRoot>
// //       <SplitLayout header={<PanelHeader />}>
// //         <SplitCol autoSpaced maxWidth={500}>
// //           <View activePanel="main">
// //             <Panel id="main">
// //               <PanelHeader>Событие</PanelHeader>

// //               <Group>
// //                 <Banner
// //                   mode="image"
// //                   size="m"
// //                   title={eventData.title}
// //                   subtitle={eventData.description}
// //                   background={
// //                     <div
// //                       style={{
// //                         backgroundColor: "var(--vkui--color_background_accent)",
// //                         backgroundImage: "linear-gradient(135deg, #0077FF 0%, #0052cc 100%)",
// //                         width: "100%",
// //                         height: "100%",
// //                       }}
// //                     />
// //                   }
// //                 />

// //                 <Spacing size={16} />

// //                 {/* Информационные ячейки — SimpleCell стабилен во всех версиях */}
// //                 <SimpleCell before={<Icon28CalendarOutline />} subtitle="Дата и время">
// //                   {eventData.date}
// //                 </SimpleCell>

// //                 <SimpleCell before={<Icon28PlaceOutline />} subtitle="Место проведения">
// //                   {eventData.location}
// //                 </SimpleCell>

// //                 <SimpleCell before={<Icon28UsersOutline />} subtitle="Список участников">
// //                   {participants} человек записались
// //                 </SimpleCell>

// //                 <Spacing size={12} />
// //                 <Separator />

// //                 {/* Заменяем зачеркнутый <Div> на обычный <div> с отступами VKUI */}
// //                 <div style={{ padding: "12px 16px" }}>
// //                   <Title level="3" weight="2" style={{ marginBottom: 12 }}>
// //                     Место на карте
// //                   </Title>
// //                   <EventMap coords={eventData.coords} />
// //                 </div>

// //                 <div style={{ padding: "12px 16px" }}>
// //                   <Button
// //                     size="l"
// //                     stretched
// //                     loading={loading}
// //                     onClick={handleAction}
// //                     mode={isJoined ? "outline" : "primary"}
// //                     before={isJoined ? <Icon24Done /> : null}
// //                   >
// //                     {isJoined ? "Вы записаны" : "Записаться на событие"}
// //                   </Button>
// //                 </div>

// //                 <Separator />

// //                 <div style={{ padding: "16px", textAlign: "center" }}>
// //                   <Text
// //                     weight="3"
// //                     style={{ color: "var(--vkui--color_text_secondary)", fontSize: 13 }}
// //                   >
// //                     Организовано сообществом рыболовов
// //                   </Text>
// //                 </div>
// //               </Group>
// //             </Panel>
// //           </View>
// //         </SplitCol>
// //       </SplitLayout>
// //     </AppRoot>
// //   );
// // }
// export function ThirdPage() {
//   const [participants, setParticipants] = useState(124);
//   const [isJoined, setIsJoined] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const eventData = {
//     title: "Весенняя рыбалка 2024",
//     description:
//       "Традиционный выезд на Озеро Светлое. В программе: ловля окуня, мастер-класс по фидеру и горячая уха.",
//     location: "Озеро Светлое, сектор Б",
//     date: "18 мая, воскресенье",
//     coords: [55.912, 37.734] as [number, number],
//   };

//   const handleAction = () => {
//     if (isJoined) return;
//     setLoading(true);
//     setTimeout(() => {
//       setParticipants((prev) => prev + 1);
//       setIsJoined(true);
//       setLoading(false);
//     }, 1000);
//   };

//   return (
//     <AppRoot>
//       <SplitLayout>
//         <SplitCol autoSpaced maxWidth={500}>
//           <View activePanel="main">
//             <Panel id="main">
//               {/* Убрали PanelHeader отсюда */}

//               <Group>
//                 {/* Убрали Banner отсюда */}

//                 <Spacing size={16} />

//                 <SimpleCell before={<Icon28CalendarOutline />} subtitle="Дата и время">
//                   {eventData.date}
//                 </SimpleCell>

//                 <SimpleCell before={<Icon28PlaceOutline />} subtitle="Место проведения">
//                   {eventData.location}
//                 </SimpleCell>

//                 <SimpleCell before={<Icon28UsersOutline />} subtitle="Список участников">
//                   {participants} человек записались
//                 </SimpleCell>

//                 <Spacing size={12} />
//                 <Separator />

//                 <div style={{ padding: "12px 16px" }}>
//                   <Title level="3" weight="2" style={{ marginBottom: 12 }}>
//                     Место на карте
//                   </Title>
//                   <EventMap coords={eventData.coords} />
//                 </div>

//                 <div style={{ padding: "12px 16px" }}>
//                   <Button
//                     size="l"
//                     stretched
//                     loading={loading}
//                     onClick={handleAction}
//                     mode={isJoined ? "outline" : "primary"}
//                     before={isJoined ? <Icon24Done /> : null}
//                   >
//                     {isJoined ? "Вы записаны" : "Записаться на событие"}
//                   </Button>
//                 </div>

//                 <Separator />

//                 <div style={{ padding: "16px", textAlign: "center" }}>
//                   <Text
//                     weight="3"
//                     style={{ color: "var(--vkui--color_text_secondary)", fontSize: 13 }}
//                   >
//                     Организовано сообществом рыболовов
//                   </Text>
//                 </div>
//               </Group>
//             </Panel>
//           </View>
//         </SplitCol>
//       </SplitLayout>
//     </AppRoot>
//   );
// }

import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Icon28CalendarOutline,
  Icon28ClockOutline,
  Icon28PlaceOutline,
  Icon28SearchOutline,
} from "@vkontakte/icons";
import {
  DateFilter,
  InterestsFilter,
  LocationFilter,
  TimeFilter,
  type FilterOption,
} from "../../components/Filters";
import NavMenu from "../../components/NavMenu";
import { OpenFilterIcon } from "../../icons/icons";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  background-color: transparent;
  min-height: 100vh;
  padding-bottom: 100px; /* Space for NavMenu */
`;

const ContentPadding = styled.div`
  padding: 0 16px;
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

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 12px;
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const EventImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 12px;
  object-fit: cover;
`;

const EventInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const EventTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 17px;
  font-weight: 700;
  color: #000;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #818c99;
  font-size: 13px;
  margin-bottom: 4px;
`;

const ActionButton = styled.button`
  background-color: #2d81e0;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  font-size: 15px;
  font-weight: 600;
  margin-top: 8px;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 14px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: #838c98;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
  &:active {
    opacity: 0.8;
  }
`;

const FilterButton = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: var(--vkui--color_text_contrast);
`;

const MOCK_EVENTS = [
  {
    id: 11,
    title: "Настольные игры",
    date: "19/06/26",
    time: "16:00",
    location: "Эрудит",
    category: "Настольные игры",
    image:
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: 12,
    title: "Кофе на Восстания",
    date: "23/06/26",
    time: "08:30",
    location: "Кофейня",
    category: "Еда",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: 13,
    title: 'Премьера "Человек-паук"',
    date: "31/07/26",
    time: "10:00",
    location: "Кинотеатр",
    category: "Кино",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANdDA6Sll7S-S1L5N_q6-F1vXm-X3G8YvA",
  },
];

export default function SignUpEventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    date: "",
    location: "",
    startTime: "",
    endTime: "",
  });

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

  const [activeModal, setActiveModal] = useState<"interests" | "date" | "time" | "place" | null>(
    null,
  );

  const handleApplyDate = (date: string) => setFilters((prev) => ({ ...prev, date }));
  const handleApplyLocation = (loc: string) => setFilters((prev) => ({ ...prev, location: loc }));
  const handleApplyTime = (start: string, end: string) =>
    setFilters((prev) => ({ ...prev, startTime: start, endTime: end }));

  const handleToggleInterest = (id: string) => {
    setInterestOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, selected: !opt.selected } : opt)),
    );
  };

  const selectedInterests = interestOptions.filter((opt) => opt.selected).map((opt) => opt.label);

  const filteredEvents = MOCK_EVENTS.filter((event) => {
    const matchesCategory =
      selectedInterests.length === 0 || selectedInterests.includes(event.category);

    const formattedFilterDate = filters.date
      ? filters.date.replace(/\./g, "/").replace("/202", "/2")
      : "";
    const matchesDate = !filters.date || event.date === formattedFilterDate;

    const matchesPlace =
      !filters.location ||
      event.location.toLowerCase().includes(filters.location.toLowerCase().trim());

    const matchesTime =
      (!filters.startTime || event.time >= filters.startTime) &&
      (!filters.endTime || event.time <= filters.endTime);

    return matchesCategory && matchesDate && matchesPlace && matchesTime;
  });

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

      <ContentPadding style={{ marginTop: "16px" }}>
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

        {/* {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Card key={event.id}>
              <EventImage src={event.image} alt={event.title} />
              <EventInfo>
                <div>
                  <EventTitle>{event.title}</EventTitle>
                  <DetailRow>
                    <Icon28CalendarOutline width={16} height={16} /> {event.date}
                  </DetailRow>
                  <DetailRow>
                    <Icon28ClockOutline width={16} height={16} /> {event.time}
                  </DetailRow>
                  <DetailRow>
                    <Icon28PlaceOutline width={16} height={16} /> {event.location}
                  </DetailRow>
                </div>
                <ActionButton>Перейти к поводу</ActionButton>
              </EventInfo>
            </Card>
          ))
        ) : (
          <div style={{ textAlign: "center", color: "#818c99", marginTop: "40px" }}>
            Поводы не найдены
          </div>
        )}
          
      </ContentPadding> */}
        {filteredEvents.map((event) => (
          <Card key={event.id}>
            <EventImage src={event.image} alt={event.title} />
            <EventInfo>
              <div>
                <EventTitle>{event.title}</EventTitle>
                <DetailRow>
                  <Icon28CalendarOutline width={16} height={16} /> {event.date}
                </DetailRow>
                <DetailRow>
                  <Icon28ClockOutline width={16} height={16} /> {event.time}
                </DetailRow>
                <DetailRow>
                  <Icon28PlaceOutline width={16} height={16} /> {event.location}
                </DetailRow>
              </div>

              <ActionButton onClick={() => navigate(`/page-1/${event.id}`)}>
                Перейти к поводу
              </ActionButton>
            </EventInfo>
          </Card>
        ))}

        {filteredEvents.length === 0 && (
          <div style={{ textAlign: "center", color: "#818c99", marginTop: "20px" }}>
            Поводы не найдены
          </div>
        )}
      </ContentPadding>

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

      <TimeFilter
        isOpen={activeModal === "time"}
        onClose={() => setActiveModal(null)}
        onSave={handleApplyTime}
      />

      <LocationFilter
        isOpen={activeModal === "place"}
        onClose={() => setActiveModal(null)}
        onSave={handleApplyLocation}
      />

      <NavMenu />
    </PageContainer>
  );
}
