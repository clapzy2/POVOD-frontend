// import styled from "@emotion/styled";
// import { useState } from "react";
// import { Button } from "@vkontakte/vkui";
// import {
//   Icon28CalendarOutline,
//   Icon28ClockOutline,
//   Icon28PlaceOutline,
//   Icon28SearchOutline,
// } from "@vkontakte/icons";
// import volleyballImg from "../../assets/images/volleyball.png";
// import karaokeImg from "../../assets/images/karaoke.png";
// import picnicImg from "../../assets/images/picnic.jpg";

// const PageContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   padding: 20px 18px 24px;
//   min-height: 100%;
//   background: var(--vkui--color_background_primary);
// `;

// const PageLabel = styled.span`
//   font-size: 14px;
//   font-weight: 600;
//   color: var(--vkui--color_text_secondary);
// `;

// const SearchContainer = styled.div`
//   display: flex;
//   gap: 8px;
//   align-items: center;
//   padding: 12px 14px;
//   background: var(--vkui--color_background_secondary);
//   border-radius: 16px;
//   border: 1px solid var(--vkui--color_separator_primary_alpha);
// `;

// const SearchInput = styled.input`
//   flex: 1;
//   border: none;
//   background: transparent;
//   font-size: 15px;
//   color: var(--vkui--color_text_primary);
//   outline: none;

//   &::placeholder {
//     color: var(--vkui--color_text_secondary);
//   }
// `;

// const EventsList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `;

// const EventCard = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
//   padding: 16px;
//   background: var(--vkui--color_background_secondary);
//   border-radius: 20px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
// `;

// const EventImage = styled.div`
//   width: 100%;
//   height: 160px;
//   border-radius: 16px;
//   background: linear-gradient(135deg, #67b5ff 0%, #3d88ff 100%);
//   overflow: hidden;
//   position: relative;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     display: block;
//   }
// `;

// const EventTitle = styled.h3`
//   font-size: 16px;
//   font-weight: 600;
//   color: var(--vkui--color_text_primary);
//   margin: 0;
// `;

// const EventMeta = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
//   font-size: 13px;
//   color: var(--vkui--color_text_secondary);
// `;

// const MetaRow = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;

//   svg {
//     flex-shrink: 0;
//     width: 10px;
//     height: 10px;
//   }
// `;

// const EventActions = styled.div`
//   display: flex;
//   gap: 8px;
//   margin-top: 8px;
// `;

// export function SecondPage() {
//   const [searchQuery, setSearchQuery] = useState("");

//   const events = [
//     {
//       id: 1,
//       title: "Вечер караоке",
//       date: "27/06/26",
//       time: "18:00",
//       place: "Круглосветский сад",
//       image: volleyballImg,
//     },
//     {
//       id: 2,
//       title: "Вечернее караоке",
//       date: "28/06/26",
//       time: "10:00",
//       place: "Караоке-клуб 'Голос'",
//       image: karaokeImg,
//     },
//     {
//       id: 3,
//       title: "Пикник в лесу",
//       date: "30/06/26",
//       time: "12:00",
//       place: "Лес за городом",
//       image: picnicImg,
//     },
//   ];

//   const filteredEvents = events.filter(
//     (event) =>
//       event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       event.place.toLowerCase().includes(searchQuery.toLowerCase()),
//   );

//   return (
//     <PageContainer>
//       <SearchContainer>
//         <Icon28SearchOutline />
//         <SearchInput
//           type="text"
//           placeholder="Поиск..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           aria-label="Поиск событий"
//         />
//       </SearchContainer>

//       <EventsList>
//         {filteredEvents.length > 0 ? (
//           filteredEvents.map((event) => (
//             <EventCard key={event.id}>
//               <EventImage>{event.image && <img src={event.image} alt={event.title} />}</EventImage>

//               <EventTitle>{event.title}</EventTitle>

//               <EventMeta>
//                 <MetaRow>
//                   <Icon28CalendarOutline />
//                   <span>{event.date}</span>
//                 </MetaRow>
//                 <MetaRow>
//                   <Icon28ClockOutline />
//                   <span>{event.time}</span>
//                 </MetaRow>
//                 <MetaRow>
//                   <Icon28PlaceOutline />
//                   <span>{event.place}</span>
//                 </MetaRow>
//               </EventMeta>

//               <EventActions>
//                 <Button size="m" mode="primary" stretched>
//                   Не сейчас
//                 </Button>
//                 <Button size="m" mode="primary" stretched>
//                   Присоедениться
//                 </Button>
//               </EventActions>
//             </EventCard>
//           ))
//         ) : (
//           <div
//             style={{
//               textAlign: "center",
//               padding: "40px 20px",
//               color: "var(--vkui--color_text_secondary)",
//             }}
//           >
//             Ничего не найдено
//           </div>
//         )}
//       </EventsList>
//     </PageContainer>
//   );
// }
import styled from "@emotion/styled";
import { useState } from "react";
import { Button, IconButton } from "@vkontakte/vkui";
import {
  Icon28CalendarOutline,
  Icon28PlaceOutline,
  Icon28CameraOutline,
  Icon28PictureOutline,
  Icon28UsersOutline,
} from "@vkontakte/icons";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 0 24px;
  background: #f0f4f9; /* Светло-голубой фон как на макете */
  min-height: 100vh;
  font-family: -apple-system, system-ui, Helvetica, Arial, sans-serif;
