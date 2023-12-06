import { Checkbox, Flex, Stack } from "@chakra-ui/react";
import React, { useState } from "react";

export default function GroupCheckbox({
  parent,
  data,
}: {
  parent: string;
  data: { id: number; title: string; value: string }[];
}) {
  const [checkedItems, setCheckedItems] = useState([false, false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <Flex flexDir="column" gap="1">
      <Checkbox
        mt="4"
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) =>
          setCheckedItems([
            e.target.checked,
            e.target.checked,
            e.target.checked,
          ])
        }
      >
        {parent}
      </Checkbox>
      <Stack pl={6} mt={1} spacing={1}>
        {data.map((res, i) => (
          <Checkbox
            key={i}
            isChecked={checkedItems[i]}
            onChange={(e) =>
              setCheckedItems([e.target.checked, checkedItems[i]])
            }
          >
            {res.title}
          </Checkbox>
        ))}
      </Stack>
    </Flex>
  );
}
