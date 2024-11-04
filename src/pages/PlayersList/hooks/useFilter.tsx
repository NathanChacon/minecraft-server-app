import { useForm, SubmitHandler} from "react-hook-form";
import { where} from "firebase/firestore";
import { getVisibleUsers } from "../../../api/services/user";

const useFilter = () => {
    const filters = [
        { type: 'gamemode', filterKey: 'pvp', query: where('gameModes', 'array-contains', "pvp")},
        { type: 'gamemode', filterKey: 'criativo', query: where('gameModes', 'array-contains', "criativo") },
        { type: 'gamemode', filterKey: 'sobrevivencia', query: where('gameModes', 'array-contains', "sobrevivencia")},
        { type: 'general', filterKey: 'bio', query: where('bio', '!=', '')},
        { type: 'general', filterKey: 'discord', query: where('discordId', '!=', '')},
        { type: 'general', filterKey: 'serverIp', query: where('serverIp', '!=', '')},
    ]

    const { register, watch } = useForm<any>({
        defaultValues : {
          activatedFilters: []
      }});

      const activatedFilters = watch("activatedFilters")

    const handleOnFilter = async () => {
        const formattedFilters = activatedFilters.map((value: string) => {
            return filters.find(({filterKey}) => filterKey === value) 
        })

        const queries = formattedFilters.map(({query}:any) => query)

        const filteredUsers = await getVisibleUsers(queries)

        console.log(filteredUsers)
    }


    return {
        filters,
        register,
        watch,
        handleOnFilter
    }
}


export default useFilter