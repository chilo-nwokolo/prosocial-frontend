import { Query_Admin_UsersQuery } from "@/__generated__/graphql";
import { formFeedback } from "@/utils/constants";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  ListItem,
  Text,
  Textarea,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import { Table } from "@tanstack/react-table";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import localStorageService from "@/service/localStorage";

export default function CreateGroupModal({
  table,
  onClose,
}: {
  table: Table<Query_Admin_UsersQuery["adminQueryUsers"]>;
  onClose: () => void;
}) {
  const validationSchema = yup.object({
    name: yup.string().required(formFeedback.required),
    note: yup.string().required(formFeedback.required),
    users: yup
      .array()
      .min(3, "Minimum of 3 users per group")
      .max(10, "Maximum of 10 users per group"),
  });

  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      note: "",
      // @ts-ignore
      users: table.getSelectedRowModel().flatRows.map((l) => l?.original?.id),
    },
    onSubmit: (values) => {
      setLoading(true);
      try {
        localStorageService.createGroup({
          name: values.name,
          user_ids: values.users,
          note: values.note,
        });
        toast({
          title: "Group created successfully",
          status: "success",
        });
        formik.resetForm();
        onClose();
      } catch (error: any) {
        toast({
          status: "error",
          title: error.message || "Failed to create group",
        });
      }
      setLoading(false);
    },
    validationSchema,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Flex flexDir="column" gap="5">
          <Box>
            <Text fontWeight="semibold">Group members (4-12 people)</Text>
            <Box
              border="1px solid"
              borderColor="#000"
              h="200px"
              maxH="200px"
              overflowY="auto"
            >
              <UnorderedList styleType="none" ml="0">
                {table.getSelectedRowModel().flatRows.map((l, i) => (
                  <ListItem
                    pl="2"
                    py="2"
                    key={l.id}
                    bg={i % 2 === 0 ? "gray.100" : "#fff"}
                  >
                    {/* @ts-ignore */}
                    {l?.original?.name}
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
            {formik.errors?.users ? (
              <Text color="critical.100">
                {formik.errors?.users.toString()}
              </Text>
            ) : null}
          </Box>
          <FormControl>
            <FormLabel fontWeight="semibold">Group name</FormLabel>
            <Input
              borderRadius="none"
              borderColor="#000"
              border="1px solid"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors?.name ? (
              <FormHelperText color="critical.100">
                {formik.errors?.name}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl>
            <FormLabel fontWeight="semibold">Notes</FormLabel>
            <Textarea
              rows={8}
              borderRadius="none"
              borderColor="#000"
              border="1px solid"
              name="note"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.note}
            />
            {formik.errors?.note ? (
              <FormHelperText color="critical.100">
                {formik.errors?.note}
              </FormHelperText>
            ) : null}
          </FormControl>
          <Box mx="auto">
            <Button type="submit" isLoading={loading}>
              Save
            </Button>
          </Box>
        </Flex>
      </form>
    </>
  );
}
