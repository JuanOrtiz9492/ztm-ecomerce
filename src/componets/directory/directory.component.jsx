import './directory.styles.scss'
import CategoryItem from '../category-item/categoryItem.component';

const Directory = ({ categories }) => {
    return (
        <div className='directory-container'>
            {categories.map(({ title, id, imageUrl }) => (
                <CategoryItem title={title} imageUrl={imageUrl} key={id} />
            ))}
        </div>
    )
}

export default Directory;