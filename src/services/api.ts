// API Service для работы с бэкенд сервером

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://team-5.hack.kam-dev.ru/";

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

// Интерфейсы для типизации данных
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  author: string;
  participants: number;
  image?: string;
  tags?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  interests?: string[];
}

export interface Comment {
  id: string;
  text: string;
  author: User;
  createdAt: string;
  eventId: string;
}

// Утилита для выполнения запросов
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      return {
        error: `API Error: ${response.status}`,
        status: response.status,
      };
    }

    const data = await response.json();
    return {
      data,
      status: response.status,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
      status: 0,
    };
  }
}

// ===== Events API =====
export const eventsAPI = {
  // Получить все события
  getAll: () => fetchApi<Event[]>("api/Events"),

  // Получить событие по ID
  getById: (id: string) => fetchApi<Event>(`api/Events/${id}`),

  // Создать событие
  create: (event: Omit<Event, "id">) =>
    fetchApi<Event>("api/Events", {
      method: "POST",
      body: JSON.stringify(event),
    }),

  // Обновить событие
  update: (id: string, event: Partial<Event>) =>
    fetchApi<Event>(`api/Events/${id}`, {
      method: "PUT",
      body: JSON.stringify(event),
    }),

  // Удалить событие
  delete: (id: string) =>
    fetchApi<void>(`api/Events/${id}`, {
      method: "DELETE",
    }),

  // Получить активные события
  getActive: () => fetchApi<Event[]>("api/Events/active"),

  // Получить предстоящие события
  getUpcoming: () => fetchApi<Event[]>("api/Events/upcoming"),

  // Получить события конкретного автора
  getByAuthor: (authorId: string) =>
    fetchApi<Event[]>(`api/Events/author/${authorId}`),

  // Присоединиться к событию
  join: (eventId: string) =>
    fetchApi<void>(`api/Events/${eventId}/join`, {
      method: "POST",
    }),

  // Покинуть событие
  leave: (eventId: string) =>
    fetchApi<void>(`api/Events/${eventId}/leave`, {
      method: "POST",
    }),
};

// ===== Users API =====
export const usersAPI = {
  // Получить всех пользователей
  getAll: () => fetchApi<User[]>("api/Users"),

  // Получить пользователя по ID
  getById: (id: string) => fetchApi<User>(`api/Users/${id}`),

  // Удалить пользователя
  delete: (id: string) =>
    fetchApi<void>(`api/Users/${id}`, {
      method: "DELETE",
    }),

  // Получить список друзей
  getFriends: (userId: string) =>
    fetchApi<User[]>(`api/Users/${userId}/friends`),

  // Добавить друга
  addFriend: (userId: string, friendId: string) =>
    fetchApi<void>(`api/Users/${userId}/friends`, {
      method: "POST",
      body: JSON.stringify({ friendId }),
    }),

  // Удалить друга
  removeFriend: (userId: string, friendId: string) =>
    fetchApi<void>(`api/Users/${userId}/friends/${friendId}`, {
      method: "DELETE",
    }),
};

// ===== Comments API =====
export const commentsAPI = {
  // Получить комментарии события
  getByEvent: (eventId: string) =>
    fetchApi<Comment[]>(`api/Comments/event/${eventId}`),

  // Создать комментарий
  create: (comment: Omit<Comment, "id" | "createdAt">) =>
    fetchApi<Comment>("api/Comments", {
      method: "POST",
      body: JSON.stringify(comment),
    }),

  // Удалить комментарий
  delete: (id: string) =>
    fetchApi<void>(`api/Comments/${id}`, {
      method: "DELETE",
    }),
};

// ===== Health Check API =====
export const healthAPI = {
  // Проверить состояние сервера
  ping: () => fetchApi<{ status: string }>("api/ping"),

  health: () => fetchApi<{ status: string }>("health"),
};

// Экспортируем всё вместе
export const api = {
  events: eventsAPI,
  users: usersAPI,
  comments: commentsAPI,
  health: healthAPI,
};
