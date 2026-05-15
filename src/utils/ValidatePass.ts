/**
 * Проверяет пароль на соответствие требованиям безопасности.
 * @param password - строка пароля
 * @returns объект с результатом проверки и сообщением об ошибке
 */
export const validatePassword = (password: string) => {
  if (!password) {
    return {
      isValid: false,
      message: "Пароль не может быть пустым",
    };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      message: "Пароль должен содержать минимум 8 символов",
    };
  }

  // Здесь можно добавить проверку на цифры или спецсимволы, если нужно
  // const hasNumber = /\d/.test(password);
  // if (!hasNumber) return { isValid: false, message: "Нужна хотя бы одна цифра" };

  return {
    isValid: true,
    message: "",
  };
};
