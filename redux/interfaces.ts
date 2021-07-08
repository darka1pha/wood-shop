export interface ISetAlert {
  content: string;
  type: "error" | "success" | "warning";
}

export interface ISetCurrentCategory {
  name: string;
  id: number;
}
