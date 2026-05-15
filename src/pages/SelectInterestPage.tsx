// import { useEffect, useMemo, useState } from "react";
// import styled from "@emotion/styled";
// import { Button, Title, Text } from "@vkontakte/vkui";
// import { Icon28UsersOutline } from "@vkontakte/icons";
// import { useNavigate } from "react-router-dom";

// const PageContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 22px;
//   min-height: 100%;
//   padding: 22px 18px 24px;
//   background: var(--vkui--color_background_primary);
// `;

// const HeaderBlock = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const InfoRow = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   color: var(--vkui--color_text_secondary);
// `;

// const ChipsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, minmax(0, 1fr));
//   gap: 12px;
// `;

// const ChipButton = styled.button<{ $selected: boolean }>`
//   width: 100%;
//   appearance: none;
//   border: none;
//   border-radius: 18px;
//   padding: 14px 16px;
//   background: ${(props) =>
//     props.$selected ? "#3369FF" : "var(--vkui--color_background_secondary)"};
//   color: ${(props) => (props.$selected ? "#FFFFFF" : "var(--vkui--color_text_primary)")};
//   font-size: 14px;
//   font-weight: 600;
//   text-align: left;
//   cursor: pointer;
//   transition:
//     transform 0.15s ease,
//     background 0.2s ease,
//     color 0.2s ease;

//   &:hover {
//     transform: translateY(-1px);
//     background: ${(props) => (props.$selected ? "#295bd8" : "#F3F6FF")};
//   }
// `;

// const Footer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 14px;
// `;

// const SummaryCard = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 12px;
//   padding: 16px;
//   border-radius: 20px;
//   background: var(--vkui--color_background_secondary);
//   box-shadow: 0 8px 20px rgba(51, 105, 255, 0.08);
// `;

// const SummaryInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 6px;
// `;

// const SummaryTitle = styled(Title)`
//   margin: 0;
//   font-size: 16px;
//   line-height: 1.2;
// `;

// const SummaryText = styled(Text)`
//   margin: 0;
//   color: var(--vkui--color_text_secondary);
// `;

// const InterestButton = styled(Button)`
//   width: 100%;
// `;

// const categories = [
//   { id: "sport", label: "Спорт" },
//   { id: "music", label: "Музыка" },
//   { id: "travel", label: "Путешествия" },
//   { id: "games", label: "Игры" },
//   { id: "tech", label: "Технологии" },
//   { id: "cooking", label: "Кулинария" },
//   { id: "cinema", label: "Кино" },
//   { id: "health", label: "Здоровье" },
// ];

// export function SelectInterestPage() {
//   const [selected, setSelected] = useState<string[]>(["sport", "music", "travel"]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("isAuth") === "true") {
//       //   navigate("/page-1", { replace: true });
//     }
//   }, [navigate]);

//   const selectedCount = selected.length;

//   const description = useMemo(() => {
//     if (selectedCount === 0) {
//       return "Выберите хотя бы один интерес, чтобы мы подобрали подходящие события.";
//     }

//     if (selectedCount <= 3) {
//       return `Выбрано ${selectedCount} ${selectedCount === 1 ? "интерес" : "интереса"}.`;
//     }

//     return `Выбрано ${selectedCount} интересов.`;
//   }, [selectedCount]);

//   const toggleCategory = (id: string) => {
//     setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
//   };
//   const handleContinue = () => {
//     localStorage.setItem("isAuth", "true");
//     navigate("/page-1", { replace: true });
//   };

//   return (
//     <PageContainer>
//       <HeaderBlock>
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <Icon28UsersOutline width={24} height={24} />
//           <Text weight="3" style={{ fontSize: 14, color: "var(--vkui--color_text_secondary)" }}>
//             Профиль
//           </Text>
//         </div>
//         <Title level="1" weight="2">
//           Выберите интересы
//         </Title>
//         <Text style={{ color: "var(--vkui--color_text_secondary)", fontSize: 15, lineHeight: 1.6 }}>
//           Мы подберем для вас события, сообщества и активности по вашим любимым темам.
//         </Text>
//       </HeaderBlock>

//       <ChipsGrid>
//         {categories.map((category) => (
//           <ChipButton
//             key={category.id}
//             type="button"
//             $selected={selected.includes(category.id)}
//             onClick={() => toggleCategory(category.id)}
//           >
//             {category.label}
//           </ChipButton>
//         ))}
//       </ChipsGrid>

//       <Footer>
//         <SummaryCard>
//           <SummaryInfo>
//             <SummaryTitle weight="2">
//               {selectedCount} интерес{selectedCount === 1 ? "а" : "ов"}
//             </SummaryTitle>
//             <SummaryText>{description}</SummaryText>
//           </SummaryInfo>
//           <div style={{ width: 40, height: 40, borderRadius: 14, background: "#E8F0FF" }} />
//         </SummaryCard>

//         <InterestButton size="l" mode="primary" onClick={handleContinue}>
//           Продолжить
//         </InterestButton>
//       </Footer>
//     </PageContainer>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Button, Title, Text, Input } from "@vkontakte/vkui";
import { Icon16Place } from "@vkontakte/icons";
import { useNavigate } from "react-router-dom";
import { useInterestForm } from "../components/ComponentShowcase/useInterestForm";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 83vh;
  padding: 32px 20px;
  background: transparent;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled(Title)`
  color: #3388ee; /* Синий цвет заголовков */
  font-size: 22px !important;
`;

