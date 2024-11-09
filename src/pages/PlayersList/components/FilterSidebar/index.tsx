import useFilters from "./hooks/useFilters"
import Select from "../../../../components/Select";
import "./style.css"
const FilterSidebar = ({onFilter, isOpen, setIsOpen}: any) => {
    const {filtersList, register} = useFilters()

    return (
        <div className="filter-sidebar">
            <h2 className="filter-sidebar__title">Filtros: </h2>
            <ul className="filter-sidebar__filters">
                {
                    filtersList.map(({title, filters, filterMode}) => {
                        return <li className="filter-sidebar__filter-item">
                            <h4 className="filter-sidebar__filter-title">{title}</h4>
                            <Select options={filters} register={register("activeFilters")} />
                        </li>
                    })
                }
                
            </ul>

        </div>
    )
}

export default FilterSidebar