import { gameModes, daysOfWeek } from "../../../../../constants"
import { useForm} from "react-hook-form";

const useFilters = ({onFilter}: any) => {
    const { register, watch } = useForm<any>({
        defaultValues : {
          activeFilters: []
      }});
    
    const activeFilters = watch("activeFilters")

    const generalFilters = [
        {
            label: "bio",
            value: "bio",
            userField: "bio"
        },
        {
            label: "discord",
            value: "discord",
            userField: "discordId"
        },
    ]

    const allRawFilters = [
        ...gameModes,
        ...daysOfWeek,
        ...generalFilters
    ]

    const filtersList = [
        {
            title: "Modos de jogo: ",
            filters: gameModes,
            filterMode: "contains"
        },

        {
            title: "Dias disponíveis: ",
            filters: daysOfWeek,
            filterMode: "contains"
        },
        {
            title: "O user que tem: ",
            filters: generalFilters,
            filterMode: "boolean"
        }

    ]

    const handleOnFilter = () => {
        const formattedFilters = activeFilters.map((activeValue: any) => {
            const isGameMode = gameModes.some(({value}) => {return value === activeValue})
            const isDays = daysOfWeek.some(({value}) => {return value === activeValue})
            const isArray = isGameMode || isDays

            const filterConfig = allRawFilters.find(({value}) => {return value === activeValue})
            return {
                ...filterConfig,
                filterMode: isArray ? "contains" : "boolean",
            }
        })

        onFilter(formattedFilters)
    }

    return {
        filtersList,
        register,
        handleOnFilter
    }
}

export default useFilters