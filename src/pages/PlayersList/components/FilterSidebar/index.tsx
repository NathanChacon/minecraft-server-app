import useFilters from "./hooks/useFilters"
import Select from "../../../../components/Select";
import "./style.css"
import { useRef } from "react";
import Button from "../../../../components/Button";
const FilterSidebar = ({onFilter, isOpen, setIsOpen}: any) => {
    const {filtersList, register, handleOnFilter} = useFilters({onFilter})
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    return (
        <div className={`filter-sidebar ${isOpen ? 'filter-sidebar--open' : ''}`} ref={sidebarRef}>
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

                <Button onClick={() => {
                                setIsOpen(false)
                                handleOnFilter()
                }}>Aplicar</Button>
                
            </ul>

        </div>
    )
}

export default FilterSidebar