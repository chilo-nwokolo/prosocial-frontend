import {
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  UseSliderProps,
} from "@chakra-ui/react";

interface FilterSliderInterface {
  title: string;
  sliderValue: number;
  onChange: UseSliderProps["onChange"];
}

export default function FilterSlider({
  title,
  sliderValue,
  onChange,
}: FilterSliderInterface) {
  return (
    <FormControl>
      <FormLabel htmlFor={`${title}-slider`}>{title}</FormLabel>
      <Slider
        aria-label={`${title}-slider`}
        defaultValue={sliderValue}
        onChange={onChange}
      >
        <SliderMark
          value={sliderValue}
          textAlign="center"
          color="#000"
          mt="4"
          ml="-5"
          w="12"
        >
          {sliderValue}
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </FormControl>
  );
}
