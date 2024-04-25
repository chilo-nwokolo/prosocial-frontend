export type ComponentConfigType = {
  useIdAsValue?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  lowerCaseTitle?: boolean;
  returnTitle?: boolean;
  hasLabel?: boolean;
  midLabel?: string;
};

export const componentConfig = {
  "The%20basics": {
    singleChoiceQuestion: {
      useIdAsValue: false,
    },
    inputQuestion: {},
    multipleChoiceQuestion: {},
    ratingScaleQuestion: {
      leftLabel: `Strongly \ndisagree`,
      rightLabel: `Strongly \nagree`,
      midLabel: `Neither \nagree nor \n disagree`,
      lowerCaseTitle: true,
      returnTitle: true,
      hasLabel: false,
    },
  },
  "Your%20personality": {
    singleChoiceQuestion: {
      useIdAsValue: true,
    },
    inputQuestion: {},
    multipleChoiceQuestion: {},
    ratingScaleQuestion: {
      leftLabel: `Strongly \ndisagree`,
      rightLabel: `Strongly \nagree`,
      midLabel: `Neither \nagree nor \n disagree`,
      lowerCaseTitle: false,
      returnTitle: true,
      hasLabel: false,
      useIdAsValue: true,
    },
  },
  "How%20you%20approach%20life": {
    singleChoiceQuestion: {
      useIdAsValue: true,
    },
    inputQuestion: {},
    multipleChoiceQuestion: {},
    ratingScaleQuestion: {
      leftLabel: `Strongly \ndisagree`,
      rightLabel: `Strongly \nagree`,
      midLabel: `Neither \nagree nor \n disagree`,
      lowerCaseTitle: false,
      returnTitle: true,
      hasLabel: false,
      useIdAsValue: true,
    },
  },
  "Behaviors%20and%20beliefs": {
    singleChoiceQuestion: {
      useIdAsValue: true,
    },
    inputQuestion: {},
    multipleChoiceQuestion: {},
    ratingScaleQuestion: {
      leftLabel: `Strongly \ndisagree`,
      rightLabel: `Strongly \nagree`,
      midLabel: `Neither \nagree nor \n disagree`,
      lowerCaseTitle: false,
      returnTitle: false,
      hasLabel: true,
      useIdAsValue: true,
    },
  },
};
