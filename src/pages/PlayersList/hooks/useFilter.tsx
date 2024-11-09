import { useForm} from "react-hook-form";
import { useState } from "react";

const useFilter = ({users}: any) => {
    const filters = [
        { type: 'gamemode', filterKey: 'pvp', field: 'gameModes', operator: 'array-contains', value: 'pvp' },
        { type: 'gamemode', filterKey: 'criativo', field: 'gameModes', operator: 'array-contains', value: 'criativo' },
        { type: 'gamemode', filterKey: 'sobrevivência', field: 'gameModes', operator: 'array-contains', value: 'sobrevivência' },
        { type: 'general', filterKey: 'bio', field: 'bio', operator: '!=', value: '' },
        { type: 'general', filterKey: 'discord', field: 'discordId', operator: '!=', value: '' },
        { type: 'general', filterKey: 'serverIp', field: 'serverIp', operator: '!=', value: '' },
    ];

    const [filteredUsers, setFilteredUsers] = useState([])

    const { register, watch } = useForm<any>({
        defaultValues : {
          activatedFilters: []
      }});

      const activatedFilters = watch("activatedFilters")

    const handleOnFilter = async () => {
        const activeFilters = activatedFilters.map((value: string) => {
            return filters.find(({filterKey}) => filterKey === value) 
        })

        const filteredUsers = users.filter((user: any) => {
            return activeFilters.every(({ field, operator, value }:any) => {
              switch (operator) {
                case 'array-contains':
                  return Array.isArray(user[field]) && user[field].some((item: string) => item.toLowerCase().includes(value.toLowerCase()))
                case '!=':
                  return user[field] !== value;
                case '==':
                  return user[field] === value;
                default:
                  return true;
              }
            });
          });

          setFilteredUsers(filteredUsers)
    
        };



    return {
        filters,
        register,
        watch,
        handleOnFilter,
        filteredUsers
    }
}


export default useFilter