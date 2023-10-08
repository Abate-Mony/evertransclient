import { useFilter } from "../Hooks/FilterHooks"
import AnimatedText from "../components/AnimateText"
import { Heading, Scrollable } from "../components"
import UiButton from "../components/UiButton"
import { useLoaderData, useSearchParams } from "react-router-dom"
import Mail from "../components/Mail"
import customFetch from "../utils/customFetch"
import { useQuery } from "@tanstack/react-query"

import { sortedDateOptions, queryOptions, dateSortedOption } from "../utils/sortedOptions"
import SelectSortDate from 'react-select';
import Form from "../components/Form"
const allMailsQuery = (params = {}) => {
  const { search, sort, page, mailStatus } = params
  return {
    queryKey: [
      'mails', params
      // { search: search ?? "", page: page ?? 1, sort: sort ?? "newest", mailStatus: mailStatus ?? "all" }
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/mails', {
        params,
      });
      return data;
    },
    keepPreviousData: true
  };
};


export const loader =
  (queryClient) =>
    async ({ request }) => {
      const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
      ]);
      await queryClient.ensureQueryData(allMailsQuery(params));
      return { searchValues: { ...params } };
    };

const style = {
  control: (base, state) => {
    // console.log(state.isFocused)
    return ({
      ...base,
      boxShadow: "none",
      backgroundColor: "transparent",
      borderRadius: 0,
      fontSize: 1 + "rem",
      cursor: "pointer",
      // backgroundColor: state.isSelected ? "red" : "green"
    }
    )
  }


}
const Mails = () => {
  const [querySearch] = useSearchParams()
  const { handleChange, handleFilterChange } = useFilter()





  const FilterButton = (props) => {
    const { value } = props
    const isSelected = value === querySearch.get(props.name)
    return (
      <UiButton
        onClick={() => handleFilterChange(props.name, value)}
        className={`!px-8 !py-2.5 !flex-none !uppercase ${isSelected && "!bg-green-900 !rounded-lg"}`}

      > {props.label}</UiButton>

    )

  }
  const { searchValues } = useLoaderData()
  const { mails, nHits } = useQuery(allMailsQuery(searchValues)).data || []
  return (
    <div>
      <Heading
        text="Mails"
        className="!text-4xl !text-center !mb-10 !font-black"
      />
      <Heading
        text="Mail Status"
        className="!text-center !m-0 !p-0  !text-2xl "
      />

      <Scrollable className="!justify-start !max-w-full !w-fit !mx-auto px-4 pb-5">
        {
          queryOptions.map((query) => <FilterButton
            name="mailStatus"
            {...query} key={query} />)
        }

      </Scrollable>
      <Heading
        text="Quick Date Sort"
        className="!text-center !m-0 !p-0  !text-2xl "
      />

      <Scrollable className="!justify-start !max-w-full !w-fit !mx-auto px-4 pb-5">
        {
          dateSortedOption.map((query) => <FilterButton
            name="quickdatesort"
            {...query} key={query} />)
        }

      </Scrollable>
      

      <Form
        placeholder="search products, sendername ,recievername"
        onChange={search => handleFilterChange("search", search)}
      />
      <div className="mx-auto text-4xl my-10 rounded-full  bg-orange-600 w-12 h-12 flex justify-center items-center ring-2 ring-blue-600">{nHits}</div>
      <div
        className="lg:px-24 px-8 gap-x-4 grid py-5 grid-cols-[repeat(auto-fit,minmax(min(calc(100%-20px),25rem),1fr))]"

      >
        {mails?.map((mail) => <Mail key={mail._id}
          {...mail}
        />)}
        {
          nHits < 1 && <AnimatedText
            className="!text-4xl"
            text="No Items matches your query "
          />
        }

      </div>
      {
        nHits &&
        <UiButton>
          LOAD MORE
        </UiButton>
      }
    </div>
  )
}

export default Mails