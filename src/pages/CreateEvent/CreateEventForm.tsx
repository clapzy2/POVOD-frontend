import { useState } from "react";
import styled from "@emotion/styled";
import Button from "../../components/Button/Button";
import {
  Icon28CameraOutline,
  Icon28PictureOutline,
  Icon28PlaceOutline,
  Icon28UsersOutline,
} from "@vkontakte/icons";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div`
  min-height: 100vh;
  padding: 24px 18px 32px;
  background: var(--vkui--color_background_primary);
  margin-bottom: 30px;
`;

const Section = styled.section`
  background: var(--vkui--color_background_secondary);
  margin-bottom: 16px;
  padding: 24px 20px;
  border-radius: 24px;
  box-shadow: 0 12px 32px rgba(33, 79, 175, 0.08);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: var(--vkui--color_text_primary);
  font-size: 15px;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box; /* Добавь эту строку */
  padding: 14px 16px;
  border: 1px solid var(--vkui--color_separator_primary_alpha);
  border-radius: 16px;
  font-size: 15px;
  background: var(--vkui--color_background_canvas);
  color: var(--vkui--color_text_primary);

  &:focus {
    outline: none;
    border-color: var(--vkui--color_background_accent);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box; /* И здесь тоже */
  min-height: 124px;
  padding: 14px 16px;
  border: 1px solid var(--vkui--color_separator_primary_alpha);
  border-radius: 16px;
  background: var(--vkui--color_background_canvas);
  color: var(--vkui--color_text_primary);
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--vkui--color_background_accent);
  }
`;
const PhotoSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 8px;
`;

const PhotoButton = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px;
  border: 1px solid var(--vkui--color_separator_primary_alpha);
  border-radius: 16px;
  background: ${(props) =>
    props.$isActive
      ? "var(--vkui--color_background_accent)"
      : "var(--vkui--color_background_canvas)"};
  color: ${(props) => (props.$isActive ? "#ffffff" : "var(--vkui--color_text_primary)")};
  font-size: 15px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  svg {
    color: ${(props) => (props.$isActive ? "#ffffff" : "var(--vkui--color_icon_secondary)")};
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 8px;
`;

const CategoryChip = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--vkui--color_separator_primary_alpha);
  border-radius: 30px;
  background: ${(props) =>
    props.$active
      ? "var(--vkui--color_background_accent)"
      : "var(--vkui--color_background_canvas)"};
  color: ${(props) => (props.$active ? "#ffffff" : "var(--vkui--color_text_primary)")};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const TimeRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 12px;
`;

const LocationField = styled.div`
  position: relative;
  margin-top: 8px;
  display: flex;
  align-items: center;
`;

const StyledLocationIcon = styled(Icon28PlaceOutline)`
  position: absolute;
  left: 12px;
  color: var(--vkui--color_icon_secondary);
`;

const LocationInput = styled(Input)`
  padding-left: 48px;
`;

const FormatRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 12px;
`;

const SubmitSection = styled.div`
  margin-top: 8px;
`;

const categories = [
  "Спорт",
  "Искусство",
  "Путешествие",
  "IT",
  "Компьютерные игры",
  "Технологии",
  "Еда",
  "Настольные игры",
  "Наука",
  "Музыка",
  "Саморазвитие",
  "ЗОЖ",
  "Образование",
  "Кино",
  "Шопинг",
  "Ресторан",
];

interface FormData {
  title: string;
  description: string;
  categories: string[];
  photoSource: "gallery" | "camera" | null;
  date: string;
  timeFrom: string;
  timeTo: string;
  location: string;
  format: "public" | "private";
}

export default function CreateEventForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    categories: [],
    photoSource: null,
    date: "",
    timeFrom: "",
    timeTo: "",
    location: "",
    format: "public",
  });

  const toggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((item) => item !== category)
        : [...prev.categories, category],
    }));
  };

  const setPhotoSource = (source: FormData["photoSource"]) => {
    setFormData((prev) => ({ ...prev, photoSource: source }));
  };

  const setFormat = (format: FormData["format"]) => {
    setFormData((prev) => ({ ...prev, format }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.date) return;
    const newEvent = {
      id: Date.now(),
      title: formData.title,
      date: formData.date.split("-").reverse().join(".").slice(0, 8),
      time: formData.timeFrom,
      location: formData.location,
      category: formData.categories[0] || "Общее",
      image:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=300&h=300&auto=format&fit=crop", // заглушка фото
    };

    navigate("/events", { state: { newEvent } });
  };

  return (
    <FormContainer>
      <Section>
        <Label>Название события *</Label>
        <Input
          type="text"
          placeholder="Поход в кино"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </Section>

      <Section>
        <Label>Описание *</Label>
        <TextArea
          placeholder="Расскажи, чего ожидать..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </Section>

      <Section>
        <Label>Добавить фото</Label>
        <PhotoSection>
          <PhotoButton
            type="button"
            $isActive={formData.photoSource === "gallery"}
            onClick={() => setPhotoSource("gallery")}
          >
            <Icon28PictureOutline width={24} height={24} />
            Из галереи
          </PhotoButton>
          <PhotoButton
            type="button"
            $isActive={formData.photoSource === "camera"}
            onClick={() => setPhotoSource("camera")}
          >
            <Icon28CameraOutline width={24} height={24} />
            Сделать фото
          </PhotoButton>
        </PhotoSection>
      </Section>

      <Section>
        <Label>Категории</Label>
        <CategoryGrid>
          {categories.map((category) => (
            <CategoryChip
              key={category}
              type="button"
              $active={formData.categories.includes(category)}
              onClick={() => toggleCategory(category)}
            >
              {category}
            </CategoryChip>
          ))}
        </CategoryGrid>
      </Section>

      <Section>
        <Label>Дата и время *</Label>
        <TimeRow>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <Input
            type="time"
            value={formData.timeFrom}
            onChange={(e) => setFormData({ ...formData, timeFrom: e.target.value })}
          />
          <Input
            type="time"
            value={formData.timeTo}
            onChange={(e) => setFormData({ ...formData, timeTo: e.target.value })}
          />
        </TimeRow>
      </Section>

      <Section>
        <Label>Место *</Label>
        <LocationField>
          <StyledLocationIcon width={24} height={24} />
          <LocationInput
            type="text"
            placeholder="Полный адрес или ссылка"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </LocationField>
      </Section>

      <Section>
        <Label>Формат события</Label>
        <FormatRow>
          <PhotoButton
            type="button"
            $isActive={formData.format === "private"}
            onClick={() => setFormat("private")}
          >
            Закрытое
          </PhotoButton>
          <PhotoButton
            type="button"
            $isActive={formData.format === "public"}
            onClick={() => setFormat("public")}
          >
            Публичное
          </PhotoButton>
        </FormatRow>
      </Section>

      <SubmitSection>
        <Button fullWidth size="lg" variant="primary" type="button" onClick={handleSubmit}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
            <Icon28UsersOutline width={24} height={24} />
            Отправить повод
          </span>
        </Button>
      </SubmitSection>
    </FormContainer>
  );
}
