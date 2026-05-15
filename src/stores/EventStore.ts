import { makeAutoObservable, runInAction } from "mobx";

interface IEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  place: string;
  image: string | null;
}

class EventStore {
  events: IEvent[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchEvents = async () => {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch("https://team-5.hack.kam-dev.ru");
      if (!response.ok) throw new Error("Ошибка загрузки");

      const data = await response.json();

      runInAction(() => {
        this.events = data;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = "Не удалось загрузить события";
        this.isLoading = false;
      });
    }
  };

  getFilteredEvents(query: string) {
    return this.events.filter(
      (event) =>
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.place.toLowerCase().includes(query.toLowerCase()),
    );
  }
}

export const eventStore = new EventStore();
