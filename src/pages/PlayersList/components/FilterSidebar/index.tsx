import useFilters from "./hooks/useFilters"
import Select from "../../../../components/Select";
import "./style.css"
import { useEffect, useRef } from "react";
import Button from "../../../../components/Button";
const FilterSidebar = ({onFilter, isOpen, setIsOpen}: any) => {
    const {filtersList, register, handleOnFilter} = useFilters({onFilter})
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          const isClickingOnSidebar = sidebarRef?.current?.contains(event.target as Node)
          if (!isClickingOnSidebar) {
               setIsOpen(false);
          }
          
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [sidebarRef]);
      
    return (
        <div className={`filter-sidebar ${isOpen ? 'filter-sidebar--open' : ''}`} ref={sidebarRef}>
            <div className="filter-sidebar__header">
                    <h2 className="filter-sidebar__title">Filtros:</h2>
                    <button className="filter-sidebar__close-button" onClick={() => setIsOpen(false)}>
                    ✕
                    </button>
            </div>
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