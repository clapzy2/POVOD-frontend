import { makeAutoObservable, runInAction } from "mobx";
import bridge from "@vkontakte/vk-bridge";
import { CURRENT_USER } from "../currentUser";
import { authAPI, type User } from "../services/api";

/**
 * Сессия текущего пользователя.
 *
 * Внутри ВКонтакте:
 *   1. читаем launch-параметры из URL (vk_user_id, sign, ...);
 *   2. берём профиль (имя/аватар) через VK Bridge;
 *   3. отправляем launch-параметры на бэкенд (/api/Auth/vk) — там проверяется подпись
 *      и пользователь создаётся/находится (upsert);
 *   4. используем вернувшегося пользователя как текущего.
 *
 * Вне ВКонтакте (обычный браузер / локальная разработка) остаёмся на мок-пользователе
 * (CURRENT_USER), чтобы приложение работало в дев-режиме.
 */
class SessionStore {
  user: User = CURRENT_USER;
  isVK = false;
  initialized = false;

  constructor() {
    makeAutoObservable(this);
  }

  init = async (): Promise<void> => {
    if (this.initialized) return;
    this.initialized = true;

    const launchParams = window.location.search.replace(/^\?/, "");
    const isVKLaunch = /(?:^|&)vk_user_id=/.test(launchParams);
    if (!isVKLaunch) {
      // Вне среды ВК — используем мок-пользователя.
      return;
    }

    // Профиль (имя/аватар) из VK Bridge
    let profile: { name?: string; avatar?: string } = {};
    try {
      const info = await bridge.send("VKWebAppGetUserInfo");
      profile = {
        name: [info.first_name, info.last_name].filter(Boolean).join(" "),
        avatar: info.photo_200 || info.photo_100,
      };
    } catch {
      /* профиль недоступен — не критично */
    }

    // Авторизация на бэкенде: проверка подписи launch-параметров + upsert пользователя
    try {
      const res = await authAPI.vk(launchParams, profile);
      if (res.data) {
        runInAction(() => {
          this.user = res.data as User;
          this.isVK = true;
        });
      }
    } catch {
      /* бэкенд недоступен — остаёмся на мок-пользователе */
    }
  };
}

export const sessionStore = new SessionStore();
