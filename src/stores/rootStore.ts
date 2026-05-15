import { makeAutoObservable, runInAction } from "mobx";

interface BackendStatus {
  service: string;
  status: string;
  database_enabled: boolean;
}

class RootStore {
  pingData: any = null;
  healthData: BackendStatus | null = null;
  dbTime: any = null;
  error: string | null = null;
  isLoading: boolean = false;

  private apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
  // private apiUrl = "https://team-5.hack.kam-dev.ru";

  constructor() {
    makeAutoObservable(this);
  }

  async loadBackendStatus() {
    this.isLoading = true;
    this.error = null;

    try {
      // const [pingResponse, healthResponse] = await Promise.all([
      //   fetch(`${this.apiUrl}/api/ping`),
      //   fetch(`${this.apiUrl}/health`),
      // ]);
      // if (!pingResponse.ok || !healthResponse.ok) {
      //   throw new Error("Ошибка при получении данных от сервера");
      // }
      // const ping = await pingResponse.json();
      // const health = await healthResponse.json();
      // runInAction(() => {
      //   this.pingData = ping;
      //   this.healthData = health;
      // });
      // if (health.database_enabled) {
      //   const dbResponse = await fetch(`${this.apiUrl}/api/db/time`);
      //   const dbData = await dbResponse.json();
      //   runInAction(() => {
      //     this.dbTime = dbData;
      //   });
      // } else {
      //   runInAction(() => {
      //     this.dbTime = null;
      //   });
      // }
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export const rootStore = new RootStore();
