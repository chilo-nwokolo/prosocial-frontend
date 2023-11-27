import { gql } from "@/__generated__";

export const QUERY_USERS = gql(`
	query QUERY_USERS {
		users {
			data {
				id
				name
			}
		}
	}
`);
