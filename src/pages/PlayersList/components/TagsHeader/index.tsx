import { useState, useEffect, useRef } from 'react';
import Button from '../../../../components/Button';
import TagList from '../TagsList';
import './style.css';

const TagsHeader = ({ tags, label }: any) => {
    const [isTagsPopupVisible, setIsTagsPopupVisible] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null); // Ref to track the popup element

    const tagsPopup = tags?.slice(2);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node)
            ) {
                setIsTagsPopupVisible(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="tag-header-container">
            <div className="tag-header">
                <h4>{label}</h4>
                {tags?.length > 2 && (
                    <Button onClick={() => setIsTagsPopupVisible(true)}>ver mais</Button>
                )}
            </div>
            <TagList tags={tags?.map((tag: any) => tag?.label) || []} maxVisible={2} />

            {isTagsPopupVisible && (
                <div className="tag-header__popup" ref={popupRef}>
                    <TagList tags={tagsPopup?.map((tag: any) => tag?.label) || []} />
                </div>
            )}
        </div>
    );
};

export default TagsHeader;