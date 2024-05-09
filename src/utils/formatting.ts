export const formatPhoneNumber = (phone: string) => {
  const ddd = phone.slice(0, 2);
  const firstPart = phone.slice(2, 7);
  const secondPart = phone.slice(7, 11);
  return `(${ddd}) ${firstPart}-${secondPart}`;
};

export const formatDate = (dateString: string) => {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString('pt-BR');
};
