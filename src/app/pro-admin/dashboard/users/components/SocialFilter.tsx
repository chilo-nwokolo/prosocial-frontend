import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Switch,
} from "@chakra-ui/react";
import { useFilterContext } from "../hooks/useFilterContext";
import {
  FILTER_QUERY_KEYS,
  FILTER_CATEGORY_KEYS,
  activeFilterHandler,
  findFilterProp,
  updateFilterPropHandler,
  FILTER_PARENT_NAMES,
} from "@/utils/admin.utils";
import { friendTypeOptions } from "@/app/pro/(onboarding)/intro/social-preferences/components/SocialPreferencesAccordion";
import {
  fitness19Member,
  outingDynamics,
  socializationOptions,
  toSocializeOptions,
  yesNo,
} from "@/app/pro/(onboarding)/intro/social-preferences/helpers";

export default function SocialFilter() {
  const { filterProp, updateFilterProp, updateActiveFilters, activeFilters } =
    useFilterContext();

  return (
    <>
      <SimpleGrid w="full" columns={3} spacing="5">
        {/* FRIEND TYPE (WANTED) */}
        <Flex flexDir="column">
          <FormControl display="flex" gap="3" alignItems="center">
            <Switch
              id="friend-type-wanted"
              onChange={() =>
                updateActiveFilters(
                  activeFilterHandler(
                    FILTER_CATEGORY_KEYS.friendTypeWanted,
                    activeFilters,
                  ),
                )
              }
              isChecked={activeFilters.includes(
                FILTER_CATEGORY_KEYS.friendTypeWanted,
              )}
            />
            <FormLabel htmlFor="friend-type-wanted" mb="0">
              Friend type (Wanted)
            </FormLabel>
          </FormControl>
          <Select
            mt="5"
            onChange={(e) => {
              updateFilterProp(
                updateFilterPropHandler(
                  {
                    parentName: FILTER_PARENT_NAMES.social,
                    category: FILTER_CATEGORY_KEYS.friendTypeWanted,
                    filterProp: FILTER_QUERY_KEYS.friendTypeWanted,
                    value: e.target.value,
                  },
                  filterProp,
                ),
              );
            }}
            defaultValue={findFilterProp(
              FILTER_QUERY_KEYS.education,
              filterProp,
            )}
          >
            <option value="">All</option>
            {friendTypeOptions.map((option) => (
              <option value={option.title} key={option.id}>
                {option.title}
              </option>
            ))}
          </Select>
        </Flex>
        {/* FRIEND TYPE (SELF) */}
        <Flex flexDir="column">
          <FormControl gap="4" display="flex" alignItems="center">
            <Switch
              id="friendTypeSelf"
              onChange={() =>
                updateActiveFilters(
                  activeFilterHandler(
                    FILTER_CATEGORY_KEYS.friendTypeSelf,
                    activeFilters,
                  ),
                )
              }
              isChecked={activeFilters.includes(
                FILTER_CATEGORY_KEYS.friendTypeSelf,
              )}
            />
            <FormLabel htmlFor="friendTypeSelf" mb="0">
              Friend type (self)
            </FormLabel>
          </FormControl>
          <Select
            mt="5"
            onChange={(e) => {
              updateFilterProp(
                updateFilterPropHandler(
                  {
                    parentName: FILTER_PARENT_NAMES.social,
                    category: FILTER_CATEGORY_KEYS.friendTypeSelf,
                    filterProp: FILTER_QUERY_KEYS.friendTypeSelf,
                    value: e.target.value,
                  },
                  filterProp,
                ),
              );
            }}
            defaultValue={findFilterProp(
              FILTER_QUERY_KEYS.education,
              filterProp,
            )}
          >
            <option value="">All</option>
            {friendTypeOptions.map((option) => (
              <option value={option.title} key={option.id}>
                {option.title}
              </option>
            ))}
          </Select>
        </Flex>
        {/* SOCIAL ACTIVITY (ACTUAL) */}
        <Flex flexDir="column">
          <FormControl gap="4" display="flex" alignItems="center">
            <Switch
              id="social-activity-actual"
              onChange={() =>
                updateActiveFilters(
                  activeFilterHandler(
                    FILTER_CATEGORY_KEYS.socialActivityActual,
                    activeFilters,
                  ),
                )
              }
              isChecked={activeFilters.includes(
                FILTER_CATEGORY_KEYS.socialActivityActual,
              )}
            />
            <FormLabel htmlFor="social-activity-actual" mb="0">
              Social activity (actual)
            </FormLabel>
          </FormControl>
          <Select
            mt="5"
            onChange={(e) => {
              updateFilterProp(
                updateFilterPropHandler(
                  {
                    parentName: FILTER_PARENT_NAMES.social,
                    category: FILTER_CATEGORY_KEYS.socialActivityActual,
                    filterProp: FILTER_QUERY_KEYS.socialActivityActual,
                    value: e.target.value,
                  },
                  filterProp,
                ),
              );
            }}
            defaultValue={findFilterProp(
              FILTER_QUERY_KEYS.politicalOrientation,
              filterProp,
            )}
          >
            <option value="">All</option>
            {socializationOptions.map((option) => (
              <option value={option.value} key={option.id}>
                {option.title}
              </option>
            ))}
          </Select>
        </Flex>
      </SimpleGrid>
      <Divider mt="14" />
      <SimpleGrid w="full" columns={3} mt="10" spacing="5">
        {/* SOCIAL ACTIVITY (WANTED) */}
        <Flex flexDir="column">
          <FormControl gap="4" display="flex" alignItems="center">
            <Switch
              id="social-activity-actual"
              onChange={() =>
                updateActiveFilters(
                  activeFilterHandler(
                    FILTER_CATEGORY_KEYS.socialActivityWanted,
                    activeFilters,
                  ),
                )
              }
              isChecked={activeFilters.includes(
                FILTER_CATEGORY_KEYS.socialActivityWanted,
              )}
            />
            <FormLabel htmlFor="social-activity-actual" mb="0">
              Social activity (wanted)
            </FormLabel>
          </FormControl>
          <Select
            mt="5"
            onChange={(e) => {
              updateFilterProp(
                updateFilterPropHandler(
                  {
                    parentName: FILTER_PARENT_NAMES.social,
                    category: FILTER_CATEGORY_KEYS.socialActivityWanted,
                    filterProp: FILTER_QUERY_KEYS.socialActivityWanted,
                    value: e.target.value,
                  },
                  filterProp,
                ),
              );
            }}
            defaultValue={findFilterProp(
              FILTER_QUERY_KEYS.homeArea,
              filterProp,
            )}
          >
            <option value="">All</option>
            {toSocializeOptions.map((option) => (
              <option value={option.value} key={option.id}>
                {option.title}
              </option>
            ))}
          </Select>
        </Flex>
        {/* OUTING GROUP MAKEUP */}
        <Flex flexDir="column">
          <FormControl gap="4" display="flex" alignItems="center">
            <Switch
              id="outing-group-makeup"
              onChange={() =>
                updateActiveFilters(
                  activeFilterHandler(
                    FILTER_CATEGORY_KEYS.outingGroupMakeup,
                    activeFilters,
                  ),
                )
              }
              isChecked={activeFilters.includes(
                FILTER_CATEGORY_KEYS.outingGroupMakeup,
              )}
            />
            <FormLabel htmlFor="outing-group-makeup" mb="0">
              Outing group makeup
            </FormLabel>
          </FormControl>
          <Select
            mt="5"
            onChange={(e) => {
              updateFilterProp(
                updateFilterPropHandler(
                  {
                    parentName: FILTER_PARENT_NAMES.social,
                    category: FILTER_CATEGORY_KEYS.outingGroupMakeup,
                    filterProp: FILTER_QUERY_KEYS.outingGroupMakeup,
                    value: e.target.value,
                  },
                  filterProp,
                ),
              );
            }}
            defaultValue={findFilterProp(
              FILTER_QUERY_KEYS.familySizeInNumbers,
              filterProp,
            )}
          >
            <option value="">All</option>
            {outingDynamics.map((option) => (
              <option value={option.value} key={option.id}>
                {option.title}
              </option>
            ))}
          </Select>
        </Flex>
        {/* FITNESS 19 MEMBER */}
        <Flex flexDir="column">
          <FormControl gap="4" display="flex" alignItems="center">
            <Switch
              id="f19member"
              onChange={() =>
                updateActiveFilters(
                  activeFilterHandler(
                    FILTER_CATEGORY_KEYS.f19Member,
                    activeFilters,
                  ),
                )
              }
              isChecked={activeFilters.includes(FILTER_CATEGORY_KEYS.f19Member)}
            />
            <FormLabel htmlFor="f19member" mb="0">
              Fitness 19 member
            </FormLabel>
          </FormControl>
          <Select
            mt="5"
            onChange={(e) => {
              updateFilterProp(
                updateFilterPropHandler(
                  {
                    parentName: FILTER_PARENT_NAMES.social,
                    category: FILTER_CATEGORY_KEYS.f19Member,
                    filterProp: FILTER_QUERY_KEYS.f19Member,
                    value: e.target.value,
                  },
                  filterProp,
                ),
              );
            }}
            defaultValue={findFilterProp(
              FILTER_QUERY_KEYS.hasChildren,
              filterProp,
            )}
          >
            <option value="">Select One Option</option>
            {fitness19Member.map((option) => (
              <option value={option.value} key={option.id}>
                {option.title}
              </option>
            ))}
          </Select>
        </Flex>
      </SimpleGrid>
      <Divider mt="14" />
      {/* REFERRED A FRIEND? */}
      <SimpleGrid w="full" columns={3} mt="10" spacing="5">
        <Flex flexDir="column">
          <FormControl gap="4" display="flex" alignItems="center">
            <Switch
              id="refer-a-friend"
              onChange={() =>
                updateActiveFilters(
                  activeFilterHandler(
                    FILTER_CATEGORY_KEYS.referredAFriend,
                    activeFilters,
                  ),
                )
              }
              isChecked={activeFilters.includes(
                FILTER_CATEGORY_KEYS.referredAFriend,
              )}
            />
            <FormLabel htmlFor="refer-a-friend" mb="0">
              Referred a friend?
            </FormLabel>
          </FormControl>
          <Select
            mt="5"
            onChange={(e) => {
              updateFilterProp(
                updateFilterPropHandler(
                  {
                    parentName: FILTER_PARENT_NAMES.social,
                    category: FILTER_CATEGORY_KEYS.referredAFriend,
                    filterProp: FILTER_QUERY_KEYS.referredAFriend,
                    value: e.target.value,
                  },
                  filterProp,
                ),
              );
            }}
            defaultValue={findFilterProp(
              FILTER_QUERY_KEYS.hasChildren,
              filterProp,
            )}
          >
            <option value="">Select One Option</option>
            {yesNo.map((option) => (
              <option value={option.value} key={option.id}>
                {option.title}
              </option>
            ))}
          </Select>
        </Flex>
      </SimpleGrid>
    </>
  );
}
