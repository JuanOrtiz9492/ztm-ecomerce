import './directory.styles.scss'
import DirectoryItem from '../directory-item/directoryItem.component';

const Directory = ({ categories }) => {
    return (
        <div className='directory-container'>
            {categories.map(({ title, id, imageUrl }) => (
                <DirectoryItem title={title} imageUrl={imageUrl} key={id} />
            ))}
        </div>
    )
}

export default Directory;