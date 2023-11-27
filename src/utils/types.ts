/* eslint-disable no-mixed-spaces-and-tabs */
export type TransformedQuestionsResult =
  | {
      id: string;
      category: string;
      meta: string;
      description: string;
      totalQuestions: number | undefined;
      questions:
        | (
            | {
                id: number;
                question: string;
                options: {
                  id: number;
                  title: string;
                  value: string;
                }[];
                type: string;
              }
            | {
                id: number;
                text: string;
                options: {
                  id: number;
                  title: string;
                  value: string;
                }[];
                type: string;
              }
          )[]
        | null
        | undefined;
    }[]
  | undefined;
