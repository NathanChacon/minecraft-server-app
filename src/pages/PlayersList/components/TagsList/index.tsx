import React from 'react';
import './style.css';

interface TagListProps {
  tags: string[];
  maxVisible?: number;
}

const TagList: React.FC<TagListProps> = ({ tags, maxVisible = null }) => {
  const maxVisibleFormatted = maxVisible ? maxVisible : tags?.length
  const visibleTags = tags.slice(0, maxVisibleFormatted);

  return (
    <div className="tag-list">
          {visibleTags.length > 0 ? (
          visibleTags.map((tag, index) => (
            <span key={index} className="tag-list__tag">{tag}</span>
          ))
        ) : (
          <span className="tag-list__tag tag-list__placeholder">Não selecionado</span>
        )}
    </div>
  );
};

export default TagList;