import { useState } from "react";

const useFilter = ({users}: any) => {

    const [filteredUsers, setFilteredUsers] = useState([])


    const handleOnFilter = async (filters: any) => {
        const filteredUsers = users.filter((user: any) => {
            console.log("test", user)
            return filters.every(({value, filterMode, userField}:any) => {
              switch (filterMode) {
                case 'contains':
                  return Array.isArray(user[userField]) && user[userField].some((item: string) => item.toLowerCase().includes(value.toLowerCase()))
                case 'boolean':
                  return !!user[userField];
                default:
                  return true;
              }
            });
            });



          setFilteredUsers(filteredUsers)
    
        };



    return {
        handleOnFilter,
        filteredUsers
    }
}


export default useFilter