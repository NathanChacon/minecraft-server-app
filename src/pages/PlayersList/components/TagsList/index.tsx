import React, { useState, useRef, useEffect } from 'react';
import './style.css';

interface TagListProps {
  tags: string[];
  maxVisible: number;
}

const TagList: React.FC<TagListProps> = ({ tags, maxVisible }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const visibleTags = tags.slice(0, maxVisible);
  const hiddenTags = tags.slice(maxVisible);

  const toggleTooltip = () => setIsTooltipOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsTooltipOpen(false);
      }
    };

    if (isTooltipOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTooltipOpen]);

  return (
    <div className="tag-list">
      <div className="tag-list__tags">
        {visibleTags.length > 0 ? (
          visibleTags.map((tag, index) => (
            <span key={index} className="tag-list__tag">{tag}</span>
          ))
        ) : (
          <span className="tag-list__tag tag-list__placeholder">Não selecionado</span>
        )}
        {hiddenTags.length > 0 && (
          <>
            <button className="tag-list__more-button" onClick={toggleTooltip}>
              ...Ver Mais
            </button>
            {isTooltipOpen && (
              <div ref={tooltipRef} className="tag-list__tooltip">
                {hiddenTags.map((tag, index) => (
                  <span key={index} className="tag-list__tooltip-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TagList;