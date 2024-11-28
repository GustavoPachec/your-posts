interface QuickSearchOption {
  imageURL: string;
  title: string;
}

export const quickSearchOptions: QuickSearchOption[] = [
  {
    imageURL: "/pending",
    title: "Pendentes",
  },
  {
    imageURL: "/concluidas",
    title: "Concluídas",
  },
  {
    imageURL: "/pending",
    title: "Não Iniciadas",
  },
];