/* Контейнер для чипсов с flex-wrap для эффекта "облака" */
const ChipsFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ChipButton = styled.button<{ $selected: boolean }>`
  appearance: none;
  border: 1px solid ${(props) => (props.$selected ? "#3388ee" : "#e1e4e8")};
  border-radius: 12px;
  padding: 8px 16px;
  background: ${(props) => (props.$selected ? "#3388ee" : "#ffffff")};
  color: ${(props) => (props.$selected ? "#ffffff" : "#919cb5")};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputWrapper = styled.div`
  position: relative;
  .vkuiInput__el {
    padding-left: 36px;
    background: #f2f3f5;
    // border: 1px solid #3388ee;
  }
`;

const RangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .vkuiInput {
    flex: 1;
    background: #f2f3f5;
    border: 1px solid #3388ee;
    border-radius: 8px;
  }
`;

const Footer = styled.div`
  margin-top: auto;
  padding-top: 20px;
`;

const categories = [
  { id: "sport", label: "Спорт" },
  { id: "art", label: "Искусство" },
  { id: "travel", label: "Путешествие" },
  { id: "it", label: "IT" },
  { id: "games", label: "Компьютерные игры" },
  { id: "tech", label: "Технологии" },
  { id: "food", label: "Еда" },
  { id: "board_games", label: "Настольные игры" },
  { id: "science", label: "Наука" },
  { id: "music", label: "Музыка" },
  { id: "self_dev", label: "Саморазвитие" },
  { id: "edu", label: "Образование" },
  { id: "cinema", label: "Кино" },
  { id: "shopping", label: "Шопинг" },
  { id: "restaurant", label: "Ресторан" },
  { id: "museum", label: "Музей" },
  { id: "rest", label: "Отдых" },
];

export function SelectInterestPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  //   const [peopleFrom, setPeopleFrom] = useState("2");
  //   const [peopleTo, setPeopleTo] = useState("100");

  const {
    peopleFrom,
    setPeopleFrom,
    peopleTo,
    setPeopleTo,
    handleBlurFrom,
    handleBlurTo,
    isValid,
  } = useInterestForm();

  const navigate = useNavigate();

  const toggleCategory = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleContinue = () => {
    localStorage.setItem("isAuth", "true");
    navigate("/page-1", { replace: true });
  };

  return (
    <PageContainer>
      <Section>
        <SectionTitle level="1" weight="2">
          Выберите свои интересы
        </SectionTitle>
        <ChipsFlex>
          {categories.map((cat) => (
            <ChipButton
              key={cat.id}
              $selected={selected.includes(cat.id)}
              onClick={() => toggleCategory(cat.id)}
            >
              {cat.label}
            </ChipButton>
          ))}
        </ChipsFlex>
      </Section>

      <Section>
        <Card>
          <SectionTitle level="2" style={{ fontSize: 18 }}>
            Место
          </SectionTitle>
          <InputWrapper>
            <Icon16Place
              fill="#919cb5"
              style={{ position: "absolute", left: 12, top: 12, zIndex: 1 }}
            />
            <Input
              placeholder="Город или район"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </InputWrapper>
        </Card>
      </Section>

      {/* <Section>
        <Card>
          <SectionTitle level="2" style={{ fontSize: 18 }}>
            Количество человек
          </SectionTitle>
          <RangeContainer>
            <Input
              type="number"
              value={peopleFrom}
              onChange={(e) => setPeopleFrom(e.target.value)}
            />
            <span style={{ color: "#919cb5" }}>—</span>
            <Input type="number" value={peopleTo} onChange={(e) => setPeopleTo(e.target.value)} />
          </RangeContainer>
        </Card>
      </Section>

      <Footer>
        <Button
          size="l"
          stretched
          style={{ background: "#3388ee", borderRadius: 12, height: 52 }}
          onClick={handleContinue}
        >
          Продолжить
        </Button>
      </Footer> */}

      <Section>
        <Card>
          <SectionTitle level="2" style={{ fontSize: 18 }}>
            Количество человек
          </SectionTitle>
          <RangeContainer>
            <Input
              type="number"
              value={peopleFrom}
              onChange={(e) => setPeopleFrom(e.target.value)}
              onBlur={handleBlurFrom} // Проверка при выходе из поля
            />
            <span style={{ color: "#919cb5" }}>—</span>
            <Input
              type="number"
              value={peopleTo}
              onChange={(e) => setPeopleTo(e.target.value)}
              onBlur={handleBlurTo} // Проверка при выходе из поля
            />
          </RangeContainer>
          {!isValid && (
            <Text style={{ color: "red", fontSize: 12 }}>Диапазон должен быть от 2 до 100</Text>
          )}
        </Card>
      </Section>

      <Footer>
        <Button
          size="l"
          stretched
          disabled={!isValid || selected.length === 0} // Кнопка не нажмется, если данные неверны
          appearance="accent"
          style={{
            background: isValid ? "#3388ee" : "#ccc",
            borderRadius: 12,
            height: 52,
          }}
          onClick={handleContinue}
        >
          Продолжить
        </Button>
      </Footer>
    </PageContainer>
  );
}
