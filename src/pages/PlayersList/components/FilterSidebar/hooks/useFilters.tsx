import { gameModes, daysOfWeek } from "../../../../../constants"
import { useForm} from "react-hook-form";

const useFilters = () => {
    const { register, watch } = useForm<any>({
        defaultValues : {
          activeFilters: []
      }});


    const generalFilters = [
        {
            label: "bio",
            value: false
        },
        {
            label: "discord",
            value: false
        },
        {
            label: "ip do servidor",
            value: false
        },
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

    return {
        filtersList,
        register
    }
}

export default useFilters