`;

const Header = styled.div`
  background: #2d81e0 !important;
  padding: 40px 16px 16px;
  border-radius: 0 0 12px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;
const THeader = styled.div`
  background: #2d81e0;
  padding: 20px 16px;
  margin: -16px -16px 16px -16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: 700;
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

const FormCard = styled.div`
  background: white;
  margin: 0 12px;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Tabs = styled.div`
  display: flex;
  background: #ebeef2;
  padding: 4px;
  border-radius: 10px;
  margin-bottom: 8px;
`;

const Tab = styled.div<{ active?: boolean }>`
  flex: 1;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  background: ${(props) => (props.active ? "#828e9a" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#818c99")};
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 13px;
  color: #818c99;
  margin-left: 4px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #b2d1f0;
  background: #f2f7ff;
  font-size: 15px;
  outline: none;
  &::placeholder {
    color: #99a2ad;
  }
`;

const DateTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.div<{ active?: boolean }>`
  padding: 6px 12px;
  border-radius: 20px;
  background: white;
  border: 1px solid #e1e3e6;
  font-size: 13px;
  color: #6d7885;
`;

const PhotoButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const PhotoBtn = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: #e1e3e6;
  color: #6d7885;
  font-weight: 500;
`;

const SubmitButton = styled(Button)`
  margin: 12px;
  height: 44px;
  border-radius: 10px;
  background-color: #2d81e0 !important;
`;

export function SecondPage() {
  const interests = [
    "Спорт",
    "Искусство",
    "Путешествия",
    "IT",
    "Компьютерные игры",
    "Технологии",
    "Еда",
    "Настольные игры",
    "Наука",
    "Музыка",
    "Саморазвитие",
    "Образование",
    "Кино",
    "Шопинг",
    "Ресторан",
    "Музей",
    "Отдых",
  ];

  return (
    <PageContainer>
      {/* <Header>
        <div style={{ width: 28 }} />
        <HeaderTitle>Создать повод</HeaderTitle>
        <IconButton style={{ color: "white" }}>
          <Icon28CalendarOutline width={24} height={24} />
        </IconButton>
      </Header> */}
      <THeader>Создать повод</THeader>

      <FormCard>
        <Tabs>
          <Tab active>Точный повод</Tab>
          <Tab>Идея</Tab>
        </Tabs>

        <FieldGroup>
          <Label>Название события *</Label>
          <Input placeholder="Поход в кино" />
        </FieldGroup>

        <FieldGroup>
          <Label>Описание *</Label>
          <Input placeholder="Расскажи, чего ожидать..." />
        </FieldGroup>

        <DateTimeContainer>
          <Label>Дата и время *</Label>
          <div style={{ position: "relative" }}>
            <Input
              style={{ width: "100%", boxSizing: "border-box", paddingLeft: "40px" }}
              value="26 июня 2026 г."
              readOnly
            />
            <Icon28CalendarOutline
              width={20}
              style={{ position: "absolute", left: 12, top: 12, color: "#99a2ad" }}
            />
          </div>
          <TimeRow>
            <Input style={{ flex: 1, textAlign: "center" }} value="16:00" />
            <span style={{ color: "#b2d1f0" }}>—</span>
            <Input style={{ flex: 1, textAlign: "center" }} value="18:00" />
          </TimeRow>
        </DateTimeContainer>

        <FieldGroup>
          <Label>Интересы *</Label>
          <TagCloud>
            {interests.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </TagCloud>
        </FieldGroup>

        <FieldGroup>
          <Label>Место *</Label>
          <div style={{ position: "relative" }}>
            <Input
              style={{ width: "100%", boxSizing: "border-box", paddingLeft: "40px" }}
              placeholder="Полный адрес или ссылка"
            />
            <Icon28PlaceOutline
              width={20}
              style={{ position: "absolute", left: 12, top: 12, color: "#99a2ad" }}
            />
          </div>
        </FieldGroup>

        <FieldGroup>
          <Label>Добавить фото</Label>
          <PhotoButtons>
            <PhotoBtn>
              <Icon28PictureOutline width={20} /> Из галереи
            </PhotoBtn>
            <PhotoBtn style={{ background: "#99a2ad", color: "white" }}>
              <Icon28CameraOutline width={20} /> Сделать фото
            </PhotoBtn>
          </PhotoButtons>
        </FieldGroup>

        <FieldGroup>
          <Label>Формат события</Label>
          <div style={{ display: "flex", gap: 8 }}>
            <Button size="m" mode="secondary" stretched>
              Закрытое
            </Button>
            <Button size="m" mode="secondary" stretched>
              Публичное
            </Button>
          </div>
        </FieldGroup>

        <Button
          before={<Icon28UsersOutline width={20} />}
          size="l"
          mode="primary"
          stretched
          style={{ borderRadius: 10 }}
        >
          Добавить участников +
        </Button>
      </FormCard>

      <SubmitButton size="l" mode="primary">
        Отправить повод
      </SubmitButton>
    </PageContainer>
  );
}
